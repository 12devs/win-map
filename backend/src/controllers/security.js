import _ from "lodash";
import config from "config";
import bcrypt from "bcryptjs";
import logger from '../logger';
import { Account } from './../models';
import { sendEmail, verifyEmail } from "../api/email";
import { Danger, Place } from '../models';

export default {

  async register(req, res) {
    try {
      const { login, password, places, dangers } = req.body;
      let { email } = req.body;

      if (!login || !password || !email) {
        logger.error('register | ERROR - Required params are missing');

        return res.status(400).json({ message: 'Required params are missing' });
      }

      email = email.trim().toLowerCase();
      const salt = bcrypt.genSaltSync(config.auth.saltRound);

      const code = _.random(0, 99999);

      const acc = {
        login,
        email,
        code,
        encrypted_password: bcrypt.hashSync(password, salt),
        created_at: new Date(),
        updated_at: new Date(),
      };

      const currentAccount = await Account.findOne({ where: { login } });

      if (currentAccount) {
        return res.status(403).json({ error: 'User with this login already exists' });
      }

      await verifyEmail(email);
      const account = await Account.create(acc);
      const { id } = account;
      await sendEmail(email, 'Wind-map activation code', code);

      dangers.length && dangers.forEach(async el => {
        el.account_id = id;
        await Danger.create(el);
      });

      places.length && places.forEach(async el => {
        el.account_id = id;
        await Place.create(el);
      });

      return res.status(200).json({ message: 'OK' });
    } catch (err) {
      logger.error(`register | ERROR - ${err.message}`);

      return res.status(500).json({ error: err.message });
    }
  },

  async changePassword(req, res) {
    try {
      let { login, password, changePasswordCode } = req.body;
      console.log(req.body);
      if (!login || !password) {
        return res.status(400).json({ message: 'Required params are missing' });
      }

      const acc = await Account.findOne({ where: { login } });
      if (acc.changePasswordCode) {
        if (changePasswordCode) {
          if (acc.changePasswordCode !== changePasswordCode) {
            acc.attemptsChangePasswordCode++;
            if (acc.attemptsChangePasswordCode > 2) {
              const changePasswordCode = _.random(0, 99999);
              await sendEmail(acc.email, 'Wind-map change password code', changePasswordCode);
              acc.changePasswordCode = changePasswordCode;
              acc.attemptsChangePasswordCode = 0;
              await acc.save();
              throw new Error('3 attempts are complete! A new code has been sent to your email.');
            }
            await acc.save();
            throw new Error('invalid code!');
          }
          acc.changePasswordCode = '';
          acc.attemptsChangePasswordCode = 0;
          const saltRound = config.auth.saltRound;
          const salt = bcrypt.genSaltSync(saltRound);
          acc.encrypted_password = bcrypt.hashSync(password, salt);
          await acc.save();
          return res.status(200).json({ message: 'OK' });
        }
        return res.status(200).json({ message: 'code', email: acc.email });
      } else {
        const changePasswordCode = _.random(0, 99999);
        await sendEmail(acc.email, 'Wind-map change password code', changePasswordCode);
        acc.changePasswordCode = changePasswordCode;
        await acc.save();
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { login, password, code } = req.body;

      if (!login || !password) {
        logger.error('login | ERROR - Required params are missing!');

        return res.status(400).json({ message: 'Required params are missing' });
      }

      const acc = await Account.findOne({ where: { login } });

      if (!acc) {

        return res.status(403).json({ error: `Wrong login or password` });
      }

      if (acc.code) {
        if (code) {
          if (acc.code !== code) {
            acc.attemptsCode++;
            if (acc.attemptsCode > 2) {
              const code = _.random(0, 99999);
              await sendEmail(acc.email, 'Wind-map activation code', code);
              acc.code = code;
              acc.attemptsCode = 0;
              await acc.save();
              throw new Error('3 attempts are complete! A new code has been sent to your email.');
            }
            await acc.save();
            throw new Error('invalid code!');
          }
          acc.code = '';
          acc.attemptsCode = 0;
          await acc.save();
        } else {

          return res.status(200).json({ message: 'code', email: acc.email });
        }
      }

      await acc.comparePassword(password);
      const token = acc.generateJWT();

      return res.status(200).json({ message: 'OK', token });
    } catch (err) {
      logger.error(`login | ERROR - ${err.message}`);

      return res.status(500).json({ error: 'Wrong login or password' });
    }
  }
};

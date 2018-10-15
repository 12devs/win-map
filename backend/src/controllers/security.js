import { Account } from './../models';
import Models from './../models';
import config from "config";
import bcrypt from "bcryptjs";

export default {

  async register(req, res) {
    console.log('register');
    try {
      const { login, password } = req.body;
      console.log('body', req.body);
      const saltRound = config.auth.saltRound;
      const salt = bcrypt.genSaltSync(saltRound);

      let acc = {
        login,
        encrypted_password: bcrypt.hashSync(password, salt),
        created_at: new Date(),
        updated_at: new Date(),
      };

      Account.create(acc)
        .then(() => {
          return res.status(200).json({ message: 'OK' })
        })
        .catch(err => {
          console.log(1, err);
          return res.status(500).json({ error: err.message })
        })
    } catch (err) {
      console.log(2, err);
      return res.status(500).json({ error: err.message })
    }
  },

  async login(req, res) {
    console.log('login');
    try {
      const { login, password } = req.body;
      console.log(req.body);
      Account.findOne({ where: { login } })
        .then(async acc => {
          await acc.comparePassword(password);
          return acc
        })
        .then(acc => {
          const token = acc.generateJWT();
          return res.status(200).json({ message: 'OK', token })
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err.message })
        })
    } catch (err) {
      // console.log(2, err);
      return res.status(500).json({ error: err.message })
    }
  }
}

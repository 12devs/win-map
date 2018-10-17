import { Account } from './../models';
import Models from './../models';
import config from "config";
import bcrypt from "bcryptjs";

export default {

  async register(req, res) {
    try {
      const { login, password } = req.body;
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
          return res.status(500).json({ error: err.message })
        })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  async login(req, res) {
    try {
      const { login, password } = req.body;
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
          return res.status(500).json({ error: err.message })
        })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

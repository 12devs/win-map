import emailExistence from 'email-existence';
import { getCurrentLocation } from '../api/location';
import { Email } from './../models';

export default {

  async list(req, res) {
    console.log('list');
    // const { payload: { id } } = req;
    console.log('user', req.user);
    try {
      res.status(200).json({ status: 'test complete' })
    } catch (err) {
      console.log(2, err);
      return res.status(500).json({ error: err.message })
    }
  }
}

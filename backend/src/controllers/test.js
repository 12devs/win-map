
export default {

  async list(req, res) {
    const {user} = req;
    try {
      res.status(200).json({ status: 'test complete',  user})
    } catch (err) {
      console.log(2, err);
      return res.status(500).json({ error: err.message })
    }
  }
}

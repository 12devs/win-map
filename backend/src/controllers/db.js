import models from './../models';

export default {

  async dbExecute(req, res) {
    try {
      const { model, method, args } = req.body;
      await models[model][method](...args)
        .then(result=>{
          return res.status(200).json(result);
        })

    } catch (err) {

      return res.status(500).json({ error: err.message });
    }
  }
}

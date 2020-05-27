const User = require('../models/User')

module.exports = {
   async index(req, res) {
      const user = await User.find()
      return res.status(200).json(user)
   },

   async store(req, res) {
      const { email } = req.body

      if (!email) {
         return res.status(405).json({ error: 'Campo obrigatório' })
      }

      let user = await User.findOne({ email })
      if (!user) {
         user = await User.create({ email })
      }
      return res.status(201).json(user)
   }
}
const Spot = require('../models/Spot')
const User = require('../models/User')

module.exports = {
  async index(req, res) {
    const { techs } = req.query

    const spot = await Spot.find({ techs })

    return res.status(200).json(spot)
  },

  async store(req, res) {
    const { filename } = req.file
    const { company, techs, price } = req.body
    const { user_id: userId } = req.headers

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ error: 'Usuário inexistente' })
    }

    const spot = await Spot.create({
      user: userId,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(res => res.trim()),
      price
    })

    return res.status(201).json(spot)
  }
}
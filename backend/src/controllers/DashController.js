const Spot = require('../models/Spot')

module.exports = {
  async show(req, res) {
    const { user_id: userId } = req.headers

    const spot = await Spot.find({ user: userId })

    return res.status(200).json(spot)
  }
}
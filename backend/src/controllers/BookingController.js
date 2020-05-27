const Booking = require('../models/Booking')

module.exports = {
   async store(req, res) {
      const { user_id } = req.headers
      const { spot_id } = req.params
      const { date } = req.body

      const booking = await Booking.create({
         user: user_id,
         spot: spot_id,
         date
      })

      await booking.populate('spot').populate('user').execPopulate()

      const ownerSocket = req.connUsers[booking.spot.user]

      if (ownerSocket) { //SE CONTER ALGUMA CONEXÃO
         //ENVIAR A MENSAGEM PARA O DONO DO SPOT COM TODAS AS INFORMAÇÕES DE RESERVA
         req.io.to(ownerSocket).emit('booking_request', booking)
      }

      return res.status(201).json(booking)
   }
}
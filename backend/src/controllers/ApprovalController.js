const Booking = require('../models/Booking')

module.exports = {
   async store(req, res) {
      const { booking_id } = req.params

      const booking = await Booking.findById(booking_id).populate('spot')

      booking.approved = true
      await booking.save()

      const bookingUserSocket = req.connUsers[booking.user]

      if (bookingUserSocket) { //SE CONTER ALGUMA CONEXÃO
         //ENVIAR A MENSAGEM PARA O DONO DO SPOT COM TODAS AS INFORMAÇÕES DE RESERVA
         req.io.to(bookingUserSocket).emit('booking_response', booking)
      }
      return res.json(booking)
   }
}
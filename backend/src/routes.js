const { Router } = require('express')
const multer = require('multer')

const Session = require('./controllers/SessionController')
const Spot = require('./controllers/SpotController')
const Dash = require('./controllers/DashController')
const Booking = require('./controllers/BookingController')
const Approval = require('./controllers/ApprovalController')
const Rejection = require('./controllers/RejectionController')
const uploadConfig = require('./config/upload')

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/sessions', Session.index)
routes.post('/sessions', Session.store)

routes.get('/spots', Spot.index)
routes.post('/spots', upload.single('thumbnail'), Spot.store)

routes.get('/dashboard', Dash.show)

routes.post('/spots/:spot_id/bookings', Booking.store)

routes.post('/bookings/:booking_id/approvals', Approval.store)
routes.post('/bookings/:booking_id/rejections', Rejection.store)

module.exports = routes
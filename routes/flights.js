import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()


// GET /movies/new
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:id', flightsCtrl.show)
router.get("/:id/edit", flightsCtrl.edit)
router.post('/', flightsCtrl.create)
router.post('/:id/tickets', flightsCtrl.createTicket)
router.post('/:id/meals', flightsCtrl.addToMeal);
// localhost:3000/movies/:id
router.put("/:id", flightsCtrl.update)
router.delete("/:id", flightsCtrl.delete)
// localhost:3000/movies/:id/edit


// POST /movies


export {
	router
}
import { Flight } from '../models/flights.js'
import { Meal } from '../models/meals.js'

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight",
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body [key]
  }
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}
function index(req, res) {
  console.log(req.date);
  console.log(req.time)
  Flight.find({})
  .then(flight => {
    res.render('flights/index', {
      flights: flight,
     title: "All Flights",
    })
  })
  .catch(error => {
    console.log(error)
    // redirect to localhost:3000
    res.redirect('/flights')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meal')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meal}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Detail',
        flight: flight,
        meals: meals,
      })
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect("/flights")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/flights")
  })
}

function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render("flights/edit", {
      flight, 
      title: "Edit Flight"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function createTicket(req, res) {
 Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToMeal(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meal.push(req.body.mealId)
    flight.save()
		.then(() => {
		  res.redirect(`/flights/${flight._id}`)
		})
    .catch(err => {
      console.log(err);
      res.redirect("/flights")
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect("/flights")
  })
}


export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToMeal
}
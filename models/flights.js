import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: {type: Number, min: 0} 
}, {
  timestamps: true
})

	
const flightSchema = new Schema({
  airline: {type: String, default: "DEN"},
  airport: String,
  flightNo: {type: Number, default:0},
  departs: Date,
  tickets: [ticketSchema],
  meal: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
  }, {
    timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight,
}
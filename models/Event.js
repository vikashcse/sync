// Event create
// -Title of event
// -category from the list
// -choose promoters from the list
// -upcoming events (schedule date and time)
// -Ticket value
// -upload banner for thumbnail


const { Schema, model } = require("mongoose");

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    promoters: {
        type: String,
        required: true
    },
    TicketValue: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("event", EventSchema);

import mongoose from "mongoose";

interface ticketType {
  name: string;
  price: number;
  userId: string;
}

interface ticketDocument extends mongoose.Document {
  name: string;
  price: number;
  userId: mongoose.Types.ObjectId;
  status: string;
}

interface ticketModel extends mongoose.Model<ticketDocument> {
  createDocument(document: ticketType): ticketDocument;
}

const ticketSchema = new mongoose.Schema<ticketDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: { type: String, default: "available" ,enum:["available","reserved","sold"]}
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Static method to create a new ticket document
ticketSchema.statics.createDocument = function (document: ticketType) {
  return new Ticket(document);
};

const Ticket = mongoose.model<ticketDocument, ticketModel>(
  "tickets",
  ticketSchema
);
export default Ticket;

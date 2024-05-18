const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: String
  }
});

module.exports = mongoose.model('portfolio', PortfolioSchema);

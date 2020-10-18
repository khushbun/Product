const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  ourinfoShema = new Schema({
    name:{ type: String, default: null },
    description:{ type: String, default: null },
    price:{ type: Number, default: null },
    unit_of_measurement:{ type: String, default: null },
    product_image:{ type: String, default: null },
  });

module.exports = mongoose.model('product', ourinfoShema);
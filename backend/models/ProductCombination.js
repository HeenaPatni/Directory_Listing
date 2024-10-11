const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCombinationSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    materialId: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
    gradeId: { type: Schema.Types.ObjectId, ref: 'Grade', required: true },
    price: { type: Number },
    currency: { type: String},
    shape: { type: String },
    length: { type: String },
    thickness: { type: String },
});

module.exports = mongoose.model('ProductCombination', ProductCombinationSchema);

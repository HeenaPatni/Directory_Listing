const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model('Grade', GradeSchema);
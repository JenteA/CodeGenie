var mongoose = require('mongoose');

var OpdrachtSchema = new mongoose.Schema({
    opdrachtTitel: String,
    lesId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Les'}],
    adminID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    heeftCode: Boolean
});

mongoose.model('Opdracht', OpdrachtSchema);
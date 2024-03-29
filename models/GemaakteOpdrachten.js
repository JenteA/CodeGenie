var mongoose = require('mongoose');

var GemaakteOpdrachtSchema = new mongoose.Schema({
    opdrachtID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Opdracht'}],
    opdrachttitel: String,
    isGemaakt: Boolean,
    code: String,
    lesID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Les'}],
    studentNaam: String
});

mongoose.model('GemaakteOpdracht', GemaakteOpdrachtSchema);
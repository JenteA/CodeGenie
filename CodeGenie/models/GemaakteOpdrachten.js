var mongoose = require('mongoose');

var GemaakteOpdrachtSchema = new mongoose.Schema({
    opdrachtID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Opdracht'}],
    isGemaakt: Boolean,
    studentID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('GemaakteOpdracht', GemaakteOpdrachtSchema);
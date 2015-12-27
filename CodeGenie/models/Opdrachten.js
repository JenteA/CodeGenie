var mongoose = require('mongoose');

var OpdrachtSchema = new mongoose.Schema({
    opdrachtTitel: String,
    //lesID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Les'}],
    //adminID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    heeftCode: Boolean
});

var GemaakteOpdrachtSchema = new mongoose.Schema({
    //opdrachtID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Opdracht'}],
    isGemaakt: Boolean,
    //studentID: [{type: mongoose.Schema.Types.ObjestId, ref: 'User'}]
});

mongoose.model('Opdracht', OpdrachtSchema);

mongoose.model('GemaakteOpdracht', GemaakteOpdrachtSchema);
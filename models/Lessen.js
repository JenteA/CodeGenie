var mongoose = require('mongoose');

var lesSchema = new mongoose.Schema({
    lesTitel: String,
    adminID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    opdrachten: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Opdracht' }],
    gemaakteOpdrachten: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GemaakteOpdracht' }]
});

mongoose.model('Les', lesSchema);
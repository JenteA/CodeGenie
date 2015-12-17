var mongoose = require('mongoose');

var lesSchema = new mongoose.Schema({
    lesTitel: String,
    adminID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('Les', lesSchema);
var mongoose = require('mongoose');

var CodeSchema = new mongoose.Schema({
    codetext: String,
    opdrachtID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Opdracht'}],
    studentID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('Code', CodeSchema);

var mongoose = require('mongoose');

const uri='mongodb+srv://testing:1234@databasename-emrm0.mongodb.net/test?retryWrites=true&w=majority'

 var db=mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


var Schema = mongoose.Schema;
var bioSchema = new Schema( {
data: {type: String, required: true, unique: true},
image: { type: String, required: true, unique: true },

});

module.exports = mongoose.model('schema', bioSchema);

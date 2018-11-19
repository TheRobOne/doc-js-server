const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create doc Schema
const DocSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    locked: {
        type: Boolean,
        default: false
    },
    editor: {
        type: String
    }
});

let Doc = module.exports = mongoose.model('docs', DocSchema);

module.exports.getDocs = (callback) => {
    Doc.find({}, callback);
}

module.exports.getOneDoc = (id, callback) => {
    Doc.findOne(id, callback);
}

module.exports.addDoc = (doc, callback) => {
    Doc.create(doc, callback);
}

module.exports.addContent = (query, content, callback) => {
    Doc.findOneAndUpdate(query, content, callback);
}

module.exports.deleteDocument = (query, callback) => {
    Doc.findOneAndDelete(query, callback);
}
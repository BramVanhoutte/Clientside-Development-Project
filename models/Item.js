var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        starred: Boolean,
        price: Number,
        releaseDate: mongoose.Schema.Types.Date,
        category: String,
        description: String,
        image: String,
        imageDetail: String,
    });

module.exports = mongoose.model('Item', ItemSchema);
const mongoose = require("mongoose");

const AudioSchema = new mongoose.Schema({
    song_name: {
        type: String,
        required: true
    },
    song_image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String,
    },
});

const Audio = mongoose.model('Audio', AudioSchema);

module.exports = Audio;
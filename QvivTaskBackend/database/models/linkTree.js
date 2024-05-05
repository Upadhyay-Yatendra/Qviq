const mongoose = require('mongoose')

const { Schema } = mongoose;

const treeSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    designation: String,
    photo : String,
    about: String,
    portfolio: String,
    resume: String,
    website: String,
    // social media 
    linkedIn: String,
    twitter: String,
    instagram: String,
    facebook: String,
    // coding platforms 
    hackerRank: String,
    hackerEarth: String,
    codeChef: String,
    codeforces: String,
    leetCode: String,
    geeksforgeeks: String,
    gitHub: String,
    codePen: String
});

treeSchema.index({ username: 1 });

const TreeModel = mongoose.model('TreeModel', treeSchema);

module.exports = TreeModel
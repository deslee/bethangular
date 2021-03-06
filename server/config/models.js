var config = require('./index')
var mongoose = require('mongoose');

mongoose.connect(config.mongo_url);

var Model = function (name, fields, options) {
    this.fields = fields;
    this.odm = mongoose.model(name, fields);
    this.options = options;
}

////
//  Trims a object's fields, so that its only fields 
//  are the ones specified in the model.
////
Model.prototype.trim = function (data) {
    var m = {}, fields = this.fields
    Object.keys(fields).forEach(function (key) {
        if (data[key] !== undefined) {
            m[key] = data[key];
        }
    });
    return m;
};

////
//  Model definitions
////

module.exports.Image = new Model('Image', {
    title: String,
    slug: {
        type: String,
        unique: true
    },
    featured: Boolean,
    description: String,
    urls: [String]
}, {
    restify: {
        idProperty: 'slug'
    }
});

module.exports.Setting = new Model('Setting', {
    slug: String,
    data: Object
}, {});

module.exports.Todo = new Model('Todo', {
    text: { type: String, required: true },
    done: { type: Boolean, default: false }
});
// Dependencies require
var mongoose = require('mongoose');

// schema define
var Schema = mongoose.Schema;

var taskSchema = new Schema({
	title: String,
	isDone: Boolean
});

// model init
var Task = mongoose.model('tasks', taskSchema);

module.exports = {
	Task: Task
}

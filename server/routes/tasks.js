var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var dbname = 'tasklist';
var db = mongojs('mongodb://localhost:27017/' + dbname, ['tasks']);

// Index route
router.get('/', function(request, response, next){
	response.render('api.html');
});

// Get All Tasks
router.get('/tasks', function(request, response, next){
	db.tasks.find( function(error, tasks) {
		if (error) {
			response.send(error);
		} else {
			response.json(tasks);
		}
	});
});

// Get Single Task
router.get('/task/:id', function(request, response, next){
	db.tasks.findOne( { _id:mongojs.ObjectId(request.params.id) }, function(error, task) {
		if (error) {
			response.send(error);
		} else {
			response.json(task);
		}
	});
});

// Save Task
router.post('/task', function(request, response, next){
	var task = request.body;
	if (!task.title || !(task.isDone + '') ) {
		response.status(400);
		response.json({ 'error': 'Bad Data' });
	} else {
		db.tasks.save(task, function(error, task){
			if (error) {
				response.send(error);
			} else {
				response.json(task);
			}
		});
	}
});

// Delete Task
router.delete('/task/:id', function(request, response, next){
	db.tasks.remove( { _id:mongojs.ObjectId(request.params.id) }, function(error, task) {
		if (error) {
			response.send(error);
		} else {
			response.json(task);
		}
	});
});

// Update Task
router.put('/task/:id', function(request, response, next){
	var task = request.body;
	var updTask = {};
	if ( task.isDone ) {
		updTask.isDone = task.isDone;
	}
	if (task.title) {
		updTask.title = task.title;
	}
	if (!updTask) {
		response.status(400);
		response.json({ 'error': 'Bad Data' });
	} else {
		db.tasks.update( { _id:mongojs.ObjectId(request.params.id) }, updTask, {}, function(error, task) {
			if (error) {
				response.send(error);
			} else {
				response.json(task);
			}
		});
	}
});

module.exports = router;

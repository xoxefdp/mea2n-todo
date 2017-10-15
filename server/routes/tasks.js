// Dependencies require
var express = require('express');
var mongojs = require('mongojs');

// database connection and config
var connection = 'mongodb://localhost:27017/tasklist';
var db = mongojs(connection, ['tasks']);

// routes
var router = express.Router();

router.get('/', index);
router.get('/tasks', getTasks);
router.get('/task/:id', getTask);
router.post('/task', saveTask);
router.delete('/task/:id', deleteTask);
router.put('/task/:id', updateTask);

module.exports = router;


// Index route
function index(request, response, next) {
	response.render('api.html');
}

// Get All Tasks
function getTasks(request, response, next) {
	db.tasks.find( function(error, tasks) {
		if (error) {
			response.send(error);
			console.log(error);
		} else {
			response.json(tasks);
		}
	});
}

// Get Single Task
function getTask(request, response, next) {
	db.tasks.findOne( { _id:mongojs.ObjectId(request.params.id) }, function(error, task) {
		if (error) {
			response.send(error);
			console.log(error);
		} else {
			response.json(task);
		}
	});
}

// Save Task
function saveTask(request, response, next) {
	var task = request.body;
	if (!task.title || !(task.isDone + '') ) {
		response.status(400);
		response.json({ 'error': 'Bad Data' });
	} else {
		db.tasks.save(task, function(error, task){
			if (error) {
				response.send(error);
				console.log(error);
			} else {
				response.json(task);
			}
		});
	}
}

// Delete Task
function deleteTask(request, response, next) {
	db.tasks.remove( { _id:mongojs.ObjectId(request.params.id) }, function(error, task) {
		if (error) {
			response.send(error);
			console.log(error);
		} else {
			response.json(task);
		}
	});
}

// Update Task
function updateTask(request, response, next) {
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
				console.log(error);
			} else {
				response.json(task);
			}
		});
	}
}

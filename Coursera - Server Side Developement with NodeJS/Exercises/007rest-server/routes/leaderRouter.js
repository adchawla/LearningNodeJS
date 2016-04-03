var express = require('express');
var bodyParser = require('body-parser');
var Leaders = require('../models/leadership');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
	.get(function(req, res, next) {
		//res.end('Will send all the leaders to you!');
		Leaders.find({}, function(err, leaders) {
			if (err) throw err;
			res.json(leaders);
		});
	})
	.post(function(req, res, next) {
		//res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
		Leaders.create(req.body, function(err, leader) {
			if (err) throw err;
			console.log('Leader Created');
			var id = leader._id;
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.end('Added the leader with id: ' + id);
		});
	})
	.delete(function(req, res, next) {
		//res.end('Deleting all leaders');
		Leaders.remove({}, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

leaderRouter.route('/:leaderId')
	.get(function(req, res, next) {
		//res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
		Leaders.findById(req.params.leaderId, function(err, dish) {
			if (err) throw err;
			res.json(dish);
		});
	})
	.put(function(req, res, next) {
		//res.write('Updating the leader: ' + req.params.leaderId + ' \n');
		//res.end('Will update details of the leader: ' + req.body.name + ' with details: ' + req.body.description);
		Leaders.findByIdAndUpdate(req.params.leaderId, {
			$set:req.body
		}, {
			new:true
		}, function(err, leader) {
			if (err) throw err;
			res.json(leader);
		});
	})
	.delete(function(req, res, next) {
		//res.end('Deleting leader: ' + req.params.leaderId);
		Leaders.remove(req.params.leaderId, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

module.exports = leaderRouter;
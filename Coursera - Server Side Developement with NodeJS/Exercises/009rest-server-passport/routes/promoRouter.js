var express = require('express');
var bodyParser = require('body-parser');
var Promotions = require('../models/promotions');
var Verify = require('./Verify');

var promotionsRouter = express.Router();
promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		//res.end('Will send all the promotions to you!');
		Promotions.find({}, function(err, promotions) {
			if (err) throw err;
			res.json(promotions);
		});
	})
	.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
		//res.end('Will add the promotion: ' + req.body.name + ' with details: ' + //req.body.description);
		Promotions.create(req.body, function(err, promotion) {
			if (err) throw err;
			console.log('Promotion Created');
			var id = promotion._id;
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.end('Added the leader with id: ' + id);
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
		//res.end('Deleting all promotions');
		Promotions.remove({}, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

promotionsRouter.route('/:promotionId')
	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		//res.end('Will send details of the promotion: ' + req.params.promotionId + ' to you!');
		Promotions.findById(req.params.promotionID, function(err, dish) {
			if (err) throw err;
			res.json(dish);
		});
	})
	.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
		//res.write('Updating the promotion: ' + req.params.promotionId + ' \n');
		//res.end('Will update details of the promotion: ' + req.body.name + ' with details: ' + req.body.description);
		Promotions.findByIdAndUpdate(req.params.leaderId, {
			$set:req.body
		}, {
			new:true
		}, function(err, promotion) {
			if (err) throw err;
			res.json(promotion);
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
		//res.end('Deleting promotion: ' + req.params.promotionId);
		Promotions.remove({"_id":req.params.promotionID}, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

module.exports = promotionsRouter;
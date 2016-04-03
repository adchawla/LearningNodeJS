var Dishes = require('../models/dishes');
var Verify = require('./Verify');

module.exports = function(express, bodyParser) {
	var dishRouter = express.Router();
	dishRouter.use(bodyParser.json());

	dishRouter.route('/')
		.get(Verify.verifyOrdinaryUser, function(req, res, next) {
			Dishes.find({}, function(err, dish) {
				if (err) throw err;
				res.json(dish);
			});
		})
		.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
			//res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
			Dishes.create(req.body, function(err, dish) {
				if (err) throw err;
				console.log('Dish Created');
				var id = dish._id;
				res.writeHead(200, {'Content-Type':'text/plain'});
				res.end('Added the dish with id: ' + id);
			});
		})
		.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,  function(req, res, next) {
			Dishes.remove({}, function(err, resp) {
				if (err) throw err;
				res.json(resp);
			});
		});

	dishRouter.route('/:dishId')
		.get(Verify.verifyOrdinaryUser, function(req, res, next) {
			//res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
			Dishes.findById(req.params.dishId, function(err, dish) {
				if (err) throw err;
				res.json(dish);
			});
		})
		.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
			//res.write('Updating the dish: ' + req.params.dishId + ' \n');
			//res.end('Will update details of the dish: ' + req.body.name + ' with details: ' + req.body.description);
			Dishes.findByIdAndUpdate(req.params.dishId, {
				$set:req.body
			}, {
				new:true
			}, function(err, dish) {
				if (err) throw err;
				res.json(dish);
			});
		})
		.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
			//res.end('Deleting dish: ' + req.params.dishId);
			Dishes.remove({"_id":req.params.dishId}, function(err, resp) {
				if (err) throw err;
				res.json(resp);
			});
		});

	dishRouter.route('/:dishId/comments')
		.get(function(req,res,next) {
			Dishes.findById(req.params.dishId, function(err, dish) {
				if (err) throw err;
				res.json(dish.comments);
			});
		})
		.post(function(req,res,next) {
			Dishes.findById(req.params.dishId, function(err, dish) {
				if (err) throw err;
				dish.comments.push(req.body);
				dish.save(function(err, dish) {
					if (err) throw err;
					console.log('Updated Comments!');
					res.json(dish);
				});
			});
		})
		.delete(function(req,res,next) {
			Dishes.findById(req.params.dishId, function(err, dish) {
				if (err) throw err;
				var dishComments = dish.comments;
				for ( var i = (dishComments.length -1); i >= 0; --i ) {
					dishComments.id(dishComments[i]._id).remove();
				}
				dish.save(function(err, result) {
					if (err) throw err;
					res.writeHead(200, {'Content-Type':'text/plain'});
					res.end('Deleted all comments!');
				});
			});
		});

	dishRouter.route('/:dishId/comments/:commentId')
		.get(function(req,res,next) {
			Dishes.findById(req.params.dishId, function(err, dish) {
				if (err) throw err;
				res.json(dish.comments.id(req.params.commentId));
			});
		})
		.put(function(req,res,next) {
			// We delete the existing comment and insert the updated comment as a new comment
			Dishes.findById(req.params.dishId, function(err, dish) {
				if (err) throw err;
				dish.comments.id(req.params.commentId).remove();
				dish.comments.push(req.body);
				dish.save(function(err, updatedDish) {
					if (err) throw err;
					console.log('Updated Comments!');
					res.json(updatedDish);
				});
			});
		})
		.delete(function(req,res,next) {
			Dishes.findById(req.params.dishId, function(err, dish) {
				if (err) throw err;
				dish.comments.id(req.params.commentId).remove();
				dish.save(function(err, updatedDish) {
					if (err) throw err;
					res.json(updatedDish);
				});
			});
		});

	return dishRouter;
};


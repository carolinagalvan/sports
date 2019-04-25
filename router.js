const express = require('express');
const router = express.Router();
const {ListSports} = require('./model');

router.get('/list-sports', (req, res, next) => {
	
	ListSports.get()
		.then(sports => {
			res.status(200).json({
				message : "Successfully sending the list of sports",
				status : 200,
				sports : sports
			});
		})
		.catch(err => {
			res.status(500).json({
				message : 'Internal server error.',
				status : 500
			});
			return next();
		});
});

router.get('/list-sports/:id', (req, res, next) => { //to send more than one parameter separate with a ,

		let sportId = req.params.id;
		ListSports.getId(sportId)
			.then(sport => {
				res.status(200).json({
					message : "Found the sport.",
					status : 200,
					sport : sport
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "Sport not found in the list",
					status : 404
				});
				return next();
			});
});


router.post('/post-sport', (req, res, next) => {
	
	let requiredFields = ['id', 'name'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}

	let objectToAdd = {
		id: req.body.id,
		name: req.body.name
	};

	ListSports.post(objectToAdd)
		.then(sport => {
			res.status(201).json({
				message : "Successfully added the sport.",
				status : 201,
				sport : sport
			});
		})
		.catch( err => {
			res.status(500).json({
				message : `Internal server error.`,
				status : 500
			});
			return next();
		});

	// bcrypt.hash(req.body.anem, 10)
	// 	.then (hashName => {
	// 		let objectToAdd = {
	// 			id: req.body.id,
	// 			name: hashName
	// 		};
		
	// 		ListSports.post(objectToAdd)
	// 			.then(sport => {
	// 				res.status(201).json({
	// 					message : "Successfully added the sport",
	// 					status : 201,
	// 					sport : sport
	// 				});
	// 			})
	// 			.catch( err => {
	// 				res.status(500).json({
	// 					message : `Internal server error.`,
	// 					status : 500
	// 				});
	// 				return next();
	// 			});
	// })
});

router.put('/update-sport/:id', (req, res, next) => {
	
	let sportId = req.params.id;
	let newName = req.body.name;

	ListSports.update(sportId, newName)
		.then(sport => {
			res.status(200).json({
				message : "Successfully updated the sport",
				status : 200,
				sport : sport
			});
		})
		.catch( err => {
			res.status(404).json({
				message : "Sport not found in the list",
				status : 404
			});
			return next();
		});
});

router.delete('/delete-sport/:id', (req, res, next) => {	
	let sportId = req.params.id;
	
	ListSports.delete(sportId)
		.then(sport => {
			res.status(200).json({
				message : "Successfully deleted the sport",
				status : 200,
				sport : sport
			});
		})
		.catch(err => {
			res.status(404).json({
				message : "Sport not found in the list",
				status : 404
			});
			return next();
		});
});

module.exports = router;


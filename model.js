const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Create our schema (collection)
let sportSchema = mongoose.Schema({
    id : {type : Number, required : true, unique : true},
    name : {type : String, required : true}
});

let Sports = mongoose.model('Sports', sportSchema); //creating the instance of the database, with it you are able to create, delete, update info

const ListSports = {
    get : function(){
        return Sports.find() //return is waiting for the information
            .then(sports => {
                return sports;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    getId : function(sportId){
        return Sports.findOne({_id: sportId})
            .then(sport => {
                return sport;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    post : function(newSport){
		return Sports.create(newSport)
			.then(sport => {
				return sport;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
    update : function (sportId, newName){
        return Sports.findByIdAndUpdate({_id: sportId}, {$set:{name: newName}})
            .then(sport => {
                return sport;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    delete : function(sportId){
        return Sports.deleteOne({_id: sportId})
            .then(sport => {
                return sport;
            })
            .catch(err => {
                throw new Error(err);
            });
    }
};

module.exports = {ListSports}

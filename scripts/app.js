'use strict;'

var RadioSeed = function(artist, album, imgUrl) {
	this.artist = artist;
	this.album = album;
	this.imgUrl = imgUrl;
	this.seedStrength = ko.observable('strength-1');
	this.updateSeedStrength = function(seed, event) {
		debugger;
		if (event.target.classList.contains('strength-level') ||
			event.target.classList.contains('strength-bar-pad')) {
			seed.seedStrength(event.target.classList[1]);
		} else if (event.target.closest('.strength-level')) {
			debugger;
		}
	};
}

//var radioSeeds = [];
// for(var i = 0; i < 10; i++) {
// 	radioSeeds.push(new radioSeed('artist_' + i, 'album_' + i,
// 		'http://www.spirit-animals.com/wp-content/uploads/2013/08/Penguin-3-African-x.jpg'));
// }

var RadioListModel = function() {
	var self = this;
	self.artistInput = ko.observable();
	self.albumInput = ko.observable();
	self.radioSeeds = ko.observableArray([]);
	
	/**
	 * add a seed from the input fields to the seedlist
	 * pre: both input fields must be filled in
	 */
	self.addSeed = function() {
		// ensure that both fields are filled in
		if(!self.artistInput() || !self.albumInput()) {
			return;
		}
		self.radioSeeds.push(new RadioSeed(self.artistInput(), self.albumInput(),
			'http://www.spirit-animals.com/wp-content/uploads/2013/08/Penguin-3-African-x.jpg'));
		self.artistInput('');
		self.albumInput('');
		console.log(self.radioSeeds);	
	};
	
	/**
	 * remove a seed from the seed list
	 * triggered from seed's delete button
	 * @param seed The seed to remove
	 */
	self.removeSeed = function(seed) {
		self.radioSeeds.remove(seed)
	};
	
	/**
	 * Take the seedlist and generate a radio-like playlist from it
	 */
	self.generateRadio = function() {
		console.log('Generating radio for...');
		self.radioSeeds().forEach(function(seed){
			console.log('%s - %s', seed.artist, seed.album);
		});
	};	
};

var model = new RadioListModel();
ko.applyBindings(model);
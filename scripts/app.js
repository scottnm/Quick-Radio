'use strict;'

var mockTracks = function(name) {
	var tracks = [];
	while(name.length > 0) {
		tracks.push('track_'+name.slice(0,1));
		name = name.slice(1);
	}
	return tracks.slice(0, 10).sort(shuffleHelper);
};

// placeholder class until I'm retrieving real data from the api
var RadioSeed = function(artist, album, imgUrl) {
	this.artist = artist;
	this.album = album;
	this.imgUrl = imgUrl;
	this.tracks = mockTracks(artist + album);
	// non placeholder stuff, will be used after api
	this.strength = ko.observable('strength-1');
	this.strengthNum = ko.computed(function(){
		return Number(this.strength()[this.strength().length - 1]);
	}, this);
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
	};
	
	/**
	 * remove a seed from the seed list
	 * triggered from seed's delete button
	 * @param seed The seed to remove
	 */
	self.removeSeed = function(seed) {
		self.radioSeeds.remove(seed)
	};
	
	self.totalStrength = ko.computed(function() {
		var sum = 0;
		self.radioSeeds().forEach(function(seed) {
			sum += seed.strengthNum();
		});
		return sum;
	});
};

/**
 * Take the seedlist and generate a radio-like playlist from it
 */
RadioListModel.prototype.generateRadio = function() {
	console.log('%d Generating radio for...', this.totalStrength());
	var sumStrength = this.totalStrength();
	var playlist = [];
	this.radioSeeds().forEach(function(seed){
		var percentage = seed.strengthNum() / sumStrength;
		var numTracks = Math.ceil(seed.tracks.length * percentage);
		playlist = playlist.concat(seed.tracks.slice(0, numTracks));
	});
	playlist.sort(shuffleHelper);
	console.log(playlist);
};

RadioListModel.prototype.updateStrength = function(seed, event) {
	if (event.target.classList.contains('strength-level') ||
		event.target.classList.contains('strength-bar-pad')) {
		seed.strength(event.target.classList[1]);
	}
};

var model = new RadioListModel();
ko.applyBindings(model);
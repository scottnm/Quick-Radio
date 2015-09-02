'use strict;'

var RadioSeed = function(artist, album, imgUrl) {
	this.artist = artist;
	this.album = album;
	this.imgUrl = imgUrl;
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
	
	self.processEntry = function() {
		self.radioSeeds.push(new RadioSeed(self.artistInput(), self.albumInput(),
			'http://www.spirit-animals.com/wp-content/uploads/2013/08/Penguin-3-African-x.jpg'));
		self.artistInput('');
		self.albumInput('');
		console.log(self.radioSeeds);	
	};
	
	self.generateRadio = function() {
		console.log('Generating radio for...');
		self.radioSeeds().forEach(function(seed){
			console.log('%s - %s', seed.artist, seed.album);
		});
	}	
};

var model = new RadioListModel();
ko.applyBindings(model);
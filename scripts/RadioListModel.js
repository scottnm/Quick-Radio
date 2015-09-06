"use strict";

//var radioSeeds = [];
// for(var i = 0; i < 10; i++) {
// 	radioSeeds.push(new radioSeed('artist_' + i, 'album_' + i,
// 		'http://www.spirit-animals.com/wp-content/uploads/2013/08/Penguin-3-African-x.jpg'));
// }

var model = new RadioListModel();

function RadioListModel() {
	var self = this;
	self.artistInput = ko.observable();
	self.radioSeeds = ko.observableArray([]);
	
	self.totalStrength = ko.computed(function() {
		var sum = 0;
		self.radioSeeds().forEach(function(seed) {
			sum += seed.strengthNum();
		});
		return sum;
	});
}

/**
 * add a seed from the input fields to the seedlist
 * pre: input field must be filled in
 */
RadioListModel.prototype.addSeed = function() {
	// ensure that input is given
	if(!this.artistInput()) {
		return;
	}
	
	$.getJSON(spotifyArtistGetUrl(this.artistInput()), function(data){
		if (data['artists']['items'].length == 0) {
			showErrorToast(this.artistInput());
			return;
		}
		var artistName = data['artists']['items'][0]['name'];
		var imgUrl = data['artists']['items'][0]['images'][0]['url'];
		var id = data['artists']['items'][0]['id'];
		this.radioSeeds.push(new RadioSeed(artistName, imgUrl, id));
		this.artistInput('');
	}.bind(this));
};

/**
 * remove a seed from the seed list
 * triggered from seed's delete button
 * @param seed The seed to remove
 */
RadioListModel.prototype.removeSeed = function(seed) {
	this.radioSeeds.remove(seed)
}.bind(model);

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
		if(seed.stale) {
			// fetch another playlist from echonest
			$.getJSON(echonestArtistPlaylistGetUrl(seed.artist(), 15))
				.done(getTracksCallback.bind(seed));
		}
		seed.stale = true;
	});
	playlist.sort(shuffleHelper);
	console.log('Here is the finished playlist');
	console.log(playlist);
};

RadioListModel.prototype.updateStrength = function(seed, event) {
	if (event.target.classList.contains('strength-level') ||
		event.target.classList.contains('strength-bar-pad')) {
		seed.strength(event.target.classList[1]);
	}
};

ko.applyBindings(model);
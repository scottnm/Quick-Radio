"use strict";

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
	var seedPromises = [];
	/**
	 * for each seed generate a promise that sends its sliced tracklist
	 * to the resolve
	 */
	this.radioSeeds().forEach(function(seed){
		var seedPromise = new Promise(function(resolve, reject){
			$.getJSON(echonestArtistPlaylistGetUrl(seed.artist(), 15), function(data) {
				this.tracks = data['response']['songs'];
				var ratio = this.strengthNum() / sumStrength;
				var numTracks = Math.ceil(this.tracks.length * ratio);
				console.log('tracks for %s', this.artist());
				logTracks(this.tracks);
				resolve(this.tracks.slice(0, numTracks));
			}.bind(seed));
		});
		seedPromises.push(seedPromise)
	});
	
	/**
	 * When all api calls have come back, concatenate all of the tracklists
	 * into a playlist
	 */
	Promise.all(seedPromises)
		.then(function(tracklists) {
			tracklists.forEach(function(tracklist) {
				playlist = playlist.concat(tracklist);
			});
			playlist.sort(shuffleHelper);
			console.log('Here is the finished playlist');
			logTracks(playlist);
		});
};

/**
 * updates radio seeds strength when the strengthbar is clicked
 * in the view.
 * @param seed the seed to update
 * @event the browser event that contains the target of the click
 */
RadioListModel.prototype.updateStrength = function(seed, event) {
	if (event.target.classList.contains('strength-level') ||
		event.target.classList.contains('strength-bar-pad')) {
		seed.strength(event.target.classList[1]);
	}
};

ko.applyBindings(model);
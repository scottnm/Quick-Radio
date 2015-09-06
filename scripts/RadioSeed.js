"use strict";

var mockTracks = function(name) {
	var tracks = [];
	while(name.length > 0) {
		tracks.push('track_'+name.slice(0,1));
		name = name.slice(1);
	}
	return tracks.slice(0, 10).sort(shuffleHelper);
};

// placeholder class until I'm retrieving real data from the api
function RadioSeed(artist, imgUrl) {
	this.artist = artist;
	this.imgUrl = imgUrl;
	this.tracks = mockTracks(artist);
	// non placeholder stuff, will be used after api
	this.strength = ko.observable('strength-1');
	this.strengthNum = ko.computed(function(){
		return Number(this.strength()[this.strength().length - 1]);
	}, this);
}
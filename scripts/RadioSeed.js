"use strict";

var mockTracks = function(name) {
	var tracks = [];
	while(name.length > 0) {
		tracks.push('track_'+name.slice(0,1));
		name = name.slice(1);
	}
	return tracks.slice(0, 10).sort(shuffleHelper);
};

function RadioSeed(artist, imgUrl, id) {
	this.artist = ko.observable(artist);
	this.id = id;
	this.imgUrl = ko.observable(imgUrl);
	this.tracks = mockTracks(artist);
	this.strength = ko.observable('strength-1');
	this.strengthNum = ko.computed(function(){
		return Number(this.strength()[this.strength().length - 1]);
	}, this);
}
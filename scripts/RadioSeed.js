"use strict";

var mockTracks = function(name) {
	var tracks = [];
	while(name.length > 0) {
		tracks.push('track_'+name.slice(0,1));
		name = name.slice(1);
	}
	return tracks.slice(0, 10).sort(shuffleHelper);
};

function RadioSeed(artist) {
	this.artist = ko.observable(artist);
	this.id = '';
	this.imgUrl = ko.observable('http://www.spirit-animals.com/wp-content/uploads/2013/08/Penguin-3-African-x.jpg');
	this.tracks = mockTracks(artist);
	this.strength = ko.observable('strength-1');
	this.strengthNum = ko.computed(function(){
		return Number(this.strength()[this.strength().length - 1]);
	}, this);
	
	$.getJSON(spotifyArtistGetUrl(artist), function(data){
		this.artist(data['artists']['items'][0]['name']);
		this.imgUrl(data['artists']['items'][0]['images'][0]['url']);
		this.id = data['artists']['items'][0]['id'];
	}.bind(this));
}
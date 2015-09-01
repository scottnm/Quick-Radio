var testDataObj = function(artist, album, imgUrl) {
	this.artist = artist;
	this.album = album;
	this.imgUrl = imgUrl;
}

var testData = [];
for(var i = 0; i < 10; i++) {
	testData.push(new testDataObj('artist_' + i, 'album_' + i,
		'http://www.spirit-animals.com/wp-content/uploads/2013/08/Penguin-3-African-x.jpg'));
}

var RadioListModel = function() {
	var self = this;
	self.radioSeeds = ko.observableArray(testData);	
};

var model = new RadioListModel();
ko.applyBindings(model);
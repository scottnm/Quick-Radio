"use strict";
// used to prevent caching asynchronous calls
$.ajaxSetup({ cache: false });

var config = {
    echonestKey: 'SIKZGGF4TKV8DL8TE',
};

/**
 *  Returns a seed to shuffle a list by sorting
 *  with the returned random seed
 */
function shuffleHelper() {
    return 0.5 - Math.random();
}

/**
 * Returns the appropriate url to search for an artist
 * given an artist name
 * @param artistName the name of the artist
 */
function spotifyArtistGetUrl(artistName) {
    return 'https://api.spotify.com/v1/search?q=' +
        artistName.replace(/[' ']/g, '%20') + '&type=artist';
}

/**
 * Returns the appropriate url to search for a tracklist
 * using an artist as the radio seed
 * @param artistName the name of the artist
 * @param numSongs the number of songs to fetch from the echonest api
 */
function echonestArtistPlaylistGetUrl(artistName, numSongs) {
    return 'https://developer.echonest.com/api/v4/playlist/static?api_key=' +
        config.echonestKey + '&artist=' + artistName +
        '&type=artist-radio&results=' + numSongs;
}

/**
 * Fades the error toast on the page in and out of view
 */
function showErrorToast(invalidName) {
    $('#error-toast').text(invalidName + ' returned no results')
        .fadeIn(500).delay(2000).fadeOut(500);
}

/**
 * Given a list of echonest track objects, prints them out
 */
function logTracks(tracklist) {
	var trackNum = 1;
	tracklist.forEach(function(entry){
		console.log('Track  #%d\t%s - %s', trackNum, entry.artist_name, entry.title);
		trackNum += 1;
	});
}
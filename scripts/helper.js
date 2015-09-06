"use strict";
$.ajaxSetup({ cache: false });

var config = {
    echonestKey: 'SIKZGGF4TKV8DL8TE',
};

function shuffleHelper() {
    return 0.5 - Math.random();
}

function spotifyArtistGetUrl(artistName) {
    return 'https://api.spotify.com/v1/search?q=' +
        artistName.replace(/[' ']/g, '%20') + '&type=artist';
}

function echonestArtistPlaylistGetUrl(artistName, numSongs) {
    return 'https://developer.echonest.com/api/v4/playlist/static?api_key=' +
        config.echonestKey + '&artist=' + artistName +
        '&type=artist-radio&results=' + numSongs;
}

function showErrorToast(invalidName) {
    $('#error-toast').text(invalidName + ' returned no results')
        .fadeIn(500).delay(2000).fadeOut(500);
};
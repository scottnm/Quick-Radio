"use strict";

var apiData = {
    spotifyKey: '',
    echonestKey: 'SIKZGGF4TKV8DL8TE'
};

function shuffleHelper() {
    return 0.5 - Math.random();
}

function spotifyArtistGetUrl(artistName) {
    return 'https://api.spotify.com/v1/search?q=' +
        artistName.replace(/[' ']/g, '%20') + '&type=artist';
}

function showErrorToast(invalidName) {
    $('#error-toast').text(invalidName + ' returned no results')
        .fadeIn(500).delay(2000).fadeOut(500);
};
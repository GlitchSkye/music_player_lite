
let currentTime = new Date().getHours(); // Get the current hour (0-23)

if (currentTime >= 6 && currentTime < 12) {
    document.getElementById("greeting").innerHTML = "Good Morning";
} else if (currentTime >= 12 && currentTime < 19) {
    document.getElementById("greeting").innerHTML = "Good Afternoon";
} else {
    document.getElementById("greeting").innerHTML = "Good Evening";
}

let name = "Skye"
document.getElementById("userName").innerHTML = name;

async function fetchToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    console.log(data.access_token);
    return data.access_token;
}

async function getPlaylist() {
    //let playlistId = "3cEYpjA9oz9GiPac4AsH4n";
    let playlistId ="7iMWeh1LTjZ6cO7iTa5ach"
    console.log("hello playlist")
    let accessToken = await fetchToken(); // ✅ Await the returned token

    if (!accessToken) {
        console.error("No access token available!");
        return;
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching playlist:", error);
    }
}

function playTrack() {
    console.log("hello");
    getPlaylist();
}

// ✅ FIX: Ensure button listener runs after DOM loads
window.onload = () => {
    document.getElementById("playButton").addEventListener("click", playTrack);
};

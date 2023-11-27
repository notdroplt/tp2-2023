function startGame() {
    removeLoginScreen()
    fetchPlayerInfo(playerinfo.tag, {
        playerid: playerinfo.id,
        sessionid: playerinfo.session
    })
}

function removeLoginScreen() {
    document.querySelector("div#signin").remove()
    for( var i = document.game.scene.children.length - 1; i >= 0; i--) { 
        obj = document.game.scene.children[i];
        document.game.scene.remove(obj); 
   }
}

async function fetchPlayerInfo(playerName, requestBody) {
    try {
        const response = await fetch(`/api/player/${playerName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayPlayerInfo(data);
    } catch (error) {
        console.error('Error fetching player information:', error);
    }
}

// Function to display player information in the UI
function displayPlayerInfo(playerInfo) {
    const playernameEl = document.querySelector('div>div>input#nameinfo')
    const playerposEl = document.querySelector('div>div>input#posinfo')
    const playertravelEl = document.querySelector('div>div>input#travelinfo')
    console.log(playerInfo)
    playernameEl.value = playerInfo.playertag
    playerposEl.value = formatCoordinates(playerInfo.position)
    playertravelEl.value = playerInfo.travel ? formatCoordinates(playerInfo.travel) : "Lugar Nenhum"
}

// Function to format coordinates for display
function formatCoordinates(coordinates) {
    let coordinate = '/universo/'
    console.log(coordinates)
    if (coordinates.galaxy != null) coordinate += `${coordinates.galaxy}/`
    if (coordinates.system != null) coordinate += `${coordinates.system}/`
    if (coordinates.planet !=null) coordinate += `${coordinates.planet}`

    return coordinate + ` (r: ${coordinates.real}, i: ${coordinates.imag}, p: ${coordinates.perp})`
}
let playerinfo = {
    tag: localStorage.getItem("playertag"),
    id: localStorage.getItem("playerid"),
    session: null
}

errors = [
 USERNAME_LENGTH ,
 USERNAME_DOES_NOT_EXIST ,
 USERNAME_PASSWORD_MISMATCH ,
 USERNAME_ALREADY_TAKEN ,
 USERID_DOES_NOT_EXIST ,
 UNDEFINED_USERID ,
 INVALID_SESSION ,
]

/**
 * authenticate player
 * @param {'login' | 'signin'} action action (either 'signin' or 'login')
 */
function authenticate(action) {
    const playertag = document.querySelector("input#playertag")
    const password = document.querySelector("input#playerpassword")
    const authresp = document.querySelector("p#authresponse")

    if (action == "signup")
        fetch(`/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            cache: "default",
            body: JSON.stringify({
                player: playertag.value,
                password: password.value // lol
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.ok == false) {
                    authresp.innerHTML = errors[json.error]
                    return
                }
                localStorage.setItem("playertag", json.playertag)
                localStorage.setItem("playerid", json.playerid)
            })
    else 
        fetch(`/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: "default",
            body: JSON.stringify({
                playertag: playerinfo.tag,
                playerid: playerinfo.id,
            })
        })
        .then(res => res.json())
        .then(json => {
            if (!json.ok) {
                authresp.innerHTML = json.error
                return
            }

            playerinfo.session = json.session

            startGame()
        })
}



window.onload = () => {
    if (playerinfo.tag === null && playerinfo.id === null) return

    fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: "default",
        body: JSON.stringify({
            playertag: playerinfo.tag,
            playerid: playerinfo.id
        })
    })
}
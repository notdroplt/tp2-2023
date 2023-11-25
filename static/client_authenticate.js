/**
 * authenticate player
 * @param {'login' | 'signin'} action action (either 'signin' or 'login')
 */
function authenticate(action) {
    const playertag = document.querySelector("input#playertag")
    const password = document.querySelector("input#playerpassword")
    const authresp = document.querySelector("p#authresponse")

    if (action == "signup")
        fetch(`/api/playerauth/signup`, {
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
            console.log(json)
            if (json.ok == false) {
                authresp.innerHTML = json.error
            }
            localStorage.setItem("playertag", json.playertag)
            localStorage.setItem("playerid", json.playerid)
        })
}

let playerinfo = {
    tag: localStorage.getItem("playertag"),
    id: localStorage.getItem("playerid")
}

window.onload = () => {
    if (playerinfo.tag === null && playerinfo.id === null) return

    
}
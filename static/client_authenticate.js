/**
 * authenticate user
 * @param {'login' | 'signin'} action action (either 'signin' or 'login')
 */
function authenticate(action) {
    const username = document.querySelector("input#username")
    const password = document.querySelector("input#userpassword")
    const authresp = document.querySelector("p#authresponse")

    if (action == "signin")
        fetch(`/api/userauth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            cache: "default",
            body: JSON.stringify({
                user: username.value,
                password: password.value // lol
            })
        })
        .then(res => res.json())
        .then(json => {
            if (json.ok == false) {
                authresp.innerHTML = json.error
            }
        })
}
window.signupenabled = true;
window.backend = "https://d123c039-879a-4429-8e8c-26dfb7cb8073-00-2elnkgit1zcaz.kirk.replit.dev"
document.getElementById("loginbutton").onclick = () => {
    if (!window.signupenabled) {
        return;
    }
    window.signupenabled = false;
    const username = document.getElementById("namebox").value;
    const password = document.getElementById("passbox").value;

    if (username == "") {
        window.alert("You need to enter a username");
        window.signupenabled = true;
        return;
    }
    if (password == "") {
        window.alert("You need a password!");
        window.signupenabled = true;
        return;
    }

    fetch(
        window.backend +
        `/signup?username=${username}&password=${password}`, {method: "GET"}
    ).then(response => response.json())
        .then(data => {;
            if (!data.success) {
                window.alert(data.error);
                document.getElementById("namebox").value = "";
                document.getElementById("passbox").value = "";
            } else {
                window.alert("Account created")
                fetch(
                    window.backend+
                    `/login?username=${username}&password=${password}`, {method: "GET"}
                ).then(response => response.json())
                .then(data => {
                    if (!data.success) {
                        window.alert("Massive server error, please try again");
                        return;
                    }
                    document.cookie = "username=" + username;
                    document.cookie = "sessionid=" + data.sessionid;
                    window.location.replace("/hooray");
                    return;
                });
            }
            window.signupenabled = true;
        });
}

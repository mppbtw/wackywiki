window.backend = "https://d123c039-879a-4429-8e8c-26dfb7cb8073-00-2elnkgit1zcaz.kirk.replit.dev"
document.getElementById("loginbutton").onclick = () => {
    const username = document.getElementById("namebox").value;
    const password = document.getElementById("passbox").value;
    fetch(
        window.backend +
        `/login?username=${username}&password=${password}`, {method: "GET"}
    ).then(response => response.json())
        .then(data => {;
            console.log(data);
            if (!data.success) {
                window.alert(data.error);
                return;
            }
        });
}

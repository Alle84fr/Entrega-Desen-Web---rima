const url = "https://go-wash-api.onrender.com/api/login";


async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    
    try {
        // Makes a POST request to the API with the email and password 
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password,
                "user_type_id": 1
            }),
            headers: {
                'Content-Type':'application/json'
            }
        });

        if (api.ok) {
            // If the request is successful, get the response and log it to the console 
            let resposta = await api.json();
            console.log('Login bem-sucedido!');
            console.log('Token de Acesso:', resposta.access_token);
            console.log('Usu rio:', resposta.user);

            /* Save the access token to local storage */
            localStorage.setItem('accessToken', resposta.access_token);

            /* Redirect to the homepage */
            window.location.href = "../HTML/listaEndereco.html";
            return;
        let respostaErro = await api.json();
        /* If there are errors in the response, log them to the console */
        if (respostaErro?.data) {
        alert(respostaErro.data.errors);
        }
    } 
} catch (error) {
        /* If there is an error making the request, log it to the console */
        console.error("Erro na requisi o:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
}
   

function logOut() {
    localStorage.removeItem("accessToken");
    window.localStorage.href="../HTML/Login.html"
}

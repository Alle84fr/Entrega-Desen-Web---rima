const url = "https://go-wash-api.onrender.com/api/login";

async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    
    if (email === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (password.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres.");
        return;
    }

    try {
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
            let resposta = await api.json();
            console.log('Login bem-sucedido!');
            console.log('Token de Acesso:', resposta.access_token);
            console.log('Usuário:', resposta.user);

            localStorage.setItem('accessToken', resposta.access_token);

            window.location.href = "Main.html";
            return;
        }

        let respostaErro = await api.json();

        if (respostaErro?.data?.errors === "Usuário não está ativo") {
            alert("Erro: Usuário não está ativo.");
        } else if (respostaErro?.data?.errors === "Usuário não foi encontrado") {
            alert("Erro: Usuário não foi encontrado.");
        } else {
            alert("Erro desconhecido. Tente novamente.");
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
}

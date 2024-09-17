const url = "https://go-wash-api.onrender.com/api/user";

async function cadastro() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let birthday = document.getElementById('birthday').value;
    let cpf = document.getElementById('cpf').value;
    let termos = document.getElementById('terms');

    
    if (!termos.checked) {
        alert("Você deve aceitar os termos e condições para continuar.");
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
                "name": name,
                "email": email,
                "user_type_id": 1,
                "password": password,
                "birthday": birthday,
                "terms": 1,
                "cpf_cnpj": cpf
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            console.log(resposta);
            window.location.href = "Main.html";
            return;
        }

        let respostaErro = await api.json();
        alert(respostaErro.data.errors.cpf_cnpj);
        alert(respostaErro.data.errors.email);

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
}

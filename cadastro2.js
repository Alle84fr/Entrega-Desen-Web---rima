const url = "https://go-wash-api.onrender.com/api/user";

function isValidAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 0 && age <= 120;
}

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

    
    if (email.includes('@') === false) {
        alert("O email digitado não é válido. Tente outro!");
        return;
    }

    if (!isValidAge(birthday)) {
        alert("A idade fornecida não é válida. Verifique a data de nascimento.");
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
            alert("Cadastro realizado com sucesso!");
            window.location.href = "Main.html";   
            return;
        }

        let respostaErro = await api.json();
        

        if (respostaErro.data.errors) {
            if (respostaErro.data.errors.name) {
                alert("Erro no nome: " + respostaErro.data.errors.name);
            }
            if (respostaErro.data.errors.birthday) {
                alert("Erro na data de nascimento: " + respostaErro.data.errors.birthday);
            }
            if (respostaErro.data.errors.cpf_cnpj) {
                alert("Erro no CPF/CNPJ: " + respostaErro.data.errors.cpf_cnpj);
            }
            if (respostaErro.data.errors.email) {
                alert("Erro no email: " + respostaErro.data.errors.email);
            }
            if (respostaErro.data.password) {
                alert("Erro na senha: " + respostaErro.data.password);
            }
        } else {
            alert("Erro desconhecido. Tente novamente mais tarde.");
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
}

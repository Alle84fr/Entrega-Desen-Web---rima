const url = "https://go-wash-api.onrender.com/api/auth/address";
async function cadastrarEndereco() {
    let title = document.getElementById('title').value;
    let cep = document.getElementById('cep').value;
    let address = document.getElementById('address').value;
    let number = document.getElementById('number').value;
    let complement = document.getElementById('complement').value;
    if (title === "" || cep === "" || address === "" || number === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        alert("Erro: Usuário não autenticado. Faça o login novamente.");
        window.location.href = "Login.html";
        return;
    }
    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": address,
                "number": number,
                "complement": complement
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (api.ok) {
            let resposta = await api.json();
            console.log('Endereço cadastrado com sucesso!', resposta);
            window.location.href = "listaEndereco.html";
            return;
        }
        let respostaErro = await api.json();
        alert("Erro ao cadastrar endereço: " + (respostaErro?.data?.errors || "Erro desconhecido"));
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
}

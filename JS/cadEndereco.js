

async function cadastrarEndereco() {

    console.log("Função cadastro");

    const titleElement = document.getElementById('title');
    const cepElement = document.getElementById('cep');
    const addressElement = document.getElementById('address');
    const numberElement = document.getElementById('number');
    const complementElement = document.getElementById('complement');

    if (!titleElement || !cepElement || !addressElement || !numberElement) {
        console.error("Erro: Campos do formulário não encontrados");
        return;
    }

    const title = titleElement.value;
    const cep = cepElement.value;
    const address = addressElement.value;
    const number = numberElement.value;
    const complement = complementElement.value;

    if (!title || !cep || !address || !number ) {
        alert("Preencher todos os campos!");
        return;
    }

    const url = "https://go-wash-api.onrender.com/api/login";
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        alert("Erro: Usuário não autenticado. Faça o login novamente.");
        window.location.href = "poslogin.html";
        return;
    }

    try {
        const api = await fetch(url, {
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
        const resposta = await api.json();
        console.log('Endereço cadastrado com sucesso!', resposta);
        const endereco = {title, cep, address, number, complement};
        localStorage.setItem('endereco', JSON.stringify(endereco));
        alert("Endereço cadastrado com sucesso!");
        window.location.href = "../HTML/home.html";

        } else {
            const respostaErro = await api.json();
            if (respostaErro?.data?.errors) {
                alert("Erro ao cadastrar endereço: " + respostaErro.data.errors);
            } else {
                console.error("Erro na API:", respostaErro);
                alert("Ocorreu um erro. Tente novamente mais tarde.");
            }
        } 
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro, tente novamente mais tarde.");
    }
}
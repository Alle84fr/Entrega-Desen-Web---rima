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

    
    const title = titleElement.value.trim();
    const cep = cepElement.value.trim();
    const address = addressElement.value.trim();
    const number = numberElement.value.trim();
    const complement = complementElement ? complementElement.value.trim() : '';

    
    if (!title || !cep || !address || !number) {
        alert("Preencher todos os campos obrigatórios!");
        return;
    }

    
    const url = "https://go-wash-api.onrender.com/api/auth/address";
    const accessToken = localStorage.getItem('accessToken');


    if (!accessToken) {
        alert("Erro: Usuário não autenticado. Faça o login novamente.");
        window.location.href = "poslogin.html";
        return;
    }

    try {
        
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                title,
                cep,
                address,
                number,
                complement
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        
        if (response.ok) {
            const data = await response.json();
            console.log('Endereço cadastrado com sucesso!', data);

            
            const endereco = { title, cep, address, number, complement };
            localStorage.setItem('endereco', JSON.stringify(endereco));

            alert("Endereço cadastrado com sucesso!");
            window.location.href = "../HTML/home.html";

        } else {
            const respostaErro = await response.json();
            if (respostaErro?.data?.errors) {
                alert("Erro ao cadastrar endereço: " + respostaErro.data.errors.join(', '));
            } else {
                console.error("Erro na API:", respostaErro);
                alert("Ocorreu um erro ao cadastrar o endereço. Tente novamente mais tarde.");
            }
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro de conexão. Verifique sua rede e tente novamente.");
    }
}

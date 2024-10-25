async function listarEndereco() {
    let accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        alert("Erro: Usuário não autenticado. Faça o login novamente.");
        window.location.href = "Login.html";
        return;
    }

    try {
        const response = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}` // O mesmo token usado no curl
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar os endereços");
        }

        const data = await response.json();
        console.log(data);  // Verifica a resposta da API para confirmar o formato
        preencherTabela(data); // Se a resposta for um array diretamente
    } catch (error) {
        console.error("Erro ao buscar os endereços:", error);
    }
}

function preencherTabela(enderecos) {
    // Aqui acessamos o tbody da tabela corretamente
    const tabelaBody = document.querySelector("#tabela-enderecos tbody");

    tabelaBody.innerHTML = ""; // Limpa o conteúdo anterior da tabela

    // Verifica se a API retornou um array válido
    if (!Array.isArray(enderecos)) {
        console.error("Formato inesperado da resposta. Esperava-se um array.");
        return;
    }

    // Itera pelos endereços retornados e preenche a tabela
    enderecos.forEach(endereco => {
        const row = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.textContent = endereco.title;

        const cepCell = document.createElement("td");
        cepCell.textContent = endereco.cep;

        const addressCell = document.createElement("td");
        addressCell.textContent = endereco.address;

        const numberCell = document.createElement("td");
        numberCell.textContent = endereco.number;

        const complementCell = document.createElement("td");
        complementCell.textContent = endereco.complement;

        // Adiciona as células na linha
        row.appendChild(titleCell);
        row.appendChild(cepCell);
        row.appendChild(addressCell);
        row.appendChild(numberCell);
        row.appendChild(complementCell);

        // Adiciona a linha na tabela dentro do tbody
        tabelaBody.appendChild(row);
    });
}

// Chama a função para listar os endereços
listarEndereco();

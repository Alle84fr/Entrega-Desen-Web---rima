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
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar os endereços");
        }

        const data = await response.json();
        preencherTabela(data);
    } catch (error) {
        console.error("Erro ao buscar os endereços:", error);
    }
}

function preencherTabela(enderecos) {
    const tabela = document.querySelector("#tabela-enderecos"); // Certifique-se de que a tabela tem esse ID

    tabela.innerHTML = ""; // Limpa a tabela antes de preencher

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

        // Adiciona todas as células à linha
        row.appendChild(titleCell);
        row.appendChild(cepCell);
        row.appendChild(addressCell);
        row.appendChild(numberCell);
        row.appendChild(complementCell);

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    });
}

// Chama a função para listar os endereços
listarEndereco();

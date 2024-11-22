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
        console.log(data);
        preencherTabela(data.data);
    } catch (error) {
        console.error("Erro ao buscar os endereços:", error);
    }
}

function preencherTabela(enderecos) {
    
    const tabelaBody = document.querySelector("#tabela-enderecos tbody");

    tabelaBody.innerHTML = "";

    if (!Array.isArray(enderecos)) {
        console.error("Formato inesperado da resposta. Esperava-se um array.");
        return;
    }

    
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

        
        const actionsCell = document.createElement("td");


        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => { 
            const enderecoEditar = endereco;
            localStorage.setItem("editarEndereco", JSON.stringify(endereco));
            window.location.href = "../HTML/updateEnde.html";
        editButton.classList.add("salv");
 
        }
    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Deletar";
        deleteButton.onclick = () => deletarEndereco(endereco.id);
        deleteButton.classList.add("delt");
        
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        
        row.appendChild(titleCell);
        row.appendChild(cepCell);
        row.appendChild(addressCell);
        row.appendChild(numberCell);
        row.appendChild(complementCell);
        row.appendChild(actionsCell);

        tabelaBody.appendChild(row);
    });
}

async function deletarEndereco(id) {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        alert("Erro: Usuário não autenticado. Faça o login novamente.");
        window.location.href = "Login.html";
        return;
    }

    try {
        const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar o endereço");
        }

        alert("Endereço deletado com sucesso!");
        listarEndereco();
    } catch (error) {
        console.error("Erro ao deletar o endereço:", error);
    }
}

async function editarEndereco(endereco) {
    localStorage.setItem('editarEndereco', JSON.stringify(endereco));
    window.location.href="../HTML/updateEnde.html"    
}

listarEndereco();


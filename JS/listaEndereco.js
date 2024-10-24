
async function listarEndereco() {

    try{

    const responde = await 
    fetch("https://go-wash-api.onrender.com/api/auth/address")
    method:"GET",
    headers: {
        "Authorization"; " Bearer $acessToken' 

    }
})
    const resposta = await api.json()
    
   preencherTabela(data);
} catch (error) {
    console.error("Erro ao buscar os endereços:", error);
}
}
  function preencherTabela(endereco)
  {
    const tabela= document.querySelector();

    tabela.innerHTML = "";

    enderecos.forEach(endereco => {
        const row = document.createElement("tr");

        const ruaCell = document.createElement("td");
        ruaCell.textContent = endereco.rua;

        const cidadeCell = document.createElement("td");
        cidadeCell.textContent = endereco.cidade;

        const cidadeCell = document.createElement("td");
        cidadeCell.textContent = endereco.cidade;

        row.appendChild(ruaCell);
        row.appendChild(cidadeCell);
        row.appendChild(estadoCell);

        tabela.appendChild(row);
    });
}

fetchEndereco();

  

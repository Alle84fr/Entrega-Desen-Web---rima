/*************  ✨ Codeium Command ⭐  *************/
/**
 * Loads the address data for editing when the page is loaded.
 * Retrieves the address information from local storage and populates the
 * form fields with the corresponding data (title, cep, address, number, complement).
 * This allows the user to view and edit the existing address details.
 */
/******  5ccb0ce9-14b8-4d8d-bd68-7a436c80815f  *******/// Função para carregar os dados do endereço no formulário
window.onload = function() {
    const enderecoEditar = JSON.parse(localStorage.getItem("editarEndereco"));
    
    if (enderecoEditar) {
        const titleInput = document.getElementById('title');
        const cepInput = document.getElementById('cep');
        const addressInput = document.getElementById('address');
        const numberInput = document.getElementById('number');
        const complementInput = document.getElementById('complement');

        titleInput.value = enderecoEditar.title;
        cepInput.value = enderecoEditar.cep;
        addressInput.value = enderecoEditar.address;
        numberInput.value = enderecoEditar.number;
        complementInput.value = enderecoEditar.complement;
    }
}

// Função para salvar as alterações
function salvarEndereco() {
    const titleInput = document.getElementById('title').value;
    const cepInput = document.getElementById('cep').value;
    const addressInput = document.getElementById('address').value;
    const numberInput = document.getElementById('number').value;
    const complementInput = document.getElementById('complement').value;

    const enderecoAtualizado = {
        title: titleInput,
        cep: cepInput,
        address: addressInput,
        number: numberInput,
        complement: complementInput
    };

    // Aqui você deve atualizar a lista de endereços no localStorage
    const enderecosJSON = localStorage.getItem('enderecos');
    const enderecos = enderecosJSON ? JSON.parse(enderecosJSON) : [];

    // Substituir o endereço editado na lista
    const index = enderecos.findIndex(end => end.cep === enderecoAtualizado.cep); // Supondo que o CEP é único
    if (index !== -1) {
        enderecos[index] = enderecoAtualizado;
    } else {
        enderecos.push(enderecoAtualizado); // Caso não encontre, adiciona como novo
    }

    localStorage.setItem('enderecos', JSON.stringify(enderecos));
    window.location.href = "listaEndereco.html"; // Redireciona para a página de lista de endereços
}
window.onload = function() {
    const enderecoEditar = JSON.parse(localStorage.getItem("editarEndereco"));
    const titleInput = document.getElementById('title');
    const cepInput = document.getElementById('cep');
    const addressInput = document.getElementById('address');
    const numberInput = document.getElementById('number');
    const complementInput = document.getElementById('complement');
    titleInput.value = enderecoEditar.title;
    cepInput.value = enderecoEditar.cep;
    addressInput.value = enderecoEditar.address;
    numberInput.value = enderecoEditar.number;
    complementInput.value = enderecoEditar.complement;
}
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
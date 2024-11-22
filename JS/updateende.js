window.onload = function() {
    const enderecoEditar = JSON.parse(localStorage.getItem("editarEndereco"));
    
    if (enderecoEditar) {
        let titleInput = document.getElementById('title');
        let cepInput = document.getElementById('cep');
        let addressInput = document.getElementById('address');
        let numberInput = document.getElementById('number');
        let complementInput = document.getElementById('complement');

        titleInput.value = enderecoEditar.title;
        cepInput.value = enderecoEditar.cep;
        addressInput.value = enderecoEditar.address;
        numberInput.value = enderecoEditar.number;
        complementInput.value = enderecoEditar.complement;
    }
}

function salvarEndereco() {
    let titleInput = document.getElementById('title').value;
    let cepInput = document.getElementById('cep').value;
    let addressInput = document.getElementById('address').value;
    let numberInput = document.getElementById('number').value;
    let complementInput = document.getElementById('complement').value;

    let enderecoAtualizado = {
        title: titleInput,
        cep: cepInput,
        address: addressInput,
        number: numberInput,
        complement: complementInput
    };


    const enderecosJSON = localStorage.getItem('enderecos');
    const enderecos = enderecosJSON ? JSON.parse(enderecosJSON) : [];

    const index = enderecos.findIndex(end => end.cep === enderecoAtualizado.cep); 
    if (index !== -1) {
        enderecos[index] = enderecoAtualizado;
    } else {
        enderecos.push(enderecoAtualizado); 
    }

    localStorage.setItem('enderecos', JSON.stringify(enderecos));
    window.location.href = "listaEndereco.html"; 
}
window.onload = function() {
    let enderecoEditar = JSON.parse(localStorage.getItem("editarEndereco"));
    let titleInput = document.getElementById('title');
    let cepInput = document.getElementById('cep');
    let addressInput = document.getElementById('address');
    let numberInput = document.getElementById('number');
    let complementInput = document.getElementById('complement');
    titleInput.value = enderecoEditar.title;
    cepInput.value = enderecoEditar.cep;
    addressInput.value = enderecoEditar.address;
    numberInput.value = enderecoEditar.number;
    complementInput.value = enderecoEditar.complement;
}
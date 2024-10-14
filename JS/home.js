const endereco = JSON.parse(localStorage.getItem('endereco'));

if (endereco) {
    document.getElementById('endereco').innerHTML = `
        <p>Tipo de Local: ${endereco.title}</p>
        <p>CEP: ${endereco.cep}</p>
        <p>Endereço: ${endereco.address}</p>
        <p>Número: ${endereco.number}</p>
        <p>Complemento: ${endereco.complement}</p>
        <br>
`;
} else {
    document.getElementById('endereco').innerText = "Nenhum endereço cadastrado.";
}
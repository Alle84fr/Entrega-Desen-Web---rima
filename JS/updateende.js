window.onload = function () {
    const enderecoEditar = JSON.parse(localStorage.getItem("editarEndereco"));

    if (enderecoEditar) {
        document.getElementById('title').value = enderecoEditar.title || '';
        document.getElementById('cep').value = enderecoEditar.cep || '';
        document.getElementById('address').value = enderecoEditar.address || '';
        document.getElementById('number').value = enderecoEditar.number || '';
        document.getElementById('complement').value = enderecoEditar.complement || '';
    }
};

async function atualizar() {
    const enderecoEditar = JSON.parse(localStorage.getItem("editarEndereco"));

    if (!enderecoEditar || !enderecoEditar.id) {
        alert("Erro: ID do endereço não encontrado.");
        return;
    }

    const id = enderecoEditar.id;
    const accessToken = localStorage.getItem('accessToken');

    // Campos do formulário
    const titulo = document.getElementById('title').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('address').value;
    const numero = document.getElementById('number').value;
    const complemento = document.getElementById('complement').value;

    try {
        const api = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                title: titulo,
                cep: cep,
                address: endereco,
                number: numero,
                complement: complemento
            }),
        });

        if (!api.ok) {
            throw new Error(`Erro na API: ${api.status} - ${api.statusText}`);
        }

        alert("Cadastro modificado com sucesso!");
        window.location.href = "../HTML/listaEndereco.html";
    } catch (error) {
        console.error("Erro ao atualizar o endereço:", error);
        alert("Não foi possível atualizar o endereço. Detalhes: " + error.message);
    }
}

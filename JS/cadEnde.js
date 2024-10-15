const url: 'https://go-wash-api.onrender.com/api/auth/addreess'

async function cadEndereco(){

    const lista = {
        title: document.getElementById("title").value,
        cep: document.getElementById("cep").value,
        address: document.getElementById("address").value,
        number: document.getElementById("number").value,
        complement: document.getElementById("complement").value
    }

    if(!lista.title || !lista.cep || !lista.address || !lista.number ) {
        console.error("Campo do formulário vazio");
        alert("Preencher todos os campos");
        return;
    }

    if(!/^\d{8}$/.test(lista.cep)){
        alert("CEP deve ter 8 digitios");
        return;
    }

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify(lista),
            headers: {
                "Content-Type":"application/json"
            }    
        });

        if (!accessToken) {
            alert("Erro: Usuário não autenticado. Faça o login novamente.");
            window.location.href = "poslogin.html";
            return;
        }

        if(!api.ok) {
            let respostaErro = await api.json();
            console.log(respostaErro);
            alert(respostaErro.mensage || "Erro ao cadastrar endereço")
            localStorage.setItem("endereco", JSON.stringify(lista));  
            return;

        } 
            
        let resposta = await api.json();
            console.log(resposta)
            alert("Endereço cadastrado com sucesso");
            window.location.href = "../HTML/home.html";

    } catch (error) {
        console.error("Erro ao cadastrar endereço", error);
        alert("Erro ao cadastrar endereço");
        localStorage.setItem("endereco", JSON.stringify(lista))
    }
}

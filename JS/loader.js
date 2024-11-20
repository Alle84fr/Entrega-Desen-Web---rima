setTimeout (function () {

    try {
        document.getElementById("button").addEventListener("click", function() {
            document.getElementById("cs-loader").classList.add("ativo");
        
            if (window.location.href !== document.referrer){
                return;
            } 

            
        });
    }catch(error) {
        console.error("Erro: ", error)
    }
}, 1000);
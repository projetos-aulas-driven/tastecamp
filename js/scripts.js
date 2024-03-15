let receitas = [];

function renderizarReceitas() {
    const ul = document.querySelector(".receitas");
    ul.innerHTML = "";

    for (let i = 0; i < receitas.length; i++) {
        ul.innerHTML += `
            <li>
                <ion-icon name="fast-food-outline"></ion-icon>
                ${receitas[i].titulo}
            </li>
        `;
    }
}

function buscarReceitas() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v2/tastecamp/receitas");
    promessa.then(processarListaRecebida);
    promessa.catch(mostrarErro);
}

function processarListaRecebida(resposta) {
    receitas = resposta.data;
    renderizarReceitas();
}

function adicionarReceita() {
    const campoTitulo = document.querySelector(".nome-receita");
    const campoIngredientes = document.querySelector(".ingredientes-receita");
    const campoPreparo = document.querySelector(".modo-preparo-receita");

    const novaReceita = {
        titulo: campoTitulo.value,
        ingredientes: campoIngredientes.value,
        preparo: campoPreparo.value
    }

    const promessa = axios.post("https://mock-api.driven.com.br/api/v2/tastecamp/receitas", novaReceita);
    promessa.then(receberResposta);
    promessa.catch(mostrarErro);
}

function receberResposta(resposta) {
    console.log(resposta);

    alert(`A receita ${resposta.data.titulo} foi adicionada com sucesso!`);

    document.querySelector(".nome-receita").value = "";
    document.querySelector(".ingredientes-receita").value = "";
    document.querySelector(".modo-preparo-receita").value = "";

    buscarReceitas();
}

function mostrarErro(erro) {
    switch(erro.response.status) {
        case 422:
            alert("Verifique se você preencheu todos os campos da receita!");
            break;
        case 409:
            alert("Uma receita com esse título já existe! Escolha outro nome.");
            break;
        default:
            alert("Ocorreu um erro desconhecido, tente novamente mais tarde!");
            break;
    }
}

// Funções que são executadas ao abrir o site
buscarReceitas();
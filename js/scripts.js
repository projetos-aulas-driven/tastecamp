const receitas = [
    { titulo: "Lasanha", ingredientes: "Massa, molho, recheio", preparo: "Coloque camadas em uam forma e asse por 30 minutos" },
    { titulo: "Strogonoff", ingredientes: "Carne, creme de leite, mostarda", preparo: "Refogue tudo em uma panela" },
    { titulo: "Pão", ingredientes: "Farinha, ovos, fermento", preparo: "Misture tudo, deixe descansar e asse" }
];

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

renderizarReceitas();

function adicionarReceita() {
    // Pegar os inputs e os textareas => texto, value
    const campoTitulo = document.querySelector(".nome-receita");
    const campoIngredientes = document.querySelector(".ingredientes-receita");
    const campoPreparo = document.querySelector(".modo-preparo-receita");

    // Organizar os valores em um objeto
    const novaReceita = {
        titulo: campoTitulo.value,
        ingredientes: campoIngredientes.value,
        preparo: campoPreparo.value
    }

    // 1 - Enviar a receita para o servidor
    const promessa = axios.post("https://mock-api.driven.com.br/api/v2/tastecamp/receitas", novaReceita);

    // 2 - Receber a resposta e ver como ela é
    promessa.then(receberResposta);

    // 4 - Executar uma função caso dê erro
    promessa.catch(mostrarErro);

    // Renderizar isso na tela
    renderizarReceitas();
}

// 3 - Processar essa resposta
function receberResposta(resposta) {
    console.log(resposta);

    alert(`A receita ${resposta.data.titulo} foi adicionada com sucesso!`);

    document.querySelector(".nome-receita").value = "";
    document.querySelector(".ingredientes-receita").value = "";
    document.querySelector(".modo-preparo-receita").value = "";
}

function mostrarErro() {
    alert("Ocorreu um erro, tente novamente mais tarde!");
}
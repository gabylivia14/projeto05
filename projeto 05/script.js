
// ARRAY DE OBJETOS: banco de perguntas do quiz
const perguntas = [

    {
        pergunta: "O que significa HTML?",
        alternativas: [
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Main Language",
            "HighText Machine Language"
        ],
        correta: 0
    },

    {
        pergunta: "Qual linguagem é responsável pela estilização de uma página?",
        alternativas: [
            "JavaScript",
            "Python",
            "CSS",
            "Java"
        ],
        correta: 2
    },

    {
        pergunta: "Qual comando mostra uma mensagem no JavaScript?",
        alternativas: [
            "print()",
            "alert()",
            "console.read()",
            "message()"
        ],
        correta: 1
    },

    {
        pergunta: "Qual símbolo é utilizado para selecionar um ID no CSS?",
        alternativas: [
            ".",
            "*",
            "#",
            "@"
        ],
        correta: 2
    },

    {
        pergunta: "Qual comando permite buscar um elemento pelo ID?",
        alternativas: [
            "document.getElementById()",
            "document.createElement()",
            "console.log()",
            "Math.random()"
        ],
        correta: 0
    }

];


// VARIÁVEIS DE CONTROLE

// Guarda a posição da pergunta atual
let perguntaAtual = 0;

// Guarda a quantidade de respostas corretas
let pontos = 0;

// Verifica se o usuário já respondeu
let respondeu = false;


// CAPTURANDO ELEMENTOS DO HTML

const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");

const elementoNumero = document.getElementById("numeroPergunta");
const elementoPontuacao = document.getElementById("pontuacao");

const elementoFeedback = document.getElementById("feedback");
const elementoProgresso = document.getElementById("progresso");

const botaoProximo = document.getElementById("proximo");

const areaQuiz = document.getElementById("areaQuiz");
const areaResultado = document.getElementById("resultado");

const mensagemFinal = document.getElementById("mensagemFinal");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");

const botaoReiniciar = document.getElementById("reiniciar");


// FUNÇÃO PARA MOSTRAR UMA PERGUNTA

function mostrarPergunta() {

    // Busca a pergunta atual dentro do array
    const pergunta = perguntas[perguntaAtual];

    // Atualiza o texto da pergunta
    elementoPergunta.innerText = pergunta.pergunta;

    // Atualiza o número da pergunta
    elementoNumero.innerText =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    // Atualiza a pontuação
    elementoPontuacao.innerText = `Pontos: ${pontos}`;

    // Calcula o progresso
    const porcentagem =
        ((perguntaAtual + 1) / perguntas.length) * 100;

    elementoProgresso.style.width = porcentagem + "%";

    // Limpa as alternativas anteriores
    elementoAlternativas.innerHTML = "";

    // Limpa o feedback
    elementoFeedback.innerText = "";

    // Bloqueia o botão até responder
    botaoProximo.disabled = true;

    // Prepara o sistema para uma nova resposta
    respondeu = false;


    // PERCORRE AS ALTERNATIVAS

    pergunta.alternativas.forEach(function(alternativa, indice) {

        // Cria um botão
        const botao = document.createElement("button");

        // Adiciona a classe CSS
        botao.classList.add("alternativa");

        // Coloca o texto da alternativa
        botao.innerText = alternativa;

        // Quando clicar, verifica a resposta
        botao.addEventListener("click", function() {

            verificarResposta(indice, botao);

        });

        // Coloca o botão na página
        elementoAlternativas.append(botao);

    });

}


// FUNÇÃO PARA VERIFICAR A RESPOSTA

function verificarResposta(indiceEscolhido, botaoClicado) {

    // Impede que o usuário responda mais de uma vez
    if (respondeu) {
        return;
    }

    respondeu = true;

    // Busca a resposta correta da pergunta atual
    const respostaCorreta = perguntas[perguntaAtual].correta;

    // Busca todos os botões de alternativas
    const botoes = elementoAlternativas.children;


    // VERIFICA SE ACERTOU

    if (indiceEscolhido === respostaCorreta) {

        pontos++;

        elementoFeedback.innerText = "Muito bem! Você acertou!";
        elementoFeedback.style.color = "#00d98b";

        botaoClicado.classList.add("correta");

    } else {

        elementoFeedback.innerText = "Você errou! Tente novamente na próxima.";
        elementoFeedback.style.color = "#ff5555";

        botaoClicado.classList.add("errada");

        // Mostra qual era a alternativa correta
        botoes[respostaCorreta].classList.add("correta");

    }


    // Desativa todas as alternativas
    for (let botao of botoes) {
        botao.disabled = true;
    }

    // Atualiza a pontuação na tela
    elementoPontuacao.innerText = `Pontos: ${pontos}`;

    // Libera o botão de próxima pergunta
    botaoProximo.disabled = false;

    // Na última pergunta, muda o texto do botão
    if (perguntaAtual === perguntas.length - 1) {
        botaoProximo.innerText = "Ver resultado";
    }

}


// FUNÇÃO PARA AVANÇAR A PERGUNTA

function proximaPergunta() {

    // Só avança se o usuário já respondeu
    if (!respondeu) {
        return;
    }

    // Avança o índice
    perguntaAtual++;

    // Verifica se ainda existem perguntas
    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        finalizarQuiz();

    }

}


// FUNÇÃO PARA FINALIZAR O QUIZ

function finalizarQuiz() {

    // Esconde a área das perguntas
    areaQuiz.classList.add("escondido");

    // Mostra a área de resultado
    areaResultado.classList.remove("escondido");

    // Mostra a pontuação final
    pontuacaoFinal.innerText =
        `Você acertou ${pontos} de ${perguntas.length} perguntas!`;


    // CRIA UMA MENSAGEM PERSONALIZADA

    if (pontos === perguntas.length) {

        mensagemFinal.innerText = "Excelente! Você acertou tudo!";

    } else if (pontos >= 3) {

        mensagemFinal.innerText = "Muito bom! Você está aprendendo!";

    } else {

        mensagemFinal.innerText = "Continue estudando! Você consegue!";

    }

}


// FUNÇÃO PARA REINICIAR O QUIZ

function reiniciarQuiz() {

    // Volta para a primeira pergunta
    perguntaAtual = 0;

    // Zera a pontuação
    pontos = 0;

    // Reseta o texto do botão
    botaoProximo.innerText = "Próxima pergunta";

    // Mostra a área do quiz novamente
    areaQuiz.classList.remove("escondido");

    // Esconde o resultado
    areaResultado.classList.add("escondido");

    // Carrega a primeira pergunta
    mostrarPergunta();

}


// EVENTOS DOS BOTÕES

botaoProximo.addEventListener("click", proximaPergunta);

botaoReiniciar.addEventListener("click", reiniciarQuiz);


// INICIA O QUIZ

mostrarPergunta();

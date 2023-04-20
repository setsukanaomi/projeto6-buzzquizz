axios.defaults.headers.common['Authorization'] = '97eVqU1AsszfPTccPmhDFe5m';

let quizzes = [];
let quizz = '';

function obterQuizz() {
    const requisicao = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
    requisicao.then(processarQuizz);
    processarQuizz
}

function processarQuizz(res) {
    console.log(res);

    quizzes = res.data;

    renderizarQuizzTela1();
}

function renderizarQuizzTela1() {
    const ulQuizz = document.querySelector('.containerQuizzes');

    ulQuizz.innerHTML = '';

    for (let i = 0; i < quizzes.length; i++) {
        ulQuizz.innerHTML += `
            <div class="divQuiz" onclick="selecionarQuizz(this, ${i})">
                <img src="${quizzes[i].image}">
                <div class="degrade"></div>
                <span>${quizzes[i].title}</span>
            </div>`
    }
}

function selecionarQuizz(op, i) {
    const aux = document.querySelector('.container-tela1')
    aux.classList.toggle('escondido');

    renderizarQuizzTela3A7(i);
}

function renderizarQuizzTela3A7(i) {
    const aux = document.querySelector('.container-quizzes');
    aux.classList.toggle('escondido');

    const ulQuizz = document.querySelector('.quizzes');

    ulQuizz.innerHTML = '';

    quizz = quizzes[i];

    ulQuizz.innerHTML += `
        <div class="topo-quizz">
            <img src="${quizz.image}">
            <a>${quizz.title}</a>
        </div>`

    let str = gerarString();

    ulQuizz.innerHTML += str;
}

function gerarString() {
    let str = '';

    for (let i = 0; i < quizz.questions.length; i++) { 
        
        str += `
            <div class="quizz">
                <div class="pergunta">
                    <a>${quizz.questions[i].title}</a>
                </div>
                <div class="alternativas"> `

        for (let j = 0; j < quizz.questions[i].answers.length; j++) {

            str += `        
                    <div class="opcao" id="${i}" onclick="selecionarOpcao(this, ${i}, ${j})">
                        <img src="${quizz.questions[i].answers[j].image}">
                        <a>${quizz.questions[i].answers[j].text}</a>
                    </div>`
        }
        
        str += `
                </div>
            </div> `
    }

    return str;
}

function selecionarOpcao(op, i, j) {
    if (quizz.questions[i].answers[j].isCorrectAnswer == true) {
        respostaCorreta(op);
    } else {
        respostaErrada(op);
    }
    trancaOutras(op, i);
}

function respostaCorreta(op, i) {
    const textoOpcao = op.querySelector('a');
    textoOpcao.classList.toggle('selecionado-certo');
    op.classList.toggle('trancado');
}

function respostaErrada(op) {
    const textoOpcao = op.querySelector('a');
    textoOpcao.classList.toggle('selecionado-errado');
    op.classList.toggle('trancado');
}

function trancaOutras(op, i) {

    const aux = document.querySelectorAll('.opcao');

    for (let k = 0; k < aux.length; k++) {
        if (op != aux[k] && aux[k].id == i) {
            aux[k].classList.toggle('nao-selecionado');
            aux[k].classList.toggle('trancado');
        }
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

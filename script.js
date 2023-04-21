axios.defaults.headers.common["Authorization"] = "97eVqU1AsszfPTccPmhDFe5m";

let quizzes = [];
let quizz = "";
let qtdNiveis;
obterQuizz();

function obterQuizz() {
  const requisicao = axios.get("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes");
  requisicao.then(processarQuizz);
}

function processarQuizz(res) {
  console.log(res);

  quizzes = res.data;

  renderizarQuizzTela1();
}

function renderizarQuizzTela1() {
  const ulQuizz = document.querySelector(".containerQuizzes");

  ulQuizz.innerHTML = "";

  for (let i = 0; i < quizzes.length; i++) {
    ulQuizz.innerHTML += `
            <div class="divQuiz" onclick="selecionarQuizz(this, ${i})">
                <img src="${quizzes[i].image}">
                <div class="degrade"></div>
                <span>${quizzes[i].title}</span>
            </div>`;
  }
}

function selecionarQuizz(op, i) {
  const aux = document.getElementById("tela-1");
  aux.classList.toggle("escondido");

  renderizarQuizzTela3A7(i);
}

function renderizarQuizzTela3A7(i) {
  const aux = document.querySelector(".container-quizzes");
  aux.classList.toggle("escondido");

  const ulQuizz = document.querySelector(".quizzes");

  ulQuizz.innerHTML = "";

  quizz = quizzes[i];

  ulQuizz.innerHTML += `
        <div class="topo-quizz">
            <img src="${quizz.image}">
            <a>${quizz.title}</a>
        </div>`;

  let str = gerarString();

  ulQuizz.innerHTML += str;
}

function gerarString() {
  let str = "";

  for (let i = 0; i < quizz.questions.length; i++) {
    str += `
            <div class="quizz">
                <div class="pergunta">
                    <a>${quizz.questions[i].title}</a>
                </div>
                <div class="alternativas"> `;

    for (let j = 0; j < quizz.questions[i].answers.length; j++) {
      str += `        
                    <div class="opcao" id="${i}" onclick="selecionarOpcao(this, ${i}, ${j})">
                        <img src="${quizz.questions[i].answers[j].image}">
                        <a>${quizz.questions[i].answers[j].text}</a>
                    </div>`;
    }

    str += `
                </div>
            </div> `;
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
  const textoOpcao = op.querySelector("a");
  textoOpcao.classList.toggle("selecionado-certo");
  op.classList.toggle("trancado");
}

function respostaErrada(op) {
  const textoOpcao = op.querySelector("a");
  textoOpcao.classList.toggle("selecionado-errado");
  op.classList.toggle("trancado");
}

function trancaOutras(op, i) {
  const aux = document.querySelectorAll(".opcao");

  for (let k = 0; k < aux.length; k++) {
    if (op != aux[k] && aux[k].id == i) {
      aux[k].classList.toggle("nao-selecionado");
      aux[k].classList.toggle("trancado");
    }
  }
}

function comparador() {
  return Math.random() - 0.5;
}

//códido Nilton , validar entradas do quiz

function validarEntradas() {
  const tituloQuiz = document.querySelector(".titulo");
  const titulo = tituloQuiz.value;

  const imagem = document.querySelector(".url");
  const urlImagem = imagem.value;

  const perguntas = document.querySelector(".perguntas");
  const qtdPerguntas = perguntas.value;

  const niveis = document.querySelector(".niveis");
  qtdNiveis = niveis.value;

  if (titulo.length < 20 || titulo.length > 65 || qtdPerguntas < 3 || qtdNiveis < 2 || !validUrl(urlImagem)) {
    alert(`Favor preencher os dados corretamente:
        
        O título deve ter entre 20 e 65 caracteres,
        URL da imagem deve ter formato de URL,
        Quantidade de perguntas: no mínimo 3 perguntas,
        Quantidade de níveis: no mínimo 2.`);
    return;
  }
  paraPerguntas(qtdPerguntas);
}

// - Código Naomi - Função que valida URL
function validUrl(url) {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

// - Função quando clica Prosseguir Perguntas vai para Tela-4 Perguntas
function paraPerguntas(qtdPerguntas) {
  const tela3 = document.querySelector("#tela-3-comece");
  const tela4 = document.querySelector("#tela-4-perguntas");
  tela3.classList.add("escondido");
  tela4.classList.remove("escondido");
  criaPerguntas(qtdPerguntas);
}

// - Função que expande/colapsa pergunta
function expandePergunta(num) {
  const perguntaExpande = document.querySelector("#pergunta-" + num);
  perguntaExpande.classList.toggle("escondido");
}

// - Função que expande/colapsa nível
function expandeNivel(num) {
  const nivelExpande = document.querySelector("#nivel-" + num);
  nivelExpande.classList.toggle("escondido");
}

// - Função quando clica Criar Quizz vai para Tela-3 Comece
function criarQuiz() {
  const tela1 = document.querySelector("#tela-1");
  const tela3 = document.querySelector("#tela-3-comece");
  const tela2 = document.querySelector("#tela-2");

  tela1.classList.add("escondido");
  tela3.classList.remove("escondido");
  tela2.classList.add("escondido");
}

// Função que cria as perguntas baseado na qtdPerguntas
function criaPerguntas(qtdPerguntas) {
  const divPerguntas = document.querySelector("#perguntas-4");
  for (let index = 0; index < qtdPerguntas; index++) {
    const escondido = index > 0 ? "escondido" : "";
    divPerguntas.innerHTML += `
    <div data-test="question-ctn">
    <div class="modificar"><div class="add-ou-modifica">
      <h2>Pergunta ${index + 1}</h2>
      <div><button data-test="toggle" onclick="expandePergunta(${
        index + 1
      })"><img src="./imagens/modificar.png" /></button></div>
  </div>
  </div>
  <div id="pergunta-${index + 1}" class="infoTelas ${escondido}">
    <input data-test="question-input" class="textoPergunta${index + 1}" type="text" placeholder="Texto da pergunta"/>
    <input data-test="question-color-input" class="cor${index + 1}" type="text" placeholder="Cor de fundo da pergunta"/>

    <div class="procedimentos"><h2>Resposta correta</h2></div>
    <input data-test="correct-answer-input" class="respostas${index + 1}" type="text" placeholder="Resposta correta" />
    <input data-test="correct-img-input" class="urlPerguntasImg${index + 1}" type="text" placeholder="URL da imagem"/>

    <div class="procedimentos"><h2>Respostas incorretas</h2></div>
    <input data-test="wrong-answer-input" class="respostas${index + 1}" type="text" placeholder="Resposta incorreta 1"/>
    <input data-test="wrong-img-input" class="urlPerguntasImg${index + 1}" type="text" placeholder="URL da imagem 1"/>

    <input data-test="wrong-answer-input" class="respostas${index + 1}" type="text" placeholder="Resposta incorreta 2"/>
    <input data-test="wrong-img-input" class="urlPerguntasImg${index + 1}" type="text" placeholder="URL da imagem 2"/>

    <input data-test="wrong-answer-input" class="respostas${index + 1}" type="text" placeholder="Resposta incorreta 3"/>
    <input data-test="wrong-img-input" class="urlPerguntasImg${index + 1}" type="text" placeholder="URL da imagem 3"/>
  </div>
  </div>`;
  }
  divPerguntas.innerHTML += `
  <div data-test="go-create-levels" class="prosseguirBotao" onclick="validaPerguntas()">
  <p>Prosseguir para criar níveis</p>
  </div>
`;
}

// Função que cria os níveis baseado na qtdNiveis

function criaNiveis() {
  const divNiveis = document.querySelector("#niveis-5");
  for (let index = 0; index < qtdNiveis; index++) {
    const escondido = index > 0 ? "escondido" : "";
    divNiveis.innerHTML += `
      <div data-test="level-ctn">
        <div class="modificar">
          <div class="add-ou-modifica">
            <h2>Nível ${index + 1}</h2>
            <div><button data-test="toggle" onclick="expandeNivel(${
              index + 1
            })"><img src="./imagens/modificar.png" /></button></div>
          </div>
        </div>
        <div id="nivel-${index + 1}" class="infoTelas ${escondido}">
          <input data-test="level-input" class="tituloNivel${index + 1}" type="text" placeholder="Título do nível" />
          <input data-test="level-percent-input" class="porcentagemAcerto${
            index + 1
          }" type="text" placeholder="% de acerto mínima" />
          <input data-test="level-img-input" class="urlNivel${
            index + 1
          }" type="text" placeholder="URL da imagem do nível" />
          <input data-test="level-description-input" class="descricaoNivel${
            index + 1
          }" type="text" placeholder="Descrição do nível" />
        </div>
      </div>
    `;
  }
  divNiveis.innerHTML += `
    <div data-test="finish" class="prosseguirBotao" onclick="validaNivel()">
      <p>Finalizar Quizz</p>
    </div>
  `;
}

//- Código Naomi - Validador de Perguntas (Desktop-9)

function validaPerguntas() {
  const textoPergunta = document.querySelector(".textoPergunta1");
  const pergunta = textoPergunta.value;

  const corPergunta = document.querySelector(".cor1");
  const cor = corPergunta.value;
  const decimal = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  const respostasPerguntas = document.querySelectorAll(".respostas1");
  const respostas = [];
  respostasPerguntas.forEach((resposta) => {
    if (resposta.value.length > 0) {
      respostas.push(resposta.value);
    }
  });

  const urlsRespostas = document.querySelectorAll(".urlPerguntasImg1");
  const urlImgs = [];
  urlsRespostas.forEach((url) => {
    if (validUrl(url.value)) {
      urlImgs.push(url.value);
    }
  });

  if (pergunta.length < 20 || !decimal.test(cor) || respostas.length < 2 || urlImgs.length < 2) {
    alert("Por favor, preencha os dados corretamente.");
    return;
  }
  alert("Dados preenchidos corretamente!");
  paraNiveis();
}

// - Código Naomi - Validador de Níveis (Desktop-10)

function validaNivel() {
  const tituloNivel = document.querySelector(".tituloNivel1");
  const nivelTitulo = tituloNivel.value;

  const porcentMinima = document.querySelector(".porcentagemAcerto1");
  const porcentagem = porcentMinima.value;

  const urlNivel = document.querySelector(".urlNivel1");
  const nivelUrl = urlNivel.value;

  const descricaoNivel = document.querySelector(".descricaoNivel1");
  const descricao = descricaoNivel.value;

  if (
    nivelTitulo.length < 10 ||
    isNaN(porcentagem) ||
    porcentagem < 0 ||
    porcentagem > 100 ||
    !validUrl(nivelUrl) ||
    descricao.length < 30
  ) {
    alert("Por favor, preencha os dados corretamente.");
    return;
  }
  alert("Dados preenchidos corretamente!");
  paraQuizPronto();
}

// - Função que vai para tela de níveis (Desktop-10)
function paraNiveis() {
  const tela4 = document.querySelector("#tela-4-perguntas");
  const tela5 = document.querySelector("#tela-5-niveis");

  tela4.classList.add("escondido");
  tela5.classList.remove("escondido");

  criaNiveis();
}

function voltarHome() {
  const tela6 = document.querySelector(".tela-6-quizpronto");
  const tela1 = document.querySelector("#tela-1");
  tela6.classList.add("escondido");
  tela1.classList.remove("escondido");
}

// - Função que vai para tela de Quiz Pronto (Desktop-11)
function paraQuizPronto() {
  const tela5 = document.querySelector("#tela-5-niveis");
  const tela6 = document.querySelector("#tela-6-quizpronto");
  tela5.classList.add("escondido");
  tela6.classList.remove("escondido");
}

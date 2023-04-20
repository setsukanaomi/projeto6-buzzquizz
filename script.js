axios.defaults.headers.common["Authorization"] = "97eVqU1AsszfPTccPmhDFe5m";

let quizzes = [];

function obterQuizz() {
  const requisicao = axios.get(
    "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes"
  );
  requisicao.then(processarQuizz);
}

function processarQuizz(res) {
  console.log(res);

  quizzes = res.data;

  renderizarQuizz();
}

function renderizarQuizz() {
  const ulQuizz = document.querySelector(".quizzes");

  ulQuizz.innerHTML = "";

  let quizz = quizzes[0];

  ulQuizz.innerHTML += `

        <div class="topo-quizz">
            <img src="${quizz.image}">
            <a>${quizz.title}</a>
        </div>`;

  let str = gerarString(quizz);

  ulQuizz.innerHTML += str;
}

function gerarString(quizz) {
  let str = "";

  for (let i = 0; i < quizz.questions.length; i++) {
    str += `
            <li class="quizz">
                <div class="pergunta">
                    <a>${quizz.questions[i].title}</a>
                </div>
                <div class="alternativas"> `;

    for (let j = 0; j < quizz.questions[i].answers.length; j++) {
      str += `        
                    <div class="opcao" id="${i}">
                        <img src="${quizz.questions[i].answers[j].image}">
                        <a>${quizz.questions[i].answers[j].text}</a>
                    </div>`;
    }

    str += `
                </div>
            </li> `;
  }

  return str;
}

/* Usar pra embraralhar array
function comparador() { 
	return Math.random() - 0.5; 
}


nomes.sort(comparador); */

//códido Nilton , validar entradas do quiz

function validarEntradas() {
  const tituloQuiz = document.querySelector(".titulo");
  const titulo = tituloQuiz.value;

  const imagem = document.querySelector(".url");
  const urlImagem = imagem.value;

  const perguntas = document.querySelector(".perguntas");
  const qtdPerguntas = perguntas.value;

  const niveis = document.querySelector(".niveis");
  const qtdNiveis = niveis.value;

  if (
    titulo.length < 20 ||
    titulo.length > 65 ||
    qtdPerguntas < 3 ||
    qtdNiveis < 2
  ) {
    alert(`Favor preencher os dados corretamente:
        
        O título deve ter entre 20 e 65 caracteres,
        URL da imagem deve ter formato de URL,
        Quantidade de perguntas: no mínimo 3 perguntas,
        Quantidade de níveis: no mínimo 2.`);
  }
}

//- Código Naomi - Validador de Perguntas (Desktop-9)

function validaPerguntas() {
  const textoPergunta = document.querySelector(".textoPergunta");
  const pergunta = textoPergunta.value;

  const corPergunta = document.querySelector(".cor");
  const cor = corPergunta.value;
  const decimal = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  const respostasPerguntas = document.querySelectorAll(".respostas");
  const respostas = [];
  respostasPerguntas.forEach((resposta) => {
    respostas.push(resposta.value);
  });

  const urlsRespostas = document.querySelectorAll(".urlPerguntasImg");
  const urlImgs = [];
  urlsRespostas.forEach((url) => {
    urlImgs.push(url.value);
  });
  if (
    pergunta.length < 20 ||
    !decimal.test(cor) ||
    respostas[0] === "" ||
    respostas.length < 2 ||
    respostas.includes("") ||
    urlImgs.some((url) => !validUrl(url))
  ) {
    alert("Por favor, preencha os dados corretamente.");
    return;
  }
  alert("Dados preenchidos corretamente!");
}

function validUrl(url) {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

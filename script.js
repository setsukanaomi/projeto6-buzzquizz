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

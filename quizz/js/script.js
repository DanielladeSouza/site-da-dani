(() => {
  'use strict';

  const STORAGE_KEY = 'quizDiagnosticoHolistico';
  const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

  // Perguntas na ordem de exibição sugerida: 1,2,3,4,5,7,8,6
  const QUESTIONS = [
    {
      id: 'q1',
      text: 'Quando penso em cobrar e precificar pelo que faço...',
      options: {
        a: 'Ajusto o preço dependendo de quem está perguntando',
        b: 'Tenho medo de afastar clientes se eu for muito específica sobre quem atendo',
        c: 'Acho que preciso de mais uma formação antes de cobrar o que realmente vale',
        d: 'Já cobro razoavelmente bem, mas tenho medo de crescer demais e perder minha rotina'
      }
    },
    {
      id: 'q2',
      text: 'Minha comunicação hoje...',
      options: {
        a: 'É genérica porque não tenho clareza total do meu diferencial',
        b: 'Tenta agradar todo mundo, e sinto que isso me deixa sem identidade',
        c: 'Muda toda vez que aprendo algo novo e nunca "assenta"',
        d: 'Funciona, mas tenho medo de crescer e não dar conta'
      }
    },
    {
      id: 'q3',
      text: 'Quando penso na minha oferta hoje...',
      options: {
        a: 'Sei que ela entrega valor, mas ainda não sei nomear direito o que a torna diferente das outras',
        b: 'Tento criar algo que sirva pra "todo tipo" de cliente, pra não deixar ninguém de fora',
        c: 'Já pensei em mudar de novo, sinto que preciso "melhorar" antes de vender com confiança',
        d: 'Está praticamente redonda, mas me saboto em organizar e implementar pois tenho medo de vender demais e não dar conta de entregar'
      }
    },
    {
      id: 'q4',
      text: 'Meu relacionamento com vendas é...',
      options: {
        a: 'Desconfortável: sinto que vender é meio "forçar a barra"',
        b: 'Ansioso: tento convencer quem não tem muito a ver com meu trabalho, só pra não perder venda',
        c: 'Adiado: sinto que primeiro preciso estruturar melhor o processo antes de vender de verdade',
        d: 'Instável: vendo bem, mas em seguida freio ou desmarco encontros porque a agenda me assusta'
      }
    },
    {
      id: 'q5',
      text: 'Sobre estrutura e organização do negócio...',
      options: {
        a: 'Não tenho muita clareza de preço, processo e posicionamento: decido tudo no feeling',
        b: 'Tenho dificuldade de dizer não pra demandas que não são bem o meu foco',
        c: 'Já organizei um pouco, mas sinto que "não é suficiente" e ainda falta algo',
        d: 'Já tenho uma boa base, mas toda vez que penso em escalar, dou um passo atrás'
      }
    },
    {
      id: 'q7',
      text: 'No meu dia a dia, o que mais me cansa é...',
      options: {
        a: 'Trabalhar tanto e sentir que o financeiro não acompanha meu esforço',
        b: 'Atender pessoas que não eram bem o meu público, só porque não soube dizer não',
        c: 'Estudar mais um conteúdo sabendo que não vou aplicar tudo que já aprendi',
        d: 'Sentir que preciso estar sempre presente pra tudo funcionar'
      }
    },
    {
      id: 'q8',
      text: 'Se alguém te perguntasse hoje "por que você ainda não cresceu mais?", sua resposta sincera seria...',
      options: {
        a: '"Porque tenho medo de cobrar o que realmente valho"',
        b: '"Porque tento agradar todo mundo e isso dilui minha mensagem"',
        c: '"Porque sinto que ainda falta alguma coisa pra eu estar pronta"',
        d: '"Porque toda vez que começo a crescer, eu mesma seguro o movimento"'
      }
    },
    {
      id: 'q6',
      text: 'Se eu imaginar meu negócio daqui a 1 ano...',
      options: {
        a: 'Quero ter clareza total de quanto cobrar e por quê',
        b: 'Quero atrair só quem realmente ressoa comigo, sem medo de me posicionar e "afastar"',
        c: 'Quero parar de adiar e finalmente colocar em prática o que já sei',
        d: 'Quero crescer, mas sem perder minha vida, meu ritmo e minha essência no processo'
      }
    }
  ];

  const APPLICATION_LINK = 'https://form.respondi.app/4OefcduW';
  const WHATSAPP_LINK = 'https://wa.me/5562981904847';

  const PROFILES = {
    a: {
      title: 'A Guardiã do Desconto',
      diagnosis: [
        'Você entrega com profundidade, mas trava na hora de colocar um preço à altura do que oferece. Cobra pouco ou hesita antes de cobrar porque, no fundo, ainda associa valor financeiro a ganância, e não a reconhecimento pelo próprio trabalho.',
        'Vive uma agenda cheia, mas um caixa que não reflete o tanto que você entrega. Se pega comparando preços com outras profissionais, ajustando valor conforme o bolso de quem pergunta, sentindo que cobrar o que merece vai afastar quem mais precisa de você.',
        'O caminho não é aprender uma fórmula de precificação, é ter clareza real sobre seus produtos, seus diferenciais e o tamanho da transformação que você entrega, porque preço coerente nasce de clareza, não de tabela.'
      ],
      ctaText: 'A MELQN existe para te dar exatamente essa clareza: sobre sua oferta, seu valor e seu diferencial para você precificar com verdade, não com medo.',
      ctaLabel: 'Quero minha clareza na MELQN',
      ctaLink: APPLICATION_LINK
    },
    b: {
      title: 'A que Fala com Todo Mundo',
      diagnosis: [
        'Você tem medo de excluir alguém. Por isso, sua comunicação tenta abraçar todo mundo e, sem perceber, não fala diretamente com ninguém. Suaviza a mensagem, evita se posicionar, teme que ter uma opinião clara afaste quem "poderia" ser cliente.',
        'Vive uma sensação constante de estar se explicando, tentando alcançar em vez de atrair. Sente que definir um cliente ideal é fechar portas quando, na verdade, é isso que faz sua comunicação parar de ser explicação e virar convite.',
        'O caminho é escolher. Não por exclusão, mas por verdade: saber exatamente para quem você existe e o que veio transformar. Potencializar todo o poder de transformação do seu trabalho.'
      ],
      ctaText: 'Na MELQN, você constrói clareza sobre seu cliente ideal, seu posicionamento coerente com a sua essência e sua comunicação, para parar de tentar alcançar todo mundo e começar a atrair quem já se reconhece em você.',
      ctaLabel: 'Quero atrair a partir de quem eu sou na MELQN',
      ctaLink: APPLICATION_LINK
    },
    c: {
      title: 'A Eterna Aluna',
      diagnosis: [
        'Você se dedica de verdade a se qualificar. Mais um curso, mais uma certificação, mais uma formação antes de finalmente se sentir preparada e, enquanto isso, o negócio segue esperando essa versão pronta que nunca chega.',
        'Vive uma bagagem enorme de conhecimento e uma insegurança que não diminui com mais estudo. Confunde ainda não ter estrutura com ainda não saber o suficiente, quando, na verdade, o que falta não é conteúdo, é organização do que você já sabe.',
        'O caminho é parar de esperar se sentir pronta e começar a transformar o que já sabe em estrutura e movimento real.'
      ],
      ctaText: 'A MELQN é o espaço onde você organiza tudo que já sabe em um Plano de Negócio Holístico para agir com o que você já é, agora.',
      ctaLabel: 'Quero transformar meu saber em estrutura na MELQN',
      ctaLink: APPLICATION_LINK
    },
    d: {
      title: 'A que Freia o Próprio Crescimento',
      diagnosis: [
        'Você já estruturou, já entende seu negócio mas, quando o crescimento começa a acontecer de verdade, alguma coisa dentro de você pisa no freio. Teme que crescer signifique perder tempo, perder ritmo, perder a própria vida para o negócio.',
        'Vive um ciclo de avançar e recuar: cresce um pouco, sente que está indo rápido demais, e sabota sem perceber o próprio movimento. Confunde crescimento com sobrecarga, quando na verdade o que você ainda não experimentou é crescer com estrutura.',
        'O caminho é crescer no seu ritmo, mas com consciência e sustentação, implementando e escalando sem abrir mão de si.'
      ],
      ctaText: 'Esse é justamente o momento da MAESTRIA: o próximo passo pós-MELQN, para quem já estruturou e agora quer escalar com consciência, sem perder a própria vida no processo.',
      ctaLabel: 'Quero escalar com consciência na MAESTRIA',
      ctaLink: WHATSAPP_LINK
    }
  };

  const LETTER_ORDER = ['a', 'b', 'c', 'd'];

  // ---------- Estado ----------

  function loadState(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return { answers: {}, currentIndex: 0, leadSubmitted: false };
      const parsed = JSON.parse(raw);
      return {
        answers: parsed.answers || {},
        currentIndex: typeof parsed.currentIndex === 'number' ? parsed.currentIndex : 0,
        leadSubmitted: !!parsed.leadSubmitted
      };
    }catch(e){
      return { answers: {}, currentIndex: 0, leadSubmitted: false };
    }
  }

  function saveState(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  let state = loadState();

  // ---------- Elementos ----------

  const screens = {
    landing: document.getElementById('screen-landing'),
    quiz: document.getElementById('screen-quiz'),
    result: document.getElementById('screen-result')
  };

  const heroForm = document.getElementById('heroForm');
  const leadForm = document.getElementById('leadForm');
  const leadSubmit = document.getElementById('leadSubmit');
  const leadError = document.getElementById('leadError');
  const scrollToFormBtn = document.getElementById('scrollToFormBtn');

  const progressBar = document.getElementById('progressBar');
  const questionCounter = document.getElementById('questionCounter');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const backBtn = document.getElementById('backBtn');

  const resultTitle = document.getElementById('resultTitle');
  const resultDiagnosis = document.getElementById('resultDiagnosis');
  const resultCtaText = document.getElementById('resultCtaText');
  const resultCtaButton = document.getElementById('resultCtaButton');
  const resultCtaLabel = document.getElementById('resultCtaLabel');
  const restartBtn = document.getElementById('restartBtn');

  function showScreen(name){
    Object.entries(screens).forEach(([key, el]) => {
      el.hidden = key !== name;
    });
  }

  // ---------- Quiz ----------

  function renderQuestion(){
    const index = state.currentIndex;
    const question = QUESTIONS[index];

    progressBar.style.width = ((index) / QUESTIONS.length * 100) + '%';
    questionCounter.textContent = `Pergunta ${index + 1} de ${QUESTIONS.length}`;
    questionText.textContent = question.text;

    optionsContainer.innerHTML = '';
    LETTER_ORDER.forEach(letter => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz__option';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', state.answers[question.id] === letter ? 'true' : 'false');
      if(state.answers[question.id] === letter) btn.classList.add('is-selected');

      const letterSpan = document.createElement('span');
      letterSpan.className = 'quiz__option-letter';
      letterSpan.textContent = letter.toUpperCase();

      const textSpan = document.createElement('span');
      textSpan.textContent = question.options[letter];

      btn.appendChild(letterSpan);
      btn.appendChild(textSpan);

      btn.addEventListener('click', () => selectAnswer(question.id, letter));
      optionsContainer.appendChild(btn);
    });

    backBtn.hidden = index === 0;
  }

  function selectAnswer(questionId, letter){
    state.answers[questionId] = letter;
    saveState();

    if(state.currentIndex < QUESTIONS.length - 1){
      state.currentIndex += 1;
      saveState();
      setTimeout(renderQuestion, 180);
    }else{
      progressBar.style.width = '100%';
      setTimeout(finishQuiz, 220);
    }
  }

  function goBack(){
    if(state.currentIndex > 0){
      state.currentIndex -= 1;
      saveState();
      renderQuestion();
    }
  }

  function computeProfile(){
    const counts = { a: 0, b: 0, c: 0, d: 0 };
    Object.values(state.answers).forEach(letter => {
      if(counts[letter] !== undefined) counts[letter] += 1;
    });

    let winner = 'a';
    LETTER_ORDER.forEach(letter => {
      if(counts[letter] > counts[winner]) winner = letter;
    });

    return winner;
  }

  function finishQuiz(){
    renderResult();
  }

  // ---------- Resultado ----------

  function renderResult(){
    const letter = computeProfile();
    const profile = PROFILES[letter];

    resultTitle.textContent = profile.title;

    resultDiagnosis.innerHTML = '';
    profile.diagnosis.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      resultDiagnosis.appendChild(p);
    });

    resultCtaText.textContent = profile.ctaText;
    resultCtaLabel.textContent = profile.ctaLabel;
    resultCtaButton.href = profile.ctaLink;

    showScreen('result');
  }

  // ---------- Formulário de lead (Seção 1 — Web3Forms) ----------

  leadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    leadSubmit.disabled = true;
    const originalLabel = leadSubmit.querySelector('span').textContent;
    leadSubmit.querySelector('span').textContent = 'Enviando...';
    leadError.hidden = true;

    const formData = new FormData(leadForm);
    const payload = Object.fromEntries(formData.entries());

    try{
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if(result.success){
        state.leadSubmitted = true;
        saveState();
        showScreen('quiz');
        renderQuestion();
      }else{
        throw new Error(result.message || 'Falha no envio');
      }
    }catch(err){
      leadError.hidden = false;
      leadSubmit.disabled = false;
      leadSubmit.querySelector('span').textContent = originalLabel;
    }
  });

  scrollToFormBtn.addEventListener('click', () => {
    heroForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ---------- Reiniciar (mantém o lead já enviado) ----------

  function restartQuiz(){
    state = { answers: {}, currentIndex: 0, leadSubmitted: false };
    saveState();
    progressBar.style.width = '0%';
    leadForm.reset();
    showScreen('landing');
  }

  // ---------- Eventos ----------

  backBtn.addEventListener('click', goBack);
  restartBtn.addEventListener('click', restartQuiz);

  // ---------- Retomar estado salvo ----------

  (function init(){
    const answeredCount = Object.keys(state.answers).length;

    if(!state.leadSubmitted){
      showScreen('landing');
    }else if(answeredCount >= QUESTIONS.length){
      renderResult();
    }else{
      showScreen('quiz');
      renderQuestion();
    }
  })();

})();

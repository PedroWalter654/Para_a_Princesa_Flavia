document.addEventListener('DOMContentLoaded', function() {
  // Elementos principais
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const confirmation = document.getElementById('confirmation');
  const questionSequence = document.getElementById('question-sequence');
  const questionText = document.getElementById('question-text');
  const nextQuestionBtn = document.getElementById('next-question-btn');
  const audioPlayer = document.getElementById('audio-player');
  const musicBtn = document.getElementById('music-btn');
  const audioPermission = document.getElementById('audio-permission');
  const enableAudioBtn = document.getElementById('enable-audio');

  // Configurações
  const questions = [
    "Tem certeza? 🥺",
    "Mesmo mesmo? ❤️",
    "Não tá aceitando só por dó, né? 😏",
    "Última chance, hein! 😅"
  ];
  
  const whatsappNumber = "5542999297510"; // Substitua pelo seu número com DDD
  const messageText = "Acabei de aceitar seu convite! (Obs: Falta só você mandar o dia e o horário!)"; // Mensagem que ela enviará
  
  let currentQuestion = 0;
  let audioEnabled = false;

  // Se for celular, mostrar logo o aviso de ativar áudio
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    audioPermission.style.display = 'flex';
  }


  // Sistema de Áudio
  function initAudio() {
    audioPlayer.play()
      .then(() => {
        musicBtn.innerHTML = '<span class="music-icon">♫</span> Tocando...';
        audioEnabled = true;
        audioPermission.style.display = 'none';
      })
      .catch(() => {
        audioPermission.style.display = 'flex';
      });

    enableAudioBtn.addEventListener('click', function() {
      audioPlayer.play()
        .then(() => {
          audioEnabled = true;
          musicBtn.innerHTML = '<span class="music-icon">♫</span> Tocando...';
          audioPermission.style.display = 'none';
        });
    });
  }

  // Controle do Player de Música
  musicBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (audioPlayer.paused) {
      audioPlayer.play()
        .then(() => {
          musicBtn.innerHTML = '<span class="music-icon">♫</span> Tocando...';
        })
        .catch(() => {
          audioPermission.style.display = 'flex';
        });
    } else {
      audioPlayer.pause();
      musicBtn.innerHTML = '<span class="music-icon">♫</span> Thinking Out Loud';
    }
  });

  // Fluxo de Confirmação
  yesBtn.addEventListener('click', function() {
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    questionText.textContent = questions[currentQuestion];
    questionSequence.classList.remove('hidden');
  });

  nextQuestionBtn.addEventListener('click', function() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
      questionText.textContent = questions[currentQuestion];
    } else {
      // Finaliza a confirmação
      questionSequence.classList.add('hidden');
      confirmation.classList.remove('hidden');
      
      // Ativa efeitos
      createConfetti();
      if (audioEnabled) audioPlayer.play();
      
      // Prepara mensagem para WhatsApp
      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Abre nova aba após 3 segundos (para não ser bloqueado)
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 3000);
    }
  });

  // Botão Não
  noBtn.addEventListener('click', function() {
    noBtn.textContent = "😢 Poxa...";
    noBtn.textContent = "Olha, eu até entendo se você tiver medo de se apaixonar😌";
    yesBtn.textContent = "Você ainda pode mudar de ideia!";
  });

  // Efeito de Confete
function createConfetti() {
  const colors = ['#ff4757', '#ff6b81', '#1db954', '#ffeb3b', '#2196f3'];
  
  for (let i = 0; i < 100; i++) { // Aumentei para 100 confetes
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = -10 + 'px'; // Começa acima da tela (topo)
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.setProperty('--random-x', (Math.random() * 200 - 100) + 'px'); // Movimento horizontal aleatório
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

  // Inicialização
  initAudio();
});
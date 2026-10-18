(() => {
  const panel = document.querySelector('#quiz-panel');
  const rows = window.quizWords || [];
  if (!panel || !rows.length) return;

  const level = location.pathname.match(/\/(N[1-5])\//i)?.[1]?.toUpperCase() || 'N5';
  const day = location.pathname.match(/\/(H\d+)\.html$/i)?.[1]?.toUpperCase() || 'H1';
  const shuffle = items => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const wordOf = row => ({ kanji: row[0], kana: row[1] || row[0], meaning: row[row.length - 1], romaji: row.length === 4 ? row[2] : '' });
  const words = rows.map(wordOf);
  // Keep the three formats balanced while changing their order each time.
  const types = shuffle(words.map((_, i) => i % 3));
  let questions = shuffle(words.map((_, index) => ({ index, type: types[index] === 0 ? 'kanji' : types[index] === 1 ? 'reading' : 'meaning' })));
  let position = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    answered = false;
    const question = questions[position];
    const word = words[question.index];
    const prompt = question.type === 'kanji'
      ? `Kanji mana yang cocok dengan bacaan 「${word.kana}」 dan arti “${word.meaning}”?`
      : question.type === 'reading'
        ? `Bagaimana cara baca 「${word.kanji}」 yang berarti “${word.meaning}”?`
        : `Apa arti 「${word.kanji}（${word.kana}）」?`;
    const answer = question.type === 'kanji' ? word.kanji : question.type === 'reading' ? word.kana : word.meaning;
    const candidates = [...new Set(words.map(item => question.type === 'kanji' ? item.kanji : question.type === 'reading' ? item.kana : item.meaning).filter(value => value !== answer))];
    const options = shuffle([answer, ...shuffle(candidates).slice(0, 3)]);
    panel.innerHTML = `<div class="quiz-head"><a class="back-button" href="index.html">← ${level}</a><span class="quiz-count">🇯🇵 ${day} · KOSAKATA ${level}</span></div>
      <div class="progress" role="progressbar" aria-label="Progres kuis" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${position}"><span style="width:${position / questions.length * 100}%"></span></div>
      <div class="quiz-count">PERTANYAAN ${position + 1} DARI ${questions.length} · ${question.type === 'kanji' ? 'PILIH KANJI' : question.type === 'reading' ? 'PILIH CARA BACA' : 'PILIH ARTI'}</div><h3>${prompt}</h3>
      <div class="answers">${options.map((option, i) => `<button class="answer-button" type="button" data-answer="${i}"><b>${String.fromCharCode(65 + i)}.</b>&nbsp; ${option}</button>`).join('')}</div>
      <div id="feedback"></div><div class="quiz-actions" id="quiz-actions"></div>`;
    panel.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => chooseAnswer(Number(button.dataset.answer), options, answer, word)));
  }

  function chooseAnswer(choice, options, answer, word) {
    if (answered) return;
    answered = true;
    const correct = options[choice] === answer;
    if (correct) score++;
    panel.querySelectorAll('[data-answer]').forEach((button, i) => {
      button.disabled = true;
      if (options[i] === answer) button.classList.add('correct');
      if (i === choice && !correct) button.classList.add('wrong');
    });
    const detail = `「${word.kanji}」 dibaca ${word.kana}${word.romaji ? ` (${word.romaji})` : ''}, artinya ${word.meaning}.`;
    document.querySelector('#feedback').innerHTML = `<p class="explanation"><b>${correct ? 'Betul! 🎉' : 'Belum tepat 🙂'}</b> ${detail}</p>`;
    document.querySelector('#quiz-actions').innerHTML = `<button type="button" class="primary-button" id="next-question">${position === questions.length - 1 ? 'Lihat hasil' : 'Lanjut'} →</button>`;
    document.querySelector('#next-question').addEventListener('click', () => { position++; position < questions.length ? renderQuestion() : renderResult(); });
  }

  function renderResult() {
    const percent = score / questions.length;
    const mood = percent === 1 ? ['🏆', 'Sempurna!'] : percent >= .6 ? ['🌟', 'Keren, teruskan!'] : ['🌱', 'Latihanmu sudah dimulai!'];
    panel.innerHTML = `<div class="result"><div class="result-emoji">${mood[0]}</div><div class="eyebrow">FOLDER ${level} · ${day} SELESAI</div><h3>${mood[1]}</h3><div class="score-big">${score}<span style="font-size:22px;color:#92968d"> / ${questions.length}</span></div><p>Bagus! Ulangi lagi kapan saja untuk mengingat kosakatanya.</p><div class="result-actions"><button class="primary-button" id="play-again" type="button">Main lagi ↻</button><a class="quiet-button" href="index.html">Kembali ke ${level}</a></div></div>`;
    document.querySelector('#play-again').addEventListener('click', () => {
      position = 0; score = 0;
      const freshTypes = shuffle(words.map((_, i) => i % 3));
      questions = shuffle(words.map((_, i) => ({ index: i, type: ['kanji', 'reading', 'meaning'][freshTypes[i]] })));
      renderQuestion(); panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  renderQuestion();
})();

const words = [
  ['出来ます', 'できます', 'bisa'], ['作ります', 'つくります', 'membuat'],
  ['使います', 'つかいます', 'memakai; menggunakan'], ['借ります', 'かります', 'meminjam'],
  ['貸します', 'かします', 'meminjamkan'], ['休みます', 'やすみます', 'istirahat'],
  ['働きます', 'はたらきます', 'bekerja'], ['動きます', 'うごきます', 'bergerak'],
  ['待ちます', 'まちます', 'menunggu'], ['持ちます', 'もちます', 'membawa; memiliki'],
  ['起きます', 'おきます', 'bangun'], ['寝ます', 'ねます', 'tidur'],
  ['通います', 'かよいます', 'pulang pergi'], ['通ります', 'とおります', 'melewati'],
  ['出かけます', 'でかけます', 'bepergian'], ['降ります', 'ふります', 'turun (hujan, salju)'],
  ['やみます', '', 'berhenti (hujan, salju, angin)'], ['晴れます', 'はれます', 'cerah'],
  ['曇ります', 'くもります', 'berawan; mendung']
];
const panel = document.querySelector('#quiz-panel');
let index = 0;
let score = 0;
let answered = false;
const hash = value => [...value].reduce((result, character) => (result * 31 + character.codePointAt(0)) | 0, 0);
const shownWord = (kanji, kana) => kana ? `${kanji}（${kana}）` : kanji;

function renderQuestion() {
  answered = false;
  const [kanji, kana, meaning] = words[index];
  const meanings = [...new Set(words.filter((_, i) => i !== index).map(word => word[2]))];
  const options = [meaning, ...meanings.sort((a, b) => hash(`${kanji}:${a}`) - hash(`${kanji}:${b}`)).slice(0, 3)]
    .sort((a, b) => hash(`${kanji}:${a}`) - hash(`${kanji}:${b}`));
  panel.innerHTML = `<div class="quiz-head"><a class="back-button" href="index.html">← N3</a><span class="quiz-count">🇯🇵 H3 · KOSAKATA N3</span></div>
    <div class="progress" role="progressbar" aria-label="Progres kuis" aria-valuemin="0" aria-valuemax="${words.length}" aria-valuenow="${index}"><span style="width:${index / words.length * 100}%"></span></div>
    <div class="quiz-count">PERTANYAAN ${index + 1} DARI ${words.length}</div><h3>Apa arti 「${shownWord(kanji, kana)}」?</h3>
    <div class="answers">${options.map((option, i) => `<button class="answer-button" type="button" data-answer="${i}"><b>${String.fromCharCode(65 + i)}.</b>&nbsp; ${option}</button>`).join('')}</div>
    <div id="feedback"></div><div class="quiz-actions" id="quiz-actions"></div>`;
  panel.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => chooseAnswer(Number(button.dataset.answer), options, meaning, kanji, kana)));
}
function chooseAnswer(choice, options, meaning, kanji, kana) {
  if (answered) return;
  answered = true;
  const correct = options[choice] === meaning;
  if (correct) score++;
  panel.querySelectorAll('[data-answer]').forEach((button, i) => {
    button.disabled = true;
    if (options[i] === meaning) button.classList.add('correct');
    if (i === choice && !correct) button.classList.add('wrong');
  });
  document.querySelector('#feedback').innerHTML = `<p class="explanation"><b>${correct ? 'Betul! 🎉' : 'Belum tepat 🙂'}</b> 「${shownWord(kanji, kana)}」 artinya ${meaning}.</p>`;
  document.querySelector('#quiz-actions').innerHTML = `<button type="button" class="primary-button" id="next-question">${index === words.length - 1 ? 'Lihat hasil' : 'Lanjut'} →</button>`;
  document.querySelector('#next-question').addEventListener('click', () => { index++; index < words.length ? renderQuestion() : renderResult(); });
}
function renderResult() {
  const percent = score / words.length;
  const mood = percent === 1 ? ['🏆', 'Sempurna!'] : percent >= .6 ? ['🌟', 'Keren, teruskan!'] : ['🌱', 'Latihanmu sudah dimulai!'];
  panel.innerHTML = `<div class="result"><div class="result-emoji">${mood[0]}</div><div class="eyebrow">FOLDER N3 · H3 SELESAI</div><h3>${mood[1]}</h3><div class="score-big">${score}<span style="font-size:22px;color:#92968d"> / ${words.length}</span></div><p>Bagus! Ulangi lagi kapan saja untuk mengingat kosakatanya.</p><div class="result-actions"><button class="primary-button" id="play-again" type="button">Main lagi ↻</button><a class="quiet-button" href="index.html">Kembali ke N3</a></div></div>`;
  document.querySelector('#play-again').addEventListener('click', () => { index = 0; score = 0; renderQuestion(); panel.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
}
renderQuestion();

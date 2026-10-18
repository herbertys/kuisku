const words = [
  ['間に合う', 'まにあう', 'tepat waktu; keburu'], ['遅れる', 'おくれる', 'terlambat'],
  ['間違える', 'まちがえる', 'membuat kesalahan'], ['見つける', 'みつける', 'menemukan'],
  ['続ける', 'つづける', 'melanjutkan'], ['決める', 'きめる', 'memutuskan'],
  ['調べる', 'しらべる', 'memeriksa; mencari tahu'], ['比べる', 'くらべる', 'membandingkan'],
  ['伝える', 'つたえる', 'menyampaikan'], ['迎える', 'むかえる', 'menjemput; menyambut'],
  ['必要', 'ひつよう', 'perlu; diperlukan'], ['十分', 'じゅうぶん', 'cukup'],
  ['特別', 'とくべつ', 'khusus; istimewa'], ['安心', 'あんしん', 'lega; merasa tenang'],
  ['心配', 'しんぱい', 'khawatir'], ['残念', 'ざんねん', 'sayang sekali'],
  ['約束', 'やくそく', 'janji'], ['用意', 'ようい', 'persiapan'],
  ['途中', 'とちゅう', 'di tengah perjalanan / proses'], ['最近', 'さいきん', 'akhir-akhir ini']
];
const panel = document.querySelector('#quiz-panel');
let index = 0;
let score = 0;
let answered = false;
const hash = value => [...value].reduce((result, character) => (result * 31 + character.codePointAt(0)) | 0, 0);

function renderQuestion() {
  answered = false;
  const [kanji, kana, meaning] = words[index];
  const meanings = [...new Set(words.filter((_, i) => i !== index).map(word => word[2]))];
  const options = [meaning, ...meanings.sort((a, b) => hash(`${kanji}:${a}`) - hash(`${kanji}:${b}`)).slice(0, 3)]
    .sort((a, b) => hash(`${kanji}:${a}`) - hash(`${kanji}:${b}`));
  panel.innerHTML = `<div class="quiz-head"><a class="back-button" href="index.html">← N4</a><span class="quiz-count">🇯🇵 H1 · KOSAKATA N4</span></div>
    <div class="progress" role="progressbar" aria-label="Progres kuis" aria-valuemin="0" aria-valuemax="${words.length}" aria-valuenow="${index}"><span style="width:${index / words.length * 100}%"></span></div>
    <div class="quiz-count">PERTANYAAN ${index + 1} DARI ${words.length}</div><h3>Apa arti 「${kanji}（${kana}）」?</h3>
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
  document.querySelector('#feedback').innerHTML = `<p class="explanation"><b>${correct ? 'Betul! 🎉' : 'Belum tepat 🙂'}</b> 「${kanji}」 dibaca ${kana}, artinya ${meaning}.</p>`;
  document.querySelector('#quiz-actions').innerHTML = `<button type="button" class="primary-button" id="next-question">${index === words.length - 1 ? 'Lihat hasil' : 'Lanjut'} →</button>`;
  document.querySelector('#next-question').addEventListener('click', () => { index++; index < words.length ? renderQuestion() : renderResult(); });
}
function renderResult() {
  const percent = score / words.length;
  const mood = percent === 1 ? ['🏆', 'Sempurna!'] : percent >= .6 ? ['🌟', 'Keren, teruskan!'] : ['🌱', 'Latihanmu sudah dimulai!'];
  panel.innerHTML = `<div class="result"><div class="result-emoji">${mood[0]}</div><div class="eyebrow">FOLDER N4 · H1 SELESAI</div><h3>${mood[1]}</h3><div class="score-big">${score}<span style="font-size:22px;color:#92968d"> / ${words.length}</span></div><p>Bagus! Ulangi lagi kapan saja untuk mengingat kosakatanya.</p><div class="result-actions"><button class="primary-button" id="play-again" type="button">Main lagi ↻</button><a class="quiet-button" href="index.html">Kembali ke N4</a></div></div>`;
  document.querySelector('#play-again').addEventListener('click', () => { index = 0; score = 0; renderQuestion(); panel.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
}
renderQuestion();

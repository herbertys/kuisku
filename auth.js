(() => {
  // Client-side entry gate for casual sharing only. This is not secure access control.
  const PASS = 'sasjepunw';
  const KEY = 'kuisku-access-granted';
  if (sessionStorage.getItem(KEY) === 'yes') return;

  const lock = document.createElement('div');
  lock.className = 'access-lock';
  lock.innerHTML = `
    <form class="access-card" autocomplete="off">
      <div class="access-mark">K</div>
      <span class="access-eyebrow">KUISKU · KOSAKATA JEPANG</span>
      <h1>Masukkan kata sandi</h1>
      <p>Masukkan kata sandi untuk membuka kuis.</p>
      <label for="access-password">Kata sandi</label>
      <input id="access-password" type="password" autocomplete="current-password" required autofocus>
      <button type="submit">Masuk <span aria-hidden="true">→</span></button>
      <p class="access-error" role="alert" aria-live="polite"></p>
    </form>`;
  document.body.append(lock);
  lock.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    if (lock.querySelector('input').value === PASS) {
      sessionStorage.setItem(KEY, 'yes');
      lock.remove();
    } else {
      lock.querySelector('.access-error').textContent = 'Kata sandinya belum cocok. Coba lagi ya.';
      lock.querySelector('input').select();
    }
  });
})();

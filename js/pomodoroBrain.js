document.addEventListener('DOMContentLoaded', () => {
  const stateContainer = document.querySelector('#state');
  const timeContainer = document.querySelector('#time');
  const breakContainer = document.querySelector('#break-length');
  const sessionContainer = document.querySelector('#session-length');
  let currentState = 'session'; // sessiont vagy szünetet számolunk épp
  let breakTime = 5 * 60; // meddig tart a szünet (másodpercekben)
  let sessionTime = 25 * 60; // meddig tart a session (másodpercekben)
  let timer = sessionTime; // visszaszámlálás, amit az alapértelmezett session hosszával indítunk
  let interval = null; // ez a változó mondja meg, hogy épp visszaszálálunk-e: alapértelmezetten null, mert nem számolunk vissza, visszaszámláláskor az interval object kerül bele

  // írjuk ki a szünet, session, számláló értékeit
  renderTime();
  renderBreak();
  renderSession();

  /**
   * Visszaszámlálás indítása
   */
  function startTimer() {
    // másodperceként  futó interval
    interval = setInterval(() => {
      // amíg nem éri el a visszaszámláló a 0-t, csökkkentsük a visszaszámláló értékét 1-gyel
      if (timer > 0) {
        --timer;
      } else {
        if (currentState === 'session') {
          // ha a session járt le, váltsunk át szünetre és a visszaszámláló értékét állítsuk a megadott szünet értékére
          timer = breakTime;
          currentState = 'break';
        } else {
          // ha a szünet járt le, váltsunk át sessionre és a visszaszámláló értéket állítsuk a megadott session értékére
          timer = sessionTime;
          currentState = 'session';
        }

        // állítsuk meg a visszaszámlálást
        clearInterval(interval);
        // "töröljük" az interval objectet, mert már nem számolunk vissza
        interval = null;
      }

      // írjuk ki a visszaszámlálás értékét
      renderTime();
    }, 1000);
  }

  /**
   * Visszaszámlálás leállítása
   */
  function stopTimer() {
    // "töröljük" az inervalt
    clearInterval(interval);
    interval = null;
  }

  /**
   * Visszaszámlálás elindítása vagy megállítása
   * Ha létezik interval object megállítjuk a visszaszámlálót, ha nem létezik, akkor elindítjuk
   */
  function toggleTimer() {
    if (interval) {
      stopTimer();
    } else {
      startTimer();
    }
  }

  /**
   * Visszaszámláló alaphelyzetbe állítása
   * Az alaphelyzet a megadott session érték
   */
  function reset() {
    timer = sessionTime;
    renderTime();
  }

  /**
   * Szünet növelése 1 perccel
   */
  function incrementBreak() {
    breakTime += 60;
    renderBreak();
  }

  /**
   * Szünet csökkentése 1 perccel
   */
  function decrementBreak() {
    if (breakTime <= 60) return; // Nem engedjük 1 perc alá csökkenteni
    breakTime -= 60;
    renderBreak();
  }

  /**
   * Session növelése 1 perccel
   */
  function incrementSession() {
    sessionTime += 60;
    renderSession();

    // Ha épp nem számlálunk vissza, állítsuk a visszaszámlálás értékét a megadott session értékre
    if (!interval) {
      timer = sessionTime;
      renderTime();
    }
  }

  /**
   * Session csökkentése 1 perccel
   */
  function decrementSession() {
    if (sessionTime <= 60) return;
    sessionTime -= 60;
    renderSession();

    // Ha épp nem számlálunk vissza, állítsuk a visszaszámlálás értékét a megadott session értékre
    if (!interval) {
      timer = sessionTime;
      renderTime();
    }
  }

  /**
   * Szünet érték kiírása
   */
  function renderBreak() {
    breakContainer.innerHTML = breakTime / 60;
  }

  /**
   * Session érték kiírása
   */
  function renderSession() {
    sessionContainer.innerHTML = sessionTime / 60;
  }

  /**
   * Visszaszámláló kiírása
   */
  function renderTime() {
    let minutes = Math.floor(timer / 60);
    minutes = minutes > 10 ? minutes : `0${minutes}`; // ha 1 számjegyű az érték, írjunk elé egy 0-t
    let seconds = timer % 60;
    seconds = seconds > 10 ? seconds : `0${seconds}`; // ha 1 számjegyű az érték, írjunk elé egy 0-t

    stateContainer.innerHTML = currentState; // írjuk ki, hogy session vagy szünet van
    timeContainer.innerHTML = `${minutes}:${seconds}`; // ítjuk ki, hol tart a visszaszámláló
  }

  document
    .querySelector('#break-decrement')
    .addEventListener('click', decrementBreak);
  document
    .querySelector('#break-increment')
    .addEventListener('click', incrementBreak);
  document
    .querySelector('#session-decrement')
    .addEventListener('click', decrementSession);
  document
    .querySelector('#session-increment')
    .addEventListener('click', incrementSession);
  document.querySelector('#start-stop').addEventListener('click', toggleTimer);
  document.querySelector('#reset').addEventListener('click', reset);
});

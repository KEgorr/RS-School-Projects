export default class Navigation {
  navigate(event: Event) {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const raceSection = document.querySelector('.race-section');
      const winnersSection = document.querySelector('.winners-section');

      if (raceSection && winnersSection) {
        if (target.closest('.to-garage-button')) {
          winnersSection.classList.add('hide-section');
          raceSection.classList.remove('hide-section');
        } else {
          winnersSection.classList.remove('hide-section');
          raceSection.classList.add('hide-section');
        }
      }
    }
  }
}

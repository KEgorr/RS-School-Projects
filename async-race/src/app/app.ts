import CreateUI from '../modules/UI/view/createRaceUI';
import Navigation from '../modules/UI/navigation';
import raceHandlers from '../modules/UI/eventHandlers/raceHandlers';
import garage from '../modules/UI/view/createGarage';
import winners from '../modules/UI/view/WinnersUI';

export default class App {
  createUI: CreateUI;

  navigation: Navigation;

  constructor() {
    this.createUI = new CreateUI();
    this.navigation = new Navigation();
  }

  public async start() {
    const navigation = this.createUI.crateNavigation();
    const raceSection = this.createUI.createRaceSection();

    const curGarage = await garage.createGarage();

    const winnersSection = winners.createWinnersSection();
    const curWinners = await winners.getWinners();
    const winnersPagination = winners.createPaginationWinners();

    winnersSection.append(curWinners, winnersPagination);

    winnersSection.classList.add('hide-section');

    raceSection.append(curGarage);
    const body = document.querySelector('.body');

    if (body) {
      body.append(navigation, raceSection, winnersSection);
    }

    navigation.addEventListener('click', (event) => this.navigation.navigate(event));

    this.setCarHooks();
  }

  private setCarHooks() {
    const createBtn = document.querySelector('.create-button');

    if (createBtn) {
      createBtn.addEventListener('click', () => {
        (async () => {
          await raceHandlers.createWithParams();
        })().catch((err) => console.log(err));
      });
    }
    const raceSection = document.querySelector('.race-section');

    if (raceSection) {
      raceSection.addEventListener('click', (event) => {
        (async () => {
          await raceHandlers.removeCar(event);
        })().catch((err) => console.log(err));
      });

      raceSection.addEventListener('click', (event) => raceHandlers.setCarToUpdate(event));

      raceSection.addEventListener('click', (event) => {
        (async () => {
          await raceHandlers.paginationHandler(event);
        })().catch((err) => console.log(err));
      });
      document.querySelector('.update-button')?.addEventListener('click', () => {
        (async () => {
          await raceHandlers.updateCar();
        })().catch((err) => console.log(err));
      });

      document.querySelector('.generate-cars-button')?.addEventListener('click', () => {
        (async () => {
          await raceHandlers.generateCars();
        })().catch((err) => console.log(err));
      });
    }
  }
}

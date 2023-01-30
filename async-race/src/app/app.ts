import CreateUI from '../modules/UI/view/createRaceUI';
import Navigation from '../modules/UI/navigation';
import garage from '../modules/UI/view/createGarage';
import winners from '../modules/UI/view/WinnersUI';
import carsHandlers from '../modules/UI/eventHandlers/carsHandlers';

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
          await carsHandlers.createWithParams();
        })().catch((err) => console.log(err));
      });
    }
    const raceSection = document.querySelector('.race-section');

    if (raceSection) {
      raceSection.addEventListener('click', (event) => {
        (async () => {
          await carsHandlers.removeCar(event);
        })().catch((err) => console.log(err));
      });

      raceSection.addEventListener('click', (event) => carsHandlers.setCarToUpdate(event));

      raceSection.addEventListener('click', (event) => {
        (async () => {
          await carsHandlers.paginationHandler(event);
        })().catch((err) => console.log(err));
      });

      raceSection.addEventListener('click', (event) => {
        (async () => {
          await carsHandlers.startRace(event);
        })().catch((err) => console.log(err));
      });
      document.querySelector('.update-button')?.addEventListener('click', () => {
        (async () => {
          await carsHandlers.updateCar();
        })().catch((err) => console.log(err));
      });

      document.querySelector('.generate-cars-button')?.addEventListener('click', () => {
        (async () => {
          await carsHandlers.generateCars();
        })().catch((err) => console.log(err));
      });

      document.querySelector('.race-button')?.addEventListener('click', () => {
        (async () => {
          await carsHandlers.raceAll();
        })().catch((err) => console.log(err));
      });
    }
  }
}

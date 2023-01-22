import CreateUI from '../modules/UI/view/createRaceUI';
import CreateGarage from '../modules/UI/view/createGarage';
import Winners from '../modules/UI/view/WinnersUI';
import Navigation from '../modules/UI/navigation';

export default class App {
  createUI: CreateUI;

  garage: CreateGarage;

  winners: Winners;

  navigation: Navigation;

  constructor() {
    this.createUI = new CreateUI();
    this.garage = new CreateGarage();
    this.winners = new Winners();
    this.navigation = new Navigation();
  }

  public async start() {
    const navigation = this.createUI.crateNavigation();
    const raceSection = this.createUI.createRaceSection();
    const RacePagination = this.createUI.createRacePagination();

    const garage = await this.garage.createGarage();

    const winnersSection = this.winners.createWinnersSection();
    const winners = await this.winners.getWinners();
    const winnersPagination = this.winners.createPaginationWinners();

    winnersSection.append(winners, winnersPagination);

    winnersSection.classList.add('hide-section');

    raceSection.append(garage, RacePagination);
    const body = document.querySelector('.body');

    if (body) {
      body.append(navigation, raceSection, winnersSection);
    }

    navigation.addEventListener('click', (event) => this.navigation.navigate(event));
  }
}

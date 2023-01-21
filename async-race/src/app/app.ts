import CreateUI from '../modules/UI/createRaceUI';
import CreateGarage from '../modules/UI/createGarage';
import Winners from '../modules/UI/WinnersUI';

export default class App {
  createUI: CreateUI;

  garage: CreateGarage;

  winners: Winners;

  constructor() {
    this.createUI = new CreateUI();
    this.garage = new CreateGarage();
    this.winners = new Winners();
  }

  public async start() {
    const navigation = this.createUI.crateNavigation();
    const raceSection = this.createUI.createRaceSection();
    const footer = this.createUI.createFooter();

    const garage = await this.garage.createGarage();

    const winners = await this.winners.createWinners(1, undefined, undefined);
    const winnersPagination = this.winners.createPaginationWinners();

    winners.append(winnersPagination);

    raceSection.append(garage, footer);
    const body = document.querySelector('.body');

    if (body) {
      body.append(navigation, raceSection, winners);
    }
  }
}

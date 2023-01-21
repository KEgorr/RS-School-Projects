import CreateUI from '../modules/UI/createDefaultUI';
import CreateGarage from '../modules/UI/createGarage';

export default class App {
  createUI: CreateUI;

  garage: CreateGarage;

  constructor() {
    this.createUI = new CreateUI();
    this.garage = new CreateGarage();
  }

  public async start() {
    const navigation = this.createUI.crateNavigation();
    const raceSection = this.createUI.createRaceSection();
    const footer = this.createUI.createFooter();

    const garage = await this.garage.createGarage();

    raceSection.append(garage);
    const body = document.querySelector('.body');

    if (body) {
      body.append(navigation, raceSection, footer);
    }
  }
}

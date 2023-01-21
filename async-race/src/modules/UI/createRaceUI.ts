import Tools from './tools/Tools';

export default class CreateUI {
  tools: Tools;

  constructor() {
    this.tools = new Tools();
  }

  public crateNavigation() {
    const buttonsBlock = this.tools.createElem('nav', 'navigate-buttons');

    const toGarageBtnBlock = this.tools.createElem('div', 'to-garage-button');
    const toWinnersBtnBlock = this.tools.createElem('div', 'to-winners-button');

    const garageBtn = this.tools.createElem('button', 'special-button', 'To Garage');
    toGarageBtnBlock.append(garageBtn);

    const winnersBtn = this.tools.createElem('button', 'special-button', 'To Winners');
    toWinnersBtnBlock.append(winnersBtn);

    buttonsBlock.append(toGarageBtnBlock, toWinnersBtnBlock);
    return buttonsBlock;
  }

  private createCarSetting() {
    const carsSettingBlock = this.tools.createElem('div', 'car-settings');

    const createCarBlock = this.tools.createElem('div', 'create-car-block');
    const inputCar = this.tools.createElem('input', 'create-car', undefined, 'text');
    const createColor = this.tools.createElem('input', 'create-color', undefined, 'color');
    const createBtnBlock = this.tools.createElem('div', 'create-button');
    const createBtn = this.tools.createElem('button', 'default-button', 'Create');
    createBtnBlock.append(createBtn);
    createCarBlock.append(inputCar, createColor, createBtnBlock);

    const updateCarBlock = this.tools.createElem('div', 'update-car-block');
    const updateCar = this.tools.createElem('input', 'update-car', undefined, 'text');
    const updateColor = this.tools.createElem('input', 'update-color', undefined, 'color');
    const updateBtnBlock = this.tools.createElem('div', 'update-button');
    const updateBtn = this.tools.createElem('button', 'default-button', 'Update');
    if (updateBtn instanceof HTMLButtonElement) {
      updateBtn.disabled = true;
    }
    updateBtnBlock.append(updateBtn);
    updateCarBlock.append(updateCar, updateColor, updateBtnBlock);

    const otherBtn = this.createOtherButtons();
    carsSettingBlock.append(createCarBlock, updateCarBlock, otherBtn);

    return carsSettingBlock;
  }

  private createOtherButtons() {
    const otherBtn = this.tools.createElem('div', 'other-buttons');

    const raceBtnBlock = this.tools.createElem('div', 'race-button');
    const raceBtn = this.tools.createElem('button', 'special-button', 'Race');
    raceBtnBlock.append(raceBtn);

    const resetBtnBlock = this.tools.createElem('div', 'reset-button');
    const resetBtn = this.tools.createElem('button', 'special-button', 'Reset');
    if (resetBtn instanceof HTMLButtonElement) {
      resetBtn.disabled = true;
    }
    resetBtnBlock.append(resetBtn);

    const generateCarsBtnBlock = this.tools.createElem('div', 'generate-cars-button');
    const generateCarsBtn = this.tools.createElem('button', 'default-button', 'Generate Cars');
    generateCarsBtnBlock.append(generateCarsBtn);

    otherBtn.append(raceBtnBlock, resetBtnBlock, generateCarsBtnBlock);

    return otherBtn;
  }

  public createRaceSection() {
    const raceSection = this.tools.createElem('section', 'race-section');

    const carSettings = this.createCarSetting();

    raceSection.append(carSettings);

    return raceSection;
  }

  public createFooter() {
    const footer = this.tools.createElem('div', 'footer');

    const paginationButtons = this.tools.createElem('div', 'footer-buttons');

    const paginationPrevBlock = this.tools.createElem('div', 'prev-button');
    const prevBtn = this.tools.createElem('button', 'special-button', 'Prev');
    if (prevBtn instanceof HTMLButtonElement) {
      prevBtn.disabled = true;
    }
    paginationPrevBlock.append(prevBtn);

    const paginationNextBlock = this.tools.createElem('div', 'next-button');
    const nextBtn = this.tools.createElem('button', 'special-button', 'Next');
    paginationNextBlock.append(nextBtn);

    paginationButtons.append(paginationPrevBlock, paginationNextBlock);

    footer.append(paginationButtons);

    return footer;
  }
}

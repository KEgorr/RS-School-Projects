import tools from '../tools/Tools';

export default class CreateUI {
  public crateNavigation() {
    const buttonsBlock = tools.createElem('nav', 'navigate-buttons');

    const toGarageBtnBlock = tools.createElem('div', 'to-garage-button');
    const toWinnersBtnBlock = tools.createElem('div', 'to-winners-button');

    const garageBtn = tools.createElem('button', 'special-button', 'To Garage');
    toGarageBtnBlock.append(garageBtn);

    const winnersBtn = tools.createElem('button', 'special-button', 'To Winners');
    toWinnersBtnBlock.append(winnersBtn);

    buttonsBlock.append(toGarageBtnBlock, toWinnersBtnBlock);
    return buttonsBlock;
  }

  private createCarSetting() {
    const carsSettingBlock = tools.createElem('div', 'car-settings');

    const createCarBlock = tools.createElem('div', 'create-car-block');
    const inputCar = tools.createElem('input', 'create-car', undefined, 'text');
    const createColor = tools.createElem('input', 'create-color', undefined, 'color');
    const createBtnBlock = tools.createElem('div', 'create-button');
    const createBtn = tools.createElem('button', 'default-button', 'Create');
    createBtnBlock.append(createBtn);
    createCarBlock.append(inputCar, createColor, createBtnBlock);

    const updateCarBlock = tools.createElem('div', 'update-car-block');
    const updateCar = tools.createElem('input', 'update-car', undefined, 'text');
    const updateColor = tools.createElem('input', 'update-color', undefined, 'color');
    const updateBtnBlock = tools.createElem('div', 'update-button');
    const updateBtn = tools.createElem('button', 'default-button', 'Update');
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
    const otherBtn = tools.createElem('div', 'other-buttons');

    const raceBtnBlock = tools.createElem('div', 'race-button');
    const raceBtn = tools.createElem('button', 'special-button', 'Race');
    raceBtnBlock.append(raceBtn);

    const resetBtnBlock = tools.createElem('div', 'reset-button');
    const resetBtn = tools.createElem('button', 'special-button', 'Reset');
    if (resetBtn instanceof HTMLButtonElement) {
      resetBtn.disabled = true;
    }
    resetBtnBlock.append(resetBtn);

    const generateCarsBtnBlock = tools.createElem('div', 'generate-cars-button');
    const generateCarsBtn = tools.createElem('button', 'default-button', 'Generate Cars');
    generateCarsBtnBlock.append(generateCarsBtn);

    otherBtn.append(raceBtnBlock, resetBtnBlock, generateCarsBtnBlock);

    return otherBtn;
  }

  public createRaceSection() {
    const raceSection = tools.createElem('section', 'race-section');

    const carSettings = this.createCarSetting();

    raceSection.append(carSettings);

    return raceSection;
  }
}

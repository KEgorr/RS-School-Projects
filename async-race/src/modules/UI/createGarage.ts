import ApiHandler from '../api/API';
import Tools from './tools/Tools';

export default class CreateGarage {
  tools: Tools;

  api: ApiHandler;

  constructor() {
    this.tools = new Tools();
    this.api = new ApiHandler();
  }

  public async createGarageHeader() {
    const garageHeader = this.tools.createElem('h1', 'garage-header');

    const carsCount = (await this.api.getCars(1)).count;

    if (carsCount) {
      garageHeader.textContent = `Garage (${carsCount})`;
    }

    return garageHeader;
  }

  private createPageCount() {
    const pageCount = this.tools.createElem('h2', 'page-count', 'Page #1');
    return pageCount;
  }

  private createCar(id: number, name: string, color: string) {
    const car = this.tools.createElem('div', 'car-item');
    car.id = `${id}`;

    const carInfo = this.tools.createElem('div', 'car-info');

    const carButtons = this.tools.createElem('div', 'car-buttons');

    const selectButtonBlock = this.tools.createElem('div', 'select-button');
    const selectBtn = this.tools.createElem('button', 'default-button', 'Select');
    selectButtonBlock.append(selectBtn);

    const removeButtonBlock = this.tools.createElem('div', 'remove-button');
    const removeBtn = this.tools.createElem('button', 'default-button', 'Remove');
    removeButtonBlock.append(removeBtn);

    carButtons.append(selectButtonBlock, removeButtonBlock);

    const carName = this.tools.createElem('p', 'car-name', `${name}`);
    carInfo.append(carButtons, carName);

    const carArea = this.tools.createElem('div', 'car-area');

    const carAreaButtons = this.tools.createElem('div', 'car-area-buttons');
    const startEngineBtnBlock = this.tools.createElem('div', 'start-engine-button');
    const startEngineBtn = this.tools.createElem('button', 'drive-button', 'A');
    startEngineBtnBlock.append(startEngineBtn);
    const disableEngineBtnBlock = this.tools.createElem('div', 'disable-engine-button');
    const disableEngineBtn = this.tools.createElem('button', 'disable-button', 'B');
    if (disableEngineBtn instanceof HTMLButtonElement) {
      disableEngineBtn.disabled = true;
    }
    disableEngineBtnBlock.append(disableEngineBtn);
    carAreaButtons.append(startEngineBtnBlock, disableEngineBtnBlock);

    const carImg = this.tools.createElem('div', 'car-img');
    carImg.innerHTML = this.createCarImg(color);

    const redFlag = this.tools.createElem('div', 'red-flag');
    redFlag.innerHTML = this.createFlag();

    carArea.append(carAreaButtons, carImg, redFlag);

    car.append(carInfo, carArea);
    return car;
  }

  public async renderCars(page: number) {
    const carsBlock = this.tools.createElem('div', 'cars-block');

    const cars = await this.api.getCars(page);
    cars.items.forEach((item) => {
      if (item.id) {
        const car = this.createCar(item.id, item.name, item.color);
        carsBlock.append(car);
      }
    });

    return carsBlock;
  }

  public async createGarage() {
    const garage = this.tools.createElem('div', 'garage');
    const header = await this.createGarageHeader();
    const page = this.createPageCount();
    const cars = await this.renderCars(1);

    garage.append(header, page, cars);

    return garage;
  }

  private createCarImg(color: string) {
    return `<?xml version="1.0" encoding="utf-8"?>
    <svg fill="${color}" width="100%" height="100%" viewBox="0 -39.69 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink"  style="enable-background:new 0 0 122.88 43.49" xml:space="preserve">
    <style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style>
      <g>
        <path class="st0" d="M103.94,23.97c5.39,0,9.76,4.37,9.76,9.76c0,5.39-4.37,9.76-9.76,9.76c-5.39,0-9.76-4.37-9.76-9.76 C94.18,28.34,98.55,23.97,103.94,23.97L103.94,23.97z M23,29.07v3.51h3.51C26.09,30.86,24.73,29.49,23,29.07L23,29.07z M26.52,34.87H23v3.51C24.73,37.97,26.09,36.6,26.52,34.87L26.52,34.87z M20.71,38.39v-3.51H17.2 C17.62,36.6,18.99,37.96,20.71,38.39L20.71,38.39z M17.2,32.59h3.51v-3.51C18.99,29.49,17.62,30.86,17.2,32.59L17.2,32.59z M105.09,29.07v3.51h3.51C108.18,30.86,106.82,29.49,105.09,29.07L105.09,29.07z M108.6,34.87h-3.51v3.51 C106.82,37.97,108.18,36.6,108.6,34.87L108.6,34.87z M102.8,38.39v-3.51h-3.51C99.71,36.6,101.07,37.96,102.8,38.39L102.8,38.39z M99.28,32.59h3.51v-3.51C101.07,29.49,99.71,30.86,99.28,32.59L99.28,32.59z M49.29,12.79c-1.54-0.35-3.07-0.35-4.61-0.28 C56.73,6.18,61.46,2.07,75.57,2.9l-1.94,12.87L50.4,16.65c0.21-0.61,0.33-0.94,0.37-1.55C50.88,13.36,50.86,13.15,49.29,12.79 L49.29,12.79z M79.12,3.13L76.6,15.6l24.13-0.98c2.48-0.1,2.91-1.19,1.41-3.28c-0.68-0.95-1.44-1.89-2.31-2.82 C93.59,1.86,87.38,3.24,79.12,3.13L79.12,3.13z M0.46,27.28H1.2c0.46-2.04,1.37-3.88,2.71-5.53c2.94-3.66,4.28-3.2,8.65-3.99 l24.46-4.61c5.43-3.86,11.98-7.3,19.97-10.2C64.4,0.25,69.63-0.01,77.56,0c4.54,0.01,9.14,0.28,13.81,0.84 c2.37,0.15,4.69,0.47,6.97,0.93c2.73,0.55,5.41,1.31,8.04,2.21l9.8,5.66c2.89,1.67,3.51,3.62,3.88,6.81l1.38,11.78h1.43v6.51 c-0.2,2.19-1.06,2.52-2.88,2.52h-2.37c0.92-20.59-28.05-24.11-27.42,1.63H34.76c3.73-17.75-14.17-23.91-22.96-13.76 c-2.67,3.09-3.6,7.31-3.36,12.3H2.03c-0.51-0.24-0.91-0.57-1.21-0.98c-1.05-1.43-0.82-5.74-0.74-8.23 C0.09,27.55-0.12,27.28,0.46,27.28L0.46,27.28z M21.86,23.97c5.39,0,9.76,4.37,9.76,9.76c0,5.39-4.37,9.76-9.76,9.76 c-5.39,0-9.76-4.37-9.76-9.76C12.1,28.34,16.47,23.97,21.86,23.97L21.86,23.97z"/>
      </g>
    </svg>`;
  }

  private createFlag() {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <svg version="1.1" viewBox="0 0 395.15 585.52" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(-173.85 -279.6)">
      <g transform="translate(88.75 204.41)">
        <g fill-rule="evenodd">
          <path d="m146.35 172.14c15.76-5.41 31.59-10.47 47.91-14.03 15.04-3.28 30.39-5.17 45.74-5.86 18.32-0.82 36.87-1.65 55.06 0.61 14.29 1.78 28.64 3.54 42.35 8.42 9.93 3.53 18.18 10.03 26.62 15.99 8.41 5.93 16.92 12.71 22.29 21.47 2.77 4.52 5.96 10.48 1.88 15.43-3.97 4.81-9.53 10.41-7.16 17.24 2.59 7.45 11.03 10.79 17.77 13.91 12.12 5.59 24.61 13.59 28.74 26.99 4.29 13.91-3.12 29.2-9.04 39.91s-8.82 20.84-13.49 29.28-2.94 16.34-4.55 24.36c-0.96 4.8-3.07 9.05-3.74 13.99-1.26 9.18-1.88 18.65-1.98 27.99-0.12 10.18-3.05 22.49-11.11 27.3-3.33 1.99-2.8-8.84-0.12-11.83 3.51-3.92 8.09-10.18 3.74-15.31-6.93-8.16-19.01-7.36-28.59-10.24-10.07-3.03-22.29-3.64-29.68-11.64-4.69-5.08 0.88-12.53 5.46-15.65 4.01-2.72 9.22-5.87 2.45-9.3-6.04-3.06-13.04-2.84-19.61-3.26-23.92-1.52-48.03-0.32-72.03 0.12-25.32 0.47-49.73 7.87-73.76 15.26-8.38-67.05-16.77-134.1-25.15-201.15z" fill="#d40000"/>
          <path d="m187.25 582.92-50.72-416.27 1.48-1.59 7.49-0.58 12.31 93.33 40.43 323.38-1.3 2.02-7.37 1.3-2.32-1.59z" fill="#501a08"/>
        </g>
      </g>
    </g>
    </svg>`;
  }
}

import api from '../../api/API';
import data from '../race-data';
import tools from '../tools/Tools';

class CreateGarage {
  private async createGarageHeader(page: number) {
    const garageHeader = tools.createElem('h1', 'count-header');

    const carsCount = (await api.getCars(page)).count;

    if (carsCount) {
      garageHeader.textContent = `Garage (${carsCount})`;
    }

    return garageHeader;
  }

  private createPageCount(page: number) {
    const pageCount = tools.createElem('h2', 'page-count', `Page #${page}`);
    return pageCount;
  }

  private createCar(id: number, name: string, color: string) {
    const car = tools.createElem('div', 'car-item');
    car.id = `${id}`;

    const carInfo = tools.createElem('div', 'car-info');

    const carButtons = tools.createElem('div', 'car-buttons');

    const selectButtonBlock = tools.createElem('div', 'select-button');
    const selectBtn = tools.createElem('button', 'default-button', 'Select');
    selectButtonBlock.append(selectBtn);

    const removeButtonBlock = tools.createElem('div', 'remove-button');
    const removeBtn = tools.createElem('button', 'default-button', 'Remove');
    removeButtonBlock.append(removeBtn);

    carButtons.append(selectButtonBlock, removeButtonBlock);

    const carName = tools.createElem('p', 'car-name', `${name}`);
    carInfo.append(carButtons, carName);

    const carArea = tools.createElem('div', 'car-area');

    const carAreaButtons = tools.createElem('div', 'car-area-buttons');
    const startEngineBtnBlock = tools.createElem('div', 'start-engine-button');
    const startEngineBtn = tools.createElem('button', 'drive-button', 'A');
    startEngineBtnBlock.append(startEngineBtn);
    const disableEngineBtnBlock = tools.createElem('div', 'disable-engine-button');
    const disableEngineBtn = tools.createElem('button', 'disable-button', 'B');
    if (disableEngineBtn instanceof HTMLButtonElement) {
      disableEngineBtn.disabled = true;
    }
    disableEngineBtnBlock.append(disableEngineBtn);
    carAreaButtons.append(startEngineBtnBlock, disableEngineBtnBlock);

    const carImg = tools.createElem('div', 'car-img');
    carImg.innerHTML = tools.createCarImg(color);

    const redFlag = tools.createElem('div', 'red-flag');
    redFlag.innerHTML = this.createFlag();

    carArea.append(carAreaButtons, carImg, redFlag);

    car.append(carInfo, carArea);
    return car;
  }

  public async renderCars(page: number) {
    const carsBlock = tools.createElem('div', 'cars-block');

    const cars = await api.getCars(page);
    cars.items.forEach((item) => {
      if (item.id) {
        const car = this.createCar(item.id, item.name, item.color);
        carsBlock.append(car);
      }
    });

    return carsBlock;
  }

  public async createGarage() {
    let racePage = data.getRacePage();
    if (racePage > (await data.getMaxRacePages())) {
      racePage -= 1;
      data.setRacePage(racePage);
    }
    const garage = tools.createElem('div', 'garage');
    const header = await this.createGarageHeader(racePage);
    const page = this.createPageCount(racePage);
    const cars = await this.renderCars(racePage);
    const racePagination = await this.createRacePagination();

    garage.append(header, page, cars, racePagination);

    return garage;
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

  private async createRacePagination() {
    const RacePagination = tools.createElem('div', 'race-pagination');

    const paginationButtons = tools.createElem('div', 'pagination-buttons');

    const paginationPrevBlock = tools.createElem('div', 'prev-button');
    const prevBtn = tools.createElem('button', 'special-button', 'Prev');
    if (prevBtn instanceof HTMLButtonElement) {
      if (data.getRacePage() === 1) {
        prevBtn.disabled = true;
      }
    }
    paginationPrevBlock.append(prevBtn);

    const paginationNextBlock = tools.createElem('div', 'next-button');
    const nextBtn = tools.createElem('button', 'special-button', 'Next');

    if (nextBtn instanceof HTMLButtonElement) {
      const maxPages = Number(await data.getMaxRacePages());
      if (data.getRacePage() === maxPages) {
        nextBtn.disabled = true;
      }
    }
    paginationNextBlock.append(nextBtn);

    paginationButtons.append(paginationPrevBlock, paginationNextBlock);

    RacePagination.append(paginationButtons);

    return RacePagination;
  }
}

const garage = new CreateGarage();

export default garage;

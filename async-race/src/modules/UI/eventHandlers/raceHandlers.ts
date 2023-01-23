import api from '../../api/API';
import data from '../race-data';
import garage from '../view/createGarage';
import winners from '../view/WinnersUI';

class RaceHandlers {
  public async createWithParams() {
    const createCarInput = document.querySelector('.create-car');
    const createCarColor = document.querySelector('.create-color');
    if (createCarInput instanceof HTMLInputElement && createCarColor instanceof HTMLInputElement) {
      const carName = createCarInput.value;
      const carColor = createCarColor.value;

      await api.createCar({ name: carName, color: carColor });
      await this.replaceGarage();
    }
  }

  public async removeCar(event: Event) {
    const { target } = event;

    if (target instanceof HTMLElement) {
      if (target.closest('.remove-button')) {
        const carToRemove = target.closest('.car-item');

        if (carToRemove) {
          const carId = Number(carToRemove.id);

          await api.deleteCar(carId);
          if (data.getWinnersIds().includes(carId)) {
            await api.deleteWinner(carId);
            data.removeWinner(carId);
            await this.replaceWinners();
          }
          await this.replaceGarage();
        }
      }
    }
  }

  public setCarToUpdate(event: Event) {
    const { target } = event;

    const selectedBtn = document.querySelector('.selected');

    if (target instanceof HTMLElement) {
      if (target.closest('.select-button')) {
        const upDateBtn = this.getUpdateBtn();
        target.classList.add('selected');
        target.textContent = 'Selected';
        upDateBtn.disabled = false;

        if (selectedBtn) {
          selectedBtn.classList.remove('selected');
          selectedBtn.textContent = 'Select';
          upDateBtn.disabled = true;
        }
        if (selectedBtn !== target) {
          upDateBtn.disabled = false;
        }
      }
    }
  }

  public async updateCar() {
    const carToUpdate = document.querySelector('.selected')?.closest('.car-item');
    if (carToUpdate) {
      const carId = Number(carToUpdate.id);

      const updateCarInput = document.querySelector('.update-car');
      const updateCarColor = document.querySelector('.update-color');
      if (updateCarInput instanceof HTMLInputElement) {
        if (updateCarColor instanceof HTMLInputElement) {
          const carName = updateCarInput.value;
          const carColor = updateCarColor.value;

          await api.updateCar(carId, { name: carName, color: carColor });
          await this.replaceGarage();

          const updateBtn = this.getUpdateBtn();

          updateBtn.disabled = true;
        }
      }
    }
  }

  public async generateCars() {
    const carMarks = [
      'Audi',
      'BMW',
      'Ford',
      'Honda',
      'Lada',
      'Mazda',
      'Nissan',
      'Renault',
      'Wolkswagen',
      'Tayota',
      'Skoda',
      'Mercedes',
    ];

    const carTypes = ['A7', 'Focus', 'Arcana', 'Logan', 'M8', 'Pilot', '6', 'Ariya', 'Polo', 'Supra', 'AMG'];

    const carNames: string[] = [];

    for (let i = 1; i <= 100; i += 1) {
      const carMark = carMarks[Math.floor(Math.random() * carMarks.length)];
      const carType = carTypes[Math.floor(Math.random() * carTypes.length)];
      const carName = `${carMark} ${carType}`;

      carNames.push(carName);
    }

    carNames.map(async (car) => {
      await api.createCar({ name: car, color: this.generateRandomColor() });
    });
    await this.replaceGarage();
  }

  public async paginationHandler(event: Event) {
    const { target } = event;

    if (target instanceof HTMLElement) {
      if (target.closest('.next-button')) {
        const currentPage = data.getRacePage();
        data.setRacePage(currentPage + 1);

        await this.replaceGarage();
      }
      if (target.closest('.prev-button')) {
        const currentPage = data.getRacePage();
        data.setRacePage(currentPage - 1);

        await this.replaceGarage();
      }
    }
  }

  private generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private async replaceGarage() {
    const curGarage = document.querySelector('.garage');
    if (curGarage) {
      const newGarage = await garage.createGarage();
      curGarage.replaceWith(newGarage);
    }
  }

  private async replaceWinners() {
    const curWinners = document.querySelector('.winners-info');
    if (curWinners) {
      const newWinners = await winners.getWinners();
      curWinners.replaceWith(newWinners);
    }
  }

  private getUpdateBtn() {
    const updateBtnBlock = document.querySelector('.update-button');
    if (updateBtnBlock) {
      const updateBtn = updateBtnBlock.querySelector('.default-button');
      if (updateBtn instanceof HTMLButtonElement) {
        return updateBtn;
      }
    }
    throw new Error('Update button is not defined');
  }
}

const raceHandlers = new RaceHandlers();

export default raceHandlers;

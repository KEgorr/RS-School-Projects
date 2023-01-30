import { CarInRace } from '../../../dataTypes/dataTypes';
import api from '../../api/API';
import data from '../race-data';
import tools from '../tools/Tools';
import garage from '../view/createGarage';
import winners from '../view/WinnersUI';

class CarsHandlers {
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
          try {
            await api.deleteWinner(carId);
            await this.replaceWinners();
          } catch (error) {
            console.log(error);
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
          await this.replaceWinners();

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
      await api.createCar({ name: car, color: tools.generateRandomColor() });
    });
    await this.replaceGarage();
  }

  public async paginationHandler(event: Event) {
    const { target } = event;

    if (target instanceof HTMLElement) {
      const upDateBtn = this.getUpdateBtn();
      if (target.closest('.next-button')) {
        const currentPage = data.getRacePage();
        data.setRacePage(currentPage + 1);

        await this.replaceGarage();
        upDateBtn.disabled = true;
      }
      if (target.closest('.prev-button')) {
        const currentPage = data.getRacePage();
        data.setRacePage(currentPage - 1);

        await this.replaceGarage();
        upDateBtn.disabled = true;
      }
    }
  }

  private setToDriveMod(id: number) {
    const carItem = document.getElementById(`${id}`);

    if (carItem) {
      const driveButton = carItem.querySelector('.drive-button');
      const stopButton = carItem.querySelector('.disable-button');
      if (driveButton instanceof HTMLButtonElement && stopButton instanceof HTMLButtonElement) {
        driveButton.disabled = true;
        stopButton.disabled = false;
      }
    }
  }

  private async getNewWinner(winnerID: number): Promise<CarInRace> {
    const engine = await api.startEngine(winnerID);
    const newWinner = new Promise<CarInRace>((resolve, reject) => {
      const winTime = engine.distance / engine.velocity;
      const carArea = document.querySelector('.car-area');
      if (carArea instanceof HTMLElement) {
        const width = carArea.offsetWidth;
        const state = tools.startAnim(winnerID, width - 100, winTime);
        this.setToDriveMod(winnerID);
        const timerId = setTimeout(() => {
          resolve({ id: winnerID, time: Number((winTime / 1000).toFixed(2)), CarSuccess: true });
        }, winTime);
        api
          .drive(winnerID)
          .then((val) => val.success)
          .then((success) => {
            if (!success) {
              clearTimeout(timerId);
              tools.stopAnim(state.id);
              reject();
            }
          })
          .catch((err) => console.log(err));
      }
    });
    return newWinner;
  }

  public async startRace(event: Event) {
    const { target } = event;
    if (target instanceof HTMLElement) {
      if (target.closest('.start-engine-button')) {
        const carItem = target.closest('.car-item');
        if (carItem instanceof HTMLElement) {
          const carItemId = Number(carItem.id);
          await this.getNewWinner(carItemId);
        }
      }
    }
  }

  public async raceAll() {
    const carItems = document.querySelectorAll('.car-item');
    const winnersPromises: Promise<CarInRace>[] = [];
    carItems.forEach((car) => {
      (async () => {
        if (car instanceof HTMLElement) {
          const carId = Number(car.id);
          winnersPromises.push(this.getNewWinner(carId));
        }
      })().catch((err) => console.log(err));
    });
    const newWinner = await Promise.any(winnersPromises);
    const allWinner = await api.getAllWinners();

    if (allWinner.filter((winner) => winner.id === newWinner.id).length) {
      const oldWinner = await api.getWinner(newWinner.id);
      const newWinsCount = oldWinner.wins + 1;
      let newTime = 0;
      if (oldWinner.time < newWinner.time) {
        newTime = oldWinner.time;
      } else {
        newTime = newWinner.time;
      }
      await api.updateWinner(newWinner.id, { wins: newWinsCount, time: newTime });
    } else {
      await api.createWinner({ id: newWinner.id, wins: 1, time: newWinner.time });
    }
    await this.replaceWinners();
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

const carsHandlers = new CarsHandlers();

export default carsHandlers;

import { Car, Winner } from '../../dataTypes/dataTypes';
import TypeGuard from '../../dataTypes/typeGuards';

export default class ApiHandler {
  private baseUrl: string;

  private garage: string;

  private engine: string;

  private winners: string;

  private typeGuard: TypeGuard;

  constructor() {
    this.baseUrl = 'http://127.0.0.1:3000';
    this.garage = 'garage';
    this.engine = 'engine';
    this.winners = 'winners';
    this.typeGuard = new TypeGuard();
  }

  public async getCars(page: number, limit = 7) {
    const response = await fetch(`${this.baseUrl}/${this.garage}?_page=${page}&_limit=${limit}`);
    const data: unknown = await response.json();
    if (this.typeGuard.isCarsArr(data)) {
      return {
        items: data,
        count: response.headers.get('X-Total-Count'),
      };
    }
    throw new Error(`${response.statusText}`);
  }

  public async getCar(id: number) {
    const response = await fetch(`${this.baseUrl}/${this.garage}/${id}`);
    const data: unknown = await response.json();
    if (this.typeGuard.isCar(data)) return data;
    throw new Error(`${response.statusText}`);
  }

  public async createCar(body: Car) {
    await fetch(`${this.baseUrl}/${this.garage}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async deleteCar(id: number) {
    await fetch(`${this.baseUrl}/${this.garage}/${id}`, {
      method: 'DELETE',
    });
  }

  public async updateCar(id: number, body: Car) {
    await fetch(`${this.baseUrl}/${this.garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async startEngine(id: number) {
    const response = await fetch(`${this.baseUrl}/${this.engine}/?id=${id}&status=started`, {
      method: 'PATCH',
    });
    const data: unknown = await response.json();
    if (this.typeGuard.isCarEngine(data)) return data;
    throw new Error(`${response.statusText}`);
  }

  public async stopEngine(id: number) {
    const response = await fetch(`${this.baseUrl}/${this.engine}/?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    const data: unknown = await response.json();
    if (this.typeGuard.isCarEngine(data)) return data;
    throw new Error(`${response.statusText}`);
  }

  public async drive(id: number) {
    const response = await fetch(`${this.baseUrl}/${this.engine}/?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    if (response.status !== 200) {
      return { success: false };
    }
    const data: unknown = await response.json();
    if (this.typeGuard.isEngineStatus(data)) return data;
    throw new Error(`${response.statusText}`);
  }

  public async getWinners(page: number, sort?: string, order?: string, limit = 10) {
    let sorting = '';
    if (sort && order) {
      sorting = `&_sort=${sort}&_order=${order}`;
    }
    const response = await fetch(`${this.baseUrl}/${this.winners}?_page=${page}&_limit=${limit}${sorting}`);
    const winners: unknown = await response.json();

    if (this.typeGuard.isWinnersArr(winners)) {
      const cars = Promise.all(
        winners.map(async (winner) => {
          if (winner.id) {
            return {
              ...winner,
              car: await this.getCar(winner.id),
            };
          }
          throw new Error('winner.id is not defined');
        })
      );
      return {
        items: await cars,
        count: response.headers.get('X-Total-Count'),
      };
    }
    throw new Error(`${response.statusText}`);
  }

  public async getWinner(id: number) {
    const response = await fetch(`${this.baseUrl}/${this.winners}/${id}`);
    const winner: unknown = await response.json();
    if (this.typeGuard.isWinner(winner)) {
      return winner;
    }
    throw new Error(`${response.statusText}`);
  }

  public async createWinner(body: Winner) {
    await fetch(`${this.baseUrl}/${this.winners}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async deleteWinner(id: number) {
    await fetch(`${this.baseUrl}/${this.winners}/${id}`, {
      method: 'DELETE',
    });
  }

  public async updateWinner(id: number, body: Winner) {
    await fetch(`${this.baseUrl}/${this.winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

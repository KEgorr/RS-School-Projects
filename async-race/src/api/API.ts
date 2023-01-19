import { CarEngine, Cars, EngineStatus, Winners } from '../dataTypes/dataTypes';

export class ApiHandler {
  private baseUrl: string;

  private garage: string;

  private engine: string;

  private winners: string;

  constructor() {
    this.baseUrl = 'http://127.0.0.1:3000';
    this.garage = 'garage';
    this.engine = 'engine';
    this.winners = 'winners';
  }

  public async getCars(page: number, limit = 7) {
    const response = await fetch(`${this.baseUrl}/${this.garage}?_page=${page}&_limit=${limit}`);
    const data = (await response.json()) as Cars[];
    return {
      items: data,
      count: response.headers.get('X-Total-Count'),
    };
  }

  public async getCar(id: number) {
    const response = await fetch(`${this.baseUrl}/${this.garage}/${id}`);
    const data = (await response.json()) as Cars;
    return data;
  }

  public async createCar(body: Cars) {
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

  public async updateCar(id: number, body: Cars) {
    await fetch(`${this.baseUrl}/${this.garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async startEngine(id: number) {
    const response = fetch(`${this.baseUrl}/${this.engine}/?id=${id}&status=started`, {
      method: 'PATCH',
    });
    const data = (await response).json() as Promise<CarEngine>;
    return data;
  }

  public async stopEngine(id: number) {
    const response = fetch(`${this.baseUrl}/${this.engine}/?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    const data = (await response).json() as Promise<CarEngine>;
    return data;
  }

  public async drive(id: number) {
    const response = await fetch(`${this.baseUrl}/${this.engine}/?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    if (response.status !== 200) {
      return { success: false };
    }
    const data = (await response.json()) as EngineStatus;
    return data;
  }

  public async getWinners(page: number, sort?: string, order?: string, limit = 10) {
    let sorting = '';
    if (sort && order) {
      sorting = `&_sort=${sort}&_order=${order}`;
    }
    const response = await fetch(`${this.baseUrl}/${this.winners}?_page=${page}&_limit=${limit}${sorting}`);
    const winners = (await response.json()) as Winners[];

    const cars = Promise.all(
      winners.map(async (winner) => {
        if (winner.id) {
          return {
            ...winner,
            car: await this.getCar(winner.id),
          };
        }
        return 'winner.id is not defined';
      })
    );

    return {
      items: await cars,
      count: response.headers.get('X-Total-Count'),
    };
  }

  public async getWinner(id: number) {
    const response = await fetch(`${this.baseUrl}/${this.winners}/${id}`);
    const winner = (await response.json()) as Winners;
    return winner;
  }

  public async createWinner(body: Winners) {
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

  public async updateWinner(id: number, body: Winners) {
    await fetch(`${this.baseUrl}/${this.winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default { ApiHandler };

export interface Car {
  name: string;
  color: string;
  id?: number;
}

export interface CarEngine {
  velocity: number;
  distance: number;
}

export interface EngineStatus {
  success: boolean;
}

export interface Winner {
  id?: number;
  wins: number;
  time: number;
}

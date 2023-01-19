export interface Cars {
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

export interface Winners {
  id?: number;
  wins: number;
  time: number;
}

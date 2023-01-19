import { CarEngine, Car, EngineStatus, Winner } from './dataTypes';

export default class TypeGuard {
  public isCar(obj: unknown): obj is Car {
    return (obj as Car).name !== undefined;
  }

  public isCarsArr(obj: unknown): obj is Car[] {
    return (obj as Car[]).every((el) => this.isCar(el));
  }

  public isCarEngine(obj: unknown): obj is CarEngine {
    return (obj as CarEngine).velocity !== undefined;
  }

  public isEngineStatus(obj: unknown): obj is EngineStatus {
    return (obj as EngineStatus).success !== undefined;
  }

  public isWinner(obj: unknown): obj is Winner {
    return (obj as Winner).wins !== undefined;
  }

  public isWinnersArr(obj: unknown): obj is Winner[] {
    return (obj as Winner[]).every((el) => this.isWinner(el));
  }
}

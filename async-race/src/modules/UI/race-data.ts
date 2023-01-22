class RaceData {
  currentRacePage = 1;

  currentWinnersPage = 1;

  sort: string | undefined;

  order: string | undefined;

  public getRacePage() {
    return this.currentRacePage;
  }

  public setRacePage(page: number) {
    this.currentRacePage = page;
  }

  public getWinnersPage() {
    return this.currentWinnersPage;
  }

  public setWinnersPage(page: number) {
    this.currentWinnersPage = page;
  }

  public getSort() {
    return this.sort;
  }

  public getOrder() {
    return this.order;
  }

  public setSorting(sort: string, order: string) {
    this.sort = sort;
    this.order = order;
  }
}

const data = new RaceData();

export default data;

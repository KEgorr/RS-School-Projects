import ApiHandler from '../api/API';
import Tools from './tools/Tools';

export default class Winners {
  tools: Tools;

  api: ApiHandler;

  constructor() {
    this.tools = new Tools();
    this.api = new ApiHandler();
  }

  public async createWinners(page: number, sort?: string, order?: string) {
    const winners = await this.api.getWinners(page);
    const winnersInfo = this.tools.createElem('div', 'winners-info');
    const winnersHeader = this.tools.createElem('h1', 'count-header');
    if (winners.count) {
      winnersHeader.textContent = `Winners(${winners.count})`;
    }
    const winnersPage = this.tools.createElem('h2', 'page-count');
    winnersPage.textContent = `Page #${page}`;

    const carTable = await this.createCarTable(page, sort, order);

    const winnersSection = this.tools.createElem('section', 'winners-section');

    winnersInfo.append(winnersHeader, winnersPage, carTable);
    winnersSection.append(winnersInfo);

    return winnersSection;
  }

  private async createCarTable(page: number, sort?: string, order?: string) {
    const winners = await this.api.getWinners(page, sort, order);

    const winnersTable = this.tools.createElem('table', 'winners-table');

    const tableHeader = this.tools.createElem('thead', 'table-header');
    const tableHeaderRow = this.tools.createElem('tr', 'table-header__row');
    const tableHeaderContent = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];
    tableHeaderContent.forEach((el) => {
      const content = this.tools.createElem('th', 'table-header__content', el);
      tableHeaderRow.append(content);
    });
    tableHeader.append(tableHeaderRow);

    const tableBody = this.tools.createElem('tbody', 'table-body');
    winners.items.forEach((item) => {
      const tableBodyContent = this.tools.createElem('tr', 'table-body-row');
      if (item.id) {
        const winnerId = this.tools.createElem('td', 'table-body-row__content', `${item.id}`);
        tableBodyContent.append(winnerId);
      }
      const carImgTd = this.tools.createElem('td', 'table-body-row__content_img');
      const carImg = this.tools.createCarImg(item.car.color);
      carImgTd.innerHTML = carImg;
      const carName = this.tools.createElem('td', 'table-body-row__content', item.car.name);
      const carWins = this.tools.createElem('td', 'table-body-row__content', `${item.wins}`);
      const carTime = this.tools.createElem('td', 'table-body-row__content', `${item.time}`);
      tableBodyContent.append(carImgTd, carName, carWins, carTime);

      tableBody.append(tableBodyContent);
    });

    winnersTable.append(tableHeader, tableBody);

    return winnersTable;
  }

  public createPaginationWinners() {
    const winnersPaginationBlock = this.tools.createElem('div', 'footer');

    const paginationButtons = this.tools.createElem('div', 'footer-buttons');

    const paginationPrevBlock = this.tools.createElem('div', 'prev-button');
    const prevBtn = this.tools.createElem('button', 'special-button', 'Prev');
    if (prevBtn instanceof HTMLButtonElement) {
      prevBtn.disabled = true;
    }
    paginationPrevBlock.append(prevBtn);

    const paginationNextBlock = this.tools.createElem('div', 'next-button');
    const nextBtn = this.tools.createElem('button', 'special-button', 'Next');
    paginationNextBlock.append(nextBtn);

    paginationButtons.append(paginationPrevBlock, paginationNextBlock);

    winnersPaginationBlock.append(paginationButtons);

    return winnersPaginationBlock;
  }
}

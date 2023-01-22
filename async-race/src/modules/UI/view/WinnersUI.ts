import api from '../../api/API';
import data from '../race-data';
import tools from '../tools/Tools';

export default class Winners {
  public createWinnersSection() {
    const winnersSection = tools.createElem('section', 'winners-section');
    return winnersSection;
  }

  private async createWinners(page: number, sort?: string, order?: string) {
    const winners = await api.getWinners(page);
    const winnersInfo = tools.createElem('div', 'winners-info');
    const winnersHeader = tools.createElem('h1', 'count-header');
    if (winners.count) {
      winnersHeader.textContent = `Winners(${winners.count})`;
    }
    const winnersPage = tools.createElem('h2', 'page-count');
    winnersPage.textContent = `Page #${page}`;

    const carTable = await this.createCarTable(page, sort, order);

    winnersInfo.append(winnersHeader, winnersPage, carTable);

    return winnersInfo;
  }

  private async createCarTable(page: number, sort?: string, order?: string) {
    const winners = await api.getWinners(page, sort, order);

    const winnersTable = tools.createElem('table', 'winners-table');

    const tableHeader = tools.createElem('thead', 'table-header');
    const tableHeaderRow = tools.createElem('tr', 'table-header__row');
    const tableHeaderContent = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];
    tableHeaderContent.forEach((el) => {
      const content = tools.createElem('th', 'table-header__content', el);
      tableHeaderRow.append(content);
    });
    tableHeader.append(tableHeaderRow);

    const tableBody = tools.createElem('tbody', 'table-body');
    winners.items.forEach((item, value) => {
      const tableBodyContent = tools.createElem('tr', 'table-body-row');
      const winnerId = tools.createElem('td', 'table-body-row__content', `${value + 1}`);
      tableBodyContent.append(winnerId);
      const carImgTd = tools.createElem('td', 'table-body-row__content_img');
      carImgTd.classList.add('table-body-row__content');
      const carImg = tools.createCarImg(item.car.color);
      carImgTd.innerHTML = carImg;
      const carName = tools.createElem('td', 'table-body-row__content', item.car.name);
      const carWins = tools.createElem('td', 'table-body-row__content', `${item.wins}`);
      const carTime = tools.createElem('td', 'table-body-row__content', `${item.time}`);
      tableBodyContent.append(carImgTd, carName, carWins, carTime);

      tableBody.append(tableBodyContent);
    });

    winnersTable.append(tableHeader, tableBody);

    return winnersTable;
  }

  public createPaginationWinners() {
    const winnersPaginationBlock = tools.createElem('div', 'winners-pagination');

    const paginationButtons = tools.createElem('div', 'pagination-buttons');

    const paginationPrevBlock = tools.createElem('div', 'prev-button');
    const prevBtn = tools.createElem('button', 'special-button', 'Prev');
    if (prevBtn instanceof HTMLButtonElement) {
      prevBtn.disabled = true;
    }
    paginationPrevBlock.append(prevBtn);

    const paginationNextBlock = tools.createElem('div', 'next-button');
    const nextBtn = tools.createElem('button', 'special-button', 'Next');
    paginationNextBlock.append(nextBtn);

    paginationButtons.append(paginationPrevBlock, paginationNextBlock);

    winnersPaginationBlock.append(paginationButtons);

    return winnersPaginationBlock;
  }

  public getWinners() {
    const winnersPage = data.getWinnersPage();
    const sort = data.getSort();
    const order = data.getOrder();

    return this.createWinners(winnersPage, sort, order);
  }
}

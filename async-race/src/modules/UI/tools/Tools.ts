export default class Tools {
  public createElem(elem: string, className: string, text?: string, type?: string) {
    const newElement = document.createElement(`${elem}`);
    newElement.classList.add(className);
    if (text) {
      newElement.textContent = text;
    }
    if (type && newElement instanceof HTMLInputElement) {
      newElement.type = type;
      if (type === 'color') {
        newElement.value = '#ffffff';
      }
    }
    return newElement;
  }
}

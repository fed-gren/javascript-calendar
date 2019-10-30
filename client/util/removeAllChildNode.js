export default (element) => {
  while (element.lastChild) {
    element.firstChild.remove();
  }
};
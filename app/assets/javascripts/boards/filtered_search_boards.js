export default class FilteredSearchBoards extends gl.FilteredSearchManager {
  constructor(store, updateUrl = false) {
    super('boards');

    this.store = store;
    this.updateUrl = updateUrl;

    // Issue boards is slightly different, we handle all the requests async
    // instead or reloading the page, we just re-fire the list ajax requests
    this.isHandledAsync = true;
  }

  updateObject(path) {
    this.store.path = path.substr(1);

    if (this.updateUrl) {
      gl.issueBoards.BoardsStore.updateFiltersUrl();
    }
  }

  updateTokens() {
    const tokens = document.querySelectorAll('.js-visual-token');

    // Remove all the tokens as they will be replaced by the search manager
    [].forEach.call(tokens, (el) => {
      el.parentNode.removeChild(el);
    });

    this.loadSearchParamsFromURL();

    // Get the placeholder back if search is empty
    this.filteredSearchInput.dispatchEvent(new Event('input'));
  }
}

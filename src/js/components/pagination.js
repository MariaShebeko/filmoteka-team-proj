import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from '../refs/refs';
const { paginationEl, galleryEl, paginationLibEl } = refs;

// console.log("asdasd", paginationEl);

// new Pagination(paginationEl);

export default class CustomPagination {
  constructor(element) {
    this.perPage = 20;
    this.isDraw = false;
    const options = {
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      centerAlign: true,
      visiblePages: 5,
      template: {
        page: '<span class="pageNumber"><a href="#" class="btn-no-border tui-page-btn custom-page">{{page}}</a></span>',
        currentPage: '<strong class="btn-no-border tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="btn-no-border tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="btn-no-border tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="btn-no-border tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };
    this.pagination = new Pagination(element, options);
    this.pagination.on('beforeMove', this.#beforeMoveHandler.bind(this));
  }

  onPageClicked(fun) {
    this.pageClickedCallbackFunction = fun;
  }

  draw(data) {
    this.isDraw = true;
    // console.log("pagination", data);
    this.pagination.setTotalItems(data.total_results);
    this.pagination.setItemsPerPage(this.perPage);
    this.pagination.movePageTo(data.page);
  }

  reset() {
    this.pagination.reset();
  }

  #beforeMoveHandler(evt) {
    if (this.isDraw) {
      this.isDraw = false;
      return;
    }
    window.scrollTo({ top: galleryEl.offsetTop, behavior: 'smooth' });
    this.pageClickedCallbackFunction(evt.page);
  }
}

export const swithPagination = id => {
  // console.log(id, paginationLibEl);
  switch (id) {
    case 2:
      paginationLibEl.classList.remove('displayNone');
      paginationEl.classList.add('displayNone');
      break;
    case 1:
    default:
      paginationLibEl.classList.add('displayNone');
      paginationEl.classList.remove('displayNone');
      break;
  }
};

window.pagination = new CustomPagination(paginationEl);

// export default CustomPagination;

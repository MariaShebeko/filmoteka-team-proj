import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from '../refs/refs';
const { paginationEl } = refs;

// console.log("asdasd", paginationEl);

// new Pagination(paginationEl);

class CustomPagination {
    constructor() {
        this.perPage = 20;
        this.isDraw = false;
        const options = {
            firstItemClassName: 'tui-first-child',
            lastItemClassName: 'tui-last-child',
            centerAlign: true,
            visiblePages: 7,
            template: {
                page: '<span><a href="#" class="btn-no-border tui-page-btn custom-page">{{page}}</a></span>',
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
                    '</a>'
            }
        };
        this.pagination = new Pagination(paginationEl, options);
        this.pagination.on('beforeMove', this.#beforeMoveHandler.bind(this));
    }

    onPageClicked(fun) {
        this.pageClickedCallbackFunction = fun;
    }

    draw(data) {
        this.isDraw = true;
        this.pagination.setTotalItems(data.total_results);
        this.pagination.setItemsPerPage(Math.floor(data.total_results / data.total_pages));
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
        this.pageClickedCallbackFunction(evt.page);
    }
}

window.pagination = new CustomPagination();

// export default CustomPagination;

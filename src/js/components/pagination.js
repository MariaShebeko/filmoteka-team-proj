import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from '../refs/refs';
const { paginationEl } = refs;

// console.log("asdasd", paginationEl);

// new Pagination(paginationEl);


class CustomPagination{

    constructor() {
        this.perPage = 20;
        this.isDraw = false;
        this.pagination = new Pagination(paginationEl);
        this.pagination.on('beforeMove', this.#beforeMoveHandler.bind(this))
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

export default CustomPagination;
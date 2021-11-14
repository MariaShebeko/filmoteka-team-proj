export default class MyLibraryApi{
    constructor() {
        this.perPage = 20;
        this.pageNumber_q = 1;
        this.total_q = 0;
        this.data_q = [];
        this.pageNumber_w = 1;
        this.total_w = 0;
        this.data_w = [];
    }

    getWatchedFilms() {
        return this.setWatchedData(JSON.parse(localStorage.getItem('watched')));
    }

    getQueueFilms() {
        return this.setQueueData(JSON.parse(localStorage.getItem('queue')));
    }

    setWatchedData(data) {
        this.data_w = data || [];
        this.total_w = this.data_w.length;
        return this.getWatchedData();
    }

    setQueueData(data) {
        this.data_q = data || [];
        this.total_q = this.data_q.length;
        return this.getQueueData();
    }

    getWatchedData() {
        // debugger;
        const to = this.perPage * this.pageNumber_w;
        const from = to - this.perPage;
        // console.log(Math.ceil(this.total_w / this.perPage));
        return {
            results: this.data_w.splice(from, to),
            total_results: this.total_w,
            total_pages: Math.ceil(this.total_w / this.perPage),
            page: this.pageNumber_w
        };
    }

    getQueueData() {
        const to = this.perPage * this.pageNumber_q;
        const from = to - this.perPage;
        return {
            results: this.data_q.splice(from, to),
            total_results: this.total_q,
            total_pages: Math.ceil(this.total_q / this.perPage),
            page: this.pageNumber_q
        };
    }

    setWatchedPage(pageNumber) {
        // debugger;
        this.pageNumber_w = pageNumber;
        
        if (this.pageNumber_w > Math.ceil(this.total_w / this.perPage))
            this.pageNumber_w = Math.ceil(this.total_w / this.perPage);
        if (this.pageNumber_w <= 0)
            this.pageNumber_w = 1;
        
    }

    setQueuePage(pageNumber) {
        this.pageNumber_q = pageNumber;
        
        if (this.pageNumber_q > Math.ceil(this.total_q / this.perPage))
            this.pageNumber_q = Math.ceil(this.total_q / this.perPage);
        if (this.pageNumber_q <= 0)
            this.pageNumber_q = 1;
    }
}
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'lib-generic-pagination',
    templateUrl: './generic-pagination.component.html',
})
export class GenericPaginationComponent implements OnInit, OnChanges {
    @Input() totalRecords = 0;
    @Input() recordsPerPage = 0;

    @Output() onPageChange: EventEmitter<number> = new EventEmitter();

    public pages: number [] = [];
    @Input() activePage: number;

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): any {
        const pageCount = this.getPageCount();
        this.pages = this.getArrayOfPage(pageCount);
    }

    private getPageCount(): number {
        let totalPage = 0;

        if (this.totalRecords > 0 && this.recordsPerPage > 0) {
            const pageCount = this.totalRecords / this.recordsPerPage;
            const roundedPageCount = Math.floor(pageCount);

            totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
        }

        return totalPage;
    }

    private getArrayOfPage(pageCount: number): number [] {
        const pageArray = [];

        if (pageCount > 0) {
            for (let i = 1; i <= pageCount; i++) {
                pageArray.push(i);
            }
        }

        return pageArray;
    }

    onClickPage(pageNumber: number): void {
        if (pageNumber >= 1 && pageNumber <= this.pages.length) {
            this.activePage = pageNumber;
            this.onPageChange.emit(this.activePage);
        }
    }
}

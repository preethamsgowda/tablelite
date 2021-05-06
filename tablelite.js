"use strict";

export default class TLite {
  constructor(tableSelector, data, cols) {
    this.table = $(tableSelector);
    this.iNumCurPage = null;
    this.totalDisplay = null;
    this.body = null;
    this.data = data;
    this.cols = cols;
    this.totalItems = 0;
    this.itemsPerPage = 5;
    this.currentPage = 0;
    this.totalPages = 0;
    this.createPaginationDomElements();
    this.dataChange();
    this.initPaginationEvents();
  }
  setData(data) {
    this.data = data;
    this.dataChange();
  }
  dataChange() {
    this.totalItems = this.data.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = this.totalItems > 0 ? 1 : 0;
    this.updateTable();
  }
  pageChange(pageNumber) {
    if (pageNumber === this.currentPage) return;
    if (
      Number.isInteger(pageNumber) ||
      pageNumber < 0 ||
      pageNumber > this.totalPages
    ) {
      console.log("Inavlid Page Number!");
      return;
    }
    this.currentPage = pageNumber;
    this.updatePage();
  }
  updateTable() {
    this.table.empty();
    let header = "<tr>";
    for (let col of this.cols) {
      header += "<th>" + col[1] + "</th>";
    }
    header += "</tr>";
    this.table.append($(header));
    this.body = $("<tbody></tbody>");
    this.table.append(this.body);

    this.updatePage();
    this.updatePaginationDomElements();
  }
  updatePage() {
    if (this.totalItems < 1) return;
    this.body.empty();
    let startItem = (this.currentPage - 1) * this.itemsPerPage;
    let endItem = startItem + this.itemsPerPage;
    endItem = endItem > this.totalItems ? this.totalItems : endItem;
    for (let i = startItem; i < endItem; i++) {
      let row = "<tr>";
      for (let col of this.cols) {
        row += "<td>" + this.data[i][col[0]] + "</td>";
      }
      row += "</tr>";
      this.body.append($(row));
    }
  }
  createPaginationDomElements() {
    let pagination = $("<div></div>");
    pagination.append($("<span>Page: </span>"));
    let paginationContainer = $(
      "<span class='pagination-container input-border p-2'></span>"
    );
    this.iNumCurPage = $(
      "<input class='pagination-input no-focus-outline no-border' type='number' step='1' min='0' max='0' value='0'/>"
    );
    this.totalDisplay = $("<span>0</span>");
    paginationContainer.append(this.iNumCurPage);
    paginationContainer.append($("<span> / </span>"));
    paginationContainer.append(this.totalDisplay);
    pagination.append(paginationContainer);
    pagination.insertAfter(this.table);
  }
  updatePaginationDomElements() {
    this.iNumCurPage.attr({
      min: this.totalPages > 0 ? 1 : 0,
      max: this.totalPages,
    });
    this.iNumCurPage.val(this.totalPages > 0 ? 1 : 0);
    this.totalDisplay.html(this.totalPages);
  }
  initPaginationEvents() {
    let that = this;
    this.iNumCurPage.change(function () {
      that.pageChange($(this).val());
    });
  }
}

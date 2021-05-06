import TLite from "/tablelite.js";

$(document).ready(function () {
  let data;
  try {
    $.getJSON(
      "https://mockend.com/preethamsgowda/mock-data/items",
      function (data) {
        console.log("data: ", data);
        initTable(data);
      }
    ).fail(function (err) {
      console.log("Error: ", err.status, ", ", err.responseText);
    });
  } catch (error) {
    console.log("Error while parsing data, terminating!");
    return;
  }

  // data = sortOnKey(data, "dateAdded", "desc");

  // let dt = new Datatable("#projects-table", data, [
  //   ["Project Title", "projectTitle"],
  //   ["Username", "username"],
  //   ["Category Name", "categoryName"],
  // ]);

  let initTable = data => {
    let dt = new TLite("#the-table", data, [
      ["code", "Code"],
      ["name", "Name"],
      ["description", "Desc"],
      ["quantity", "Qty."],
      ["createdAt", "Date Created"],
    ]);
  };

  $("#sort-order").change(function () {
    data = sortOnKey(
      data,
      $(this).val(),
      $(this).find(":selected").data("order")
    );
    dt.setData(data);
  });
  $("#current-page").change(function () {});
});

function sortOnKey(data, key, order = "asc") {
  data.sort((a, b) =>
    a[key].toLowerCase() > b[key].toLowerCase()
      ? order === "asc"
        ? 1
        : -1
      : order === "asc"
      ? -1
      : 1
  );
  return data;
}

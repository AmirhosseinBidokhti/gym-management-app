export const printTable = (title) => {
  var tab = document.getElementById("tab");

  var style = "<style>";
  style = style + "table {width: 100%;font: 12px Calibri; ";
  style =
    style +
    "table, th, td, div {border: solid 2px #DDD; border-collapse: collapse; color: #000 !important";
  style = style + "padding: 2px 3px;text-align: center;}";
  style = style + "</style>";

  var win = window.open("", "", "height=700,width=700");
  win.document.write(style); //  add the style.
  win.document.write(tab.outerHTML);
  win.document.title = `${title}`;
  win.document.close();
  win.print();
};

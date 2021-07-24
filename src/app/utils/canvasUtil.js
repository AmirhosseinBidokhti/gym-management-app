//donwload pdf from original canvas
import jsPDF from "jspdf";
export function downloadPDF(canvasId) {
  var canvas = document.querySelector(".chartjs-render-monitor");
  var x = document.getElementsByTagName("canvas")[canvasId];
  x.style.backgroundColor = "rgba(0,0,0,0)";
  //creates image

  var xt = x.toDataURL("image/jpeg", 1.0);

  //creates PDF from img
  var doc = new jsPDF("landscape");
  doc.setFontSize(20);
  doc.addImage(xt, "JPEG", 10, 10, 280, 150);
  doc.save("canvas.pdf");
}

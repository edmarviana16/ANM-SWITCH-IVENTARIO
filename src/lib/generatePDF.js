import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { SEDE_CORE, SEDE_ANDARES, REGIONAIS, getQuantitativos } from "./networkData";

const C = {
  primary:  [24, 73, 153],
  dark:     [15, 23, 42],
  gray:     [100, 116, 139],
  white:    [255, 255, 255],
  lightBg:  [241, 245, 249],
  green:    [22, 163, 74],
  red:      [220, 38, 38],
  amber:    [217, 119, 6],
  amber50:  [255, 251, 235],
};

function setFill(doc, key)   { doc.setFillColor(...C[key]); }
function setStroke(doc, key) { doc.setDrawColor(...C[key]); }
function setTxt(doc, key)    { doc.setTextColor(...C[key]); }
function setTxtRGB(doc, r, g, b) { doc.setTextColor(r, g, b); }

export function generateReport() {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const PW = doc.internal.pageSize.getWidth();
  const PH = doc.internal.pageSize.getHeight();
  const q = getQuantitativos();
  const dateStr = format(new Date(), "dd/MM/yyyy");
  // ... (ver arquivo completo no repositório)
  doc.save("Inventario_Ativos_Rede_" + format(new Date(), "yyyy-MM-dd") + ".pdf");
}

function pageHeader(doc, PW, title) {
  doc.setFillColor(...C.primary);
  doc.rect(0, 0, PW, 18, "F");
  doc.setTextColor(...C.white);
  doc.setFontSize(11);
  doc.text(title, 15, 12);
}

function tableHeader(doc, cols, headers, y, PW) {
  doc.setFillColor(...C.primary);
  doc.rect(15, y, PW - 30, 7, "F");
  doc.setTextColor(...C.white);
  doc.setFontSize(6.5);
  headers.forEach((h, i) => doc.text(h, cols[i] + 2, y + 5));
}

function addFooter(doc, pageNum, totalPages, PW, PH, dateStr) {
  doc.setDrawColor(...C.primary);
  doc.setLineWidth(0.3);
  doc.line(15, PH - 12, PW - 15, PH - 12);
  doc.setFontSize(7);
  doc.setTextColor(...C.gray);
  doc.text("DOCUMENTO TECNICO OFICIAL — USO INTERNO", 15, PH - 8);
  doc.text("Gerado em " + dateStr, PW / 2, PH - 8, { align: "center" });
  doc.text("Pagina " + pageNum + " / " + totalPages, PW - 15, PH - 8, { align: "right" });
}

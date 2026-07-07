// import XLSX from "xlsx";
export function exportCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportXLS(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) return;

  const headers = Object.keys(rows[0]);

  // 1. Buat susunan Header Tabel HTML
  const headerRow = `<tr>${headers.map((h) => `<th style="background-color: #f2f2f2; border: 1px solid #dddddd; padding: 8px;">${h}</th>`).join("")}</tr>`;

  // 2. Buat susunan Baris Data Tabel HTML
  const bodyRows = rows
    .map((row) => {
      return `<tr>${headers.map((h) => `<td style="border: 1px solid #dddddd; padding: 8px;">${String(row[h] ?? "")}</td>`).join("")}</tr>`;
    })
    .join("");

  // 3. Bungkus dalam struktur template HTML lengkap beserta encoding UTF-8
  const htmlTemplate = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
      </head>
    <body>
      <table>
        <thead>${headerRow}</thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </body>
    </html>
  `;

  // 4. Gunakan MIME Type excel dan unduh filenya
  const blob = new Blob([htmlTemplate], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;

  // Pastikan ekensinya .xls (bukan .xlsx) karena ini format HTML Excel lama
  const validFilename = filename.endsWith(".xls")
    ? filename
    : `${filename.split(".")[0]}.xls`;
  a.download = validFilename;

  a.click();
  URL.revokeObjectURL(url);
}

export function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatDateID(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const formatKeJamMenit = (isoString: string): string => {
  if (!isoString) return "-";

  return new Date(isoString).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
};

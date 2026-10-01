/*
=========================================================
7-Р АНГИЙН ШАЛГАЛТ — GOOGLE APPS SCRIPT
=========================================================

АШИГЛАХ:
1. Google Sheets шинээр үүсгэнэ.
2. Extensions → Apps Script.
3. Энэ кодыг Code.gs дотор хуулна.
4. TO_EMAIL хэсэгт багшийн Gmail хаягийг оруулна.
5. Deploy → New deployment → Web app.
6. Execute as: Me
7. Who has access: Anyone
8. Deploy.
9. Web app URL-ийг хуулж script.js-ийн
   GOOGLE_SCRIPT_URL хэсэгт оруулна.
=========================================================
*/

const TO_EMAIL = "teacher@gmail.com";
const SHEET_NAME = "Шалгалтын дүн";

function doGet() {
  return ContentService
    .createTextOutput("Шалгалтын систем ажиллаж байна.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = getOrCreateSheet_();

    const now = new Date();

    sheet.appendRow([
      now,
      data.name || "",
      data.className || "",
      Number(data.score || 0),
      Number(data.total || 0),
      Number(data.percent || 0) + "%",
      data.grade || "",
      data.answers || ""
    ]);

    sendEmail_(data);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "Амжилттай хадгаллаа"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error(error);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);

    sheet.appendRow([
      "Огноо",
      "Сурагчийн нэр",
      "Анги",
      "Оноо",
      "Нийт оноо",
      "Хувь",
      "Үнэлгээ",
      "Хариултууд"
    ]);

    sheet.getRange(1, 1, 1, 8)
      .setFontWeight("bold");

    sheet.setFrozenRows(1);
  }

  return sheet;
}

function sendEmail_(data) {
  const subject =
    "7-р ангийн шалгалтын дүн — " + (data.name || "");

  const body =
    "Шалгалтын шинэ дүн ирлээ.\n\n" +
    "Сурагчийн нэр: " + (data.name || "") + "\n" +
    "Анги: " + (data.className || "") + "\n" +
    "Оноо: " + (data.score || 0) + " / " + (data.total || 0) + "\n" +
    "Хувь: " + (data.percent || 0) + "%\n" +
    "Үнэлгээ: " + (data.grade || "") + "\n" +
    "Огноо: " + new Date().toLocaleString();

  MailApp.sendEmail({
    to: TO_EMAIL,
    subject: subject,
    body: body
  });
}

/**
 * 9-р ангийн Мэдээлэл зүйн шалгалт
 * Google Sheets + Google Apps Script
 *
 * Sheet1-ийн баганууд:
 * A: Огноо
 * B: Сурагчийн нэр
 * C: Анги
 * D: Шалгалтын огноо
 * E: Оноо
 * F: Нийт
 */

function doPost(e) {

  try {

    const sheet =
      SpreadsheetApp
        .getActiveSpreadsheet()
        .getSheetByName("Sheet1");

    if (!sheet) {
      throw new Error('Sheet1 нэртэй хуудас олдсонгүй.');
    }

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("POST data хоосон байна.");
    }

    const data =
      JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.className || "",
      data.date || "",
      Number(data.score || 0),
      Number(data.total || 10)
    ]);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true,
          message: "Амжилттай хадгалагдлаа"
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  } catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: error.toString()
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );
  }
}

9-р ангийн Мэдээлэл зүйн шалгалт
Google Sheets холболттой хувилбар

ФАЙЛУУД
--------
index.html
script.js
Code.gs

ТОХИРУУЛАХ ДАРААЛАЛ
--------------------
1. Google Sheets шинэ файл үүсгэнэ.
2. Sheet1 нэрийг яг "Sheet1" болгоно.
3. 1-р мөрөнд:
   Огноо | Сурагчийн нэр | Анги | Шалгалтын огноо | Оноо | Нийт
4. Extensions -> Apps Script нээнэ.
5. Code.gs доторх кодыг хуулж оруулна.
6. Deploy -> New deployment -> Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Deploy хийнэ.
10. Гарч ирсэн Web app URL-ийг хуулна.
11. script.js дотор:
   const WEB_APP_URL = "ЭНД_URL_ОРОХ";
   хэсэгт URL-ээ оруулна.
12. index.html болон script.js хоёрыг нэг folder-т хадгална.
13. Vercel-д deploy хийж болно.

АНХААРАХ
---------
URL нь Google Sheet-ийн URL биш.
Google Apps Script Web App URL байна.
URL нь ихэвчлэн /exec гэж төгсөнө.

ЖИШЭЭ
------
const WEB_APP_URL =
  "https://script.google.com/macros/s/XXXXXXXX/exec";

Шалгалт дуусмагц:
Сурагчийн нэр + анги + шалгалтын огноо + оноо + нийт оноо
Sheet1-ийн шинэ мөрөнд нэмэгдэнэ.

CORS-ийн тухай:
script.js нь POST хүсэлтийг text/plain + no-cors горимоор илгээж,
Google Apps Script-ийн doPost(e) нь JSON текстийг уншина.

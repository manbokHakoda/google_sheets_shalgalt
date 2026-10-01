# 7-р ангийн шалгалтын систем

Энэ системээр сурагч гар утсаараа шалгалт өгч, нэр, анги, оноо нь Google Sheets-д автоматаар хадгалагдана.

## 1. Google Sheets үүсгэх

Google Drive → New → Google Sheets

Жишээ нэр:

7-р ангийн шалгалтын дүн

## 2. Apps Script

Google Sheets дотроос:

Extensions → Apps Script

Code.gs файлын бүх кодыг устгаад энэ ZIP доторх `Code.gs`-ийн кодыг хуулна.

`TO_EMAIL` хэсгийг багшийн Gmail хаягаар солино.

Жишээ:

const TO_EMAIL = "bagshiinemail@gmail.com";

Save хийнэ.

## 3. Web App болгох

Apps Script:

Deploy → New deployment

Select type → Web app

Execute as → Me

Who has access → Anyone

Deploy → зөвшөөрөл өгнө.

Дараа нь гарч ирсэн Web app URL-ийг хуулна.

## 4. script.js-д URL хийх

`script.js` файлыг нээнэ.

Энэ мөрийг олно:

const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

URL-ээ оруулна.

Жишээ:

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";

## 5. Vercel-д байрлуулах

Энэ 3 файлыг нэг folder-т байрлуулна:

7r-angi-shalgalt/
├── index.html
├── style.css
└── script.js

Vercel дээр New Project → энэ folder-оо upload/deploy хийнэ.

## 6. Үр дүн

Сурагч шалгалт өгөх бүрд Google Sheets-ийн:

Шалгалтын дүн

sheet-д:

Огноо | Сурагчийн нэр | Анги | Оноо | Нийт оноо | Хувь | Үнэлгээ | Хариултууд

гэсэн мэдээлэл нэмэгдэнэ.

Мөн `TO_EMAIL` дээр заасан багшийн Gmail рүү шинэ дүн бүрээр мэдэгдэл очно.

## Анхаарах зүйл

- Google Apps Script URL-ийг зөв оруулах шаардлагатай.
- Apps Script deployment-ийн access нь `Anyone` байх ёстой.
- Багшийн Gmail хаягийг Code.gs-ийн `TO_EMAIL` хэсэгт өөрчилнө.
- Шалгалтын асуултуудыг `script.js` доторх `questions` хэсгээс өөрчилж болно.

/* =========================================================
   9-Р АНГИЙН МЭДЭЭЛЭЛ ЗҮЙН ШАЛГАЛТ
   Google Sheets холболттой script.js
   ========================================================= */

/*
   ЭНД Google Apps Script Web App URL-аа оруулна.

   Жишээ:
   const WEB_APP_URL =
       "https://script.google.com/macros/s/ТАНЫ_DEPLOYMENT_ID/exec";
*/
const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbwQBYgfE3OmHwOSie0CFDsfIqlwC7xfa0BUw2gcKojLN6pAjnon3fZT8EcivhRjkQX9sg/exec";

/* Зөв хариултын түлхүүр */
const correctAnswers = {
    q1: "B",
    q2: "B",
    q3: "D",
    q4: "B",
    q5: "B",
    q6: "B",
    q7: "A",
    q8: "C",
    q9: "B",
    q10: "C"
};

/* ---------------------------------------------------------
   Туслах функц
   --------------------------------------------------------- */
function showSheetStatus(message, type) {
    const box = document.getElementById("sheetStatus");

    if (!box) return;

    box.style.display = "block";
    box.textContent = message;

    if (type === "success") {
        box.style.background = "#f0fdf4";
        box.style.color = "#166534";
        box.style.borderColor = "#86efac";
    } else if (type === "error") {
        box.style.background = "#fef2f2";
        box.style.color = "#991b1b";
        box.style.borderColor = "#fca5a5";
    } else {
        box.style.background = "#eff6ff";
        box.style.color = "#1d4ed8";
        box.style.borderColor = "#93c5fd";
    }
}

/* ---------------------------------------------------------
   Өнөөдрийн огноо
   --------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", function () {

    const dateInput = document.getElementById("examDate");

    if (!dateInput) return;

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.value = `${year}-${month}-${day}`;
});

/* ---------------------------------------------------------
   Google Sheets рүү дүн илгээх
   --------------------------------------------------------- */
async function sendResultToGoogleSheets(data) {

    if (
        !WEB_APP_URL ||
        WEB_APP_URL === "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"
    ) {
        showSheetStatus(
            "⚠️ Google Sheets URL тохируулаагүй байна. script.js дотор WEB_APP_URL-аа оруулна уу.",
            "error"
        );
        return false;
    }

    showSheetStatus(
        "⏳ Дүнг Google Sheets рүү илгээж байна...",
        "loading"
    );

    try {

        /*
          text/plain ашигласнаар browser CORS preflight үүсгэхээс
          зайлсхийж, Google Apps Script doPost(e) руу JSON текст явуулна.
        */
        await fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(data)
        });

        /*
          no-cors үед browser серверийн response-г унших боломжгүй.
          Гэхдээ request амжилттай илгээгдсэн тохиолдолд энд хүрнэ.
        */
        showSheetStatus(
            "✅ Дүнг Google Sheets рүү илгээлээ. Багш Sheet1-ээс шалгана уу.",
            "success"
        );

        return true;

    } catch (error) {

        console.error("Google Sheets error:", error);

        showSheetStatus(
            "❌ Дүн илгээхэд алдаа гарлаа. Google Apps Script URL болон deployment-ээ шалгана уу.",
            "error"
        );

        return false;
    }
}

/* ---------------------------------------------------------
   ШАЛГАЛТЫГ ШАЛГАХ
   --------------------------------------------------------- */
async function submitExam() {

    const studentName =
        document.getElementById("studentName").value.trim();

    const className =
        document.getElementById("className").value.trim();

    const examDate =
        document.getElementById("examDate").value;

    /* Нэр шалгах */
    if (studentName === "") {

        alert("⚠️ Сурагчийн нэрээ оруулна уу.");

        document.getElementById("studentName").focus();

        return;
    }

    let score = 0;

    /* Бүх асуултыг шалгах */
    for (let i = 1; i <= 10; i++) {

        const question =
            document.querySelector(
                `.question[data-question="${i}"]`
            );

        const selected =
            document.querySelector(
                `input[name="q${i}"]:checked`
            );

        if (!question) continue;

        /* Өмнөх өнгийг арилгах */
        question.classList.remove("correct", "wrong");

        /* Хариулаагүй */
        if (!selected) {

            question.classList.add("wrong");

            continue;
        }

        /* Зөв хариулт */
        if (selected.value === correctAnswers[`q${i}`]) {

            score++;

            question.classList.add("correct");

        } else {

            question.classList.add("wrong");
        }
    }

    /* Оноо */
    document.getElementById("scoreDisplay").value =
        `${score} / 10`;

    document.getElementById("finalScore").textContent =
        `${score} / 10`;

    /* Сурагчийн мэдээлэл */
    document.getElementById("resultName").textContent =
        studentName;

    document.getElementById("resultClass").textContent =
        className || "—";

    document.getElementById("resultDate").textContent =
        examDate || "—";

    /* Үр дүнгийн тайлбар */
    let message = "";

    if (score === 10) {

        message = "🌟 Маш сайн! Бүх асуултад зөв хариуллаа.";

    } else if (score >= 8) {

        message = "👏 Сайн байна! Таны мэдлэг сайн байна.";

    } else if (score >= 6) {

        message = "👍 Боломжийн байна. Зарим сэдвээ дахин давтаарай.";

    } else if (score >= 4) {

        message = "📚 Дахин давтаж, хичээлээ сайн бэлдэх хэрэгтэй.";

    } else {

        message = "💪 Хичээгээрэй! Хичээлээ дахин судлаарай.";
    }

    document.getElementById("resultMessage").textContent =
        message;

    /* Progress bar */
    const percentage = score * 10;

    document.getElementById("progressBar").style.width =
        percentage + "%";

    /* Result хэсгийг харуулах */
    const result =
        document.getElementById("result");

    result.style.display = "block";

    /* Хариу сонголтыг түгжих */
    document.querySelectorAll(
        'input[type="radio"]'
    ).forEach(function (radio) {

        radio.disabled = true;
    });

    /* Google Sheets-д хадгалах өгөгдөл */
    const resultData = {
        name: studentName,
        className: className,
        date: examDate,
        score: score,
        total: 10
    };

    /* Google Sheets рүү илгээх */
    await sendResultToGoogleSheets(resultData);

    /* Дүн рүү автоматаар очих */
    setTimeout(function () {

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 200);
}

/* ---------------------------------------------------------
   ДАХИН ЭХЛҮҮЛЭХ
   --------------------------------------------------------- */
function resetExam() {

    const confirmReset =
        confirm("Шалгалтыг дахин эхлүүлэх үү?");

    if (!confirmReset) {
        return;
    }

    /* Бүх сонголтыг цэвэрлэх */
    document.querySelectorAll(
        'input[type="radio"]'
    ).forEach(function (radio) {

        radio.checked = false;
        radio.disabled = false;
    });

    /* Question class цэвэрлэх */
    document.querySelectorAll(
        ".question"
    ).forEach(function (question) {

        question.classList.remove(
            "correct",
            "wrong"
        );
    });

    /* Оноо буцаах */
    document.getElementById(
        "scoreDisplay"
    ).value = "— / 10";

    /* Result нуух */
    document.getElementById(
        "result"
    ).style.display = "none";

    /* Progress bar */
    document.getElementById(
        "progressBar"
    ).style.width = "0";

    /* Google Sheets status нуух */
    const sheetStatus =
        document.getElementById("sheetStatus");

    if (sheetStatus) {
        sheetStatus.style.display = "none";
        sheetStatus.textContent = "";
    }

    /* Дээд хэсэг рүү очих */
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

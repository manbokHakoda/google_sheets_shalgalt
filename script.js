// =====================================================
// GOOGLE APPS SCRIPT WEB APP URL
// =====================================================
//
// Энд өөрийн Google Apps Script Web App URL-ээ оруулна.
//
// Жишээ:
// const WEB_APP_URL =
// "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";

const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbz_KQZHWrgZpAcAjPqloSu-V0xB1HepCt2nXwvHEt5fPa80IYqjdGVoMH1P8r8Er9mY/exec";


// =====================================================
// ШАЛГАЛТЫН АСУУЛТУУД
// =====================================================

const questions = [
    {
        question: "Компьютерийн үндсэн төхөөрөмж аль нь вэ?",
        options: [
            "Гар",
            "Дэлгэц",
            "Процессор",
            "Чихэвч"
        ],
        answer: 2
    },

    {
        question: "HTML ямар зориулалттай вэ?",
        options: [
            "Вэб хуудасны бүтэц үүсгэх",
            "Зураг засах",
            "Дуу бичих",
            "Видео тоглуулах"
        ],
        answer: 0
    },

    {
        question: "CSS ямар зориулалттай вэ?",
        options: [
            "Өгөгдөл хадгалах",
            "Вэб хуудасны загвар, өнгө үзэмж тохируулах",
            "Компьютер асаах",
            "Файл устгах"
        ],
        answer: 1
    },

    {
        question: "JavaScript-ийн үндсэн үүрэг юу вэ?",
        options: [
            "Вэб хуудсыг интерактив болгох",
            "Зөвхөн зураг хадгалах",
            "Компьютер угсрах",
            "Принтер засах"
        ],
        answer: 0
    },

    {
        question: "Интернетэд веб хуудас үзэхэд ямар програм ашигладаг вэ?",
        options: [
            "Browser",
            "Calculator",
            "Paint",
            "Notepad"
        ],
        answer: 0
    },

    {
        question: "URL гэж юу вэ?",
        options: [
            "Веб хуудасны хаяг",
            "Компьютерийн гар",
            "Зургийн формат",
            "Дууны файл"
        ],
        answer: 0
    },

    {
        question: "Google Chrome гэж юу вэ?",
        options: [
            "Вэб хөтөч",
            "Үйлдлийн систем",
            "Видео камер",
            "Принтер"
        ],
        answer: 0
    },

    {
        question: "1 byte хэдэн bit-тэй вэ?",
        options: [
            "2 bit",
            "4 bit",
            "8 bit",
            "16 bit"
        ],
        answer: 2
    },

    {
        question: "Компьютерийн мэдээллийг түр хадгалдаг санах ой аль нь вэ?",
        options: [
            "RAM",
            "Keyboard",
            "Mouse",
            "Monitor"
        ],
        answer: 0
    },

    {
        question: "Вэб сайтыг интернетэд байрлуулахыг юу гэж нэрлэдэг вэ?",
        options: [
            "Hosting",
            "Typing",
            "Printing",
            "Scanning"
        ],
        answer: 0
    }
];


// =====================================================
// ХУВЬСАГЧ
// =====================================================

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

let studentName = "";
let studentClass = "";


// =====================================================
// HTML ELEMENT
// =====================================================

const studentSection =
    document.getElementById("student-section");

const quizSection =
    document.getElementById("quiz-section");

const resultSection =
    document.getElementById("result-section");

const startBtn =
    document.getElementById("startBtn");

const nextBtn =
    document.getElementById("nextBtn");

const quiz =
    document.getElementById("quiz");

const questionNumber =
    document.getElementById("questionNumber");

const progressBar =
    document.getElementById("progressBar");

const studentDisplay =
    document.getElementById("studentDisplay");


// =====================================================
// ШАЛГАЛТ ЭХЛҮҮЛЭХ
// =====================================================

startBtn.addEventListener("click", function () {

    studentName =
        document.getElementById("studentName").value.trim();

    studentClass =
        document.getElementById("studentClass").value;

    if (studentName === "") {
        alert("Нэрээ оруулна уу.");
        return;
    }

    if (studentClass === "") {
        alert("Ангиа сонгоно уу.");
        return;
    }

    currentQuestion = 0;
    score = 0;

    studentDisplay.textContent =
        studentName + " - " + studentClass;

    studentSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    showQuestion();
});


// =====================================================
// АСУУЛТ ХАРУУЛАХ
// =====================================================

function showQuestion() {

    const q = questions[currentQuestion];

    selectedAnswer = null;

    questionNumber.textContent =
        "Асуулт " +
        (currentQuestion + 1) +
        " / " +
        questions.length;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";

    let html = "";

    html += `
        <div class="question">
            ${currentQuestion + 1}. ${q.question}
        </div>
    `;

    q.options.forEach(function (option, index) {

        html += `
            <button
                class="option"
                data-index="${index}">
                ${String.fromCharCode(65 + index)}. ${option}
            </button>
        `;
    });

    quiz.innerHTML = html;

    const optionButtons =
        document.querySelectorAll(".option");

    optionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            optionButtons.forEach(function (btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedAnswer =
                Number(button.dataset.index);
        });
    });


    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Шалгалт дуусгах ✓";
    } else {
        nextBtn.textContent = "Дараагийн асуулт →";
    }
}


// =====================================================
// ДАРААГИЙН АСУУЛТ
// =====================================================

nextBtn.addEventListener("click", function () {

    if (selectedAnswer === null) {
        alert("Хариултаа сонгоно уу.");
        return;
    }

    const correctAnswer =
        questions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        finishQuiz();
    }
});


// =====================================================
// ШАЛГАЛТ ДУУСГАХ
// =====================================================

function finishQuiz() {

    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    const total = questions.length;

    const percent =
        Math.round((score / total) * 100);

    document.getElementById("resultName").textContent =
        studentName + " (" + studentClass + ")";

    document.getElementById("resultScore").textContent =
        score + " / " + total;

    document.getElementById("resultPercent").textContent =
        percent + "%";

    sendResult(
        studentName,
        studentClass,
        score,
        total
    );
}


// =====================================================
// GOOGLE SHEETS РҮҮ ДҮН ИЛГЭЭХ
// =====================================================

function sendResult(name, className, score, total) {

    const message =
        document.getElementById("sendMessage");

    // URL оруулаагүй бол
    if (
        WEB_APP_URL ===
        "ЭНД_ӨӨРИЙН_GOOGLE_APPS_SCRIPT_URL_ЭЭ_ОРУУЛНА"
    ) {

        message.textContent =
            "⚠️ Google Apps Script URL тохируулаагүй байна. " +
            "Оноо гарсан боловч Google Sheets рүү илгээгдсэнгүй.";

        return;
    }


    message.textContent =
        "⏳ Дүнг Google Sheets рүү илгээж байна...";


    const data = {

        name: name,

        className: className,

        score: score,

        total: total

    };


    fetch(WEB_APP_URL, {

        method: "POST",

        body: JSON.stringify(data)

    })

    .then(function (response) {

        return response.json();

    })

    .then(function (result) {

        if (result.success) {

            message.textContent =
                "✅ Дүн амжилттай илгээгдлээ. " +
                "Багш Google Sheets-ээс шалгана.";

        } else {

            message.textContent =
                "⚠️ Дүн илгээхэд асуудал гарлаа.";

        }

    })

    .catch(function (error) {

        console.error(error);

        message.textContent =
            "⚠️ Google Sheets рүү дүн илгээхэд алдаа гарлаа. " +
            "Интернет холболтоо шалгана уу.";

    });
}
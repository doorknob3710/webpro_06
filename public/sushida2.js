document.addEventListener("DOMContentLoaded", () => {
    const kanjiWordElement = document.getElementById("kanji-word");
    const userInputElement = document.getElementById("user-input");
    const messageElement = document.getElementById("message");
    const successCountElement = document.getElementById("success-count");
    const totalCountElement = document.getElementById("total-count");
    const submitButton = document.getElementById("submit-button");

    let success = 0;
    let total = 0;

    // POSTリクエストを送信
    const sendUserInput = async (userInput = "") => {
        const response = await fetch("/sushida2/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userInput,
                success,
                total
            })
        });

        const data = await response.json();

        // サーバーからのデータで画面を更新
        kanjiWordElement.textContent = data.kanjiWord;
        messageElement.textContent = data.message;
        successCountElement.textContent = data.success;
        totalCountElement.textContent = data.total;

        // 入力欄をクリア
        userInputElement.value = "";

        // 成績を更新
        success = data.success;
        total = data.total;
    };

    // 送信ボタンをクリックしたときの処理
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();  // フォーム送信を防ぐ
        const userInput = userInputElement.value.trim();
        sendUserInput(userInput);
    });

    // 初期表示
    sendUserInput(); // 初回リクエスト
});


  
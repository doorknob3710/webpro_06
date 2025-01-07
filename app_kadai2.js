"use strict";
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

const wordList = [
    ["寿司", "sushi"],
    ["天ぷら", "tempura"],
    ["刺身", "sashimi"],
    ["そば", "soba"],
    ["うどん", "udon"],
    ["豆腐", "toufu"],
    ["焼肉", "yakiniku"],
    ["すき焼き", "sukiyaki"],
    ["しゃぶしゃぶ", "syabusyabu"],
    ["お好み焼き", "okonomiyaki"],
    ["味噌汁", "misoshiru"],
    ["たこ焼き", "takoyaki"],
    ["おにぎり", "onigiri"],
    ["納豆", "natto"],
    ["餅", "mochi"],
    ["焼き鳥", "yakitori"],
    ["カレーライス", "kare-raisu"],
    ["ハンバーガー", "hanba-ga-"],
    ["サンドイッチ", "sandoicchi"],
    ["ピザ", "piza"],
    ["スパゲッティ", "supagetti"],
    ["ラーメン", "ramenn"],
    ["唐揚げ", "karaage"],
    ["ぎょうざ", "gyoza"],
    ["春巻き", "harumaki"],
    ["茶碗蒸し", "chawanmushi"],
    ["おでん", "odenn"],
    ["かき氷", "kakigoori"],
    ["プリン", "purinn"],
    ["ケーキ", "ke-ki"],
    ["パンケーキ", "panke-ki"],
    ["ドーナツ", "do-natsu"],
    ["チョコレート", "chokore-to"],
    ["アイスクリーム", "aisukuri-mu"],
    ["チーズ", "chi-zu"],
    ["ステーキ", "sute-ki"],
    ["ご飯", "gohann"],
    ["鮭", "sake"],
    ["海苔", "nori"],
    ["天丼", "tendonn"],
    ["親子丼", "oyakodonn"],
    ["牛丼", "gyuudonn"],
    ["豚丼", "butadonn"],
    ["そぼろ丼", "soborodonn"],
    ["野菜", "yasai"],
    ["果物", "kudamono"],
    ["バナナ", "banana"],
    ["いちご", "ichigo"],
    ["ぶどう", "budou"],
    ["リンゴ", "ringo"],
    ["みかん", "mikann"],
    ["もも", "momo"],
    ["メロン", "meronn"],
    ["レモン", "remonn"],
    ["パイナップル", "painappuru"],
    ["きゅうり", "kyuuri"],
    ["にんじん", "ninjinn"],
    ["たまねぎ", "tamanegi"],
    ["じゃがいも", "jagaimo"],
    ["トマト", "tomato"],
    ["キャベツ", "kyabetsu"],
    ["レタス", "retasu"],
    ["ピーマン", "pi-mann"],
    ["とうもろこし", "toumorokoshi"],
    ["米", "kome"],
    ["大豆", "daizu"],
    ["小麦", "komugi"],
    ["魚", "sakana"],
    ["肉", "niku"],
    ["鶏肉", "toriniku"],
    ["牛肉", "gyuuniku"],
    ["豚肉", "butaniku"],
    ["羊肉", "younniku"],
    ["鹿肉", "shikaniku"],
    ["卵", "tamago"],
    ["牛乳", "gyuunyuu"],
    ["バター", "bata-"],
    ["生クリーム", "namakuri-mu"],
    ["豆乳", "tounyuu"],
    ["紅茶", "koucha"],
    ["コーヒー", "ko-hi-"],
    ["ジュース", "ju-su"],
    ["お茶", "ocha"],
    ["水", "mizu"],
    ["炭酸水", "tansansui"],
    ["ビール", "bi-ru"],
    ["ワイン", "wainn"],
    ["シャンパン", "syanpann"],
    ["ウイスキー", "uisuki-"],
    ["焼酎", "syoucyuu"],
    ["日本酒", "nihonsyu"],
    ["カクテル", "kakuteru"],
    ["砂糖", "satou"],
    ["塩", "shio"],
    ["醤油", "syouyu"],
    ["みりん", "mirinn"],
    ["味噌", "miso"],
    ["ケチャップ", "kecyappu"],
    ["マヨネーズ", "mayone-zu"],
    ["ワサビ", "wasabi"]
  ];

let currentWord = { kanji: "", romaji: "" };

const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return { kanji: wordList[randomIndex][0], romaji: wordList[randomIndex][1] };
};

// 初回の単語を選択
currentWord = getRandomWord();

// POSTエンドポイント
app.post("/sushida2/api", (req, res) => {
    const { userInput, success, total } = req.body;
    let newSuccess = success || 0;
    let newTotal = total || 0;
    let message = "";

    if (!userInput) {
        message = "頑張ってください！";
    } else if (userInput === currentWord.romaji) {
        message = "正解！";
        newSuccess += 1;
    } else {
        message = `不正解です。あなたの入力: "${userInput}"`;
    }

    newTotal += 1;
    currentWord = getRandomWord();

    res.json({
        kanjiWord: currentWord.kanji,
        romajiWord: currentWord.romaji,
        message,
        success: newSuccess,
        total: newTotal
    });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
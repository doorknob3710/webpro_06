const express = require("express"); 
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  let judgement;
  if(hand == undefined){
    judgement = '';
  } else if (hand === cpu) {
    judgement = '引き分け'; 
    total += 1;
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち'; 
    win += 1;
    total += 1;
  } else {
    judgement = '負け'; 
    total += 1;
  }

  
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/dice", (req, res) => {
  const diceResults = [];
  const rollCount = parseInt(req.query.rollCount, 10) || 1;  
  const faces = parseInt(req.query.faces, 10) || 6; 
  let total = 0;

  for (let i = 0; i < rollCount; i++) {
    const roll = Math.floor(Math.random() * faces) + 1;
    diceResults.push({ rollNumber: i + 1, result: roll });
    total += roll;
  }

  res.render('dice', { diceResults: diceResults, faces: faces , rollCount: rollCount , total: total});
});


app.get("/sushida", (req, res) => {
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
    ["にんじん", "ninnjinn"],
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
  const userInput = req.query.userInput?.trim();  
  let kanjiWord = req.query.kanjiWord;  
  let romajiWord = req.query.romajiWord; 
  let message;
  let sucess = Number( req.query.sucess)||0;
  let total = Number( req.query.total )||0;


  if (userInput === romajiWord) {
      message = "正解！";
      const randomIndex = Math.floor(Math.random() * wordList.length);  
      kanjiWord = wordList[randomIndex][0];        
      romajiWord = wordList[randomIndex][1];
  } else {
      message = `不正解です。あなたの入力: "${userInput}"`;
  }
  
  res.render("sushida", { kanjiWord, romajiWord, message});
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

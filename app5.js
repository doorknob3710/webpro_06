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

app.get("/rollDice", (req, res) => {
  const diceResults = [];
  const rollCount = parseInt(req.query.rollCount, 10) || 1; // クエリパラメータから数を取得（デフォルト1） 
  const faces = parseInt(req.query.faces, 10) || 6; // クエリパラメータから以下略（デフォルトは6）
  let total = 0;

  for (let i = 0; i < rollCount; i++) {
    const roll = Math.floor(Math.random() * 100);
 
  }

  res.render('dice', { diceResults: diceResults, faces: faces , rollCount: rollCount , total: total});
});


app.get("/sushida", (req, res) => {
  // CSVを読み込む関数
  function loadCSV() {
      const filePath = path.join(__dirname, 'tango.csv');  // CSVファイルのパスを指定
      const csvData = fs.readFileSync(filePath, 'utf8');   // 同期的にCSVデータを読み込む
      const rows = csvData.split('\n');                    // 改行で行を分割

      // 2次元配列に変換
      const data = rows.map(row => row.split(','));
      return data;
  }

  const wordList = loadCSV();
  const randomIndex = Math.floor(Math.random() * wordList.length);  // ランダムな行を選ぶ
  const kanjiWord = wordList[randomIndex][1];        // 2列目の漢字
  const romajiWord = wordList[randomIndex][2];       // 3列目のローマ字

  // kanjiWordとromajiWordをEJSに渡す
  res.render("sushida", { kanjiWord: kanjiWord, romajiWord: romajiWord });
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));

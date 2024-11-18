# webpro_06
## このプログラムについて
### ファイル一覧
ファイル名 | 説明|
-|-
app5.js | プログラム本体
/public/index.html | 目次
/public/janken.html | じゃんけんの開始画面
/views/janken.ejs| じゃんけんのテンプレート
/public/dice.html | 複数・多面対応サイコロの開始画面
/views/dice.ejs|複数・多面対応サイコロのテンプレート
/public/sushida.html | 寿司打の開始画面
/views/sushida.ejs| 寿司打のテンプレート


1. ```app5.js``` を起動する
1. Webブラウザで```localhost:8080/public/index.html```にアクセスする
1. 好きなリンクを選ぶ（じゃんけん，寿司打，多面・複数対応サイコロ）
1. それらで遊ぶ


<!-- 
注意：項目名として「end」は使用できない
-->

じゃんけんのフォローチャート
```mermaid
flowchart TD;

start["開始"];
buttonpush[送信ボタンを押す]
input["グー，パー，チョキの入力"]
end1["終了，試合数＋１"]
if{"じゃんけんの勝敗"}
win["勝ち，勝利数＋１"]
tie["引き分け"]
lose["負け"]


start --> input --> buttonpush --> if
if -->|勝利の手，例：cpuパー，入力チョキ| win
win --> end1
if -->|cpuの手と同じ入力| tie
tie --> end1
if -->|それ以外| lose
lose --> end1
end1--> input
```

複数・多面対応サイコロのフォローチャート
```mermaid
flowchart TD;

start["開始"];
buttonpush[送信ボタンを押す]
input["サイコロの面の数＆サイコロの数の入力"]
end1["合計値と個々値の出力"]

start --> input --> buttonpush --> end1　--> input
```

寿司打サイコロのフォローチャート
```mermaid
flowchart TD;

start["開始"];
random["文字列を乱数で決定"]　
buttonpush[開始ボタンを押す]
buttonpush2[送信ボタンを押す]
input["指定された文字の入力"]
end1["入力回数＋１"]
if{"文字列がローマ字と一致しているか"}
sucess["正解数＋１,新しい文字列を乱数で決定"]
miss["もう一度入力"]


start -->buttonpush-->random --> input --> buttonpush2 --> if
if -->|正しい文字列と一致| sucess
sucess --> end1
if -->|正しい文字列と不一致| miss
miss --> end1
end1--> input
```
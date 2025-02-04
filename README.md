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
### じゃんけん
じゃんけんで遊べます．
選ぶと何を出すかを聞かれるので```グー```,```パー```,```チョキ```の三つからどれかを入力して送信ボタンを押してください．（注意：カタカナ全角かなで入力してください．それ以外だと強制的に負けになる可能性があります．）
ボタンを押すとあなたの手とコンピューターの手，現在の勝利数と試合数が表示されます．
入力欄にもう一度あなたの手を入力し送信ボタンを押すともう一度遊べます．
### 複数・多面対応サイコロ
自由にサイコロの面の数とサイコロの数を選んで合計値と個別の値を出力します．
選ぶとstartボタンが出てくるためクリックすると，サイコロの面の数とサイコロの数を入力する画面が出てきます．1以上の整数を入力し，サイコロを振るボタンを押すと合計値と個別の値を出力します．
### 寿司打
寿司打もどきのタイピングゲームで遊べます．
選ぶとstartボタンが出てくるためクリックすると，入力すべき文字と現在何回中何回正しいタイピングをしているかが出てきます．```英数のローマ字```で出力されているローマ字をそのままタイピングし，```判定する```ボタンを押してください．（注意：文字中のんはn文末のんはnnなどで統一されているので，それ以外の打ち方に対応していません．たとえ違う文字列で正解の文字をかけたとしても不正解となります）正解した場合違う文字が出力され，何度も行うことができます．不正解の場合はもう一度同じ文字を打って正解が出るまで同じ文字が繰り返されます．

<!-- 
注意：項目名として「end」は使用できない
-->

### じゃんけんのフォローチャート
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

### 複数・多面対応サイコロのフォローチャート
```mermaid
flowchart TD;

start["開始"];
buttonpush[送信ボタンを押す]
input["サイコロの面の数＆サイコロの数の入力"]
end1["合計値と個々値の出力"]

start --> input --> buttonpush --> end1　--> input
```

### 寿司打のフォローチャート
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

```mermaid
sequenceDiagram
  autonumber
  Webブラウザ ->> Webサーバ: Webページの取得
  Webサーバ ->> Webブラウザ:HTML,JS,CSS
  Webブラウザ ->> BBSクライアント:起動
  BBSクライアント ->> BBSサーバ:Post(書き込み)
  BBSサーバ ->> BBSクライアント:全書き込み数
  BBSクライアント ->> BBSサーバ:Read(読み込み)
  BBSサーバ ->> BBSクライアント:掲示データ
  BBSクライアント ->> BBSサーバ:Check(新規チェック)
  BBSサーバ ->> BBSクライアント:全書き込み数 
```
```mermaid

sequenceDiagram
    participant Browser as Webブラウザ
    participant WebServer as Webサーバ
    participant Client as クライアント
    participant ClientServer as クライアントサーバ

    Browser->>WebServer: ゲームページをリクエスト
    WebServer->>Browser: HTML, JSリクエスト
    Browser->>Client:起動
    Client->>ClientServer: ユーザー入力（POSTリクエスト）
    ClientServer->>Client: 判定結果、次の単語を返す
    Client->>Browser: 判定結果、次の単語を表示


```

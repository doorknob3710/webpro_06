# webpro_06
## このプログラムについて
### ファイル一覧
ファイル名 | 説明|
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
/views/janken.ejs| じゃんけんのテンプレート

1. ```app5.js``` を起動する
1. Webブラウザで```localhost:8080/public/janken.html```にアクセスする
1. 自分の手を入力する

<!-- 
注意：項目名として「end」は使用できない
-->


```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"じゃんけんの勝敗"}
win["勝ち"]
tie["引き分け"]
lose["負け"]

start --> if
if -->|win| win
win --> end1
if -->|tie| tie
tie --> end1
if -->|lose| lose
lose --> end1
```
# カレンダーで特定の範囲を選択する（などの）jQuery プラグイン selectableBlock

## はじめに

日付の範囲を選択するようなユーザーインタフェースでは、その範囲の始点と終点をカレンダーコントロールを使って選択するようなものが一般的かと思います。

しかし、それほど広い範囲ではないケース（１週間とか１ヶ月）ではもっと簡単に、たとえばドラッグ操作で選択できればと思ったことはないでしょうか。

このコントロールはそのような「ドラッグによる範囲選択」を可能にします。

便宜的にカレンダーのようなもので説明をしますが、もちろんカレンダー以外にも用途は考えられます。

## デモ

[デモページ](https://tachypochy.github.io/jqSelectableBlock/demo.html )

## 初期化

```js
            $('.cal-day').selectableBlock({
                'dataId': 'cal-value', // 要素が持つ「値」が格納されている属性の名前を指定します。
                'onSelect': function (selection) {
                    // 選択された際に実施する処理を書きます。
                },
            });
```

これで、cal-day という class を持つ要素を範囲選択の対象とします。その要素には data-cal-value という属性を持たせて、日付を格納しておきます。

カレンダーが選択された場合に実施したい処理をコールバックとして渡すことも可能です。

## メソッド

### init()

初期化します。オブジェクト引数を指定できます。指定できるオプションと既定値は以下の通りです。

```js
            $('.cal-day').selectableBlock({
                'onSelect': function () {},// 選択時に実行するコールバック
                'dataId': 'selectable-block-value', // 要素が持つ「値」が格納されている属性の名前
                'selectedClass': 'selected', // 選択された要素に設定されるクラス名。
                'compare' : function (a,b) { // 要素が持つ「値」を比較するコールバック
                    if( a < b ) return -1;
                    if( a > b ) return 1;
                    return 0;
            });
```

### select()

選択状態にします。開始と終了を指定すると範囲選択を、連続しない複数の値を選択状態にしたい場合は配列を渡すことで選択状態を設定できます。

#### 初期化と同時に範囲選択状態

初期化と同時に選択状態にしたいことは頻繁にあります。デモページでは開始と終了を指定することでカレンダーを選択状態にしています。以下は範囲選択の例です。

```js
            $('.cal-day').selectableBlock({
                // 省略
            }).selectableBlock('select', {
                'start': '2018-02-01',
                'end': '2018-02-08'
            });
```

#### 配列による選択状態

初期化処理はされているものとします。

```js
            $('.cal-day').selectableBlock('select', {
                'values': ['2018-02-01', '2018-02-08']
            });
```

### clear()

選択状態を解除します。デモページでは ESC キーのイベントハンドラで実行しています。

### selection()

選択範囲をオブジェクトで取得します。

```js
            // Get selected values.
            // 変数 s には選択範囲の始点が格納されます。
            var s = $('.cal-day').selectableBlock('selection').start;
            
            // 変数 e には選択範囲の終点が格納されます。
            var e = $('.cal-day').selectableBlock('selection').end;
            
            // 変数 vals には選択状態にある値の配列が格納されます。
            // 重複は除外され、compare オプションで指定した関数を用いて
            // 比較・ソートされています。
            var vals = $('.cal-day').selectableBlock('selection').values;
```

選択された際のコールバックには、引数として同じオブジェクトが渡されます。

```js
            $('.cal-day').selectableBlock({
                'onSelect': function (selection) {
                    var s = selection.start;
                    var e = selection.end;
                    var vals = selection.values;
                },
            });
```

## その他の工夫

### カレンダーの余白

実際にドラッグ操作をしてみると、日付だけを狙ってドラッグ操作をするわけでもないことに気づきます。例えば１ヶ月まるごと選択したい場合、無意識にカレンダーの余白をクリックしているのではないでしょうか。

![図](docs/fig.png)

このような場合、この余白を表現するためのタグにも同じクラス（デモでは .cal-day）を設定し、ユーザーが期待する日付を dataId に設定しておきます。これにより、期待通り選択操作ができます。

選択値の配列は重複を除外するようになっているため、$('.cal-day').selectableBlock('selection') の結果に重複値は含まれません。

しかし副作用としてその余白にも selectedClass が設定されてしまいます。その見た目はあまり期待した結果ではありません。そのような場合は CSS で !important を用いて selectedClass を打ち消すようなスタイル設定を書いておきます（デモページの html で言うところの calendar-space です）。これで余白部分は（見た目のうえでは）選択されていません。

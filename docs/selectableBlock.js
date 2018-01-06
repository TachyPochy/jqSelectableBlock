/**
    jQuery.selectableBlock
*/
Array.prototype.toggle = function (val) {
    var i = this.indexOf(val);
    if (i === -1) {
        this.push(val);
        return true;
    } else {
        this.splice(i, 1);
        return false;
    }
};

(function($){

    // private propertys
    var settings = null;        // 拡張可能なオプション
    var mousepressed = false;   // マウスボタン押下状態の真偽値
    var startValue = null;      // 選択された値の開始値
    var endValue = null;        // 選択された値の末尾
    var values = [];            // 選択された値の配列
    var $this = null;
    
    // public methods
    var methods = {
        init : function( options ) {
            /*
                コンストラクタ
             */
            // オプションを設定する
            settings = $.extend(true, {
                'onSelect': function () {},
                'dataId': 'selectable-block-value',
                'selectedClass': 'selected',
                'compare' : function (a,b) {
                    if( a < b ) return -1;
                    if( a > b ) return 1;
                    return 0;
                },
            }, options);
            
            // 
            /*
                対象外の要素上でのマウスイベントハンドラを設定する。
                主にマウスボタンの状態を変数に保持しておくため。
             */
            $(window).on("mousedown", function (event) {
                // マウスボタンの状態を変数に保持しておく
                mousepressed = true;
            });
            $(window).on("mouseup", function (event) {
                // マウスボタンの状態を変数に保持しておく
                mousepressed = false;
            });
            return this.each(function (){
                /*
                    対象要素のマウスイベントハンドラを設定する。
                 */
                $(this).on('mousedown.selectableBlock', mousedown);
                $(this).on('mouseup.selectableBlock', mouseup);
                $(this).on('mouseenter.selectableBlock', mouseenter);
                $(this).on('mouseleave.selectableBlock', mouseleave);
            });
        },
        destroy : function () {
            /*
                デストラクタ
             */
            return this.each(function () {
                $(window).off('.selectableBlock');
            });
        },
        select : function ( options ) {
            /*
                引数で指定された値で選択状態にする
             */
            if (options !== undefined) {
                var opt = $.extend(true, {
                    'start': null,
                    'end': null,
                    'values': null
                }, options);
                if (opt.start !== null) {
                    startValue = opt.start;
                }
                if (opt.end !== null) {
                    endValue = opt.end;
                }
                if (opt.values !== null) {
                    values = opt.values;
                    setSelect('values');
                } else {
                    setSelect('fromto');
                }
            }
            return getSelection();
        },
        clear : function () {
            /*
                選択状態を解除する
             */
            startValue = null;
            endValue = null;
            values = [];
            setSelect('fromto');
        },
        selection: function () {
            /*
                選択された値を返す。
             */
            return getSelection();
        },
    };
    
    // private methods
    
    /*
        マウスイベントハンドラ。
     */
    var mousedown = function (event) {
        return $(this).each(function () {
            var crrVal = $(this).data(settings.dataId);
            if ((event.ctrlKey && !event.metaKey) || (!event.ctrlKey && event.metaKey)) {
                // > 個別選択（Windows は Control キー、Mac は Command キー）
            } else if (event.shiftKey && startValue !== null) {
                // > 範囲選択（終点）
                endValue = crrVal;
            } else {
                // > 範囲選択（始点）
                startValue = crrVal;
            }
            mousepressed = true;
            event.stopImmediatePropagation();
        });
    };
    
    var mouseup = function (event) {
        return $(this).each(function () {
            var crrVal = $(this).data(settings.dataId);
            if ((event.ctrlKey && !event.metaKey) || (!event.ctrlKey && event.metaKey)) {
                // > 個別選択。選択と解除をトグルする。
                values.toggle(crrVal);
                setSelect('values');
            } else {
                if (crrVal !== undefined) {
                    endValue = crrVal;
                }
                setSelect('fromto');
            }
            mousepressed = false;
            // ブラウザによるテキストの選択を解除する
            var blk = this;
            setTimeout(function () {
                if (window.getSelection) {
                    var selection = window.getSelection();
                    selection.collapse(blk, 0);
                } else {
                    var selection = document.selection.createRange();
                    selection.setEndPoint("EndToStart", selection);
                    selection.select();
                }
            }, 10);
            event.stopImmediatePropagation();
        });
    };
    
    var mouseleave = function (event) {
        return $(this).each(function () {
            var crrVal = $(this).data(settings.dataId);
            if (mousepressed) {
                $(this).addClass(settings.selectedClass);
            }
        });
    };
    
    var mouseenter = function (event) {
        return $(this).each(function () {
            var crrVal = $(this).data(settings.dataId);
            if (mousepressed) {
                $(this).addClass(settings.selectedClass);
            }
        });
    };

    var setSelect = function (selecttype) {
        /*
            選択されたものに対して、選択状態にする（settings.selectedClass を付与する）。
         */
        
        if (selecttype === 'fromto') {
            values = [];
            // From -> To の前後確認をする
            if (settings.compare(startValue, endValue) > 0) {
                var tmp = startValue;
                startValue = endValue;
                endValue = tmp;
            }
            $($this.selector).each(function (){
                // From -> To で範囲選択する（選択値の配列を書き換える）
                if ($(this).data(settings.dataId) >= startValue &&
                    $(this).data(settings.dataId) <= endValue) {
                    $(this).addClass(settings.selectedClass);
                    values.push($(this).data(settings.dataId));
                } else {
                    $(this).removeClass(settings.selectedClass);
                }
            });
        } else if (selecttype === 'values') {
            $($this.selector).each(function (){
                // クリックされたものだけを選択状態にする
                if (values.indexOf($(this).data(settings.dataId)) >= 0) {
                    $(this).addClass(settings.selectedClass);
                } else {
                    $(this).removeClass(settings.selectedClass);
                }
            });
        }
        // 選択されたものの重複を排除する
        values = values.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
        // 選択されたものをソートする
        values.sort(settings.compare);
        startValue = values[0];
        endValue = values[values.length-1];
        // 選択状態にした後のコールバックを実行する
        settings.onSelect({
                'start' : startValue,
                'end' : endValue,
                'values' : values
        });
        return $this;
    };
    
    var getSelection = function () {
        /*
            選択範囲を返す。
         */
        return {
            'start': startValue,
            'end': endValue,
            'values': values
        };
    };
    
    $.fn.selectableBlock = function( method ) {
        /*
            プラグインエントリ。
         */
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            $this = this;
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.selectableBlock' );
        }
    };
    
})(jQuery);

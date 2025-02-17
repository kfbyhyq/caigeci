document.addEventListener('DOMContentLoaded', function () {
    const width = window.innerWidth;
    const minSize = 14;
    const maxSize = 24;
    let fontSize = Math.min(Math.max(minSize, width / 40), maxSize);
    document.body.style.fontSize = `${fontSize}px`;
    document.getElementById('guess').style.fontSize = `${fontSize}px`;
    document.getElementById('confirm').style.fontSize = `${fontSize}px`;

    var lyric = `达拉崩吧
洛天依 言和
很久很久以前 巨龙突然出现
带来灾难 带走了公主又消失不见
王国十分危险 世间谁最勇敢
一位勇者赶来 大声喊
我要带上最好的剑 翻过最高的山
闯进最深的森林 把公主带回到面前
国王非常高兴 忙问他的姓名
年轻人想了想 他说
陛下我叫 达拉崩吧斑得贝迪卜多比鲁翁
再说一次 达拉崩吧斑得贝迪卜多比鲁翁
是不是 达拉崩吧斑得贝迪卜多比鲁翁
啊对对 达拉崩吧斑得贝迪卜多比鲁翁
英雄达拉崩吧 骑上最快的马
带着大家的希望 从城堡里出发
战胜魔兽来袭 获得十二金币
无数伤痕见证 他慢慢升级
偏远美丽村庄 打开所有宝箱
一路风霜伴随 指引前路的圣月光
闯入一座山洞 公主和可怕巨龙
英雄拔出宝剑 巨龙说
我是 昆图库塔卡提考特苏瓦西拉松
再来一次 昆图库塔卡提考特苏瓦西拉松
是不是 昆特牌提琴烤蛋挞苏打马拉松
不对是 昆图库塔卡提考特苏瓦西拉松
于是 达拉崩吧斑得贝迪卜多比鲁翁
砍向 昆图库塔卡提考特苏瓦西拉松
然后 昆图库塔卡提考特苏瓦西拉松
咬了 达拉崩吧斑得贝迪卜多比鲁翁
最后 达拉崩吧斑得贝迪卜多比鲁翁
他战胜了 昆图库塔卡提考特苏瓦西拉松
救出了 公主米娅莫拉苏娜丹妮谢莉红
回到了 蒙达鲁克硫斯伯古比奇巴勒城
国王听说 达拉崩吧斑得贝迪卜多比鲁翁
他打败了 昆图库塔卡提考特苏瓦西拉松
就把 公主米娅莫拉苏娜丹妮谢莉红
嫁给了 达拉崩吧斑得贝迪卜多比鲁翁
啦啦 达拉崩吧 公主米娅
幸福得像个童话
他们生下一个孩子 也在天天渐渐长大
为了避免以后麻烦 孩子称作王浩然
他的全名十分难念 我不想说一遍`;
    // var lyric = `测试歌曲`;
    var rows = lyric.split(/\n/);
    const chineseRegex = /^[\u4e00-\u9fa5]+$/;
    const englishRegex = /^[A-Za-z]$/;
    const numRegex = /^\d$/
    let table = document.getElementById('displayTable');
    var charsMap = [];
    var charsIndex = 0;
    for (let i = 0; i < rows.length; i++) {
        var textRow = table.insertRow();
        if (i == 0) {
            textRow.id = 'title';
        }
        for (let j = 0; j < rows[i].length; j++) {
            var textCell = textRow.insertCell();
            var char = document.createElement('span');
            if (chineseRegex.test(rows[i][j]) || englishRegex.test(rows[i][j]) || numRegex.test(rows[i][j])) {
                char.id = charsIndex;
                charsMap[charsIndex] = rows[i][j];
                charsIndex++;
                char.textContent = '00'
                textCell.className = 'zi hide';
            } else {
                char.textContent = rows[i][j];
            }
            textCell.appendChild(char);
        }
    }

    var guessHistory = '';
    var guessNum = 0;
    var failChars = ''
    document.getElementById('confirm').addEventListener('click', function() {
        guessProcess();
    });
    document.getElementById('guess').onkeydown = function(event) {
        if (event.key === 'Enter') {
            guessProcess();
        }
    };

    function guessProcess() {
        document.getElementById('success').style.display = 'none';
        document.getElementById('fail').style.display = 'none';
        document.getElementById('repeat').style.display = 'none';
        document.getElementById('done').style.display = 'none';
        let input = document.getElementById('guess');
        if (input.value) {
            let guessChar = input.value;
            if (guessChar.length > 1) {
                guessChar = guessChar[0];
            }
            document.getElementById('guess').value = '';
            document.getElementById('guess').placeholder = guessChar;
            if (guessHistory.includes(guessChar)) {
                document.getElementById('repeat').style.display = 'inline';
            } else {
                guessNum++;
                document.getElementById('guessNum').textContent = guessNum;
                guessHistory += guessChar;
                var matchNum = 0;
                let cells = table.getElementsByClassName('zi');
                for (let i = 0; i < cells.length; i++) {
                    let char = cells[i].querySelector("span");
                    if (charsMap[char.id] == guessChar) {
                        matchNum++;
                        char.textContent = guessChar;
                        cells[i].classList.remove('hide');
                        cells[i].classList.add('right');
                        cells[i].style.backgroundColor = 'rgb(154, 211, 239)';
                    } else if (cells[i].classList.contains('right')) {
                        cells[i].style.backgroundColor = 'transparent';
                    }
                }
                if (matchNum == 0) {
                    document.getElementById('fail').style.display = 'inline';
                    failChars += guessChar;
                    document.getElementById('failChars').textContent = failChars;
                } else {
                    document.getElementById('matchNum').textContent = matchNum;
                    document.getElementById('success').style.display = 'inline';
                    let title = document.getElementById('title');
                    let titleLeft = title.getElementsByClassName('hide');
                    console.log(titleLeft);
                    if (titleLeft.length == 0) {
                        document.getElementById('done').style.display = 'inline';
                        document.getElementById('confirm').style.pointerEvents = 'none';
                        let cells = table.getElementsByClassName('zi');
                        for (let i = 0; i < cells.length; i++) {
                            if (cells[i].classList.contains('hide')) {
                                let char = cells[i].querySelector("span");
                                char.textContent = charsMap[char.id];
                                cells[i].style.backgroundColor = 'transparent';
                            } else {
                                cells[i].style.backgroundColor = 'rgb(152, 255, 155)';
                            }
                        }
                    }
                }
            }
        }
    }
});

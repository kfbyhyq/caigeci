document.addEventListener('DOMContentLoaded', function () {
    const width = window.innerWidth;
    const minSize = 14;
    const maxSize = 24;
    let fontSize = Math.min(Math.max(minSize, width / 40), maxSize);
    document.body.style.fontSize = `${fontSize}px`;
    document.getElementById('guess').style.fontSize = `${fontSize}px`;
    document.getElementById('confirm').style.fontSize = `${fontSize}px`;

    var lyric = `北京欢迎你
群星
迎接另一个晨曦 带来全新空气
气息改变情味不变 茶香飘满情谊
我家大门常打开 开放怀抱等你
拥抱过就有了默契 你会爱上这里
不管远近都是客人 请不用客气
相约好了在一起 我们欢迎你
我家种着万年青 开放每段传奇
为传统的土壤播种 为你留下回忆
陌生熟悉都是客人 请不用拘礼
第几次来没关系 有太多话题
北京欢迎你 为你开天辟地
流动中的魅力充满着朝气
北京欢迎你 在太阳下分享呼吸
在黄土地刷新成绩
我家大门常打开 开怀容纳天地
岁月绽放青春笑容 迎接这个日期
天大地大都是朋友 请不用客气
画意诗情带笑意 只为等待你
北京欢迎你 像音乐感动你
让我们都加油去超越自己
北京欢迎你 有梦想谁都了不起
有勇气就会有奇迹
北京欢迎你 为你开天辟地
流动中的魅力充满着朝气
北京欢迎你 在太阳下分享呼吸
在黄土地刷新成绩
北京欢迎你 像音乐感动你
让我们都加油去超越自己
北京欢迎你 有梦想谁都了不起
有勇气就会有奇迹
我家大门常打开 开放怀抱等你
拥抱过就有了默契 你会爱上这里
不管远近都是客人 请不用客气
相约好了在一起 我们欢迎你
北京欢迎你 为你开天辟地
流动中的魅力充满着朝气
北京欢迎你 在太阳下分享呼吸
在黄土地刷新成绩
我家大门常打开 开怀容纳天地
岁月绽放青春笑容 迎接这个日期
天大地大都是朋友 请不用客气
画意诗情带笑意 只为等待你
北京欢迎你 像音乐感动你
让我们都加油去超越自己
北京欢迎你 有梦想谁都了不起
有勇气就会有奇迹
北京欢迎你 为你开天辟地
流动中的魅力充满着朝气
北京欢迎你 在太阳下分享呼吸
在黄土地刷新成绩
北京欢迎你 像音乐感动你
让我们都加油去超越自己
北京欢迎你 有梦想谁都了不起
有勇气就会有奇迹
北京欢迎你 有梦想谁都了不起
有勇气就会有奇迹
北京欢迎你 有梦想谁都了不起
有勇气就会有奇迹`;
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

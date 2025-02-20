document.addEventListener('DOMContentLoaded', function () {
    const width = window.innerWidth;
    const minSize = 14;
    const maxSize = 24;
    let fontSize = Math.min(Math.max(minSize, width / 40), maxSize);
    document.body.style.fontSize = `${fontSize}px`;
    document.getElementById('guess').style.fontSize = `${fontSize}px`;
    document.getElementById('confirm').style.fontSize = `${fontSize}px`;

    var lyric = `中国话
SHE
扁担宽 板凳长
扁担想绑在板凳上
扁担宽 板凳长
扁担想绑在板凳上
伦敦玛丽莲 买了件旗袍送妈妈
莫斯科的夫司基爱上牛肉面疙瘩
各种颜色的皮肤 各种颜色的头发
嘴里念的说的开始流行中国话
多少年我们苦练英文发音和文法
这几年换他们卷着舌头
学平上去入的变化
平平仄仄平平仄
好聪明的中国人 好优美的中国话
扁担宽 板凳长
扁担想绑在板凳上
板凳不让扁担绑在板凳上
扁担偏要绑在板凳上
板凳偏偏不让扁担绑在那板凳上
到底扁担宽还是板凳长
哥哥弟弟坡前坐
坡上卧着一只鹅
坡下流着一条河
哥哥说 宽宽的河
弟弟说 白白的鹅
鹅要过河 河要渡鹅
不知是那鹅过河
还是河渡鹅
全世界都在学中国话
孔夫子的话 越来越国际化
全世界都在讲中国话
我们说的话 让世界都认真听话
纽约苏珊娜 开了间禅风Lounge Bar
柏林来的沃夫冈 拿胡琴配着电吉他
各种颜色的皮肤 各种颜色的头发
嘴里念的说的开始流行中国话
多少年我们苦练英文发音和文法
这几年换他们卷着舌头
学平上去入的变化
仄仄平平仄仄平
好聪明的中国人 好优美的中国话
有个小孩叫小杜
上街打醋又买布
买了布 打了醋
回头看见鹰抓兔
放下布 搁下醋
上前去追鹰和兔
飞了鹰 跑了兔
洒了醋 湿了布
嘴说腿 腿说嘴
嘴说腿 爱跑腿
腿说嘴 爱卖嘴
光动嘴 不动腿
光动腿 不动嘴
不如不长腿和嘴
到底是那嘴说腿 还是腿说嘴
全世界都在学中国话
孔夫子的话 越来越国际化
全世界都在讲中国话
我们说的话 让世界都认真听话
全世界都在学中国话
孔夫子的话 越来越国际化
全世界都在讲中国话
我们说的话 让世界都认真听话
全世界都在学中国话
孔夫子的话 越来越国际化
全世界都在讲中国话
我们说的话 让世界都认真听话`;
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

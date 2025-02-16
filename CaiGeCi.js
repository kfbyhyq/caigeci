document.addEventListener('DOMContentLoaded', function () {
    const width = window.innerWidth;
    const minSize = 14;
    const maxSize = 24;
    let fontSize = Math.min(Math.max(minSize, width / 40), maxSize);
    document.body.style.fontSize = `${fontSize}px`;
    document.getElementById('guess').style.fontSize = `${fontSize}px`;
    document.getElementById('confirm').style.fontSize = `${fontSize}px`;

    var lyric = `单身情歌
林志炫
抓不住爱情的我
总是眼睁睁看它溜走
世界上幸福的人到处有
为何不能算我一个
为了爱孤军奋斗
早就吃够了爱情的苦
在爱中失落的人到处有
而我只是其中一个
爱要越挫越勇
爱要肯定执着
每一个单身的人得看透
想爱就别怕伤痛
找一个最爱的 深爱的
相爱的 亲爱的人
来告别单身
一个多情的 痴情的
绝情的 无情的人
来给我伤痕
孤单的人那么多
快乐的没有几个
不要爱过了 错过了
留下了单身的我
独自唱情歌
为了爱孤军奋斗
早就吃够了爱情的苦
在爱中失落的人到处有
而我不是最后一个
爱要越挫越勇
爱要肯定执着
每一个单身的人得看透
想爱就别怕伤痛
找一个最爱的 深爱的
相爱的 亲爱的人
来告别单身
一个多情的 痴情的
绝情的 无情的人
来给我伤痕
孤单的人那么多
快乐的没有几个
不要爱过了 错过了
留下了单身的我
独自唱情歌
找一个最爱的 深爱的
相爱的 亲爱的人
来告别单身
一个多情的 痴情的
绝情的 无情的人
来给我伤痕
伤心的人那么多
我应该勇敢地过
不要爱过了 错过了
留下了单身的我
独自唱情歌
这首真心的 痴心的
伤心的单身情歌
谁与我来和`;
    // var lyric = `测试歌曲`;
    var rows = lyric.split(/\n/);
    const chineseRegex = /^[\u4e00-\u9fa5]+$/;
    const englishRegex = /^[A-Za-z]$/;
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
            if (chineseRegex.test(rows[i][j]) || englishRegex.test(rows[i][j])) {
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

document.addEventListener('DOMContentLoaded', function () {
    const width = window.innerWidth;
    const minSize = 14;
    const maxSize = 24;
    let fontSize = Math.min(Math.max(minSize, width / 40), maxSize);
    document.body.style.fontSize = `${fontSize}px`;
    document.getElementById('guess').style.fontSize = `${fontSize}px`;
    document.getElementById('confirm').style.fontSize = `${fontSize}px`;

    var lyric = `水手
郑智化
苦涩的沙 吹痛脸庞的感觉
像父亲的责骂 母亲的哭泣
永远难忘记
年少的我 喜欢一个人在海边
卷起裤管光着脚丫 踩在沙滩上
总是幻想海洋的尽头有另一个世界
总是以为勇敢的水手是真正的男儿
总是一副弱不禁风孬种的样子
在受人欺负的时候 总是听见水手说
他说 风雨中 这点痛算什么
擦干泪 不要怕
至少我们还有梦
他说 风雨中 这点痛算什么
擦干泪 不要问 为什么
长大以后 为了理想而努力
渐渐地忽略了父亲母亲和故乡的消息
如今的我 生活就像在演戏
说着言不由衷的话
戴着伪善的面具
总是拿着微不足道的成就来骗自己
总是莫名其妙感到一阵的空虚
总是靠一点酒精的麻醉才能够睡去
在半睡半醒之间仿佛又听见水手说
他说 风雨中 这点痛算什么
擦干泪 不要怕
至少我们还有梦
他说 风雨中 这点痛算什么
擦干泪 不要问 为什么
寻寻觅觅 寻不到活着的证据
都市的柏油路太硬 踩不出足迹
骄傲无知的现代人 不知道珍惜
那一片被文明糟蹋过的海洋和天地
只有远离人群才能找回我自己
在带着咸味的空气中自由的呼吸
耳畔又传来汽笛声和水手的笑语
永远在内心的最深处 听见水手说
他说 风雨中 这点痛算什么
擦干泪 不要怕
至少我们还有梦
他说 风雨中 这点痛算什么
擦干泪 不要问 为什么
他说 风雨中 这点痛算什么
擦干泪 不要怕
至少我们还有梦
他说 风雨中 这点痛算什么
擦干泪 不要问 为什么
他说 风雨中 这点痛算什么
擦干泪 不要怕
至少我们还有梦
他说 风雨中 这点痛算什么
擦干泪 不要问 为什么`;
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

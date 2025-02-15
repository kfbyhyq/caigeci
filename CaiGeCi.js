document.addEventListener('DOMContentLoaded', function () {
    const width = window.innerWidth;
    const minSize = 14;
    const maxSize = 24;
    let fontSize = Math.min(Math.max(minSize, width / 40), maxSize);
    document.body.style.fontSize = `${fontSize}px`;
    document.getElementById('guess').style.fontSize = `${fontSize}px`;
    document.getElementById('confirm').style.fontSize = `${fontSize}px`;

    var lyric = `盼暖春来
刺猬
每年寒冬深夜时漫天飞雪
深秋时节飘落叶昏黄漫天
夏日炎炎时我也没了直觉
只盼来年暖春时节鲜花 开遍漫山野
眼眶晃动泪水与你的照片
融化了的飞雪掠过双眉间
复如其来的悲伤打湿落叶
只盼来年春暖花开时 我真能有改变
又是一年春雪 瑞丰年
开心的每张笑脸 染红满了天
绣窗花剪 红红的大挂鞭
剧终时节 分阅中恋
多少失眠夜
相伴步旅田园
思念悬炫 梦幻夜 寥同缘
欲无尽夜 痛迂回 绕空念
波光映月 随心轮 妙瞳圆
驳爱斑悬 缘启灭 漂融血`;
    // var lyric = `测试歌曲`;
    var rows = lyric.split(/\n/);
    const chineseRegex = /^[\u4e00-\u9fa5]+$/;
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
            if (chineseRegex.test(rows[i][j])) {
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

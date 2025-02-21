document.addEventListener('DOMContentLoaded', function () {
    const width = window.innerWidth;
    const minSize = 14;
    const maxSize = 24;
    let fontSize = Math.min(Math.max(minSize, width / 40), maxSize);
    document.body.style.fontSize = `${fontSize}px`;
    document.getElementById('guess').style.fontSize = `${fontSize}px`;
    document.getElementById('confirm').style.fontSize = `${fontSize}px`;

    var lyric = `男孩别哭
海龟先生
我跟你描述一个灵魂
它拥有不谢的青春
每当夜色降临
就会轻轻歌唱
它唱着一个新鲜的故事
里面的人们相互微笑
是不是每个夜晚都要这样
为了爱
去用清醒交换
男孩别哭
美丽世界的孤儿
可我的心
我的家
在哪里
在哪里呢我的朋友
静静地听
有个声音在说爱你
闭上眼
跟随她
跟随她
就像跟着希望
那些城市上空飘着一颗颗不安的心
她一定也曾在这儿跳过欢快的舞蹈
清风吹来让我感到一阵迷醉
那婆娑的身影
太阳般光洁
那些男孩一次次的叫着寂寞妈妈
爱是否能抚平他们内心的内心的伤痕
孤独的人呐
我带上你走
boy boy boy isolation bye bye bye bye bye
One night stand
Dance dance dance in nowhere
Dont dont dont dont dont be afraid
boy boy boy isolation bye bye bye bye bye
One night stand
Dance dance dance in nowhere
Dont dont dont dont dont be afraid
这是一个放肆狂妄的年代
我们的身体
怎能时刻拥抱在一起
去见证这样的爱情
早已筋疲力尽
你脸上尽管挂着深深的泪痕
我的心 我的爱
还是跟着梦想远走
去寻找另一个生命
它会带上我走
boy boy boy isolation bye bye bye bye bye
One night stand
Dance dance dance in nowhere
Dont dont dont dont dont be afraid
boy boy boy isolation bye bye bye bye bye
One night stand
Dance dance dance in nowhere
Dont dont dont dont dont be afraid`;
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

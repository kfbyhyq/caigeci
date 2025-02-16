document.addEventListener('DOMContentLoaded', function () {
    const width = window.innerWidth;
    const minSize = 14;
    const maxSize = 24;
    let fontSize = Math.min(Math.max(minSize, width / 40), maxSize);
    document.body.style.fontSize = `${fontSize}px`;
    document.getElementById('guess').style.fontSize = `${fontSize}px`;
    document.getElementById('confirm').style.fontSize = `${fontSize}px`;

    var lyric = `老男孩
筷子兄弟
那是我日夜思念深深爱着的人呐
到底我该如何表达
她会接受我吗
也许永远都不会跟她说出那句话
注定我要浪迹天涯
怎么能有牵挂
梦想总是遥不可及
是不是应该放弃
花开花落又是一季
春天啊你在哪里
青春如同奔流的江河
一去不回来不及道别
只剩下麻木的我没有了当年的热血
看那漫天飘零的花朵
在最美丽的时刻凋谢
有谁会记得这世界她来过
转眼过去多年世间多少离合悲欢
曾经志在四方少年羡慕南飞的雁
各自奔前程的身影匆匆渐行渐远
未来在哪里平凡啊谁给我答案
那时陪伴我的人啊你们如今在何方
我曾经爱过的人啊现在是什么模样
当初的愿望实现了吗
事到如今只好祭奠吗
任岁月风干理想再也找不回真的我
抬头仰望这满天星河
那时候陪伴我的那颗
这里的故事你是否还记得
生活像一把无情刻刀
改变了我们模样
未曾绽放就要枯萎吗
我有过梦想
青春如同奔流的江河
一去不回来不及道别
只剩下麻木的我没有了当年的热血
看那满天飘零的花朵
在最美丽的时刻凋谢
有谁会记得这世界它曾经来过
当初的愿望实现了吗
事到如今只好祭奠吗
任岁月风干理想再也找不回真的我
抬头仰望这满天星河
那时候陪伴我的那颗
这里的故事你是否还记得
如果有明天祝福你亲爱的`;
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

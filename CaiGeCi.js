document.addEventListener('DOMContentLoaded', function () {
    const width = window.innerWidth;
    let fontSize = 16;

    if (width < 600) {
        fontSize = 14;
    } else if (width >= 600 && width < 900) {
        fontSize = 18;
    } else {
        fontSize = 20;
    }
    document.body.style.fontSize = `${fontSize}px`;
    document.getElementById('vw').textContent = width;

    var lyric = `稻香
周杰伦
对这个世界 如果你有太多的抱怨
跌倒了 就不敢继续往前走
为什么 人要这么的脆弱 堕落
请你打开电视看看
多少人 为生命在努力勇敢的走下去
我们是不是该知足
珍惜一切 就算没有拥有
还记得 你说家是唯一的城堡
随着稻香 河流继续奔跑
微微笑 小时候的梦我知道
不要哭 让萤火虫带着你逃跑
乡间的歌谣 永远的依靠
回家吧 回到最初的美好
不要这么容易 就想放弃
就像我说的
追不到的梦想 换个梦不就得了
为自己的人生鲜艳上色
先把爱涂上喜欢的颜色
笑一个吧 功成名就不是目的
让自己快乐快乐 这才叫做意义
童年的纸飞机
现在终于飞回我手里
所谓的那快乐
赤脚在田里追蜻蜓 追到累了
偷摘水果 被蜜蜂给叮到怕了
谁在偷笑呢
我靠着稻草人 吹着风 唱着歌 睡着了
哦 哦 午后吉他在虫鸣中更清脆
哦 哦 阳光洒在路上就不怕心碎
珍惜一切 就算没有拥有
还记得 你说家是唯一的城堡
随着稻香 河流继续奔跑
微微笑 小时候的梦我知道
不要哭 让萤火虫带着你逃跑
乡间的歌谣 永远的依靠
回家吧 回到最初的美好
还记得 你说家是唯一的城堡
随着稻香 河流继续奔跑
微微笑 小时候的梦我知道
不要哭 让萤火虫带着你逃跑
乡间的歌谣 永远的依靠
回家吧 回到最初的美好`;
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
                char.className = 'zi hide';
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
                let chars = table.getElementsByClassName('zi');
                for (let i = 0; i < chars.length; i++) {
                    if (charsMap[chars[i].id] == guessChar) {
                        matchNum++;
                        chars[i].textContent = guessChar;
                        chars[i].classList.remove('hide');
                        chars[i].classList.add('right');
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
                        let chars = table.getElementsByClassName('zi');
                        for (let i = 0; i < chars.length; i++) {
                            if (chars[i].classList.contains('hide')) {
                                chars[i].textContent = charsMap[chars[i].id];
                                chars[i].style.backgroundColor = 'rgb(255, 127, 127)';
                            } else {
                                chars[i].style.backgroundColor = 'rgb(152, 255, 155)';
                            }
                        }
                    }
                }
            }
        }
    });
});

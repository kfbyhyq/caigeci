document.addEventListener('DOMContentLoaded', function () {
    const width = window.innerWidth;
    const minSize = 14;
    const maxSize = 24;
    let fontSize = Math.min(Math.max(minSize, width / 40), maxSize);
    document.body.style.fontSize = `${fontSize}px`;
    document.getElementById('guess').style.fontSize = `${fontSize}px`;
    document.getElementById('confirm').style.fontSize = `${fontSize}px`;

    var lyric = `飘向北方
梦想的旅途 我背井离乡
肩上扛的行囊 装着对未来的梦想
我和你们一样 也来自远方
做着普通的工作 在外漂泊思乡
有多少人都希望
自己的生活 能过得好一点
能改变自己的历史 让父母的压力小一点
每逢过节的时候 少不了对父母的那份思念
不能回家因为自己的梦想 还没有实现
他们的坚强他们的梦 他们的苦只有自己懂
回不到曾经看不到未来 一切都是那么的空
还要一直拼命地走着 用尽全力奋斗着
然而这也是我的生活 在梦想之途前进着
拿起了电话说 妈妈我还好
我回到了现实 继续解决我的温饱
我被别人说好 也被别人嘲笑
但从没被现实打倒 这就是北漂
我飘向北方 别问我家乡
高耸古老的城墙 挡不住忧伤
我飘向北方 家人是否无恙
肩上沉重的行囊 盛满了惆怅
也是最后期望
随便你叫我 来自火星还是来自地球
生活在张牙舞爪的世界 我要拼到尽头
每天的祷告 让我毅力变得如此宽厚
我要踏着力气 奋斗穿破整个宇宙
他们都叫我Mr.Mars
不如叫我Mr.King
夺走我的皇冠 也不敢抢走我的自信
If you wanna stay with me
我给你一臂之力
打破僵局在地平线 只有我和你
我踏着你的肩膀 走在战场的前方
用气场去压倒着haters的迹象
不喜欢退缩 因为血性冷落
一场战争怎么能取得胜利 如果没有我
看 王者的战旗 在国度里升起
我看见许多双手挥起了手臂
请用尽全力高喊Mr.King
我的梦在哪里 我就漂在哪里
Fighting war
只有奋斗才能改变命运
Fighting war
王者的风范现在说给你听
Fighting war
在我意识里只有胜利没有放弃
我飘向北方 别问我家乡
高耸古老的城墙 挡不住忧伤
我飘向北方 家人是否无恙
肩上沉重的行囊 盛满了惆怅
也是最后期望
从2005到2018 从模仿到原创到潜能激发
新疆到北京我一路急刹 夸赞被嘲笑但从被击垮
拼了老命 养活一家
脑里只有Hip-Hop没尽头
无数张paper在家里挤压 趴下了也从未被谁欺压
Call me Lil EM
From the west
现在炫给你看
技术来记录 这押韵的密度
我意图来吸附 你灵魂的脊柱
别低估我力度 我企图玩艺术
却迷路在起步 记住我的去处
必须跟你叙述 技术在灵魂面前必输
Hands up everybody
我飘向北方
随便你叫我 来自火星还是来自地球
生活在张牙舞爪的世界 我要拼到尽头
每天的祷告 让我毅力变得如此宽厚
我要踏着力气
挡不住忧伤
奋斗穿破整个宇宙
他们都叫我Mr.Mars
不如叫我Mr.King
家人是否无恙
夺走我的皇冠
也不敢抢走我的自信
If you wanna stay with me
我给你一臂之力
打破僵局在地平线
只有我和你
那是最后期望
回不去的远方
我的梦在哪里
我就飘在哪里
如果你们有梦想
放开的去追
别再问我家乡
因为只有奋斗
才能改变命运
Peace`;
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

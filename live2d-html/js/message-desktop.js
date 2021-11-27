function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦~~', 5000);
});

function initTips(){
    $.ajax({
        cache: true,
        url: `${message_Path}message.json`,
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(tips.selector).mouseover(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips){
                $(tips.selector).click(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
        }
    });
}
initTips();

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = '嗨！来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友！';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = '嗨！ 来自 百度搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'so') {
            text = '嗨！ 来自 360搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'google') {
            text = '嗨！ 来自 谷歌搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }else {
        if (window.location.href == `${home_Path}`) { //主页URL判断，需要斜杠结尾
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？';
            } else if (now > 5 && now <= 7) {
                text = '早上好！一日之计在于晨，美好的一天就要开始了！';
            } else if (now > 7 && now <= 11) {
                text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
            } else if (now > 11 && now <= 14) {
                text = '中午了，工作了一个上午，现在是午餐时间！';
            } else if (now > 14 && now <= 17) {
                text = '午后很容易犯困呢，今天的运动目标完成了吗？';
            } else if (now > 17 && now <= 19) {
                text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~';
            } else if (now > 19 && now <= 21) {
                text = '晚上好，今天过得怎么样？';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，晚安~~';
            } else {
                text = '嗨~ 快来逗我玩吧！';
            }
        }else {
            text = '欢迎阅读<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }
    showMessage(text, 12000);
})();

window.setInterval(showHitokoto,25000);

function showHitokoto(){
    $.getJSON('https://v1.hitokoto.cn/',function(result){
        showMessage(result.hitokoto, 15000);
    });
	
	/*var s=[
		"你今天做事情了吗？",
		"英语阅读写了吗？",
		"你的计划按时完成了吗？",
		"今天背了10个考纲词汇了吗？",
		"记得背文言文和古诗",
		"上课要认真听课",
		"作业写完了吗？",
		"该背的书都背了吗",
		"记得复习英语笔记",
		"数学公式都会吗",
		"物理公式都会了吗",
		"记得背化学方程式",
		"要把生物的知识点全都弄清楚",
		"愿风神忽悠你~",
		"从此蒙德归璃月",
		"派蒙，最好的应急食物"
	];
	r1=(Math.floor(Math.random() * 2));
	
	if ((r1==1&&gets==3)||gets==1){
		$.getJSON('https://v1.hitokoto.cn/',function(result){
			showMessage(result.hitokoto+'</br>——'+result.from, 15000);
		});
	}
    else if ((r1==0&&gets==3)||gets==2){
		$.getJSON('https://v1.jinrishici.com/all.json',function(result){
			showMessage(result.content+'</br>——'+result.author+'《'+result.origin+'》', 15000);
		});
	}
	else if (gets==0){
		rand=(Math.floor(Math.random() * 16));
		showMessage(s[rand], 15000);
	}
    else if (gets==4){
		note='<span style="color:#0099cc;"></span>';
        //浅绿:#B5CEA8 
        //深绿:#6A9955
        //淡黄:#DCDCAA
        //淡蓝:#9CDCFE
        //亮蓝:#4FC1FF
        //深蓝:#569CD6
        //紫色:#C586C0
		showMessage(note, 15000);
	}
	*/
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    //console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

function initLive2d (){
    $('.key1').css('display', 'none')
    $('.key2').css('display', 'none')
    $('.key3').css('display', 'none')
    $('.key4').css('display', 'none')
    $('.key5').css('display', 'none')
    $('.key6').css('display', 'none')
    $('.key7').css('display', 'none')
    $('.key8').css('display', 'none')
    $('.key9').css('display', 'none')
    $('.key0').css('display', 'none')
    $('.keyback').css('display', 'none')

    $('.hide-button').fadeOut(0).on('click', () => {
        $('#landlord').css('display', 'none')
    })
    $('#landlord').hover(() => {
        $('.hide-button').fadeIn(600)
    }, () => {
        $('.hide-button').fadeOut(600)
    })
	
	$('.switch-button').fadeOut(0).on('click', () => {
        change3();
    })
    $('#landlord').hover(() => {
        $('.switch-button').fadeIn(600)
    }, () => {
        $('.switch-button').fadeOut(600)
    })

    $('.noib').fadeOut(0).on('click',() => {
    })
    $('#landlord').hover(() => {
        $('.noib').fadeIn(600)
    }, () => {
        $('.noib').fadeOut(600)
    })

    $('.input-button').fadeOut(0).on('click',() => {
        inputchange2();
    })
    $('#landlord').hover(() => {
        $('.input-button').fadeIn(600)
    }, () => {
        $('.input-button').fadeOut(600)
    })

    $('.keyboard').fadeOut(0).on('click',() => {
        $('.key1').toggle()
        $('.key2').toggle()
        $('.key3').toggle()
        $('.key4').toggle()
        $('.key5').toggle()
        $('.key6').toggle()
        $('.key7').toggle()
        $('.key8').toggle()
        $('.key9').toggle()
        $('.key0').toggle()
        $('.keyback').toggle()
    })
    $('#landlord').hover(() => {
        $('.keyboard').fadeIn(600)
    }, () => {
        $('.keyboard').fadeOut(600)
    })

    $('.key1').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.concat("1");
        document.getElementById("noib").value = str;
    })
    $('.key2').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.concat("2");
        document.getElementById("noib").value = str;
    })
    $('.key3').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.concat("3");
        document.getElementById("noib").value = str;
    })
    $('.key4').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.concat("4");
        document.getElementById("noib").value = str;
    })
    $('.key5').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.concat("5");
        document.getElementById("noib").value = str;
    })
    $('.key6').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.concat("6");
        document.getElementById("noib").value = str;
    })
    $('.key7').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.concat("7");
        document.getElementById("noib").value = str;
    })
    $('.key8').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.concat("8");
        document.getElementById("noib").value = str;
    })
    $('.key9').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.concat("9");
        document.getElementById("noib").value = str;
    })
    $('.key0').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.concat("0");
        document.getElementById("noib").value = str;
    })
    $('.keyback').fadeOut(0).on('click',() => {
        var input=document.getElementById("noib").value;
        str=input.slice(0,input.length-1); 
        document.getElementById("noib").value = str;
    })

    $('#landlord').hover(() =>  {
        $('.key1').fadeOut(600)
        $('.key2').fadeOut(600)
        $('.key3').fadeOut(600)
        $('.key4').fadeOut(600)
        $('.key5').fadeOut(600)
        $('.key6').fadeOut(600)
        $('.key7').fadeOut(600)
        $('.key8').fadeOut(600)
        $('.key9').fadeOut(600)
        $('.key0').fadeOut(600)
        $('.keyback').fadeOut(600)
    })

}
initLive2d ();

$(function () {
    var prizeArr = ["豪华礼包", "索尼相机", "平板电脑"],//奖品内容
        $li = $(".info li"),//中奖信息滚动的盒子
        $sNum = $(".start-num"),//手机头号，三位数
        $eNum = $(".end-num"),//手机尾号，四位数
        $info = $(".prize"),//中奖提示信息
        $go = $("#go"),
        $hand = $("#hand"),
        // $roll = $(".roll ul"),
        // topRoll = parseInt($roll.eq(0).css("top")),//滚动盒子的top
        // prizeHigh = parseInt($(".prize1").eq(0).height()),//奖品高度
        // topArr = [topRoll, topRoll - prizeHigh, topRoll - prizeHigh * 2],//三个奖品的位置
        data = { count: 5 },//次数
        bool = true,//true为可点击
        clickTimer;

    //开始按钮
    $go.click(function () {
        if (!bool) return;
        if (data.count <= 0) {
            alert("没有次数了");
            return;
        }
        bool = false;
        data.count--;
        $("#change").html(data.count);

        clearTimeout(clickTimer);
        $hand.removeClass("shak");//移除手摇晃动画
        $hand.animate({
            left: 50 + "%",
            top: 40 + "%"
        }, 500, function () {
            $hand.css("transform", "rotate(-20deg)");//按下按钮
            clickTimer = setTimeout(function () {
                $hand.css("transform", "rotate(0deg)");//抬起
                $hand.animate({
                    left: 60 + "%",
                    top: 50 + "%"
                }, 500, function () {
                    $hand.addClass("shak");
                });
            }, 300);
            clickFn();
        });
    });
    var rotating = false;

    //点击滚动
    function clickFn() {
        console.log(rotating);
        if (rotating) return;
        rotating = true;


        // 根据填充奖品id列表
        var award_id_list = ['1', '2', '3', '4'];
        // 在奖品id列表中随机取出奖品的id
        var award_id = award_id_list[Math.floor(Math.random() * award_id_list.length)];
        // 根据奖品id获取奖品所在位置index
        var award_index = $('.roll ul[id=' + award_id + ']').attr('index');
        // 第几个中奖对应的角度
        // var awardAngle = award_index * 60;

        // 测试
        var awardAngle = 60;//2号奖品

        // 不中奖 随机排列6个角度 取前三个 作为旋转角度
        var noAwardRandom = randomSort([0, 60, 120, 180, 240, 300]);

        // 中奖
        if (false) {
            $('.roll .cube').map(function (index, item) {
                rotate($(item), index, (index + 2) * 360 + awardAngle)
                console.log(item)
            })
            //停止旋转动画
            setTimeout(function () {

                setTimeout(function () {
                    win();
                    $('.cube').removeAttr('style');
                    rotating = false;
                    // roll(10, 10, prizeArr[random - 41]);//随机数 - 41是因为它是从1起始的，又加了40
                }, 500);

            }, 5000);
        }else {
            $('.roll .cube').map(function (index, item) {
                console.log(noAwardRandom[index])
                rotate($(item), index, (index + 2) * 360 + noAwardRandom[index])
                console.log(item)
            })
            //停止旋转动画
            setTimeout(function () {

                setTimeout(function () {
                    alert('可惜！你没有中奖')
                    $('.cube').removeAttr('style');
                    rotating = false;
                    bool = true;
                }, 500);

            }, 4000);
        }
    }
    //旋转的jq对象，旋转时间， 最终角度
    function rotate(jqdom, time, angle) {
        jqdom.css('transition', 'transform ' + (time + 2)  + 's ease-in-out')
        jqdom.css('transform', 'rotateX(' + angle + 'deg)')
    }
    //随机排列数组
    function randomSort(arr) {
        return arr.sort(function (a, b) {
            var a = Math.random(),
                b = 0.5;
            return a - b;
        })
    }


    //中奖信息滚动。前两个参数为手机号前三位和后四位手机尾号，text为中的奖品
    // function roll(sNum, eNum, text) {
    //     //最新中奖信息
    //     $sNum.eq(1).html(sNum);
    //     $eNum.eq(1).html(eNum);
    //     $info.eq(1).html(text);
    //     $li.css("top", "-" + 36 / 75 + "rem");//滚动
    //     //滚动之后的处理
    //     setTimeout(function () {
    //         $li.css({
    //             "top": "0",
    //             "transition": "all 0s ease-in-out"
    //         });
    //         //更新中奖信息
    //         $sNum.eq(0).html($sNum.eq(1).html());
    //         $eNum.eq(0).html($eNum.eq(1).html());
    //         $info.eq(0).html($info.eq(1).html());
    //     }, 500);
    //     $li.css("transition", "all 0.5s ease-in-out");
    // }

    //中奖信息提示

    $("#close,.win,.btn").click(function () {
        bool = true;
    });

    //奖品展示
    var show = new Swiper(".swiper-container", {
        direction: "horizontal",//水平方向滑动。 vertical为垂直方向滑动
        loop: false,//是否循环
        slidesPerView: "auto"//自动根据slides的宽度来设定数量
    });
});
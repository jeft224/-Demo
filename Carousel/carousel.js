/**
 * Created by 罗志伟 on 2017/4/2.
 */
(function () {
    var carousel = {};
    carousel.slides = document.querySelectorAll('.slide');
    carousel.prevBtn = document.querySelector('#slideShowPrev');
    carousel.nextBtn = document.querySelector('#slideShowNext');
    carousel.dots = document.querySelectorAll('.dot');

    /*显示指定轮播页面*/
    carousel.showPage = function (num) {
        var index ,
            slides = this.slides,
            slideLength = slides.length,
            dots = this.dots,
            dotsLength = dots.length;

        console.log("num="+num)
        /*循环播放时，图片数量的判断*/
        if(num>slideLength){
            num =1;
        }else if(num < 1) {
            num = slideLength;
        }
        /*关闭所有轮播图的显示*/
        for(index = 0; index < slideLength; index++) {
            slides[index].style.display = "none";
        }
        /*清除所有圆形按钮的‘.active’*/
        for(index = 0; index < dotsLength; index++){
            dots[index].classList.remove("active")
        }

        slides[num - 1].style.display = "block";
        dots[num-1].classList.add("active");
    }
    /*通过前移，后退来移动轮播页面*/
    carousel.changeShow = function (num) {
        var index,
            currentSlideIndex,//用于记录当前图片的index
            slides = this.slides,
            slideLength = slides.length;

        for(index = 0;index<slideLength;index++){
            if(slides[index].style.display == "block"){
                currentSlideIndex =index + 1;
                break;
            }
        }
        currentSlideIndex +=num;
        this.showPage(currentSlideIndex)
    }
    /*自动播放*/
    carousel.autoShow = function () {
        var index,
            currentSlideIndex,
            slides = this.slides,
            slideLength = slides.length,
            that = this;
        var autoloop = setInterval(function () {
            for(index = 0;index<slideLength;index++){
                if(slides[index].style.display == "block"){
                    currentSlideIndex = index +1
                    break;
                }
            }
            that.showPage(currentSlideIndex+1)
        },3000)
    }
    /*事件监听*/
    carousel.handler = function () {
        var index,
            prevBtn = this.prevBtn,
            nextBtn = this.nextBtn,
            dots = this.dots,
            dotsLength = dots.length,
            that = this;
        /*轮播图前移*/
        prevBtn.addEventListener('click',function () {
            that.changeShow(-1)
        },false);
        /*轮播图后退*/
        nextBtn.addEventListener('click',function () {
            that.changeShow(1)
        },false)
        /*点击圆形按钮，显示对应的轮播图*/
        for(index = 0; index < dotsLength; index++){
            /*这个涉及js典型的闭包问题*/
            (function (index) {
                dots[index].addEventListener('click',function () {
                    that.showPage(index+1)
                },false)
            })(index)
        }
    }

    carousel.showPage(1)
    carousel.handler();
    carousel.autoShow();
})()
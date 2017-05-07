## 轮播图：
  想必学习前端都知道轮播图，但是这个怎么实现的想必有些人还是不知道；在这个案例中涉及**JavaScript**的一些核心知识。
    希望大家喜欢。

-   ### Html部分：

     > **html5页面结构布局**


     -   轮播图片容器

         ```html
           <div class="slide">
                  <img src="./images/img1.jpg" alt="">
           </div>
         ```

         ​

     -   前后移动的按钮

         ```html
         <!-- 前翻页，后翻页按钮 -->
         <a class="prev" id="slideShowPrev">&#10094;</a>
         <!-- &#10094 为特殊Unicode字符 -->
         <a class="next" id="slideShowNext">&#10095;</a>
         <!-- &#10095 为特殊Unicode字符 -->
         ```

     - 圆点按钮

       ```html
        <!-- 圆点坐标按钮组 -->
        <div class="dotGroup">
           <span class="dot"></span>
           <span class="dot"></span>
           <span class="dot"></span>
        </div>
       ```

       ​

-   ### CSS部分：

    	> 重置样式

    ```css
    *{
      margin：0px;
      padding:0px;
      box-sizing: border-box;
    }
    ```

    **box-sizing:**会将padding和border算入到高度和宽度里面去。

    参考链接：[box-sizing属性](http://www.w3school.com.cn/cssref/pr_box-sizing.asp)

    > 轮播图样式

    ```css
    .carousel-container{
        max-width: 800px;
        position: relative;
        margin: 0 auto;/*水平居中*/
    }
    .slide {
        display: none;
    }
    .slide img{
        width: 100%;
    }
    ```

    > 前后移动按钮的样式

    ```css
    .prev,.next{
        cursor: pointer;
        position: absolute;
        top: 50%;
        margin-top: -22px;
        padding: 16px;
        color:white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
    }

    .prev{
        left: 0;
        border-radius: 0 3px 3px 0;
    }
    .next {
        right: 0;
        border-radius: 3px 0 0 3px;
    }

    /*当鼠标Hover时，背景色改变，提升用户体验*/
    .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.8);
    }
    ```

    **transition：**属性渐变。0.6s是指完成过渡效果需要多少秒或者毫秒，ease是指速度效果的曲线函数

    参考链接：[transition属性](http://www.w3school.com.cn/css3/css3_transition.asp)

    > 圆型按钮的样式

    ```css
    .dotGroup{
        text-align: center;
        position: relative;
        margin-top: -30px;
    }
    .dot {
        cursor:pointer;
        height: 13px;
        width: 13px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
    }


    .active, .dot:hover {
        background-color: #717171;
    }
    ```

    ​

-   ### JS部分：

    > 全局函数(立即执行函数)	

    ```javascript
    (function(){
      ......
    })()
    ```

    > 创建轮播对象

    ```javascript
    	var carousel = {};//创建轮播对象
        carousel.slides = document.querySelectorAll('.slide');
        carousel.prevBtn = document.querySelector('#slideShowPrev');
        carousel.nextBtn = document.querySelector('#slideShowNext');
        carousel.dots = document.querySelectorAll('.dot');
    ```

    > 显示指定轮播页面

    ```javascript
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
    		/*num-1是因为数组是从0开始计数，num-1代表对应的index*/
            slides[num - 1].style.display = "block";
            dots[num-1].classList.add("active");
        }
    ```

    ---

    > 自动播放

    ```javascript
    	/*自动播放*/
        carousel.autoShow = function () {
            var index,
                currentSlideIndex,
                slides = this.slides,
                slideLength = slides.length,
                that = this;
          /*每隔3秒切换轮播图片*/
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
    ```

    ---

    > 通过前移，后退来移动轮播页面

    ```javascript
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
    ```

    ---

    > 事件监听

    ```javascript
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
    ```

    ​

    ---

    > 函数调用：

    ```javascript
    	carousel.showPage(1)/*初始化默认轮播页面*/
        carousel.handler();
        carousel.autoShow();
    ```



​	这个案例讲解完了，大家赶紧打开浏览器去试试。


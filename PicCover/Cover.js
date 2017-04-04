/**
 * Created by 罗志伟 on 2017/4/4.
 */
(function () {
        var select = document.querySelector('#mySelect');
        var overlay = document.querySelector('#overlay')

        select.onchange = function (e) {
            console.log(e.target)
            overlay.className = e.target.value;
        }
})()
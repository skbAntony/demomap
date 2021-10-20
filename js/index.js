$(function() {
    var index = new Vue({
        el: '.main',
        data: {
            navs: [
                {title: '最新消息', aria_hidden: 'true', class: 'fa fa-commenting'},
                {title: '每周進度', aria_hidden: 'true', class: 'fa fa-cloud-upload'},
                {title: '預想計畫', aria_hidden: 'true', class: 'fa fa-eyedropper'},
            ],
            carousel: '',
        },
        methods: {

        },
        mounted: function() {
            // 從外部隨機抓取圖片放入投影片
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: 'https://picsum.photos/v2/list',
                success: function(data) {
                    console.log(data);
                  data.forEach(function (element, index) {
                    var carousel = document.getElementsByClassName("carousel-inner");
                    $(carousel[0]).append("<div class='carousel-item'><img class='d-block' src='https://picsum.photos/1200/300?random=" + index + "' alt='First slide'></div>");
                  });
                  //預設開頭第一張圖片
                  var carousel = document.getElementsByClassName("carousel-inner");
                  $(carousel[0].firstElementChild).addClass('active');
                },
                error: function(XMLHttpRequest, statusText, errorThrown) { 
                  console.log(XMLHttpRequest,statusText,errorThrown);
                  alert('投影片找不到圖片');
                }, 
            });
            // 投影片自動播放速度
            // $('.carousel').carousel({
            //     interval: 3000,
            // });
        },
    });
   
});
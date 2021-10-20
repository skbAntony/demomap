$(function() {


    var width = $(window).width();
    var height = $(window).height();
    if (width < 577) {
      var graphics_i = [
        "<i class='fa fa-commenting' aria-hidden='true'></i>",
        "<i class='fa fa-cloud-upload' aria-hidden='true'></i>",
        "<i class='fa fa-eyedropper' aria-hidden='true'></i>",
        "<i class='fa fa-desktop' aria-hidden='true'></i>",
        "<i class='fa fa-gavel' aria-hidden='true'></i>",
      ];
      var fa_text = [];
      $('.header nav a').each(function(element, index) {
        //a標籤文字內容
        fa_text.push(index.text);
        // console.log(fa_text);
        index.text = '';
        $(index).append(graphics_i[element]);
        
      });
      var fa = document.getElementsByClassName("fa");
        for (var i = 0; i < fa.length; i++) {
          fa[i].addEventListener('mouseenter', e => {
            // console.log(fa.length);
          });
      }
    }
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: 'https://picsum.photos/v2/list',
      success: function(data) {
        data.forEach(function (element, index) {
          var carousel = document.getElementsByClassName("carousel-inner");
          $(carousel[0]).append("<div class='carousel-item'><img class='d-block' src='https://picsum.photos/1200/300?random=" + index + "' alt='First slide'></div>");
        });
        //預設開頭第一張圖片
        var carousel = document.getElementsByClassName("carousel-inner");
        $(carousel[0].firstElementChild).addClass('active');
      },
      error: function(XMLHttpRequest, statusText, errorThrown) { 
        // console.log(XMLHttpRequest);
        // console.log(statusText);
        // console.log(errorThrown);
      }, 
    });
    $('.carousel').carousel({
      interval: 3000,
    })
    let hanburger = document.querySelector('.hanburger');
    console.log(hanburger);
    $('.hanburger').click(function() {
      $('.menu_nav, .hanburger').toggleClass('close');
    });
  });
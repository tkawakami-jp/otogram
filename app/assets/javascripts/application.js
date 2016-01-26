// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation

(function(){
  
  var winW = window.innerWidth+'px';
  var winH = window.innerHeight+'px';
  
  //DOMが構築されたら実行される。
  $(document).ready(function() {
    $(document).foundation();
    $('.alert-box').fadeOut(3000);
  });

  //全ファイルが読み込まれたら実行される。
  $(window).on('load', function() {
      
  });
  
}());
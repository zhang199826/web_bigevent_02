$(function () {
  $("#link_reg").on("click", function () {
    $(".login_box").hide();
    $(".reg_box").show();
  });
  $("#link_login").on("click", function () {
    $(".login_box").show();
    $(".reg_box").hide();
  });

  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $(".reg_box [name=password]").val();
      if (pwd !== value) {
        return '两次密码输入不一致'
      };
    }
  });

  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        };
        layer.msg(res.message);
        $("#link_login").click();
      }
    });
  });

  // 登录功能
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败');
        };
        layer.msg('恭喜，登陆成功');
        localStorage.setItem('token', res.token);
        location.href = '/index.html';
      }
    })
  })



})
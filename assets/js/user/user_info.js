$(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '用户昵称必须在1 ~ 6个字符之间'
      };
    }
  });

  initUserInfo();
  var layer = layui.layer;
  function initUserInfo() {
    $.ajax({
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        };
        form.val('initUserInfo', res.data);
      }
    });
  };

  $('#userReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo();
  });

  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        };
        window.parent.getUserInfo();
      }
    })
  })







});
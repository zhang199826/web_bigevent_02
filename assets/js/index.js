$(function () {
  getUserInfo();

  var layer = layui.layer;
  $('#btnLogOut').on('click', function () {
    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem("token");
      location.href = '/login.html';
      layer.close(index);
    });
  })

});

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem("token") || ""
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      };
      renderAvatar(res.data);
    },
    // complete: function (res) {
    //   console.log(res);
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     localStorage.removeItem("token");
    //     location.href = '/login.html';
    //   }
    // }
  });
};

function renderAvatar(user) {
  var name = user.nickname || user.username;
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.user-avatar').hide();
  } else {
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
    $('.user-avatar').html(first).show();
  }
}
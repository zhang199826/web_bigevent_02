$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  // 1.3 创建裁剪区域
  $image.cropper(options)

  $("#btnChooseImage").on("click", function () {
    $("#file").click();
  });

  $("#file").on("change", function (e) {
    var files = e.target.files;
    if (files.length === 0) {
      return layui.layer.msg('请选择用户头像');
    };
    // 1. 拿到用户选择的文件
    var file = e.target.files[0]
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  });

  $("#btnUpload").on("click", function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png');

    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        };
        layui.layer.msg(res.message);
        window.parent.getUserInfo();
      }
    });
  });

  aa();
  function aa() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        };
        if (res.data.user_pic) {
          $('#image')
            .cropper('destroy')
            .attr('src', res.data.user_pic)
            .cropper(options)
        }
      },
    });
  }







});
$(function () {
  var layer = layui.layer;
  var form = layui.form;
  var laypage = layui.laypage;
  // 事件过滤器
  template.defaults.imports.dateFormat = (date) => {
    var dt = new Date(date);
    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());
    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());
    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  }
  // 事件补零函数
  function padZero(n) {
    return n > 9 ? n : '0' + n;
  };

  var q = {
    pagenum: 1,	 //是	int	页码值
    pagesize: 2,	 //是	int	每页显示多少条数据
    cate_id: '',	 //否	string	文章分类的 Id
    state: '',	 //否	string	文章的状态，可选值有：已发布、草稿
  };
  initTable();
  initCate();
  // 获取文章类别数据
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg(res.message);
        };
        layer.msg(res.message);
        var htmlStr = template('tpl_table', res);
        $('tbody').html(htmlStr);
        renderPage(res.total);
      }
    });
  };

  // 获取文章列表
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg(res.message);
        };
        layer.msg(res.message);
        var htmlStr = template('tpl_cate', res);
        $('[name=cate_id]').html(htmlStr);
        form.render();
      }
    });
  };

  // 为筛选表单绑定事件
  $("#form_search").on("submit", (e) => {
    e.preventDefault();
    var cate_id = $("[name=cate_id]").val();
    var state = $("[name=state]").val();
    q.cate_id = cate_id;
    q.state = state;
    initTable();
  });

  // 分页渲染函数
  function renderPage(total) {
    laypage.render({
      elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [1, 2, 3, 4, 5, 6],
      jump: function (obj, first) {
        // //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        //首次不执行
        if (!first) {
          initTable();
          //do something
        }
      }
    });
  };

  // 删除按钮绑定事件
  $('tbody').on("click", ".btn_delete", function () {
    var id = $(this).attr('data_id');
    if ($('.btn_delete').length === 1 && q.pagenum > 1) q.pagenum--;
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: (res) => {
          if (res.status !== 0) {
            return layer.msg(res.message);
          };
          layer.msg(res.message);
          initTable();
          layer.close(index);
        }
      });
    });
  })



});
$(function () {
  const form = layui.form
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！"
    },
  })
  //   获取用户数据
  const initUserInfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        // 调用 `form.val()` 方法为表单赋值
        form.val("formUserInfo", res.data)
      },
    })
  }
  initUserInfo()
  //表单重置功能
  $("#btnReset").on("click", function (e) {
    e.preventDefault()
    initUserInfo()
  })
  $(".layui-form").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: (res) => {
        layer.msg(res.message)
        if (res.status !== 0) return
        window.parent.getUserInfo()
        console.log(res)
      },
    })
  })
})

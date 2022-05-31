function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers: { Authorization: localStorage.getItem("token") },
    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message)
      layer.msg(res.message)
      // console.log(res)
      renderAvatar(res.data)
    },
  })
}
const renderAvatar = (user) => {
  // console.log(user);
  //设置欢迎语
  const uname = user.nickname || user.username
  $("#welcome").html(`欢迎 ${uname}`)
  //按需渲染头像
  if (user.user_pic) {
    $(".layui-nav-img").attr("src", user.user_pic)
    $(".text-avatar").hide()
  } else {
    $(".layui-nav-img").hide()
    $(".text-avatar").html(uname[0].toUpperCase())
  }
  $("#btnquit").on("click", function () {
    layui.layer.confirm(
      "确定退出登录？",
      { icon: 3, title: "" },
      function (index) {
        layer.close(index)
        // 清空本地存储里面的 token
        localStorage.removeItem("token")
        // 重新跳转到登录页面
        location.href = "/login.html"
      }
    )
  })
}
getUserInfo()

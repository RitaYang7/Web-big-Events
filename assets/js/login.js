$(function () {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $("#link_reg").click(() => {
    $(".login-box").hide()
    $(".reg-box").show()
  })
  // 点击去登录让 注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show()
    $(".reg-box").hide()
  })
  const form = layui.form
  // 获取 layui 弹窗
  const layer = layui.layer
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
    repwd: (value) => {
      const pwd = $(".reg-box [name=password").val()
      if (value !== pwd) return "两次输入密码不一致"
    },
  })
  // 设置请求根路径
  const baseUrl = "http://www.liulongbin.top:3007"
  // 监听注册表单，发送注册请求
  $("#form_reg").on("submit", (e) => {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $(".reg-box [name=username").val(),
        password: $(".reg-box [name=password").val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // 注册成功后跳转到登录界面
        $("#link_login").click()
      },
    })
  })
  //登录
  $("#form_login").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url:  "/api/login",
      data: $("#form_login").serialize(),
      success: (res) => {
        console.log(res)
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        localStorage.setItem("token", res.token)
        location.href = "/index.html"
      },
    })
  })
})

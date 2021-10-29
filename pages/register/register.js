const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    loginId: "",
    name: "",
    pwd1: "",
    pwd2: "",
    sex: ""
  },
  onLoad() {
  },

  regInput(e)
  {
    var data = {};
    data[e.target.dataset.id] = e.detail.value;
    this.setData(data);
    console.log(this.data);
  },

  registerStudent()
  {

    console.log(this.data.loginId);

    if(this.data.name.length < 1)
    {
        // 显示错误
        wx.showToast({
        title: "姓名不能为空！",
        icon: 'none',
        duration: 1500
      })

      return; 
    }

    if(this.data.sex.length < 1)
    {
        // 显示错误
        wx.showToast({
        title: "请选择性别！",
        icon: 'none',
        duration: 1500
      })

      return; 
    }

    if(this.data.loginId.length < 6)
    {
        // 显示错误
        wx.showToast({
        title: "账号至少需要六个字符！",
        icon: 'none',
        duration: 1500
      })

      return; 
    }

    if(!/^[\da-z]+$/i.test(this.data.loginId))
    {
        // 显示错误
        wx.showToast({
          title: "账号只能是数字或字符！",
          icon: 'none',
          duration: 1500
        })

        return;
    }

    if(this.data.pwd1.length < 6)
    {
        // 显示错误
        wx.showToast({
        title: "密码长度不能小于6位！",
        icon: 'none',
        duration: 1500
      })

      return; 
    }

    if(this.data.pwd1 != this.data.pwd2)
    {
        // 显示错误
        wx.showToast({
        title: "两次输入的密码必须一致",
        icon: 'none',
        duration: 1500
      })

      return; 
    }

    return;

    console.log(this.data);
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://localhost:8081/api/message/mathhomebind?token=' + token + "&loginId=" + this.data.loginId + "&pwd=" + this.data.pwd,
      method:'POST',
      success:res=>{
        console.log(res);

        // 绑定成功 
        if(res.data.code == 2002)
        {
          wx.showToast({
            title: '操作成功！', // 标题
            icon: 'success',  // 图标类型，默认success
            duration: 1500  // 提示窗停留时间，默认1500ms
          })

          // 跳转到个人中心
          wx.navigateTo({
            url: '../logs/logs'
          })
        }
        else
        {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail:res=>{
        console.log(res);
      }
    })
  }
})
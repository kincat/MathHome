const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    loginId:"",
    pwd:""
  },
  onLoad() {
  },

  bindInput(e)
  {
    var data = {};
    data[e.target.dataset.id] = e.detail.value;
    this.setData(data);
    console.log(this.data);
  },

  bindStudent()
  {
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
  },

  // 去注册页面
  goRegister()
  {
    wx.navigateTo({
      url: '../register/register'
    })
  }
})
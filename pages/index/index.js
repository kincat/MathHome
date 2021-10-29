// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    //canIUseOpenData:false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  // 事件处理函数
  gohome(e) {

    // 显示加载
    wx.showLoading({
      title:'加载中',                             
      mask:true                                    
    });

    wx.login({
      success:res=>{
        wx.request({
          url: 'http://localhost:8081/api/message/mathhomelogin?code=' + res.code,
          method:'POST',
          success:res=>{
            console.log("注册成功！");
 
            wx.setStorageSync('token',res.data.data);

            // 注册成功
            if(res.data.code == 2001)
            {
              wx.hideLoading();

              // 跳转到账号绑定
              wx.navigateTo({
                url: '../bind/bind'
              })
            }

            // 登录成功
            if(res.data.code == 2002)
            {
              wx.hideLoading();
              
              // 跳转到个人中心
              wx.navigateTo({
                url: '../logs/logs'
              })
            }
          },
          fail:res=>{
            console.log(res);
          }
        })
      }
    })
  },

  onLoad() {

    // 校验版本库是否支持wx.getUserProfile
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    // 显示加载
    wx.showLoading({
      title:'加载中',                             
      mask:true                                    
    });

    // 超时执行
    setTimeout(function() {      
      
      // 如果有SESSION 校验通过后直接进入我的中心
      let token = wx.getStorageSync('token');
      console.log(token);

      //有token
      if (token) {

          //发送SESSION到业务接口
          wx.request({
            url: 'http://localhost:8081/api/message/mathhomecheck?token=' + token,
            method:'POST',

            // 登陆成功
            success:res=>{             
              console.log(res);

              // 注册成功
              if(res.data.code == 2001)
              {
                // 跳转到账号绑定
                wx.navigateTo({
                  url: '../bind/bind'
                })
              }

              // 登录成功
              if(res.data.code == 2002)
              {
                // 跳转到个人中心
                wx.navigateTo({
                  url: '../logs/logs'
                })
              }

              // 隐藏加载提示
              wx.hideLoading();
            },
            fail:res=>{
              console.log(res);
            }
          })
      }
    }, 1000);
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗 `getUserProfile`API必须是使用 `@tap="getUserProfile"` 或 `bindtap="getUserProfile"` 调用的，且必须为直接调用，不能通过其他函数回调调用。否则会报`getUserProfile:fail can only be invoked by user TAP gesture.`错误
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },  
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

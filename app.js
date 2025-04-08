// app.js
App({
  globalData: {
    userInfo: null,
    isLogin: false
  },

  onLaunch() {
    // 检查登录状态
    this.checkLoginStatus();
  },

  checkLoginStatus() {
    const token = wx.getStorageSync('token');
    if (token) {
      this.globalData.isLogin = true;
      // 获取用户信息
      this.getUserInfo();
    } else {
      this.login();
    }
  },

  login() {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 发送code到后端换取token
          wx.request({
            url: 'https://your-api-endpoint.com/login', // 替换为您的登录API
            method: 'POST',
            data: {
              code: res.code
            },
            success: (res) => {
              if (res.statusCode === 200 && res.data.token) {
                // 保存token
                wx.setStorageSync('token', res.data.token);
                this.globalData.isLogin = true;
                // 获取用户信息
                this.getUserInfo();
              }
            },
            fail: (error) => {
              console.error('登录失败:', error);
              wx.showToast({
                title: '登录失败，请重试',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  },

  getUserInfo() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.globalData.userInfo = res.userInfo;
        // 保存用户信息到本地
        wx.setStorageSync('userInfo', res.userInfo);
        // 发送用户信息到后端
        this.updateUserInfo(res.userInfo);
      },
      fail: (error) => {
        console.error('获取用户信息失败:', error);
      }
    });
  },

  updateUserInfo(userInfo) {
    const token = wx.getStorageSync('token');
    wx.request({
      url: 'https://your-api-endpoint.com/user/update', // 替换为您的更新用户信息API
      method: 'POST',
      data: userInfo,
      header: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode !== 200) {
          console.error('更新用户信息失败');
        }
      }
    });
  }
})

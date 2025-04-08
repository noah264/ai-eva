// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: null,
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    count: 0
  },

  onLoad() {
    // 从全局获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    } else {
      // 监听全局用户信息更新
      app.userInfoReadyCallback = (userInfo) => {
        this.setData({
          userInfo: userInfo
        });
      };
    }
  },

  onShow() {
    // 每次页面显示时检查用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ userInfo });
    }
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },

  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
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

  incrementCount() {
    this.setData({
      count: this.data.count + 1
    });
    // 记录日志
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift({
      date: new Date().toLocaleString(),
      action: '增加计数',
      value: this.data.count
    });
    wx.setStorageSync('logs', logs);
  },

  resetCount() {
    this.setData({
      count: 0
    });
    // 记录日志
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift({
      date: new Date().toLocaleString(),
      action: '重置计数',
      value: 0
    });
    wx.setStorageSync('logs', logs);
  },

  startTest() {
    // 检查登录状态
    if (!app.globalData.isLogin) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    // 清除之前的测试答案
    wx.removeStorageSync('testHistory');
    
    // 跳转到测试页面
    wx.navigateTo({
      url: '/pages/test/test'
    });
  }
})

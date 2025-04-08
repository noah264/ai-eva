Page({
  data: {
    currentQuestion: 0,
    answers: [],
    questions: [
      {
        text: "在社交场合中，你更倾向于：",
        options: [
          { text: "主动与他人交流，喜欢成为关注的焦点", type: "E" },
          { text: "倾听他人，只在必要时发言", type: "I" }
        ]
      },
      {
        text: "在解决问题时，你更倾向于：",
        options: [
          { text: "关注事实和细节，注重实际经验", type: "S" },
          { text: "关注可能性和创新，喜欢探索新想法", type: "N" }
        ]
      },
      {
        text: "在做决定时，你更倾向于：",
        options: [
          { text: "基于逻辑和客观分析", type: "T" },
          { text: "考虑他人感受和价值观", type: "F" }
        ]
      },
      {
        text: "在日常生活中，你更倾向于：",
        options: [
          { text: "喜欢计划和组织，按部就班", type: "J" },
          { text: "灵活应对，随遇而安", type: "P" }
        ]
      },
      // 可以添加更多题目...
    ]
  },

  onLoad() {
    // 初始化答案数组
    const answers = new Array(this.data.questions.length).fill(null);
    this.setData({ answers });
    console.log('初始化答案数组:', answers);
  },

  selectOption(e) {
    const { index } = e.currentTarget.dataset;
    const { currentQuestion, questions } = this.data;
    const answers = [...this.data.answers];
    
    // 获取选中的选项类型
    const selectedType = questions[currentQuestion].options[index].type;
    answers[currentQuestion] = selectedType;
    
    console.log('当前问题:', currentQuestion);
    console.log('选中的选项:', selectedType);
    console.log('更新后的答案数组:', answers);
    
    this.setData({ answers });
  },

  prevQuestion() {
    if (this.data.currentQuestion > 0) {
      this.setData({
        currentQuestion: this.data.currentQuestion - 1
      });
      console.log('切换到上一题:', this.data.currentQuestion);
    }
  },

  nextQuestion() {
    if (this.data.currentQuestion < this.data.questions.length - 1) {
      this.setData({
        currentQuestion: this.data.currentQuestion + 1
      });
      console.log('切换到下一题:', this.data.currentQuestion);
    }
  },

  submitTest() {
    // 检查是否所有题目都已回答
    if (this.data.answers.includes(null)) {
      wx.showToast({
        title: '请完成所有题目',
        icon: 'none'
      });
      return;
    }

    // 计算MBTI类型
    const type = this.calculateMBTIType();
    console.log('计算出的MBTI类型:', type);
    
    // 准备提交数据
    const submitData = {
      answers: this.data.answers,
      mbtiType: type,
      timestamp: new Date().getTime()
    };

    // 发送HTTP请求
    wx.request({
      url: 'https://your-api-endpoint.com/submit-test', // 替换为您的API端点
      method: 'POST',
      data: submitData,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          // 保存测试结果到本地
          const testHistory = wx.getStorageSync('testHistory') || [];
          testHistory.unshift({
            date: new Date().toLocaleString(),
            type: type,
            answers: this.data.answers
          });
          wx.setStorageSync('testHistory', testHistory);

          // 跳转到结果页面
          wx.navigateTo({
            url: `/pages/result/result?type=${type}`
          });
        } else {
          wx.showToast({
            title: '提交失败，请重试',
            icon: 'none'
          });
        }
      },
      fail: (error) => {
        console.log('data:',submitData)
        console.error('提交失败:', error);
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
      }
    });
  },

  calculateMBTIType() {
    const { answers } = this.data;
    const counts = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    answers.forEach(type => {
      counts[type]++;
    });

    let mbtiType = '';
    mbtiType += counts.E > counts.I ? 'E' : 'I';
    mbtiType += counts.S > counts.N ? 'S' : 'N';
    mbtiType += counts.T > counts.F ? 'T' : 'F';
    mbtiType += counts.J > counts.P ? 'J' : 'P';

    return mbtiType;
  }
}); 
Page({
  data: {
    mbtiType: '',
    typeDescription: '',
    dimensions: [],
    careerSuggestions: []
  },

  onLoad(options) {
    const { type } = options;
    this.setData({ mbtiType: type });
    this.loadTypeInfo(type);
  },

  loadTypeInfo(type) {
    // MBTI类型描述数据
    const typeInfo = {
      'ISTJ': {
        description: '检查者型人格，注重实际，有责任感，做事有条理。',
        dimensions: [
          {
            title: '内向 (I)',
            value: '70%',
            description: '倾向于独处，从内部获取能量'
          },
          {
            title: '感觉 (S)',
            value: '65%',
            description: '关注具体事实和细节'
          },
          {
            title: '思考 (T)',
            value: '60%',
            description: '基于逻辑和客观分析做决定'
          },
          {
            title: '判断 (J)',
            value: '75%',
            description: '喜欢计划和组织，按部就班'
          }
        ],
        careerSuggestions: [
          '会计',
          '审计师',
          '项目经理',
          '行政人员',
          '数据分析师'
        ]
      },
      // 可以添加更多MBTI类型的数据...
    };

    const info = typeInfo[type] || {
      description: '该类型的特点描述',
      dimensions: [
        {
          title: '维度1',
          value: '50%',
          description: '维度描述'
        }
      ],
      careerSuggestions: ['建议职业1', '建议职业2']
    };

    this.setData({
      typeDescription: info.description,
      dimensions: info.dimensions,
      careerSuggestions: info.careerSuggestions
    });
  },

  shareResult() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage() {
    return {
      title: `我的MBTI类型是${this.data.mbtiType}`,
      path: '/pages/index/index'
    };
  },

  retest() {
    wx.navigateTo({
      url: '/pages/test/test'
    });
  }
}); 
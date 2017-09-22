// 全局过滤器 写在实例对象前面
// Vue.filter('dateFormat', function (v) {
//   return `${v.getFullYear()}年${v.getMonth()+1}月${v.getDate()}日${v.getHours()}时${v.getMinutes()}分`

// });

var vm = new Vue({
  el: '#box',
  data: {
    keyword: '',
    addword: '',
    brands: [{
        id: 0,
        name: "Porsche",
        createTime: new Date()
      },
      {
        id: 5,
        name: "兰博基尼",
        createTime: new Date()
      },
      {
        id: 6,
        name: "布加迪",
        createTime: new Date()
      },
      {
        id: 7,
        name: "阿尔法罗密欧",
        createTime: new Date()
      },
    ],
  },
  // 计算属性
  computed: {
    // 计算属性,将一个数据经过计算后再渲染到页面中

    // 将 brands 数据经过处理后再渲染
    newBrands() {
      return this.brands.filter((v, i) => {
        return v.name.indexOf(this.keyword) != -1;
      });
    }

  },
  filters: {
    // 过滤器,将页面中的元素做参数传给过滤器处理后再渲染到页面中
    dateFormat(v) {
      return `${v.getFullYear()}年${v.getMonth()+1}月${v.getDate()}日${v.getHours()}时${v.getMinutes()}分`
    }
  },
  //在 methods 对象中定义方法
  methods: {
    // 添加数据
    add() {
      if (this.addword.trim() !== '') {
        var id = this.brands.length ? (this.brands[this.brands.length - 1].id + 1) : 0;
        var obj = {
          id: id - 0,
          name: this.addword,
          createTime: new Date()
        };
        this.brands.push(obj);
        this.addword = '';
      }
    },
    // 删除数据
    del(id) {
      var delIndex = this.brands.findIndex(function (v, i) {
        return v.id === id;
      });
      this.brands.splice(delIndex, 1);
    },
    // 搜索功能

  }
});

// var dateFormat = Vue.filter('dateFormat');
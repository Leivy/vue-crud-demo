// 全局过滤器 写在实例对象前面
// Vue.filter('dateFormat', function (v) {
//   return `${v.getFullYear()}年${v.getMonth()+1}月${v.getDate()}日${v.getHours()}时${v.getMinutes()}分`

// });

var vm = new Vue({
  el: '#box',
  data: {
    keyword: '',
    addword: '',
    brands: [],
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
      v = new Date(v);
      return `${v.getFullYear()}年${v.getMonth()+1}月${v.getDate()}日${v.getHours()}时${v.getMinutes()}分`
    }
  },
  created() {
    this.getData();
  },
  //在 methods 对象中定义方法
  methods: {
    //异步获取数据
    getData() {
      this.$http
        .get('http://127.0.0.1:8899/api/getprodlist')
        .then(response => {
          // 获取响应成功的回调
          if (response.status === 200) {
            this.brands = response.body.message;
          }
        }, err => {
          // 获取失败的回调
          console.log(err);
        });
    },
    // 添加数据
    add() {
      if (this.addword.trim() !== '') {
        this.$http
          .post('http://localhost:8899/api/addproduct', {
            name: this.addword
          }, {
            emulateJSON: true
          })
          .then(res => {
            if (res.status === 200) {
              this.getData();
              this.addword = '';
            }
          }, err => {
            console.log(res);
          });
      }
    },
    // 删除数据
    del(id) {
      this.$http
        .get('http://localhost:8899/api/delproduct/' + id)
        .then(res => {
          if (res.status === 200) {
            this.getData();
          }
        }, err => {
          console.log(err)
        })
      // var delIndex = this.brands.findIndex(function (v, i) {
      //   return v.id === id;
      // });
      // this.brands.splice(delIndex, 1);
    },
    // 搜索功能

  }
});

// var dateFormat = Vue.filter('dateFormat');
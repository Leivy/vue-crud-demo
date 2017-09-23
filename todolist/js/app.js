// 初始化 localstorage 中数据
// var brands = [{
// 		id: 1,
// 		title: "抽烟",
// 		isCompleted: false
// 	},
// 	{
// 		id: 2,
// 		title: "喝酒",
// 		isCompleted: true
// 	},
// 	{
// 		id: 3,
// 		title: "烫头",
// 		isCompleted: false
// 	}
// ];
// console.log(brands);
// localStorage.clear();
// localStorage.setItem('brands', JSON.stringify(brands));
// console.log(localStorage);
// console.log(JSON.parse(localStorage.brands));


// var str = '[{"id":3,"title":"烫头","isCompleted":false},{"id":4,"title":"布加迪","isCompleted":false},{"id":5,"title":"法拉利","isCompleted":false},{"id":6,"title":"林肯","isCompleted":false},{"id":7,"title":"迈巴赫","isCompleted":false},{"id":8,"title":"牧马人","isCompleted":false}]'
// localStorage.setItem('brands', str);


const Completed = {
	template: '<p> Completed Page</p>'
}
const All = {
	template: '<p>All page</p>'
}
const Active = {
	template: '<p>Active page</p>'
}
const routes = {
	// '/': All,
	'/all': All,
	'/Active': Active,
	'/completed': Completed
}

var vm = new Vue({
	el: '#app',
	data: {
		newTask: '',
		checkall: false,
		editingid: '',
		status: '',
		currentRoute: window.location.pathname,
		todos: JSON.parse(localStorage.brands)
	},
	computed: {
		ViewComponent() {
			return routes[this.currentRoute] || Active
		}
	},
	render(h) {
		return h(this.ViewComponent)
	},
	mounted() {
		// 让全选按钮状态追随列表栏按钮状态
		this.checkall = this.todos.every((v, i) => {
			return v.isCompleted === true;
		})
	},
	methods: {

		// 工具: 获取 localstorage 数据和保存数据的函数
		localData(list) {
			// 参数是要保存的数组
			if (list === 'undefined') {
				return this.todos;
			} else {
				localStorage.setItem('brands', JSON.stringify(list));
			}
		},

		// 添加新的任务
		add(e) {
			if (e.keyCode === 13) {
				var newObj = {
					id: this.todos.length ? (this.todos[this.todos.length - 1].id + 1) : 0,
					title: this.newTask,
					isCompleted: false
				};
				this.todos.push(newObj);
				this.localData(this.todos);
				this.newTask = '';
			};
		},

		// 删除任务
		del(id) {
			// 根据 id 删除 localstorage 的数据
			var arr = JSON.parse(localStorage.brands);
			var index = arr.findIndex(function (v, i) {
				return v.id === id;
			});
			console.log(index);
			arr.splice(index, 1);
			this.todos = arr;
			this.localData(arr);
		},

		// 全选按钮事件
		toggleAll() {
			this.todos.forEach((v, i) => {
				v.isCompleted = this.checkall;
			});
			this.localData(this.todos);
		},
		// 单个任务的点击事件
		singleTaskCheck() {
			var flag = true;
			this.todos.forEach((v, i) => {
				if (v.isCompleted === false) {
					flag = false;
					return false;
				}
			});
			this.checkall = flag;
			this.localData(this.todos);
		},

		// 双击编辑任务栏
		edit(id) {
			this.editingid = id;

		},

		// 更新任务栏的内容
		update(e) {
			if (e.keyCode === 13) {
				this.editingid = '';
				this.localData(this.todos);
			};
		},

		// 清除所有已经完成的任务
		clearAllComepleted() {
			this.todos = this.todos.filter((v, i) => {
				return v.isCompleted === false;
			});
			this.localData(this.todos);
		},

		// 多少个 item left
		getLeftCount() {
			return this.todos.filter((v, i) => {
				return v.isCompleted === false;
			}).length;
		},
	}
});

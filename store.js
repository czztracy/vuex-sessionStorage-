import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)

// 应用初始状态
const state = {
	//登录状态为  未登录
	logined: false,
	//用户信息
	loginedUser: {
		account: '',
		passWorld: ''
	}
}
//获取信息
const getters = {
	//登录状态
	getLogined(state) {
		return state.logined
	},
	//登录用户信息
	getLoginedUser(state) {
		return state.loginedUser
	}
}

// 定义所需的 mutations修改
const mutations = {
    //登录状态
	setLogined(state, data)  {
		state.logined = data;
	},
	//用户信息
	setLoginedUser(state, data) {
		state.loginedUser = data;
	}
}

//包含多个mutations的修改
const actions = {
	//登录的驱动
	login(context, data) {
		context.commit('setLogined', true);
		context.commit('setLoginedUser', JSON.parse(sessionStorage.user));
	},
	
	//注销或者退出登录驱动
	loginOut(context, data) {
		context.commit('setLogined', false);
		context.commit('setLoginedUser', null);
	}
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    state,
    getters,
    mutations
})
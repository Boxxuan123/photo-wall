//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}

//准备mutations对象——修改state中的数据
const mutations = {
    changeDrawer(){
        state.drawer = !state.drawer
        console.log(state.drawer)
    }
}
//准备state对象——保存具体的数据
const state = {
    ServerAddress:'http://localhost:3000/',
    LabelName: [
        {name:"按钮1", id:1},
        {name:"按钮1", id:2},
        {name:"按钮1", id:3},
        {name:"按钮1", id:4},
        {name:"按钮1", id:5},
        {name:"按钮1", id:6},
        {name:"按钮1", id:7},
        {name:"按钮1", id:8},
        {name:"按钮1", id:9},
        {name:"按钮1", id:10},
        {name:"按钮1", id:11},
        {name:"按钮1", id:12},
        {name:"按钮1", id:13},
        {name:"按钮1", id:14},
    ],
    Photo: [
        {id: 1, url: "/img/1.4428a8f7.jpg", target: []},
        {id: 2, url: "/img/1.4428a8f7.jpg", target: []},
        {id: 3, url: "/img/2.da9e635d.jpg", target: []},
        {id: 4, url: "/img/1.4428a8f7.jpg", target: []},
        {id: 5, url: "/img/2.da9e635d.jpg", target: []},
        {id: 6, url: "/img/1.4428a8f7.jpg", target: []},
        {id: 7, url: "/img/2.da9e635d.jpg", target: []},
        {id: 8, url: "/img/2.da9e635d.jpg", target: []},
        {id: 9, url: "/img/1.4428a8f7.jpg", target: []},
        {id: 10, url: "/img/2.da9e635d.jpg", target: []},
    ],
    srcList: [
        "/img/1.4428a8f7.jpg",
        "/img/2.da9e635d.jpg"
    ],
    drawer: false,
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
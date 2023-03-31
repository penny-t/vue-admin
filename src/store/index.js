import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);



export default new Vuex.Store({
  /**
   * state提供唯一的公共数据源，所有共享的数据统一放到store的state进行储存，相似与data
   * 在vuex中state中定义数据，可以在任何组件中进行调用
   * 方法一：在标签中直接使用
   *        <p>$store.state.isCollapse</p>
   * 方法二：this.$store.state.全局数据名称
   * 方法三：从vuex中按需导入mapstate函数
   *        import { mapState } from "vuex";
   * 注意：当前组件需要的全局数据，映射为当前组件computed属性
   *        computed:{
   *         ...mapState(["isCollapse","数据二","数据三"])
   *        }
   * */
  state: {
    isCollapse:false,
    // count:10,  //测试
  },
  /**
   * getters 类似于vue中的computed，进行缓存，对于Store中的数据进行加工处理形成新的数据
   */
  getters: {
    // // es6写法
    // count:(state) => state.count + 10
    // // es5写法
    // count:function(state){
    //   return state.count + 10
    // }
    isCollapse: state => state.isCollapse
  },
  /*
  * mutations里面定义方法，操作state方法,更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

  *其中参数state参数是必须的，也可以自己传递一个参数，如下代码，进行计数器的加减操作，加法操作时可以根据所传递参数大小进行相加，减法操作没有传参每次减一
  * add(state,num){ state.count += state.count+num  }
  * reduce(state){ state.count-- }
  * 
  * 在组件中使用：定义两个按钮进行加减操作 <button @click="btn">增加</button> <button @click="btn1">减少</button>
  *  方法一：注意：使用commit触发Mutation操作
  *     methods:{
  *       btn(){ this.$store.commit("addcount",10) }  //每次加十
  *       btn1(){ this.$store.commit("reduce") }
  *    }
  * 方法二：使用辅助函数进行操作，具体方法同上
  * import { mapState } from "vuex";
  *  methods:{
  *     ...mapMutations(["add",reduce])
  *     btn(){ this.add(10) }
  *     btn1(){ this.reduce() }
  *   }
  */
  mutations: {
    SET_COLLAPSE(state){
      state.isCollapse = !state.isCollapse
    }
  },
  // 操作异步操作mutation
  actions: {
    
  },
  modules: {
    
  },
});

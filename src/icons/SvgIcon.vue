<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { ref, computed, onMounted } from "@vue/composition-api";
export default {
  name: "svgIcon",
  // props: ['iconClass', 'className'],
  // 接收父组件的内容
  props: {
    // 分页
    iconClass: {
      type: String, // 定义接收的值类型
      default: "",
      // 如果type类型是Array,default:[] 这种写法错误，值不能直接写一个[]
      // ES5正确写法：default:function(){ return [] }
      // ES6正确写法：default:() => {}
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const msg = ref("手把手撸码的说法的前端");

    /**  2.0写法
    computed:{
      // get函数中的值,被调用或被修改就会调用
      get:() =>{
        return this.a + 1
      },
      // set绑定的数据被修改后会返回最新的数据
      set:() => {
        this.a = v - 1
      }
    }
    */
    //computed 监听属性变化并计算属性，得出最终结果，并返回 （计算金钱总额时常用到）
    // 监听父组件的iconClass，只要变化就把值返回出去，然后在元素中使用
    const iconName = computed(() => `#icon-${props.iconClass}`);

    const svgClass = computed(() => {
      if (props.className) {
        // 拼接类名 
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });

    return {
      msg,
      iconName,
      svgClass,
    };
  },
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;//改颜色需要配合该属性
}
</style>

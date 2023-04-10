<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
import { computed } from '@vue/composition-api'
import LayoutHeader from './Components/Header 3.0.vue'
import LayoutMain from './Components/Main 3.0.vue'
import LayoutNav from './Components/Nav 3.0.vue'
export default {
  name: 'layout',
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  },
  setup(props,{ root }) {
    // es6写法，只有一行时可省略return 和大括号
    const menuStatus = computed(() => root.$store.state.app.isCollapse)


    return{
      menuStatus
    }
  }

}
</script>
<style scoped lang="scss">
#layout{
  background-color: #f7f7f7;
}
</style>
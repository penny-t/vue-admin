<template>
  <div id="layout">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
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
  setup() {

  }

}
</script>
<style scoped lang="scss">
#layout{
  background-color: #f7f7f7;
}
</style>
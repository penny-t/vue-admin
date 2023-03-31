<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
    <el-menu :router="true" default-active="1-4-1" class="el-menu-vertical-demo" background-color="transparent" text-color="#fff" active-text-color="#fff" :collapse="isCollapse">
      
      <template v-for="(item, index) in routers">
        <el-submenu :key="item.id" v-if="!item.hidden" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- 使用制作的svg图标 -->
            <!-- <svg-icon iconClass="menu" className="menu"></svg-icon> -->
            <!-- router中的index.js配置icon 从该文件中引入制作的图标 -->
            <svg-icon :iconClass="item.meta.icon" className="item.meta.icon"></svg-icon>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name
          }}</el-menu-item>
        </el-submenu>
      </template>

    </el-menu>


  </div>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue/composition-api'
export default {
  name: 'navMenu',
  setup(props, { root }) {
    /*
    *data数据
    */
    const routers = reactive(root.$router.options.routes)

    /*
    *computed 监听
    */ 
  //  监听store中的isCollapse变化，只要有变化就赋给变量isCollapse
    const isCollapse = computed(() => {
      return root.$store.state.isCollapse
    })

    /*
    *函数
     */
   

    return {
      isCollapse,
      routers
    }
  }
}
</script>
<style scoped lang="scss">
.logo {
  text-align: center;
  img { 
    margin: 28px auto 25px;
    width: 92px;
    @include webkit(transition, all .3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all .3s ease 0s);

  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.open{
  #nav-wrap { width: $navMenu; }
}
.close{
  #nav-wrap { width:$navMenuMin }
  .logo img{
    width: 60%;
  }
}

</style>
<template>
  <div id="main-wrap">
    <div class="main-content">
            <div class="content">
              <router-view />
            </div>
        </div>
        
  </div>
</template>
<script>
export default{
  name:'layoutMain'
  
}
</script>
<style scoped lang="scss">
#main-wrap{
  height: 100vh;
  // border:30px solid #f7f7f7;
  // border-bottom: none;
  // margin:75px 0 0 250px;
  // -webkit-box-sizing: border-box;
}
.main-content {
    width: 100%;
    height: 100%;
    padding-top: $layoutHeader + 30;
    padding-right: 30px;
    @include webkit(box-sizing,border-box);
    @include webkit(transition, all .3s ease 0s);
}
.open{
  .main-content {  padding-left: $navMenu + 30; }
}
.close{
  .main-content {  padding-left: $navMenuMin + 30; }
}
.content {
    width: 100%;
    height: 100%;
    padding: 30px 30px 0 30px;
    background-color: #fff;
    @include webkit(box-sizing,border-box);

}
</style>
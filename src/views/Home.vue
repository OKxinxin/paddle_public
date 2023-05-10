<!-- 这是一个基本的Vue组件结构 -->
<template>
    <div class="page" style="width: 100%;min-height: 100vh;">
    <!-- 在这里编写组件的模板 -->
    <Home_back />
  </div>
</template>

<script>
import Home_back from '../components/Home/Home_background.vue';

export default {
  name: 'Home_vue',
  components: {
    Home_back,
  },

  methods: {
  // 在这里编写组件的方法
  scrollToBottom(event) {
  const windowHeight = window.innerHeight;
  const fullHeight = document.body.clientHeight;
  const currentPosition = window.scrollY;
  if (event.deltaY > 50 && currentPosition + windowHeight >= fullHeight) {
    // 用户继续向下滚动滚轮并且已经滚动到页面底部，执行跳转操作
    this.$router.push('/about');
  }
},
},
mounted() {
  if (this.$route.path === '/') {
    window.addEventListener('wheel', this.scrollToBottom);
  }
},
beforeUnmount() {
  window.removeEventListener('wheel', this.scrollToBottom);
},

}


</script>

<style scoped>
/* 在这里编写组件的样式 */



</style>
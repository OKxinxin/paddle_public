<template>
  <div class="page" style="width: 100%;min-height: 100vh;">
    <!-- Your HTML code here -->
  </div>
</template>

<script>


export default {
  name: 'About_vue',

  components: {
  },
  // Your JavaScript code here
methods: {
  scrollToTop(event) {
  const currentPosition = window.scrollY;
  if (event.deltaY < 0 && currentPosition <= 0) {
    // 用户继续向上滚动滚轮并且已经滚动到页面顶部，执行跳转操作
    this.$router.push('/');
  }
},
  },

mounted() {
  if (this.$route.path === '/about') {
    window.addEventListener('wheel', this.scrollToTop);
  }
},
beforeUnmount() {
  window.removeEventListener('wheel', this.scrollToTop);
},


}
</script>

<style scoped>
/* Your CSS code here */
</style>
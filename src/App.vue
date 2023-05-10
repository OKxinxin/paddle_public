<template>
  <div id="app">
    <Navbar />
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

</template>

<script>
import Navbar from './components/Navbar/Navbar.vue';
import { setTransitionName } from './router/transition.js'; // 引入自己封装的方法


export default {
  name: 'App',
  components: {
    Navbar,
  },

  data() {
    return {
      transitionName: null,
    };
  },

  watch: {
    "$route": function(to, from) {
      this.transitionName = setTransitionName(to, from); // 调用封装的方法
    },
  },
};
</script>

<style scoped>
@import './router/index.css';

#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.router-view {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

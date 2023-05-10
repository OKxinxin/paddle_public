// Here is a basic structure for a Vue component in the Login.vue file:

<template>
  <div>
    <!-- Login form goes here -->
      <Login />
  </div>
</template>

<script>
import Login from '../components/Loign/loign.vue';

export default {
  name: 'Login_vue',
  components: {
    Login,
  },

  data() {
    return {
      // Data properties go here
    }
  },
  methods: {
    // Methods go here
  }
}
</script>

<style scoped>

</style>
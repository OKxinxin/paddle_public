// Here is a basic structure for a Vue component:
<template>
  
  <div class="page" style="width: 100%;min-height: 100vh;">
    <!-- Your HTML code here -->
    <!-- <display></display> -->
  </div>
</template>

<script>
import display from '@/components/Display/display.vue'

export default {
  name: 'Display_vue', 

  components: {
    display,
  },

  data() {
    return {
      // Your data properties here
    }
  },
  methods: {
    // Your methods here
  }
}
</script> 


<style scoped>
</style>

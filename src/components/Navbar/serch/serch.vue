<!-- 这是一个基本的Vue组件结构 -->
<template>
<div class="container">
    <input placeholder="Type to search..." required="" class="input" name="text" type="text">
    <div class="icon">
        <svg viewBox="0 0 512 512" class="ionicon" xmlns="http://www.w3.org/2000/svg">
            <title>Search</title>
            <path stroke-width="32" stroke-miterlimit="10" stroke="currentColor" fill="none" d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"></path>
            <path d="M338.29 338.29L448 448" stroke-width="32" stroke-miterlimit="10" stroke-linecap="round" stroke="currentColor" fill="none"></path>
        </svg>
    </div>
</div>
</template>

<script>
export default {
  name: 'NavSerch',
  data() {
    return {
      // 这里是组件的数据
    }
  },
  methods: {
    // 这里是组件的方法
  }
}
</script>

<style scoped>
/* 这里是组件的样式 */
.container {
  position: relative;
  --size-button: 40px;
}

.input {
  padding-left: var(--size-button);
  height: var(--size-button);
  font-size: 15px;
  border: none;
  color: #fff;
  outline: none;
  width: var(--size-button);
  transition: all ease 0.3s;
  background-color: #191A1E;
  box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e;
  border-radius: 50px;
  cursor: pointer;
}

.input:focus,
.input:not(:invalid) {
  width: 200px;
  cursor: text;
  box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 1.5px 1.5px 3px #0e0e0e, inset -1.5px -1.5px 3px #5f5e5e;
}

.input:focus + .icon,
.input:not(:invalid) + .icon {
  pointer-events: all;
  cursor: pointer;
}

.container .icon {
  position: absolute;
  width: var(--size-button);
  height: var(--size-button);
  top: 0;
  left: 0;
  padding: 8px;
  pointer-events: none;
}

.container .icon svg {
  width: 100%;
  height: 100%;
}
</style>
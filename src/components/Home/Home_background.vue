<template>
  <div class="container">
    <div class="left">
      <img src="@/assets/picture/undraw_medicine_b-1-ol.svg" alt="Left Image" />
    </div>
    <div class="center">
      <h1 style="font-weight: bold; font-family: Arial, sans-serif;">3D智能医疗<br>检测</h1>
      <p>3D intelligent medical detection</p>
      <router-link to="/Import"><button class="start"><span>开始检测</span></button></router-link>
    </div>
    <div class="right">
      <img src="@/assets/picture/undraw_medical_research_qg4d.svg" alt="Right Image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home_Background',
  components:{
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0 !important;
  padding-right: 0 !important;
  width: 100vw;
  height: 100vh;
  background: #f7f4ed;
}


.left,
.right {
  width: 40vw;
  padding: 50px;
}

.left img,
.right img {
  width: 80%;
  height: auto;
  padding: 50px;
}

.center {
  margin-top: 168px;
  margin-bottom: 160px;
  width: 60%;
  text-align: center;
  filter: contrast(30);
}

h1 {
  font-size: 54px;
  margin-bottom: 1rem;
  animation: fadeIn 1.1s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    letter-spacing: -50px;
    filter: blur(8px);
  }
  to {
    letter-spacing: 10px;
    filter: blur(0px);
  }
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

button.start {
 outline: none;
 cursor: pointer;
 border: none;
 padding: 0.9rem 2rem;
 margin: 0;
 font-family: inherit;
 font-size: inherit;
 position: relative;
 display: inline-block;
 letter-spacing: 0.05rem;
 font-weight: 700;
 font-size: 17px;
 border-radius: 500px;
 overflow: hidden;
 background: #66ff66;
 color: ghostwhite;
}

button.start span {
 position: relative;
 z-index: 10;
 transition: color 0.4s;
}

button.start:hover span {
 color: black;
}

button.start::before,
button.start::after {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 z-index: 0;
}

button.start::before {
 content: "";
 background: #000;
 width: 120%;
 left: -10%;
 transform: skew(30deg);
 transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

button.start:hover::before {
 transform: translate3d(100%, 0, 0);
}


@media (max-width: 100%) {
  .container {
    flex-direction: column;
    padding: 50px 0px;
  }

  .left,
  .right {
    width: 100%;
    margin-bottom: 2rem;
  }

  .center {
    width: 100%;
  }
}
</style>


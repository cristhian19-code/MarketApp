<template>
  <div class="container">
    <div class="section banner">
      <img src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" height="85%" width="80%">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'home'
    }
  },
  
}
</script>

<style>
html{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.section{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner img{
  border-radius: 10px;
}
</style>

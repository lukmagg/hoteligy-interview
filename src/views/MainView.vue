<template>
  <div class="container">
    <div>
      <NavBar></NavBar>
    </div>
    <div class="content">
      <div>
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex: 1;
  flex-direction: row;
}
</style>

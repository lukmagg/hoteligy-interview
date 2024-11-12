<template>
  <div class="container">
    <div>
      <NavBarT></NavBarT>
    </div>
    <div class="content">
      <div>
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBarT from '../components/NavBarT.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.content {
  display: flex;
  align-self: center;
  flex: 1;
  /* flex-direction: row; */
  margin-top: 50px;
}
</style>

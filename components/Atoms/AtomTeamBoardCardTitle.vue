<template>
  <div>
    <div class="title">
      <h3>{{ titleText }}</h3>
      <fa :icon="['fas', 'user-friends']" />
    </div>
    <p>{{ description }}</p>
  </div>
</template>
<script>
export default {
  props: {
    titleText: String,
    description: String
  }
};
</script>
<style scoped>
.title {
  display: flex;
  align-items: center;
}

.title h3 {
  margin-right: 10px;
}
</style>

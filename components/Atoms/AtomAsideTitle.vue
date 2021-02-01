<template>
  <div v-if="title" class="aside-title">
    <h3>{{ title }}</h3>
    <fa
      v-if="title !== `Participating`"
      class="team-icon-btn"
      @click="$emit('emitClickFired')"
      :icon="['fas', 'plus']"
    />
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    iconName: String
  }
};
</script>
<style scoped>
.aside-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
}
.aside-title {
  font-size: 14px;
}
.aside-title h3 {
  font-weight: lighter;
  text-transform: uppercase;
  color: grey;
}
.team-icon-btn {
  cursor: pointer;
}
</style>

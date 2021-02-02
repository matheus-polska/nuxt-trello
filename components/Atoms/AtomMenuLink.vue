<template>
  <li class="menu-link">
    <div @click="$emit('emitClickFired')">
      <fa :icon="[iconType, iconName]" />
      <span v-if="text">{{ text }}</span>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    text: String,
    iconName: String,
    iconType: {
      type: String,
      default: "fas"
    }
  }
};
</script>
<style scoped>
.menu-link {
  border-radius: 3px;
  border: 0;
  text-decoration: none;
  align-items: center;
  background-color: hsla(0, 0%, 100%, 0.3);
  box-shadow: none;
  display: flex;
  font-weight: 700;
  height: 32px;
  line-height: 32px;
  margin: 0 4px 0 0;
  padding: 0;
  white-space: nowrap;
  font-size: 15px;
  cursor: pointer;
}
.menu-link div {
  padding: 5px 8px;
  display: block;
  color: #fff;
  text-decoration: none;
}
.menu-link:not(:last-of-type) {
  margin-right: 5px;
}
</style>

<template>
  <li class="aside-link">
    <NuxtLink
      :to="{ path: asideLinkProps.route, meta: { id: asideLinkProps.id } }"
    >
      <fa :icon="['fas', asideLinkProps.iconName]" />
      <span>{{ asideLinkProps.text }}</span>
    </NuxtLink>
  </li>
</template>
<script>
export default {
  props: {
    asideLinkProps: Object
  }
};
</script>
<style scoped>
li:not(:last-of-type) {
  margin-bottom: 4px;
}
a {
  display: block;
  padding: 5px 8px;
  text-decoration: none;
  color: black;
  border-radius: 3px;
  font-size: 15px;
}

a:hover {
  background-color: rgba(9, 30, 66, 0.08);
}

.nuxt-link-exact-active {
  background-color: #e4f0f6;
  color: #0079bf;
}
</style>

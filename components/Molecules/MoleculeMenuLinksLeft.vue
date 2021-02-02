<template>
  <div class="menu-links-left">
    <ul>
      <NuxtLink to="/">
        <AtomMenuLink iconName="home" />
      </NuxtLink>
      <NuxtLink to="/boards">
        <AtomMenuLink text="Quadros" iconName="border-all" />
      </NuxtLink>
    </ul>
  </div>
</template>
<script></script>
<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
a {
  text-decoration: none;
}
</style>

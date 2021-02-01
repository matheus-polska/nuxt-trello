<template>
  <div>
    <div class="aside-block">
      <AtomAsideTitle
        @emitClickFired="$emit('emitClickFired')"
        :title="title"
      />
      <ul>
        <AtomAsideLink
          v-for="link in arrayOfLinks"
          :asideLinkProps="link"
          :key="link.id"
        />
      </ul>
    </div>

    
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    arrayOfLinks: Array
  }
};
</script>
<style scoped>
aside {
  width: 272px;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}

</style>

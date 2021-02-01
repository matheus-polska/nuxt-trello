<template>
  <div>
    <div class="team-header">
      <div class="title">
        <h3>{{ titleText }}</h3>
        <fa :icon="['fas', 'user-friends']" />
      </div>
      <NuxtLink :to="`/${teamid}/settings`">Configurações</NuxtLink>
    </div>

    <p>{{ description }}</p>
  </div>
</template>
<script>
export default {
  props: {
    titleText: String,
    teamid: String,
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
a {
  color: black;
  text-decoration: none;
}
.team-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

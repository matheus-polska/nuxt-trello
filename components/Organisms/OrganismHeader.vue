<template>
  <header class="menu-bar">
    <nav class="menu-links-wrapper">
      <MoleculeMenuLinksLeft />
      <MoleculeMenuLinksRight />
    </nav>
  </header>
</template>
<style scoped>
.menu-bar {
  max-height: 40px;
  width: 100%;
  background: #026aa7;
  padding: 4px 0;
}

/* Nav */
.menu-links-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 4px;
}
</style>

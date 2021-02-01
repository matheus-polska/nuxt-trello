<template>
  <div class="board">
    <NuxtLink :to="`boards/${routeid}`">
      <AtomBoardCardTitle :boardText="boardText" />
    </NuxtLink>
  </div>
</template>
<script>
export default {
  props: {
    boardText: String,
    routeid: String
  }
};
</script>
<style scoped>
.board:not(:last-of-type) {
  margin-right: 10px;
}

.board {
  margin-top: 10px;
  background: #4e97c2;
  width: 200px;
  height: 95px;
  color: #ffffff;
  font-size: 15px;
  padding: 8px;
  cursor: pointer;
  box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
a {
  text-decoration: none;
  color: white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

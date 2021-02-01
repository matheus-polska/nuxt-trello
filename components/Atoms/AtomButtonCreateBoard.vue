<template>
  <div @click="$emit('emitClickFired')" class="create-newCard">
    <span>Create new board</span>
  </div>
</template>
<style scoped>
.create-newCard {
  background: rgb(78 151 194 / 20%);
  height: 80px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-weight: 200;
  margin-top: 17px;
  cursor: pointer;
  border-radius: 3px;
  transition: background 150ms ease-in;
}
.create-newCard:hover {
  background-color: rgb(78 151 194 / 30%);
}
</style>

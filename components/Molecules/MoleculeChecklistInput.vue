<template>
  <div class="new-checkitem-field">
    <div v-if="adding">
      <input
        v-model="checkitemName"
        @keydown.enter="onAddCheckitem()"
        placeholder="Enter an item"
        type="text"
        class="pattern-input check-item-input"
      />
      <div class="action">
        <button @click="onAddCheckitem()" id="save">Add</button>
        <span @click="adding = !adding" class="close"
          ><fa style="margin-right: 10px" :icon="['fas', 'times']"
        /></span>
      </div>
    </div>
    <button v-if="!adding" @click="adding = !adding" id="add-item">
      Add an item
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      adding: false,
      checkitemName: ""
    };
  },
  methods: {
    onAddCheckitem() {
      this.$emit("onAddCheckitem", this.checkitemName);
      (this.checkitemName = ""), (this.adding = false);
    }
  }
};
</script>
<style scoped>
input {
  width: 100%;
  outline: none;
  height: 31px;
  transition: border 0.3ms ease-in-out;
  border-radius: 5px;
  border: 1px solid #c1c0c0;
  padding: 0 5px;
}
#save {
  background: #5aac44;
  border: none;
  outline: none;
  color: white;
  padding: 7px 18px;
  cursor: pointer;
  border-radius: 5px;
}
#add-item {
  background-color: rgba(9, 30, 66, 0.07);
  box-shadow: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  display: block;
  height: 32px;
  max-width: 300px;
  padding: 6px 12px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 13px;
  position: relative;
  outline: none;
}
.new-checkitem-field {
  margin-left: 27px;
  margin-top: 10px;
}
.close {
  cursor: pointer;
  margin-left: 10px;
}
.close:hover {
  opacity: 0.5;
}
.action {
  margin-top: 13px;
  display: flex;
  align-items: center;
}
</style>

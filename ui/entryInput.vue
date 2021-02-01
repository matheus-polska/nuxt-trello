<template>
  <div class="add-new-item">
    <input @keydown.enter="onEnter" v-model="input" type="text" />
    <span @click="onClick">
      <fa :icon="['fas', 'edit']" />
    </span>
  </div>
</template>
<script>
export default {
  name: "entryInput",
  props: {
    listId: [String, Number]
  },
  data() {
    return {
      input: ""
    };
  },
  methods: {
    onEnter($event) {
      this.emit($event.metaKey || $event.ctrlKey);
    },

    onClick() {
      this.emit(true);
    },

    emit(event) {
      if (this.input) {
        this.$emit("eventAddFired", {
          list_id: this.listId,
          title: this.input,
          event
        });

        if (!event) {
          this.input = "";
        }
      }
    }
  }
};
</script>
<style scoped>
.add-new-item {
  display: flex;
  align-items: center;
}
.add-new-item span {
  display: flex;
  height: 31px;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-left: 7px;
  background: #4e97c2;
  border-radius: 5px;
  margin-left: 7px;
  color: white;
  cursor: pointer;
}
input {
  width: 100%;
  border: 1px solid #a6a6a6;
  outline: none;
  height: 31px;
  transition: border 0.3ms ease-in-out;
  border-radius: 5px;
}
input:focus,
textarea:focus {
  border: 2px solid #026aa7;
}
</style>

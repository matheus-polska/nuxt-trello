<template>
  <div class="edit-list-field">
    <input @keydown.enter="emit" v-model="input" type="text" />
  </div>
</template>
<script>
export default {
  name: "entryInput",
  props: {
    listTitle: [String, Number]
  },
  data() {
    return {
      input: ""
    };
  },
  methods: {
    emit($event) {
      this.$emit("eventEditListFired", {
        title: this.input
      });
      $event.target.blur();
    }
  },
  created() {
    this.input = this.listTitle;
  }
};
</script>
<style scoped>
.edit-list-field {
  flex: 1;
  margin-right: 13px;
}
input {
  width: 100%;
  border: none;
  outline: none;
  height: 31px;
  transition: border 0.3ms ease-in-out;
  border-radius: 5px;
  background: transparent;
  font-weight: bold;
  font-size: 16px;
}
input:focus {
  border: 2px solid #026aa7;
}
</style>

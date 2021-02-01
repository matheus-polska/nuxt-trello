<template>
  <select @change="emit" v-model="selected">
    <option value="admin">Admin</option>
    <option value="editor">Editor</option>
  </select>
</template>
<script>
export default {
  name: "entryInput",
  props: {
    role: String
  },
  data() {
    return {
      selected: ""
    };
  },
  methods: {
    emit() {
      if (this.selected) {
        this.$emit("eventSelectFired", this.selected);
      }
    }
  },
  created() {
    this.selected = this.role;
  }
};
</script>
<style scoped>
select {
  width: 100px;
  padding: 3px;
  border: 1px solid #b6b6b6;
  background: #4e97c2;
  color: white;
  border: none;
  outline: none;
}
</style>

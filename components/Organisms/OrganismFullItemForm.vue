<template>
  <form @submit.prevent="emitAddFullItem">
    <div>
      <label>Task title</label>
      <input placeholder="" type="Enter the board name" v-model="taskTitle" />
    </div>
    <div>
      <label>Description</label>
      <textarea
        id=""
        cols="30"
        rows="6"
        placeholder="Enter a short description about your team"
        v-model="taskDescription"
      ></textarea>
    </div>
    <button class="btn-submit">Create task</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      taskTitle: "",
      taskDescription: "",
      list_id: ""
    };
  },
  methods: {
    updateData(item) {
      this.taskTitle = item.title;
      this.list_id = item.list_id;
    },
    emitAddFullItem() {
      this.$emit("onAddFullItem", {
        taskTitle: this.taskTitle,
        taskDescription: this.taskDescription,
        list_id: this.list_id
      });
    }
  }
};
</script>
<style>
label {
  margin-bottom: 5px;
  color: grey;
}
input {
  width: 100%;
  border: 1px solid #a6a6a6;
  outline: none;
  height: 31px;
  transition: border 0.3ms ease-in-out;
  border-radius: 5px;
}
textarea {
  width: 100%;
  outline: none;
  border: 1px solid #a6a6a6;
}

input:focus,
textarea:focus {
  border: 2px solid #026aa7;
}

.btn-submit {
  margin-top: 5px;
  background: #026aa7;
  border: none;
  outline: none;
  color: white;
  padding: 7px 29px;
  cursor: pointer;
}
</style>

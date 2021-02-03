<template>
  <div class="modal-wrapper" v-if="opened">
    <div class="overlay" @click="handleCloseModal">
      <div ref="modal" class="modal">
        <h3>{{ title }}</h3>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    opened: Boolean
  },
  methods: {
    handleCloseModal($event) {
      if ($event.target.classList.contains("overlay")) {
        this.$emit("onCloseModal");
      }
    }
  }
};
</script>

<style>
.modal-wrapper {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.overlay {
  height: 100vh;
  width: 100%;
  position: fixed;
  background: rgb(0 0 0 / 23%);
  top: 0;
  left: 0;
  z-index: -1;
  overflow-y: auto;
  padding-bottom: 30px;
}
.modal {
  width: 500px;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
  margin: 0 auto;
  margin-top: 10%;
  background: white;
  z-index: 9999;
  padding: 15px;
}
</style>

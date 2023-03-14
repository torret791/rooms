<template lang="pug">
  .modal-wrapper(v-if="show")
    .modal
      .modal-header
        h3 {{ title }}
        button.close-btn(@click="closeModal") &times;
      .modal-body
        slot
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    title: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close")
    },
  },
};
</script>

<style>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  width: 500px;
  padding: 20px;
  border-radius: 10px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
}

.close-btn {
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  margin-top: 20px;
}
</style>

<template lang="pug">
  .room-component
    h3 {{data.name}}
    label(for="capacity") Capacidad máxima
    input(type="text" name="capacity" :value="data.capacity" disabled)
    label(for="ocupation") Ocupación
    .ocupation-container
      input.ocupation-container__input(type="text" name="ocupation" :value="data.ocupation" disabled)
      span.ocupation-container__span %
    .buttons
      button.btn.btn--delete(@click="$emit('delete', data)") Eliminar
      button.btn(@click="$emit('update', data)") Modificar
</template>
<script>

export default {
  name: 'RoomComponent',
  props: ['data'],
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
h1,h2,h3,label{
    text-align: start;
}
.room-component {
    padding:0px 20px 20px 20px;
    height: 100%;
    max-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: var(--border-radius-container);
    background-color: var(--secondary-color);
}
.buttons{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  gap:8px;
}
input{
  width:90%;
    height: 32px;
    color:var(--primary-color);
    border-radius: var(--border-radius-inputs-buttons);
    border: 1px solid var(--primary-color);
    padding-left:12px;
    margin-bottom: 8px;
    &:disabled{
      background-color: white
    }
}
.ocupation-container{
  position: relative;
  &____input{
    width:90%;
  }
  &__span{
    position:absolute;
    right: 10px;
    bottom:16px;
  }
}


</style>

<template lang="pug">
    .rooms-container
        h1 Salas
        .rooms-header
            .rooms-header__select
                select(name="floors" id="floor-select" v-model="floorSelected" @change="changeSelected")
                    template(v-for="floor in floors")
                        option(:value="floor.name") {{floor.name}}
            .rooms-header__filters(v-click-outside="hide")
                font-awesome-icon(icon="fa-solid fa-filter" @click="showFilters = !showFilters")
                .container-filters(v-show="showFilters")
                        h3 Filtrar por:
                        label(for="capacity-filter") Capacidad máxima
                        input(type="number" name="capacity-filter" value="" v-model="capacityFilter" @input="filterByCapacity")
                        label(for="ocupation-filter") Ocupación
                        input(type="number" name="ocupation-filter" value="" v-model="ocupationFilter" @input="filterByOcupation")
        hr
        .rooms
            .rooms__menu
                h3 {{floorSelected}}
                button.btn.btn--add(@click="openModal('add', roomModal)") Añadir sala
            .rooms__grid_container
                template(v-for="room in filteredRooms")
                    RoomComponent(:data="room" @delete="openModalDelete('delete', room)" @update="openModal('update', room)")
        ModalComponent(:show="showModal" :title="action === 'add' ? 'Añadir sala': 'Modificar sala'" @close="cancel()")
            .container-modal-sala
                label(for="name") Nombre
                input(type="text" name="name" value="" v-model="roomModal.name" :disabled="action==='update'")
                label(for="capacity") Capacidad máxima
                input(type="number" name="capacity" value="" v-model="roomModal.capacity")
                label(for="ocupation") Ocupación
                input(type="number" name="ocupation" value="" v-model="roomModal.ocupation")
                span.invalid-form(v-if="isInvalid") Debe rellenar todos los campos
                span.invalid-form(v-if="isDuplicate") El nombre de la sala ya existe. Introduzca uno válido
                .buttons
                    button.btn.btn--delete(@click="cancel()") Cancelar
                    button.btn(@click="action === 'add' ? addRoom(): updateRoom()") Aceptar
        ModalComponent(:show="showModalDelete" title="Atención" @close="showModalDelete=false")
                span ¿Está seguro que desea eliminar esta sala?
                .buttons
                    button.btn.btn--delete(@click="showModalDelete=false") Cancelar
                    button.btn(@click="deleteRoom()") Aceptar
</template>

<script>
import RoomComponent from '@/components/RoomComponent.vue'
import { roomsService } from '@/services/roomsService'
import ModalComponent from '@/components/shared/ModalComponent.vue'
import ClickOutside from 'vue-click-outside'

export default {
    name: 'RoomsList',
    components:{
        RoomComponent,
        ModalComponent
    },
    directives: {
        ClickOutside
    },
    data () {
        return {
            floorSelected: 'Planta 1',
            rooms: [],
            floors: [],
            showModal: false,
            showModalDelete: false,
            roomModal: {
                name: '',
                capacity: '',
                ocupation: ''
            },
            action: '',
            isInvalid: false,
            isDuplicate: false,
            capacityFilter: '',
            ocupationFilter: '',
            showFilters: false
        }
    },
    async created(){
        const response = await roomsService.getAllFloorsInfo()
        this.rooms = response.data[0].rooms
        this.floors = response.data
    },
    methods: {
        addRoom() {
            this.validateRequiredFields()
            const roomIndex = this.rooms.findIndex(room => room.name === this.roomModal.name)
            this.isDuplicate = roomIndex !== -1
            if (!this.isInvalid && !this.isDuplicate) {
                this.rooms.push(this.roomModal)
                this.closeModal()
            }
        },
        deleteRoom() {
            const index = this.rooms.findIndex(room => room === this.roomToDelete)
            this.rooms.splice(index, 1)
            this.closeModal()
        },
        updateRoom() {
            this.validateRequiredFields()
            if (!this.isInvalid) {
                const roomIndex = this.rooms.findIndex(room => room.name === this.roomToUpdate.name)
                this.rooms.splice(roomIndex, 1, this.roomModal)
                this.closeModal()
            }
        },
        changeSelected(event) {
            const selectedFloor = this.floors.find(el => el.name === event.target.value)
            this.rooms = selectedFloor.rooms
        },
        openModalDelete(action, data) {
            this.action = action
            this.roomToDelete = data
            this.showModalDelete = true
        },
        openModal(action, data) {
            this.action = action
            if (action === 'update') {
                this.roomToUpdate = {...data}
            }
            this.roomModal = {...data}
            this.showModal = true
        },
        cancel() {
            if (this.action === 'update') {
                const roomIndex = this.rooms.findIndex(room => room.name === this.roomModal.name)
                this.rooms.splice(roomIndex, 1, this.roomToUpdate)
            }
            this.closeModal()
        },
        resetRoomModal() {
            this.roomModal = {
            name: '',
            capacity: '',
            ocupation: ''
            }
            this.isInvalid = false
        },
        validateRequiredFields() {
            this.isInvalid = !this.roomModal.name || !this.roomModal.capacity || !this.roomModal.ocupation
        },
        closeModal() {
            this.showModal = false
            this.showModalDelete = false
            this.resetRoomModal()
        },
        filterByCapacity(event) {
            this.capacityFilter = event.target.value
        },
        filterByOcupation(event) {
            this.ocupationFilter = event.target.value
        },
        hide(){
            this.showFilters = false
        }
    },
    computed: {
        filteredRooms() {
            let filtered = this.rooms
            if (this.capacityFilter) {
                filtered = filtered.filter(room => room.capacity <= this.capacityFilter)
            }
            if (this.ocupationFilter) {
                filtered = filtered.filter(room => room.ocupation <= this.ocupationFilter)
            }
            return filtered
        }
    }
}
</script>

<style lang="scss" scoped>
.rooms-container{
    width: 100%;
    display:flex;
    flex-direction: column;
    z-index: 1;
}
.rooms-header{
    display:flex;
    justify-content:space-around;
    &__select{
        margin-right: auto;
    }
}
.container-filters{
    position: absolute;
    background: var(--secondary-color);
    width: 100%;
    max-width: 250px;
    height: 250px;
    top: 126px;
    right: -261px;
    padding: 0px 16px 16px 16px;
    border-radius: var(--border-radius-container);
    border: 2px solid var(--primary-color);
    transition: all 500ms ease;
    transform: translateX(-100%);
    display:flex;
    flex-direction:column;
    justify-content: center;
    z-index: 100;
}
.rooms {
    height: 100%;
    min-width: 250px;
    border-radius: var(--border-radius-container);
    border: 2px solid var(--primary-color);
    padding: 0px 24px 24px 24px;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
}
.rooms__menu{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.rooms__grid_container{
    height: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
    gap:16px;
    div{
        max-width: 500px;
        height: auto;
        min-height: 250px;
    }
}
.container-modal-sala {
    padding:20px 20px 20px 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: var(--border-radius-container);
    background-color: var(--secondary-color);
}
.invalid-form{
    color: #F56C6C; 
}
.buttons{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  gap:8px;
  margin-top: 16px;
}
input{
    height: 32px;
    color:var(--primary-color);
    border-radius: var(--border-radius-inputs-buttons);
    border: 1px solid var(--primary-color);
    padding-left:12px;
    margin-bottom: 8px;
}
select{
    height: 34px;
    width: 200px;
    color:var(--primary-color);
    border-radius: var(--border-radius-inputs-buttons);
    border: 1px solid var(--primary-color);
    padding-left:12px;
    background: white;
}
h1,h2,h3,label{
    text-align: start;
}
h1{
    font-weight: 900;
}
hr {
    margin-top: 25px;
    width: 100%;
    color: var(--secondary-color);
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type=number] { -moz-appearance:textfield; }
</style>
import service from '@/services/service'

const roomsService = {
    getAllFloorsInfo: () => service.get('https://apimocha.com/torreapi/allFloors')
}

export {
    roomsService
}
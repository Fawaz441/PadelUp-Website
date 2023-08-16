import { instance, instance2 } from "./instance"

const bookingAPIs = {
    getBookings: () => instance.get("/app/booking"),
    cancelBooking: bookingId => instance.get(`/app/booking/cancel/${bookingId}`)
}

export default bookingAPIs
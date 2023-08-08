import axios from 'axios'

const baseURL = "https://flutter.monqiz.com/api"

const instance = axios.create({
    baseURL
})

const apiInstance = {
    getNews:()=>instance.get('/app/news'),
    getCategories:()=>instance.get('/app/category'),
    getAvailableTimes:(date, duration) => instance.get(`/app/category/available/${date}/${duration}`)
}

export default apiInstance
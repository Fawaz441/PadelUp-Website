import axios from 'axios'
import toast from 'react-hot-toast'

const baseURL = "https://flutter.monqiz.com/api"

export const instance = axios.create({
    baseURL
})

export const instance2 = axios.create({
    baseURL: "http://64.227.44.149/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
    }
})

export const addTokenToInstance2 = token => instance2.defaults.headers.Authorization = `Bearer ${token}`
export const removeTokenFromInstance2 = () => delete instance2.defaults.headers.Authorization



// Add response interceptor
instance.interceptors.response.use(
    response => {
        // Return a successful response directly
        return response;
    },
    error => {
        if (error.response) {
            const responseData = error.response.data;

            // Check if the response contains an error message
            if (responseData && responseData.success === false && responseData.message) {
                // Use toast.error to display the error message
                toast.error(responseData.message);
            }
        }

        // Pass the error along to the component's error handling
        return Promise.reject(error);
    }
);


// Add response interceptor
instance2.interceptors.response.use(
    response => {
        // Return a successful response directly
        return response;
    },
    error => {
        if (error.response) {
            const responseData = error.response.data;

            // Check if the response contains an error message
            if (responseData && responseData.success === false && responseData.message) {
                // Use toast.error to display the error message
                toast.error(responseData.message);
            }
        }

        // Pass the error along to the component's error handling
        return Promise.reject(error);
    }
);

const apiInstance = {
    getNews: () => instance.get('/app/news'),
    getCategories: () => instance.get('/app/category'),
    getAvailableTimes: (date, duration) => instance.get(`/app/category/available/${date}/${duration}`)
}

export default apiInstance
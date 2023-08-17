import { instance, instance2 } from "./instance"

const authAPIs = {
    register: data => instance2.post("/auth/register", data),
    login: data => instance2.post("/auth/login", data),
    logout: () => instance2.get(`/auth/logout`),
    updateUser: (data) => instance2.post('/auth/updateProfile', data),
    getUserProfile: () => instance2.get('/auth/me')
}

export default authAPIs
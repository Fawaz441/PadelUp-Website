import { instance, instance2 } from "./instance"

const authAPIs = {
    register: data => instance2.post("/auth/register", data),
    login: data => instance2.post("/auth/login", data),
    logout: () => instance2.get(`/api/auth/logout`),
    updateUser: (data) => instance2.post('/api/auth/updateProfile', data),
    getUserProfile: () => instance2.get('/api/auth/me')
}

export default authAPIs
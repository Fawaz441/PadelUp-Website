import { instance2 } from "./instance"

const authAPIs = {
    register: data => instance2.post("/auth/register", data),
    login: data => instance2.post("/auth/login", data)
}

export default authAPIs
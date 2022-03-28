import axios from 'axios'

const taskService = {
    getTask: (payload: any) => axios.get(`http://127.0.0.1:8000/api/tasks`),
    addTaskname: (payload: any) => axios.post(`http://127.0.0.1:8000/api/tasks`, payload),
    editTaskname: (payload: any) => axios.put(`http://127.0.0.1:8000/api/task/${payload.id}`, payload),
    deleteTask: (payload: any) => axios.delete(`http://127.0.0.1:8000/api/task/${payload}`),
    
}

export default taskService
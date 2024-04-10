import axios from 'axios';



export const getAllUsers = () => {
    return axios.get('http://127.0.0.1:8000/api/users/')
}



export async function postLogin(username, password) {
    const response = await axios.post(
        'http://127.0.0.1:8000/api/users/', {
            username,
            password
        }
    );
    return response.data;
}
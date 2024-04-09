import axios from 'axios';

export const getAllUsers = () => {
    return axios.get('http://127.0.0.1:8000/api/users/')
}


export async function postLogin(user, password) {
    const response = await axios.post(
        'http://localhost:8000/api/users/',
        {
            user,
            password
        }
    );
    return response.data;
}

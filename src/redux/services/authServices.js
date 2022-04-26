import { http } from './http';

export const loginApi = async(data) => {
    return await http.post('/admin/user/signIn', data);
}

//here function is reduced to single line, so return is not needed
export const logoutApi = async () => await http.post('admin/user/logout');

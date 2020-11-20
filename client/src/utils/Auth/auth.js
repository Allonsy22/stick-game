import axios from "axios";
import API_URL from '../api_url';

class Auth {
  login(email, password) {
    return axios
      .post(API_URL + 'signin', { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(email, password) {
    return axios.post(API_URL + 'signup', {
      email,
      password,
    });
  }
}

export default new Auth();
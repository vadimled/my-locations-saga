import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-locations-saga.firebaseio.com/'
});

export default instance;
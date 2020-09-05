import axios from 'axios'
import * as API from './API.js'

// Axios HTTP Request untuk init login
axios.create({
    baseURL:API.URLAdmin
})

axios.interceptors.request.use(
    config => {
        const idVendor = localStorage.getItem("vendorID");

        // Sistem cek jika memiliki vendorID maka diidentifikasi pengguna vendor dan akan menggunakan APIVendor
        if (idVendor) {
            config.baseURL = API.URLVendor+idVendor;
        } else {
            config.baseURL = API.URLAdmin;
        }

        return config;
    },

    error => Promise.reject(error)
);

export default axios

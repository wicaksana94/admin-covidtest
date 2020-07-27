import axios from 'axios'

// Axios HTTP Request untuk data-data vendor
let APIVendor = "http://localhost:2123/vendor/";

// Axios HTTP Request untuk data-data admin
let APIAdmin = "http://localhost:2123";

// Axios HTTP Request untuk init login
axios.create({
    baseURL:"http://localhost:2123"
})

axios.interceptors.request.use(
    config => {
        const idVendor = localStorage.getItem("vendorID");

        // Sistem cek jika memiliki vendorID maka diidentifikasi pengguna vendor dan akan menggunakan APIVendor
        if (idVendor) {
            config.baseURL = APIVendor+idVendor;
        } else {
            config.baseURL = APIAdmin;
        }

        return config;
    },

    error => Promise.reject(error)
);

export default axios

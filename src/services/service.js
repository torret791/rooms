import axios from 'axios'

const axiosParams= {
    baseURL: window.location.origin + window.location.pathname
    
}

const axiosInstance = axios.create(axiosParams)

axiosInstance.interceptors.request.use(config => {
    config.headers['content-type'] = 'application/json'
    config.headers.Accept = 'application/json'

    return config
})

export default axiosInstance
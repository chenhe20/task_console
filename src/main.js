import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import './index.css'
import "tailwindcss/tailwind.css"
import 'tw-elements'
import '@fortawesome/fontawesome-free/css/all.css'
import Notifications from '@kyvg/vue3-notification'
import { useLoginStore } from './stores/login.ts'
import axios from 'axios'
import VueCookies from 'vue-cookies'

const app = createApp(App)
app.use(Notifications)
app.use(router)
app.use(VueCookies)

const pinia = createPinia()
app.use(pinia)

const loginStore = useLoginStore()
//axios.defaults.baseURL = '/api'

// create an axios instance
axios.interceptors.request.use(
    config => {
        config.headers['authorisation'] = loginStore.token
        return config
    },
    error => {
        return error
    })

axios.interceptors.response.use(
        response => {
            if (response.data.code === '004') {
                router.push('/login')
            } else return Promise.resolve(response);
        })


app.mount('#app')





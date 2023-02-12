import { createRouter, createWebHashHistory } from 'vue-router'
import TaskView from '../views/TaskView.vue'
import ExcgRate from '../views/ExcgRateView'
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView.vue";
import NogizakaBlogView from "@/views/NogizakaBlogView.vue";
import sakurazakaBlogView from "@/views/SakurazakaBlogView.vue";

const routes = [
    {
        path: '/task',
        name: 'task',
        component: TaskView
    },
    {
        path: '/',
        name: 'home',
        component: TaskView
    },
    {
        path: '/excgRate',
        name: 'excgRate',
        component: ExcgRate
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/blog-nogi',
        name: 'nogiBlog',
        component: NogizakaBlogView
    },
    {
        path: '/blog-saku',
        name: 'sakuBlog',
        component: sakurazakaBlogView
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

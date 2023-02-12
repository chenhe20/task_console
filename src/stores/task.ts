
import { defineStore } from 'pinia'
//import {taskVO} from "../api/taskVO";
import axios from 'axios'

export const useTaskStore = defineStore('task', {

    state: () => ({
        tasks: []
    }),
    getters: {

    },
    actions: {
        fetchAllTask() {
            axios.get("http://3.84.116.122:8088/task-mgt/all").then(res => {
                    this.tasks = res.data.data
                }).catch(error => {
                console.log(error)
            })
        }
    }
})


import { defineStore } from 'pinia'
import {taskVO} from "@/api/taskVO";
import axios from 'axios'

export const useTaskStore = defineStore('task', {

    state: () => ({
        tasks: [] as taskVO[]
    }),
    getters: {

    },
    actions: {
        fetchAllTask() {
            axios.get("http://localhost:8088/task-mgt/all").then(res => {
                    this.tasks = res.data.data
                }).catch(error => {
                console.log(error)
            })
        }
    }
})

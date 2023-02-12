import {defineStore} from "pinia";
import axios from "axios";

export const useSakurazakaStore = defineStore('sakurazaka', {

    state: () => ({
        blogs: []
    }),
    getters: {

    },
    actions: {
        fetchRecentBlog() {
            axios.get("http://3.84.116.122:8088/blog/recent/sakurazaka46").then(res => {
                this.blogs = res.data.data
            }).catch(error => {
                console.log(error)
            })
        }
    }
})

<template>

    <div v-if="!loginStore.isLogin" >
        <router-link to="/login">Log in</router-link>
    </div>
    <div v-else class="dropdown relative">
        <a class="dropdown-toggle flex items-center hidden-arrow" href="#" id="dropdownMenuButton2" role="button"
           data-bs-toggle="dropdown" aria-expanded="false">
            <div class="mr-2">{{loginStore.username}}</div>
            <img src="https://mdbootstrap.com/img/new/avatars/2.jpg" class="rounded-full"
                 style="height: 25px; width: 25px" alt="" loading="lazy" />
        </a>
        <ul aria-labelledby="dropdownMenuButton2" class="
    dropdown-menu
    min-w-max
    absolute
    hidden
    bg-white
    text-base
    z-50
    float-left
    py-2
    list-none
    text-left
    rounded-lg
    shadow-lg
    mt-1
    hidden
    m-0
    bg-clip-padding
    border-none
    left-auto
    right-0
  ">
            <li>
                <a class="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      " href="#">Profile</a>
            </li>
            <li>
                <a class="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      " href="#">Settings</a>
            </li>
            <li>
                <a class="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
       bg-red-500 hover:bg-red-700 text-white font-bold rounded-full
      " @click="logOff">Log off</a>
            </li>
        </ul>
    </div>

</template>

<script setup>
    import { useLoginStore } from '../stores/login.ts'
    import {onMounted, computed, ref, reactive} from 'vue'
    import {useNotification} from "@kyvg/vue3-notification"
    import axios from 'axios'

    const notification = useNotification()
    const loginStore = useLoginStore()

    // Try to use username and token stored in cookie to login
    if (!loginStore.isLogin) {

        const tokenCookie = document.cookie.split(';').find(c => c.trim().startsWith('token='));
        const usernameCookie = document.cookie.split(';').find(c => c.trim().startsWith('username='));

        if (tokenCookie) {
            axios.post("http://3.84.116.122:8088/user/loginByToken", {
                username: usernameCookie.split('=')[1],
                token: tokenCookie.split('=')[1]
            })
                .then(res => {
                    if (res.data.code === '100') {
                        // notification.notify({
                        //     title: "login success",
                        //     type: 'success',
                        // })

                        // Stores in pinia
                        loginStore.isLogin = true
                        loginStore.username = usernameCookie.split('=')[1]
                        loginStore.token = res.data.data

                        // stores in cookie
                        const date = new Date();
                        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000))
                        document.cookie = `username=${usernameCookie.split('=')[1]};expires=${date.toUTCString()};SameSite=None;path=/`
                        document.cookie = `token=${res.data.data};expires=${date.toUTCString()};SameSite=None;path=/`
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    function logOff() {
        // Clears pinia
        loginStore.isLogin = false
        loginStore.usernmae = ""
        loginStore.token = ""

        // Clears cookie
        const date = new Date();
        date.setTime(date.getTime() - (24 * 60 * 60 * 1000));
        document.cookie = `username=;expires=${date.toUTCString()};path=/`;
        document.cookie = `token=;expires=${date.toUTCString()};path=/`;

        notification.notify({
            title: "log off success",
            type: 'success',
        })
    }
</script>

<style scoped>

</style>

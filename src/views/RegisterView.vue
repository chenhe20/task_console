<template>
    <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                <input  v-model="registerForm.username"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Username" />

                <input  v-model="registerForm.email"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email (optional)" />

                <input  v-model="registerForm.password"
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />

                <div class="relative">
                <input  v-model="registerForm.confirmPassword"
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />
                    <div v-if = passwordInputNotMatch
                         class="absolute top-0 right-0 text-red-500 text-xs mt-1 mr-2">
                        Passwords mismatch
                    </div>
                </div>

                <button @click="register"
                        type="submit"
                        :disabled = "passwordInputNotMatch"
                        :class="[ passwordInputNotMatch ? 'bg-zinc-400': 'bg-green-400 hover:bg-green-dark']"
                        class="w-full text-center py-3 rounded text-white focus:outline-none my-1"
                >Create Account</button>

                <div class="text-center text-sm text-grey-dark mt-4">
                    By signing up, you agree to the
                    <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                        Terms of Service
                    </a> and
                    <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                        Privacy Policy
                    </a>
                </div>
            </div>

            <div class="text-grey-dark mt-6">
                Already have an account?
                <a class="no-underline border-b border-blue text-blue-600" href="../login/">
                    <router-link to="/login">
                        Log in
                    </router-link>
                </a>.
            </div>
        </div>
    </div>
</template>

<script setup>

    import { useLoginStore } from '../stores/login.ts'
    import {onMounted, computed, ref, reactive} from 'vue'
    import axios from 'axios'
    import { useNotification } from "@kyvg/vue3-notification";
    import { useRouter } from 'vue-router'

    const notification = useNotification()
    const loginStore = useLoginStore()
    const router = useRouter()

    const registerForm = reactive({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const passwordInputNotMatch = computed(() => {
        return registerForm.password.length !== 0
            && registerForm.confirmPassword.length !== 0
            && registerForm.password != registerForm.confirmPassword
    })

    function register() {
        axios.post("http://3.84.116.122:8088/user/register", {
            username: registerForm.username,
            email: registerForm.email,
            password: registerForm.password
        })
            .then(res => {
                if (res.data.code === '100') {
                    notification.notify({
                        title: "registered successfully",
                        type: 'success',
                    })

                    // Stores in pinia
                    loginStore.isLogin = true
                    loginStore.username = registerForm.username
                    loginStore.token = res.data.data

                    // stores in cookie
                    const date = new Date();
                    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000))
                    document.cookie = `username=${registerForm.username};expires=${date.toUTCString()};SameSite=Secure;path=/`
                    document.cookie = `token=${res.data.data};expires=${date.toUTCString()};SameSite=Secure;path=/`

                    // redirect
                    router.push('/')
                } else {
                    notification.notify({
                        title: res.data.desc,
                        type: 'fail',
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
</script>

<style scoped>

</style>

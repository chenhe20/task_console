<template>
    <div class="relative min-h-screen md:flex" data-dev-hint="container">
        <input type="checkbox" id="menu-open" class="hidden" />

        <label for="menu-open" class="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden" data-dev-hint="floating action button">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </label>

        <header class="bg-gray-600 text-gray-100 flex justify-between md:hidden" data-dev-hint="mobile menu bar">
            <a href="#" class="block p-4 text-white font-bold whitespace-nowrap truncate">
                task_mgt_console
            </a>

            <label for="menu-open" id="mobile-menu-button" class="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md">
                <svg id="menu-open-icon" class="h-6 w-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg id="menu-close-icon" class="h-6 w-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </label>
        </header>

        <aside id="sidebar" class="bg-gray-800 text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto" data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation">
            <div class="flex flex-col space-y-6" data-dev-hint="optional div for having an extra footer navigation">

                <nav data-dev-hint="main navigation">

                    <div class="flex ml-1 mr-1 mb-4 items-center space-x-2 py-2 px-4 rounded-md duration-300 cursor-pointer bg-gray-700 text-white">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input
                                type="text"
                                placeholder="Search"
                                class="text-[15px] w-full bg-transparent focus:outline-none"
                        />
                    </div>

                    <router-link to="/task" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white ">
                        <a >Task</a>
                    </router-link>

                    <router-link to="/excgRate" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                        <a >Exchange Rate</a>
                    </router-link>

                    <a @click="sideBarToggleBlog = !sideBarToggleBlog" class="flex relative items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                        <div >Blog</div>
                        <i v-if="!sideBarToggleBlog" class="fa-solid fa-angle-down absolute object-right right-3 w-6 h-6"></i>
                        <i v-else class="fa-solid fa-angle-up absolute object-right right-3 w-6 h-6"></i>
                    </a>

                    <Transition name="fade">
                    <div class="blogList" v-if="sideBarToggleBlog" >
                        <router-link  to="/blog-nogi" class="flex relative items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                            <img class="w-8 h-10" src="../assets/Nogizaka46_logo.png">
                            <a>Nogizaka 46</a>
                        </router-link>

                        <router-link to="/blog-saku" class="flex relative items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                            <img class="w-8 h-10" src="../assets/Sakurazaka46_logo.png">
                            <a >Sakurazaka 46</a>
                        </router-link>
                    </div>
                    </Transition>

                    <a class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                        <router-link to="/excgRate">Ticket</router-link>
                    </a>


                </nav>
            </div>

            <nav class="flex" data-dev-hint="second-main-navigation or footer navigation">
                <!--        <a class="text-left block py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">-->
                <!--         login in-->
                <!--        </a>-->
                <!--        <a href="#" class="block py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">-->
                <!--          asd-->
                <!--        </a>-->
                <!--        <a href="#" class="block py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">-->
                <!--          asd-->
                <!--        </a>-->
            </nav>
        </aside>

        <main id="content" class="flex-1 p-6 lg:px-8">
            <div class="max-w-7xl mx-auto">
                <!-- Replace with your content -->
                <div class="px-4 py-6 sm:px-0">
                    <router-view></router-view>
                </div>
                <!-- /End replace -->
            </div>
        </main>
    </div>

</template>

<script setup>

    import { ref } from 'vue'

    const sideBarToggleBlog = ref(false)
</script>

<style scoped>
    #sidebar {
        --tw-translate-x: -100%;
    }
    #menu-close-icon {
        display: none;
    }

    #menu-open:checked ~ #sidebar {
        --tw-translate-x: 0;
    }
    #menu-open:checked ~ * #mobile-menu-button {
        background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
    }
    #menu-open:checked ~ * #menu-open-icon {
        display: none;
    }
    #menu-open:checked ~ * #menu-close-icon {
        display: block;
    }

    @media (min-width: 768px) {
        #sidebar {
            --tw-translate-x: 0;
        }
    }


    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;}
</style>

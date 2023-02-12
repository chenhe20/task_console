<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full">
                        <thead class="border-b bg-gray-800">
                        <tr>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                                id
                            </th>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                                name
                            </th>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                                cron
                            </th>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                                status
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="border-b"  v-for="(task, index) in taskStore.tasks">
                            <td class="text-sm font-medium text-gray-900 px-6 py-4 text-left whitespace-nowrap">
                                {{task.id}}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 text-left whitespace-nowrap">
                                {{task.name}}
                            </td>
                            <td class="text-sm flex text-gray-900 font-light px-6 py-4 text-left whitespace-nowrap">
                                <div class="w-20 overflow-hidden">{{task.cron}}</div>
                                <button type="button" @click="clickEdit(index)"
                                        class="ml-4 px-4 py-2 bg-blue-600 items-center text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    edit
                                </button>

                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 text-right whitespace-nowrap">
                                <div class="h-8 w-20 flex items-center border border-grey-lighter rounded-full overflow-hidden cursor-pointer transition-bg"
                                     :class="task.stopStatus ? 'bg-white' : 'bg-green-400'"
                                      @click="switchStopStatus(index)">
                                    <span class="ml-5 mr-2 text-white "
                                          :class="{'hidden': task.stopStatus}">On
                                    </span>
                                    <div class = " h-8 w-8 flex justify-center items-center rounded-full shadow-lg bg-white">
                                        <i class="text-slate-800 fas fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <span class="ml-2 mr-5 text-grey "
                                          :class="{'hidden': !task.stopStatus}">Off
                                    </span>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Button trigger modal -->


    <!-- Modal -->
    <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog relative w-auto pointer-events-none">
            <div
                    class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div
                        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                        Edit
                    </h5>
                    <button type="button"
                            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body relative p-4">
                    <input v-model="edit.cron" type="text"
                            class="form-control  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  ease-in-out rounded transition block  w-full  px-3  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300"
                            id="exampleFormControlInput1"
                           />
                </div>
                <div
                        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                    <button type="button"
                            class="inline-block px-6 py-2.5 bg-zinc-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-500 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                            data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="submitEditCron()"
                            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                            data-bs-dismiss="modal">
                            Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
    import { useTaskStore } from '@/stores/task.ts'
    import { useNotification } from "@kyvg/vue3-notification";
    import { storeToRefs } from "pinia";
    import axios from 'axios'
    import {onMounted, computed, ref, reactive} from 'vue'

    const edit = reactive({
        index:0,
        cron:""
    })

    const notification = useNotification()
    const taskStore = useTaskStore()

    onMounted(() => {
        if (taskStore.tasks.length === 0) {
            taskStore.fetchAllTask()
        }
    })

    function switchStopStatus(index) {
        const stopStatus = taskStore.tasks.at(index).stopStatus

        if (stopStatus) {
            axios.post("http://3.84.116.122:8088/task-mgt/boot", {
                name: taskStore.tasks.at(index).name
            })
                .then(res => {

                    if (res.data.code === '100') {
                        notification.notify({
                            title: "service is on",
                            type: 'success',
                        });
                        taskStore.fetchAllTask()
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            axios.post("http://3.84.116.122:8088/task-mgt/shutdown", {
                name: taskStore.tasks.at(index).name
            })
                .then(res => {
                    if (res.data.code === '100') {
                        notification.notify({
                            title: "service is off",
                            type: 'warn',
                        });
                        taskStore.fetchAllTask()
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

        //taskStore.tasks.at(index).stopStatus = !status
    }
    function clickEdit(index) {edit.index = index}
    function submitEditCron() {
        axios.post("http://3.84.116.122:8088/task-mgt/update-cron", {
            name: taskStore.tasks.at(edit.index).name,
            cron: edit.cron
        })
            .then(res => {

                if (res.data.code === '100') {
                    notification.notify({
                        title: "cron update success",
                        type: 'success',
                    });
                    taskStore.fetchAllTask()
                }
                edit.cron = ""
            })
            .catch(error => {
                console.log(error);
            })
    }


</script>

<style scoped>
    .transition-bg {
        transition: background .4s ease;
    }
</style>

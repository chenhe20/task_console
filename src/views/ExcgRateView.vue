<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full">
                        <thead class="border-b bg-gray-800">
                        <tr>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                                Time
                            </th>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                                Buying Rate
                            </th>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                                Cash Buying Rate
                            </th>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                                Selling Rate
                            </th>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                                Cash Selling Rate
                            </th>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                                Currency
                            </th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr class="border-b"  v-for="(excgRate, index) in excgRateStore.excgRates">
                            <td class="text-sm font-medium text-gray-900 px-6 py-4 text-left whitespace-nowrap">
                                {{excgRate.createdTime}}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 text-left whitespace-nowrap">
                                {{excgRate.buyingRate}}
                            </td>
                            <td class="text-sm flex text-gray-900 font-light px-6 py-4 text-left whitespace-nowrap">
                                {{excgRate.cashBuyingRate}}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 text-left whitespace-nowrap">
                                {{excgRate.sellingRate}}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 text-left whitespace-nowrap">
                                {{excgRate.cashSellingRate}}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 text-left whitespace-nowrap">
                                {{excgRate.currencyName}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>cgRate

<script setup>
    import axios from 'axios'
    import { useExcgRateStore } from '@/stores/ExcgRate.ts'
    import {onMounted, computed, ref, reactive} from 'vue'

    const excgRateStore = useExcgRateStore()

    onMounted(() => {
        excgRateStore.fetchRecentExcgRate()
        // if (excgRateStore.excgRates.length === 0) {
        //     excgRateStore.fetchRecentExcgRate()
        // }
    })

</script>

<style scoped>

</style>

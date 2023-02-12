<template>
    <div class="columns-4">
        <a :href="item.postURL" class="w-1/4 p-4" v-for="item in nogizakaStore.blogs">
            <div class="shadow-2xl">
                <img :src="item.bgImageURL" class="w-full" />
                <div class="mt-4 flex" style="justify-content: space-between">
                    <p class="ml-2 text-pink-300 text-xs italic">{{ item.postTime }}</p>
                    <strong class="text-sm mr-2">{{ item.memberName }}</strong>
                </div>
                <div>
                    <div class="ml-2 mb-2 text-base text-left">{{ item.title }}</div>
                    <div class="ml-2 mr-2 pb-4 text-xs text-left font-light">{{  item.excerpt.slice(0, 40) + (item.excerpt.length > 40 ? '...' : '') }}</div>
                </div>
            </div>
        </a>
    </div>>
</template>

<script setup>

    import {useNogizakaStore} from '@/stores/nogizaka46.ts'
    import {onMounted, computed, ref, reactive} from 'vue'

    const nogizakaStore = useNogizakaStore()

    onMounted(() => {
        nogizakaStore.fetchRecentBlog()
    })

</script>

<style scoped>
    img {
        flex-grow: 1;
    }
</style>

<script setup>
import { useStore } from "vuex";

const store = useStore()
</script>

<template>
    <div class="bg-[#313338] col-span-2 p-4 flex gap-4 text-[#b8b9bf] border-b border-[#1e1f22]">
        <div class="flex items-center gap-2" v-if="store.state.channel">
            <i class="fa-solid fa-hashtag"></i>
            <h3 class="font-semibold text-white">{{ store.state.channel.name }}</h3>
        </div>
        <button class="text-lg ml-auto">
            <i class="fa-solid fa-bell"></i>
        </button>
        <button class="text-lg">
            <i class="fa-solid fa-thumbtack"></i>
        </button>
        <button class="text-lg">
            <i class="fa-solid fa-user"></i>
        </button>
        <div class="bg-[#1e1f22] px-2 flex items-center gap-2 rounded-lg text-sm">
            <input placeholder="Search" class="bg-transparent w-28 outline-none">
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <button class="text-lg">
            <i class="fa-solid fa-inbox"></i>
        </button>
        <button class="text-lg">
            <i class="fa-solid fa-circle-question"></i>
        </button>
    </div>
</template>
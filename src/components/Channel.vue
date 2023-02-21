<script setup>
import { getAuth, signOut } from "@firebase/auth";
import { collection, getFirestore, onSnapshot, orderBy, query } from "@firebase/firestore";
import { ref } from "vue";
import Modal from "./Modal.vue"
import { useStore } from "vuex";

const { displayName, photoURL } = getAuth().currentUser
const show = ref(false)
const muted = ref(false)
const open = ref(false)
const channels = ref([])
const store = useStore()

onSnapshot(
    query(
        collection(getFirestore(), "channels"),
        orderBy("name")
    ),
    snapshot => channels.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
)
</script>

<template>
    <div class="bg-[#2b2d31] flex flex-col">
        <div class="text-[#b8b9bf] p-4 grid gap-2">
            <div class="flex items-center justify-between">
                <button @click="show = ! show" class="flex items-center gap-2 hover:text-white">
                    <i class="fa-solid fa-angle-right transition" :class="{ 'rotate-90': show }"></i>
                    <h3 class="uppercase text-xs font-semibold transition">Text Channels</h3>
                </button>
                <button @click="open = true">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div v-show="show">
                <div v-for="channel in channels" @click="store.commit('change', channel)" :class="{ 'bg-[#404249]': channel == store.state.channel }" class="px-4 py-2 rounded-lg hover:text-white transition cursor-pointer">
                    <i class="fa-solid fa-hashtag"></i> {{ channel.name }}
                </div>
            </div>
        </div>
        <div class="bg-[#232428] p-4 flex items-center gap-4 mt-auto text-[#b8b9bf]">
            <div @click="signOut(getAuth())" class="relative">
                <img :src="photoURL" class="w-8 h-8 rounded-full object-cover">
                <div class="bg-[#23a55a] w-3 h-3 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-[#232428]"></div>
            </div>
            <div class="mr-auto min-w-0">
                <h3 class="text-white text-sm font-semibold truncate">{{ displayName }}</h3>
                <p class="text-xs">#1337</p>
            </div>
            <button @click="muted = ! muted">
                <i class="fa-solid fa-fw" :class="muted ? 'fa-microphone-slash' : 'fa-microphone'"></i>
            </button>
            <button>
                <i class="fa-solid fa-headphones fa-fw"></i>
            </button>
            <button>
                <i class="fa-solid fa-gear fa-fw"></i>
            </button>
        </div>
    </div>
    <modal v-show="open" @close="open = false"></modal>
</template>
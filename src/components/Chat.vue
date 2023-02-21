<script setup>
import { getAuth } from "@firebase/auth";
import { ref, watch } from "vue";
import Message from "./Message.vue"
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { useStore } from "vuex";

const { displayName, photoURL } = getAuth().currentUser
const messages = ref([])
const text = ref("")
const store = useStore()

let add = async e => {
    await addDoc(collection(getFirestore(), `channels/${store.state.channel.id}/messages`), {
        displayName,
        photoURL,
        text: text.value,
        timestamp: serverTimestamp()
    })

    text.value = ""
}

let unsubscribe

watch(() => store.state.channel, () => {
    if(unsubscribe) unsubscribe()

    messages.value = []

    unsubscribe = onSnapshot(
        query(
            collection(getFirestore(), `channels/${store.state.channel.id}/messages`),
            orderBy("timestamp")
        ),
        snapshot => messages.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    )
})
</script>

<template>
    <div class="bg-[#313338] flex flex-col overflow-auto">
        <div class="flex-1 p-4 flex flex-col gap-4 overflow-auto">
            <message v-for="message in messages" :key="message.id" :message="message"></message>
        </div>
        <div v-if="store.state.channel" class="bg-[#383a40] text-[#b8b9bf] p-4 m-4 rounded-xl flex items-center gap-4">
            <button>
                <i class="fa-solid fa-circle-plus text-lg"></i>
            </button>
            <form @submit.prevent="add" class="flex-1">
                <input v-model.trim="text" required :placeholder="`Send message to #${store.state.channel.name}`" class="w-full bg-transparent outline-none">
                <button hidden></button>
            </form>
            <button>
                <i class="fa-solid fa-gift text-lg"></i>
            </button>
            <button>
                <i class="fa-solid fa-image text-lg"></i>
            </button>
            <button>
                <i class="fa-solid fa-face-smile text-lg"></i>
            </button>
        </div>
    </div>
</template>
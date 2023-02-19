<script setup>
import { getAuth } from "@firebase/auth";
import { ref } from "vue";
import Message from "./Message.vue"
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";

const { displayName, photoURL } = getAuth().currentUser
const messages = ref([])
const text = ref("")

let add = async e => {
    await addDoc(collection(getFirestore(), "messages"), {
        displayName,
        photoURL,
        text: text.value,
        timestamp: serverTimestamp()
    })

    text.value = ""
}

onSnapshot(
    query(
        collection(getFirestore(), "messages"),
        orderBy("timestamp")
    ),
    snapshot => messages.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
)
</script>

<template>
    <div class="bg-[#313338] flex flex-col overflow-auto">
        <div class="flex-1 p-4 flex flex-col gap-4 overflow-auto">
            <message v-for="message in messages" :key="message.id" :message="message"></message>
        </div>
        <div class="bg-[#383a40] text-[#b8b9bf] p-4 m-4 rounded-xl flex items-center gap-4">
            <button>
                <i class="fa-solid fa-circle-plus text-lg"></i>
            </button>
            <form @submit.prevent="add" class="flex-1">
                <input v-model.trim="text" required placeholder="Send message to #Channel" class="w-full bg-transparent outline-none">
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
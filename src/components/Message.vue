<script setup>
import { deleteDoc, doc, getFirestore } from "@firebase/firestore";
import moment from "moment"

const props = defineProps(["message"])

let remove = e => {
    deleteDoc(doc(getFirestore(), `messages/${props.message.id}`))
}
</script>

<template>
    <div class="flex gap-4">
        <img @click="remove" :src="message.photoURL" class="w-10 h-10 rounded-full object-cover">
        <div>
            <div class="flex items-center gap-2">
                <h3 class="text-white font-semibold">{{ message.displayName }}</h3>
                <p class="text-sm text-[#b8b9bf]">{{ moment(message.timestamp?.toDate()).fromNow() }}</p>
            </div>
            <p class="text-white">{{ message.text }}</p>
        </div>
    </div>
</template>
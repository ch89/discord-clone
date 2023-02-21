<script setup>
import { getAuth } from "@firebase/auth";
import { addDoc, collection, getFirestore, serverTimestamp } from "@firebase/firestore";
import { ref } from "vue";

const emit = defineEmits(["close"])

const form = ref({
    category: "text",
    private: false
})
const loading = ref(false)
const { uid } = getAuth().currentUser

let add = async e => {
    loading.value = true
    
    await addDoc(collection(getFirestore(), "channels"), {
        ...form.value,
        uid,
        timestamp: serverTimestamp()
    })

    close()
}

let close = e => {
    form.value = {
        category: "text",
        private: false
    }
    loading.value = false
    emit("close")
}
</script>

<template>
    <Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
        <div class="bg-black/50 backdrop-blur-sm fixed inset-0 z-10 grid place-items-center transition">
            <form @submit.prevent="add" class="w-[460px] rounded-2xl overflow-hidden accent-white">
                <div class="bg-[#313338] text-[#b8b9bf] p-4 grid gap-4">
                    <header class="flex items-center justify-between">
                        <h3 class="text-white font-semibold">Create Channel</h3>
                        <button type="button" @click="close" class="hover:text-white transition">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </header>
                    <div class="grid gap-2">
                        <h3 class="uppercase text-xs font-bold">Channel Category</h3>
                        <label class="bg-[#43444b] p-4 rounded-lg flex items-center gap-2">
                            <i class="fa-solid fa-hashtag"></i>
                            <h3>Text</h3>
                            <input type="radio" class="ml-auto" value="text" v-model="form.category">
                        </label>
                        <label class="bg-[#2b2d31] p-4 rounded-lg flex items-center gap-2">
                            <i class="fa-solid fa-hashtag"></i>
                            <h3>Voice</h3>
                            <input type="radio" class="ml-auto" value="voice" v-model="form.category">
                        </label>
                    </div>
                    <div class="grid gap-2">
                        <h3 class="uppercase text-xs font-bold">Channel Name</h3>
                        <div class="bg-[#1e1f22] px-4 py-2 rounded-lg flex items-center gap-2">
                            <i class="fa-solid fa-hashtag"></i>
                            <input v-model.trim="form.name" required placeholder="New Channel" class="flex-1 bg-transparent outline-none">
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-lock"></i>
                        <h3 class="text-white">Private Channel</h3>
                        <label class="bg-[#82858f] w-8 flex p-1 rounded-full box-content cursor-pointer ml-auto transition">
                            <input type="checkbox" v-model="form.private" class="appearance-none w-4 h-4 rounded-full bg-white checked:translate-x-full transition cursor-pointer">
                        </label>
                    </div>
                </div>
                <div class="bg-[#2b2d31] p-4 text-white text-sm font-semibold flex gap-4 justify-end">
                    <button type="button" @click="close" class="px-4 py-2 rounded-lg hover:underline">Cancel</button>
                    <button type="submit" :disabled="loading" :class="{ loading }" class="bg-[#5865f2] px-4 py-2 rounded-lg">Create</button>
                </div>
            </form>
        </div>
    </Transition>
</template>

<style scoped>
label:has([type="checkbox"]:checked) {
    @apply bg-[#23a55a]
}

form:has(:invalid) [type="submit"] {
    @apply opacity-50 cursor-not-allowed;
}

.loading {
    @apply text-transparent cursor-not-allowed grid place-items-center after:absolute after:w-4 after:h-4 after:border-2 after:border-white after:rounded-full after:border-r-transparent after:border-t-transparent after:animate-spin;
}
</style>
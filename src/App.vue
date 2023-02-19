<script setup>
import Sidebar from './components/Sidebar.vue';
import Server from './components/Server.vue';
import Channel from './components/Channel.vue';
import Navbar from './components/Navbar.vue';
import Chat from './components/Chat.vue';
import Participants from './components/Participants.vue';
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const user = ref(null)

let login = e => signInWithPopup(getAuth(), new GoogleAuthProvider)

onAuthStateChanged(getAuth(), u => user.value = u)
</script>

<template>
  <main v-if="user" class="grid h-screen grid-cols-[auto_1fr_4fr_1fr] grid-rows-[auto_1fr]">
    <sidebar></sidebar>
    <server></server>
    <navbar></navbar>
    <channel></channel>
    <chat></chat>
    <participants></participants>
  </main>
  <div v-else class="grid place-items-center h-screen">
    <img src="/images/logo.png" class="w-96">
    <button @click="login" class="bg-[#5865f2] text-white px-4 py-2 rounded-lg text-sm font-semibold">Login</button>
  </div>
</template>
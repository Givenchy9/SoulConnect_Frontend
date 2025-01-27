<template>
    <div>
      <!-- Floating Button -->
      <button
        class="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        @click="toggleChat"
      >
        <i class="fa-solid fa-bell fa-xl"></i>
      </button>
  
      <!-- Chat Panel -->
      <div
        v-if="isChatVisible"
        class="fixed bottom-20 right-4 w-80 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col"
      >
        <!-- Chat Header -->
        <div class="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
          <h3 class="text-lg font-semibold">Chat met Beheerder</h3>
          <button @click="toggleChat" class="text-white text-xl">&times;</button>
        </div>
  
        <!-- Chat Messages -->
        <div class="flex-1 p-4 overflow-y-auto">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="mb-2"
            :class="message.sender === 'user' ? 'text-right' : 'text-left'"
          >
            <span
              :class="message.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'"
              class="inline-block px-3 py-2 rounded-lg"
            >
              {{ message.text }}
            </span>
          </div>
        </div>
  
        <!-- Chat Input -->
        <div class="p-3 border-t border-gray-300">
          <form @submit.prevent="sendMessage">
            <input
              type="text"
              v-model="newMessage"
              placeholder="Typ een bericht..."
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isChatVisible: false,
        messages: [
          { sender: "admin", text: "Hallo! Hoe kan ik je helpen?" },
        ],
        newMessage: "",
      };
    },
    methods: {
      toggleChat() {
        this.isChatVisible = !this.isChatVisible;
      },
      sendMessage() {
        if (this.newMessage.trim() !== "") {
          this.messages.push({ sender: "user", text: this.newMessage });
          this.newMessage = "";
  
          setTimeout(() => {
            this.messages.push({
              sender: "admin",
              text: "Dank je! Ik kijk er meteen naar.",
            });
          }, 1000);
        }
      },
    },
  };
  </script>
  
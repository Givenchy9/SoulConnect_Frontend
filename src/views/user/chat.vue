<template>
  <div class="flex flex-col h-screen">
    <!-- DESKTOP -->
    <div class="hidden md:flex h-full">
      <!-- Zijbalk met gebruikers -->
      <div class="w-1/4 p-4 bg-gray-200">
        <ul>
          <li
            v-for="user in users"
            :key="user.id"
            class="mb-4 flex items-center cursor-pointer"
            @click="selectUser(user)"
            :class="{
              'bg-gray-300': selectedUser && selectedUser.id === user.id
            }"
          >
            <img :src="user.avatar" alt="" class="w-10 h-10 rounded-full mr-2" />
            <span>{{ user.name }}</span>
          </li>
        </ul>
      </div>

      <!-- Chatgedeelte -->
      <div class="w-3/4 bg-gray-100 flex flex-col">
        <!-- Header met usernaam (of selecteer-melding) -->
        <div class="p-4">
          <div v-if="selectedUser" class="flex flex-row justify-between items-center">
            <strong>{{ selectedUser.name }}</strong>
            <img :src="selectedUser.avatar" alt="" class="w-10 h-10 rounded-full" />
          </div>
          <div v-else class="flex flex-row justify-center items-center">
            <strong>Selecteer een gebruiker om te chatten</strong>
          </div>
        </div>

        <!-- Scrollbare lijst met berichten -->
        <div class="flex-grow overflow-y-auto p-4">
          <ul>
            <li
              v-for="message in filteredMessages"
              :key="message.id"
              class="mb-4"
              :class="{
                'text-right': message.sender.id === currentUser.id,
                'text-left': message.sender.id !== currentUser.id
              }"
            >
              <div
                class="flex items-center"
                :class="{'justify-end': message.sender.id === currentUser.id}"
              >
                <img
                  :src="message.sender.avatar"
                  alt=""
                  class="w-8 h-8 rounded-full"
                  :class="{
                    'ml-2': message.sender.id === currentUser.id,
                    'mr-2': message.sender.id !== currentUser.id
                  }"
                />
                <div class="max-w-md bg-white p-3 rounded-lg shadow-md">
                  <p>
                    <strong>{{ message.sender.name }}</strong>:
                    {{ message.text }}
                  </p>
                  <p class="text-xs text-gray-500">{{ message.time }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Invoerveld (sticky onderaan) -->
        <div
          v-if="selectedUser"
          class="sticky bottom-0 bg-white p-4 shadow-md flex"
        >
          <input
            type="text"
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Type je bericht..."
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="sendMessage"
            class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Verstuur
          </button>
        </div>
      </div>
    </div>

    <!-- MOBIEL -->
    <div class="md:hidden flex-grow">
      <!-- Lijst met gebruikers (indien GEEN user gekozen) -->
      <div v-if="!selectedUser" class="p-4 bg-gray-200 h-full">
        <ul>
          <li
            v-for="user in users"
            :key="user.id"
            class="mb-4 flex items-center cursor-pointer bg-white p-2 rounded"
            @click="selectUser(user)"
            :class="{
              'bg-gray-300': selectedUser && selectedUser.id === user.id
            }"
          >
            <img :src="user.avatar" alt="" class="w-10 h-10 rounded-full mr-2" />
            <span>{{ user.name }}</span>
          </li>
        </ul>
      </div>

      <!-- Chatweergave (indien user WEL gekozen) -->
      <div v-else class="bg-gray-100 h-full flex flex-col">
        <!-- Terugknop -->
        <div class="p-4 flex justify-between items-center">
          <button
            @click="goBack"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
          <i class="fa-solid fa-arrow-left"></i>
          </button>
          <!-- Gekozen user-naam + avatar -->
          <div class="flex items-center">
            <strong class="mr-3">{{ selectedUser.name }}</strong>
            <img :src="selectedUser.avatar" alt="" class="w-10 h-10 rounded-full" />
          </div>
        </div>

        <!-- Scrollbare berichtenlijst -->
        <div class="flex-grow overflow-y-auto p-4">
          <ul>
            <li
              v-for="message in filteredMessages"
              :key="message.id"
              class="mb-4"
              :class="{
                'text-right': message.sender.id === currentUser.id,
                'text-left': message.sender.id !== currentUser.id
              }"
            >
              <div
                class="flex items-center"
                :class="{'justify-end': message.sender.id === currentUser.id}"
              >
                <img
                  :src="message.sender.avatar"
                  alt=""
                  class="w-8 h-8 rounded-full"
                  :class="{
                    'ml-2': message.sender.id === currentUser.id,
                    'mr-2': message.sender.id !== currentUser.id
                  }"
                />
                <div class="max-w-md bg-white p-3 rounded-lg shadow-md">
                  <p>
                    <strong>{{ message.sender.name }}</strong>:
                    {{ message.text }}
                  </p>
                  <p class="text-xs text-gray-500">{{ message.time }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Invoerveld (sticky onderaan) -->
        <div
          class="sticky bottom-0 bg-white p-4 shadow-md flex"
        >
          <input
            type="text"
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Type je bericht..."
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="sendMessage"
            class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Verstuur
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: {
        id: 1,
        name: 'Alice',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      selectedUser: null,
      users: [
        { id: 2, name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 3, name: 'Charlie', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, name: 'Diana', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
      ],
      messages: [
        // Enkele voorbeeldberichten
        {
          id: 1,
          sender: { id: 2, name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
          receiver: { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
          text: 'Hallo Alice!',
          time: '14:30'
        },
        {
          id: 2,
          sender: { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
          receiver: { id: 2, name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
          text: 'Hoi Bob!',
          time: '14:32'
        },
        {
          id: 3,
          sender: { id: 3, name: 'Charlie', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
          receiver: { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
          text: 'Goedemiddag Alice!',
          time: '14:35'
        },
        {
          id: 4,
          sender: { id: 4, name: 'Diana', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
          receiver: { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
          text: 'Hey Alice!',
          time: '14:37'
        },
      ],
      newMessage: '',
    };
  },
  computed: {
    filteredMessages() {
      if (!this.selectedUser) return [];
      return this.messages
        .filter(
          (msg) =>
            (msg.sender.id === this.currentUser.id && msg.receiver.id === this.selectedUser.id) ||
            (msg.sender.id === this.selectedUser.id && msg.receiver.id === this.currentUser.id)
        )
        .sort((a, b) => {
          const [aHour, aMinute] = a.time.split(':').map(Number);
          const [bHour, bMinute] = b.time.split(':').map(Number);
          return aHour * 60 + aMinute - (bHour * 60 + bMinute);
        });
    },
  },
  methods: {
    selectUser(user) {
      this.selectedUser = user;
    },
    goBack() {
      this.selectedUser = null;
    },
    sendMessage() {
      if (this.newMessage.trim() === '' || !this.selectedUser) return;

      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const time = `${hours}:${minutes}`;

      this.messages.push({
        id: this.messages.length + 1,
        sender: this.currentUser,
        receiver: this.selectedUser,
        text: this.newMessage,
        time
      });

      this.newMessage = '';
    },
  },
};
</script>

<style>
@import 'tailwindcss/tailwind.css';

/* Optioneel extra styles */
</style>

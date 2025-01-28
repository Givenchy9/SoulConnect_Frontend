<template>
  <div class="flex flex-col" style="height: 87.7vh;">
    <!-- DESKTOP -->
    <div class="hidden md:flex h-full">
      <!-- Sidebar with chat rooms -->
      <div class="w-1/4 p-4 bg-gray-200">
        <ul>
          <li
            v-for="room in chatRooms"
            :key="room.id"
            class="mb-4 flex items-center cursor-pointer"
            @click="selectChatRoom(room)"
            :class="{ 'bg-gray-300': selectedChatRoom && selectedChatRoom.id === room.id }"
          >
            <img
              :src="getOtherUserProfileImage(room)"
              alt="User Image"
              class="w-10 h-10 rounded-full mr-4"
            />
            <span class="font-bold">
              Chat Room with {{ getOtherUserNickname(room) }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Chat Section -->
      <div class="w-3/4 bg-gray-100 flex flex-col">
        <!-- Header -->
        <div class="p-4 border-b">
          <div v-if="selectedChatRoom">
            <strong>Chat Room with {{ getOtherUserNickname(selectedChatRoom) }}</strong>
          </div>
          <div v-else>
            <strong>Select a chat room to start chatting</strong>
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-grow overflow-y-auto p-4">
          <ul>
            <li
              v-for="message in messages"
              :key="message.id"
              class="mb-4 flex"
              :class="{
                'justify-end': message.user_id === user.id,
                'justify-start': message.user_id !== user.id
              }"
            >
              <div
                class="max-w-md p-3 rounded-lg shadow-md"
                :class="{
                  'bg-green-100 text-right': message.user_id === user.id,
                  'bg-blue-100 text-left': message.user_id !== user.id
                }"
              >
                <p>
                  <strong>{{ message.user.nickname }}</strong>: {{ message.message }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatTime(message.created_at) }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Input -->
        <div v-if="selectedChatRoom" class="p-4 border-t flex">
          <input
            type="text"
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Type your message..."
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="sendMessage"
            class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null, // Authenticated user data
      token: null, // Authentication token
      chatRooms: [], // List of chat rooms
      selectedChatRoom: null, // Currently selected chat room
      messages: [], // Messages in the selected chat room
      newMessage: "", // New message input
    };
  },
  methods: {
    // Fetch the chat rooms for the logged-in user
    async fetchChatRooms() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/chat-rooms", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.chatRooms = response.data; // Populate the chat rooms list

        // Check if a specific roomId was passed as a query parameter
        const roomId = this.$route.query.roomId;
        if (roomId) {
          // Find the chat room with the given roomId
          const activeRoom = this.chatRooms.find((room) => room.id === roomId);
          if (activeRoom) {
            this.selectChatRoom(activeRoom); // Set the active chat room and fetch messages
          }
        }
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    },

    // Fetch messages for the selected chat room
    async fetchMessages() {
      if (!this.selectedChatRoom) return;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/chat-rooms/${this.selectedChatRoom.id}/user-chats`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.messages = response.data; // Populate messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },

    // Send a new message in the selected chat room
    async sendMessage() {
      if (!this.newMessage.trim() || !this.selectedChatRoom) return;
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/chat-rooms/${this.selectedChatRoom.id}/user-chats`,
          { message: this.newMessage.trim() },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.newMessage = ""; // Clear the input
        this.messages.push(response.data); // Add the new message to the list
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },

    // Select a chat room and fetch its messages
    selectChatRoom(room) {
      this.selectedChatRoom = room; // Set the selected chat room
      this.fetchMessages(); // Fetch messages for the selected room
      setInterval(this.fetchMessages, 2000); // Poll for new messages every 2 seconds
    },

    // Helper to format the display name of the other user in the chat room
    getOtherUserNickname(room) {
      return room.user_1_id === this.user.id
        ? room.user2.nickname
        : room.user1.nickname;
    },

    // Helper to get the profile image of the other user in the chat room
    getOtherUserProfileImage(room) {
      return room.user_1_id === this.user.id
        ? room.user2.profile_image
        : room.user1.profile_image;
    },

    // Helper to format timestamps
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
    },
  },
  created() {
    // Retrieve user and token from localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      console.error("User is not logged in. Redirecting to login...");
      this.$router.push("/login"); // Redirect to login if not logged in
      return;
    }

    // Parse and store user and token in the component's state
    this.user = JSON.parse(storedUser);
    this.token = storedToken;

    console.log("Logged in as:", this.user);

    // Fetch chat rooms and handle the active room logic
    this.fetchChatRooms();
  },
};
</script>




<style>
@import 'tailwindcss/tailwind.css';

/* Optioneel extra styles */
</style>

<template>
  <div class="matches">
    <p class="relative text-center item center font-bold text-3xl">Your Matches</p>
    <div class="kaarten overflow-auto">
      <div class="kaarten2 grid grid-cols-6 grid-rows-3 gap-4">
        <div v-for="(user, index) in matches" :key="user.id">
          <div class="flex-shrink-0 w-56 border hover:bg-white shadow-md rounded-lg overflow-hidden transform transition duration-700 hover:scale-105">
            <!-- Front of the Card -->
            <img
              :src="user.profile_image || 'https://via.placeholder.com/300x200'"
              alt="Foto van {{ user.nickname }}"
              class="h-40 w-40 mt-4 rounded-3xl m-auto object-cover"
            />
            <div class="p-4">
              <h3 class="text-xl text-center font-semibold">{{ user.nickname }}</h3>
              <p class="text-gray-600 text-center mt-2">{{ user.gender || 'Unknown Gender' }}</p>
              <div class="mt-4 grid grid-cols-2 gap-2">
                <button
                  class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  @click="createChatRoom(user.id)"
                >
                  Chat <i class="fa-solid fa-comments"></i>
                </button>
                <button
                  class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                  @click="reportUser(user.id)"
                >
                  Report <i class="fa-solid fa-flag"></i>
                </button>
              </div>
              <button
              class="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              @click="viewUserProfile(user.id)"
            >
              View Profile <i class="fa-solid fa-circle-info"></i>
            </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Reactive properties
const matches = ref([]);
const token = localStorage.getItem('token') || '';
const user2 = localStorage.getItem('user') || '';
if (user2) {
  try {
    const userObject = JSON.parse(user2); // Parse the JSON string to an object
    console.log(userObject.id); // Access the 'id' field
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
  }
} else {
  console.log('No user found in localStorage.');
}

// Fetch matches from the backend
const fetchMatches = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/my-matches', {
      headers: { Authorization: `Bearer ${token}` },
    });
    matches.value = response.data.matches;
  } catch (error) {
    console.error('Failed to fetch matches:', error);
  }
};

// View user profile
const viewUserProfile = (matchId) => {
  router.push({ path: '/info', query: { matchId } });
  localStorage.setItem('matchId', matchId);

};
const router = useRouter();
// Create a chat room
const createChatRoom = async (matchId) => {
  const userObject = JSON.parse(user2);
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/chat-rooms',
      { user_2_id: matchId, user_1_id: userObject.id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const chatRoomId = response.data.id; // Assuming the response contains the new chat room ID
    console.log('Chat Room Created:', chatRoomId);

    // Redirect to the chat page and pass the chat room ID as a query parameter
    router.push({ path: '/chat', query: { roomId: chatRoomId } });
  } catch (error) {
    console.error('Failed to create chat room:', error);
  }
};

// Report a user
const reportUser = async (userId) => {
  try {
    await axios.post(
      'http://127.0.0.1:8000/api/report',
      { user_id: userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert('User reported successfully.');
  } catch (error) {
    console.error('Failed to report user:', error);
  }
};

// Fetch matches on component mount
onMounted(fetchMatches);
</script>

<style>
@media (max-width: 800px) {
  .matches {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    height: auto;
  }
  .kaarten2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
  }
}

.kaarten {
  height: auto;
}

.kaarten2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}
</style>

<style>
@media (max-width: 800px) {
  .matches {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    height: 28vh;
  }
  .matches2 {
    grid-column: span 1 / span 1;
    margin: 0;
    margin-top: 10px;
    height: 20vh;
  }
  .kaarten {
    grid-column: span 2 / span 2;
    height: 20vh;
  }
  .kaarten2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    margin-left: 80px;
  }
}
.filter {
  height: 84.5vh;
}
.filter2 {
  height: 82vh;
}
.kaarten {
  height: 79.5vh;
}
</style>

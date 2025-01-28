<template>
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
              @click="openReportModal(user.id)"
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

  <!-- Report Modal -->
  <div v-if="showReportModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Report User</h2>
      <textarea v-model="reportReason" class="w-full p-2 border rounded" placeholder="Enter the reason for reporting"></textarea>
      <div class="mt-4 flex justify-end">
        <button class="bg-gray-500 text-white py-2 px-4 rounded mr-2" @click="closeReportModal">Cancel</button>
        <button class="bg-red-500 text-white py-2 px-4 rounded" @click="submitReport">Submit</button>
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
let userId = '';

const showReportModal = ref(false);
const reportReason = ref('');
let reportedUserId = '';

if (user2) {
  try {
    const userObject = JSON.parse(user2); // Parse the JSON string to an object
    userId = userObject.id; // Access the 'id' field
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

// Open report modal
const openReportModal = (userId) => {
  reportedUserId = userId;
  showReportModal.value = true;
};

// Close report modal
const closeReportModal = () => {
  showReportModal.value = false;
  reportReason.value = '';
};

// Submit report
const submitReport = async () => {
  if (!reportReason.value) {
    alert('Please enter a reason for reporting.');
    return;
  }

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/report',
      {
        user_id: userId,
        reported_user_id: reportedUserId,
        reason: reportReason.value,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('Report successful:', response.data);
    closeReportModal();
  } catch (error) {
    console.error('Failed to report user:', error);
  }
};

// View user profile
const viewUserProfile = (userId) => {
  const router = useRouter();
  router.push(`/user/profile/${userId}`);
};

// Create chat room
const createChatRoom = (userId) => {
  const router = useRouter();
  router.push(`/chat/${userId}`);
};

onMounted(() => {
  fetchMatches();
});
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

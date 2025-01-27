<template>
  <div class="matches bg-gradient-to-b from-kleur to-pink-500">
    <p class="relative text-center font-bold text-3xl">Your Likes</p>
    <div class="kaarten overflow-auto">
      <div class="kaarten2 grid grid-cols-6 grid-rows-3 p-2 gap-4">
        <!-- Loop through all liked users -->
        <div v-for="(user, index) in likedUsers" :key="user.id">
          <!-- Card -->
          <div
            class="flex-shrink-0 w-56 border hover:bg-white shadow-md rounded-lg overflow-hidden transform transition duration-700"
            :class="{'rotate-y-180': flippedCards[user.id]}"
            style="min-height: 330px;"
          >
            <!-- Front of the Card -->
            <div v-if="!flippedCards[user.id]" class="front">
              <img
                :src="user.profile_image || 'https://via.placeholder.com/300x200'"
                alt="Foto van {{ user.nickname }}"
                class="h-40 w-40 mt-4 rounded-3xl m-auto object-cover"
              />
              <div class="p-4">
                <h3 class="text-xl text-center font-semibold">{{ user.nickname }}</h3>
                <p class="text-gray-600 text-center mt-2">{{ user.gender || 'Unknown Gender' }}</p>
                <div class="mt-4 grid grid-cols-4 gap-2">
                  <button
                    class="col-span-3 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-500 transition"
                    @click="dislikeUser(user.id)"
                  >
                    Dislike <i class="fa-solid fa-trash"></i>
                  </button>
                  <button
                    class="col-span-1 bg-koranje text-white py-2 px-4 rounded hover:bg-doranje transition"
                    @click="toggleCard(user.id)"
                  >
                    <i class="fa-solid fa-right-to-bracket"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Back of the Card -->
            <div v-else class="back bg-gray-200 text-center font-light italic text-gray-700 p-4" style="min-height: inherit;display: flex;flex-direction: column;justify-content: space-between;">
              <p v-if="user.bio">"{{ user.bio }}"</p>
              <p v-else>No additional details available.</p>
              <div class="mt-4">
                <button
                  class="bg-koranje text-white py-2 px-4 rounded hover:bg-doranje transition"
                  @click="toggleCard(user.id)"
                >
                  Back <i class="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

---

### Script

```javascript
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Token for API authentication
const token = localStorage.getItem('token') || '';

// Reactive properties
const likedUsers = ref([]); // List of liked users
const flippedCards = ref({}); // Tracks the flipped state of each card

// Fetch liked users from the API
const fetchLikedUsers = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/likes/i-liked', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Assuming API response contains 'users_i_liked' array
    likedUsers.value = response.data.users_i_liked.map((user) => ({
      id: user.id,
      nickname: user.nickname,
      gender: user.gender,
      profile_image: user.profile_image || null, // Optional profile image
      bio: user.bio || null, // Optional bio
    }));

    // Initialize flippedCards for each user
    likedUsers.value.forEach((user) => {
      flippedCards.value[user.id] = false;
    });
  } catch (error) {
    console.error('Failed to fetch liked users:', error);
  }
};

// Function to remove a like (dislike a user)
const dislikeUser = async (userId) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/likes/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Update the UI by filtering out the disliked user
    likedUsers.value = likedUsers.value.filter((user) => user.id !== userId);
    delete flippedCards.value[userId]; // Remove flipped state for this card
  } catch (error) {
    console.error('Failed to dislike user:', error);
  }
};

// Function to toggle card flipping
const toggleCard = (userId) => {
  flippedCards.value[userId] = !flippedCards.value[userId];
};

// Fetch liked users when the component is mounted
onMounted(fetchLikedUsers);
</script>
<style>
.matches {
  perspective: 1000px; /* Enables 3D effect */
}

.card-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d; /* Ensures 3D flipping */
  transition: transform 0.7s ease-in-out; /* Smooth flip transition */
}

.card.flipped {
  transform: rotateY(180deg); /* Flip the card */
}

.card .front,
.card .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* Hide the back when flipping */
  top: 0;
  left: 0;
}

.card .back {
  transform: rotateY(180deg); /* Rotate back face so it's hidden initially */
}
</style>

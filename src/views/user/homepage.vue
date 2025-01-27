<template>
  <div class="grid grid-cols-5 grid-rows-1 gap-4 m-auto mt-4 dashboard">
    <!-- Left Section: Matches -->
    <div class="grid grid-rows-10 col-span-3">
      <h2 class="row-span-1 text-2xl font-bold mb-6">Jouw top matches</h2>

      <!-- Matches (Horizontal Scroll) -->
      <div
        class="row-span-6 border flex space-x-4 py-4 overflow-x-auto no-scrollbar shadow-xs rounded-xl transition-all duration-500"
      >
        <div
          v-for="(user, index) in topMatches"
          :key="user.id"
          class="relative flex-shrink-0 w-72 bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-90"
        >
          <!-- Ranking badge -->
          <div class="absolute top-2 left-2 bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded-full">
            {{ index + 1 }}
          </div>

          <!-- Profile Image -->
          <img
            :src="user.profile_image || 'https://via.placeholder.com/300x200'"
            alt="Foto van {{ user.nickname }}"
            class="w-full h-40 object-cover"
          />

          <!-- Card Content -->
          <div class="p-4">
            <h3 class="text-xl font-semibold">{{ user.nickname }}</h3>
            <p class="text-gray-600 mt-2">{{ user.oneliner }}</p>

            <div class="mt-4 flex space-x-3">
              <button
                class="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                @click="dislikeMatch(index)"
              >
                Dislike
              </button>
              <button
                class="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                @click="likeMatch(index)"
              >
                Like
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Extra UI Placeholder -->
      <div class="grid grid-cols-2 border row-span-4 shadow-xs m-1 mt-2 rounded-xl transition-all duration-500">
        <div>
          <button
            class="flex items-center justify-center h-full w-full rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-blue-600"
          >
            <i class="fa-solid fa-comment-dots fa-2xl"></i>
          </button>
        </div>
        <div>
          <RouterLink
            to="/likes"
            class="flex text-3xl items-center justify-center h-full w-full rounded-md bg-kleur px-3 py-1.5 font-semibold leading-6 text-white shadow-xl hover:bg-kleur2"
          >
            Your likes <i class="fa-regular fa-thumbs-up ml-2"></i>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Right Section: "Who Liked Me" -->
    <div class="col-span-2 border border-gray-300 m-1 mt-2 p-1 rounded-xl transition-all duration-500 w-full">
      <!-- If no one liked me -->
      <div v-if="usersWhoLikedMe.length === 0" class="h-full flex items-center justify-center">
        <p class="text-lg text-gray-600">Nog niemand heeft je geliked!</p>
      </div>

      <!-- Show the current "who liked me" user -->
      <div
        v-else
        class="relative w-full max-w-md m-auto suge bg-white rounded-lg overflow-hidden"
      >
        <!-- Profile Photo -->
        <div class="bg-gray-200 h-64 w-full flex items-center justify-center">
          <img
            :src="currentUser.profile_image || 'https://via.placeholder.com/300x200'"
            alt="Foto van {{ currentUser.nickname }}"
            class="h-full object-cover"
          />
        </div>

        <!-- Card Content -->
        <div class="p-4">
          <p class="font-semibold text-xl text-center">
            {{ currentUser.nickname }}
          </p>
          <p class="text-blue-600 text-center">
            {{ currentUser.oneliner }}
          </p>
        </div>

        <!-- Buttons for Like/Dislike -->
        <div class="flex justify-center space-x-4 p-4">
          <button
            class="flex-1 h-44 bg-red-500 text-white py-20 px-4 rounded hover:bg-red-600 transition"
            @click="dislikeAndNext"
          >
            <i class="fa-solid fa-thumbs-down fa-2xl"></i>
          </button>
          <button
            class="flex-1 h-44 bg-green-500 text-white py-20 px-4 rounded hover:bg-green-600 transition"
            @click="likeAndNext"
          >
            <i class="fa-solid fa-thumbs-up fa-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Base URL and token setup
const BASE_URL = 'http://127.0.0.1:8000/api'
const token = localStorage.getItem('token') || ''

// Reactive state variables
const topMatches = ref([])          // Left section: Matches
const usersWhoLikedMe = ref([])     // Right section: "Who Liked Me"
const currentIndex = ref(0)         // Index for cycling through "Who Liked Me"

// Computed property: The current user in "Who Liked Me"
const currentUser = computed(() => {
  return usersWhoLikedMe.value[currentIndex.value] || {}
})

// Fetch matches (left section)
async function fetchTopMatches() {
  try {
    const response = await axios.get(`${BASE_URL}/matches`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    topMatches.value = response.data.slice(0, 5) // Only take the first 5
  } catch (error) {
    console.error('Error fetching matches:', error)
  }
}

// Fetch "Who Liked Me" (right section)
async function fetchWhoLikedMe() {
  try {
    const response = await axios.get(`${BASE_URL}/likes/who-liked-me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    usersWhoLikedMe.value = response.data.users_who_liked_me || []
  } catch (error) {
    console.error('Error fetching who liked me:', error)
  }
}

// Like or dislike a match (left section)
function likeMatch(index) {
  console.log('Liked match:', topMatches.value[index].nickname)
  topMatches.value.splice(index, 1)
}
function dislikeMatch(index) {
  console.log('Disliked match:', topMatches.value[index].nickname)
  topMatches.value.splice(index, 1)
}

// Like or dislike "Who Liked Me" user (right section)
function likeAndNext() {
  console.log('Liked user:', currentUser.value.nickname)
  moveToNext()
}
function dislikeAndNext() {
  console.log('Disliked user:', currentUser.value.nickname)
  moveToNext()
}

// Move to the next "Who Liked Me" user
function moveToNext() {
  if (usersWhoLikedMe.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % usersWhoLikedMe.value.length
}

// Lifecycle hook to fetch data
onMounted(() => {
  fetchTopMatches()
  fetchWhoLikedMe()
})
</script>

<style scoped>
.dashboard {
  width: 1300px;
  height: 80vh;
}

.suge {
  width: 55vh;
  height: 77vh;
}

.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}
.no-scrollbar::-webkit-scrollbar {
  display: none;             /* Chrome, Safari, Opera */
}
</style>

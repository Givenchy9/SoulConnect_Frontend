<template>
    <div class="matches grid grid-cols-5">
      <!-- Sidebar Filter/Search -->
      <div class="col-span-1">
        <div class="matches2 grid grid-rows-4 h-80 bg-kleur rounded-xl m-2">
          <div class="m-auto row-span-1">
            <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-1 shadow-md">
              <i class="fa-solid fa-magnifying-glass text-gray-500"></i>
              <!-- Bind the search input to the reactive property `searchQuery` -->
              <input
                v-model="searchQuery"
                type="text"
                class="rounded-xl px-2 py-1 outline-none flex-grow"
                placeholder="Zoeken op naam..."
              />
            </div>
          </div>
  
          <!-- Filter by Gender -->
          <div class="row-span-1 px-2">
            <label for="subjectFilter" class="text-black">Filter op Geslacht:</label>
            <select
              id="subjectFilter"
              v-model="subjectFilter"
              class="w-full p-2 mt-2 bg-gray-200 rounded-md"
            >
              <option value="">- Alle Genders -</option>
              <option value="Man">Man</option>
              <option value="Vrouw">Vrouw</option>
            </select>
          </div>
  
          <!-- (Optional) Filter by Relationship Type -->
          <div class="row-span-1 px-2">
            <label for="relationshipFilter" class="text-black">Filter op Relatietype:</label>
            <select
              id="relationshipFilter"
              v-model="relationshipFilter"
              class="w-full p-2 mt-2 bg-gray-200 rounded-md"
            >
              <option value="">- Alle Types -</option>
              <option value="Casual">Casual</option>
              <option value="Serious">Serious</option>
              <!-- etc. Add any extra relationship types you have in your DB -->
            </select>
          </div>
        </div>
      </div>
  
      <!-- Cards Display -->
      <div class="kaarten col-span-4 overflow-auto bg-white">
        <div class="kaarten2 grid grid-cols-5 grid-rows-3 p-2 gap-4">
          <!-- First Face of the Card -->
          <div
            v-for="(user, index) in filteredUsers"
            :key="user.id || index"
            :style="{ display: Div ? 'inline-block' : 'none' }"
            class="flex-shrink-0 w-56 hover:rotate-6 hover:bg-kleur shadow-md rounded-lg overflow-hidden transform transition duration-700 hover:scale-105"
          >
            <img
              :src="user.profileImage || 'https://via.placeholder.com/300x200'"
              :alt="'Foto van ' + user.name"
              class="h-40 w-40 mt-4 rounded-3xl m-auto object-cover"
            />
  
            <!-- Card Content -->
            <div class="p-4">
              <h3 class="text-xl text-center font-semibold">{{ user.name }}</h3>
              <!-- <p class="text-gray-600 mt-2">{{ user.oneLiner }}</p> -->
  
              <div class="mt-4 grid grid-cols-4 gap-2">
                <button
                  class="col-span-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                  @click="likeUser(user)"
                >
                  Like
                </button>
                <button
                  class="col-span-1 bg-koranje text-white py-2 px-4 rounded hover:bg-doranje transition"
                  @click="toggleDiv"
                >
                  <i class="fa-solid fa-right-to-bracket pr-12"></i>
                </button>
              </div>
            </div>
          </div>
  
          <!-- Second Face of the Card -->
          <div
            v-for="(user, index) in filteredUsers"
            :key="user.id + '-details' || index + '-details'"
            :style="{ display: !Div ? '' : 'none' }"
            class="flex-shrink-0 w-56 h-72 pb-4 hover:rotate-6 bg-gray-300 hover:bg-kleur shadow-md rounded-lg overflow-hidden transform transition duration-700 hover:scale-105"
          >
            <!-- For demonstration, the image is hidden here or you can show a different image/overlay -->
            <img
              alt="'Foto van ' + user.name"
              class="h-40 w-40 mt-4 rounded-3xl m-auto object-cover"
            />
  
            <div class="p-4">
              <p class="text-gray-600 mt-2">{{ user.oneLiner }}</p>
  
              <div class="mt-4 grid grid-cols-4 space-x-3">
                <button
                  class="col-span-4 bg-koranje text-white py-2 px-4 rounded hover:bg-doranje transition"
                  @click="toggleDiv"
                >
                  <i class="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import axios from "axios";
const token = localStorage.getItem('token') || '';
  
  // Reactive properties
  const Div = ref(true);
  const searchQuery = ref("");
  const subjectFilter = ref(""); // Filter for gender
  const relationshipFilter = ref(""); // Filter for relationship type
  
  // All users fetched from the API
  const allUsers = ref([]);
  
  // Toggle function (switch between two "faces" of the card)
  const toggleDiv = () => {
    Div.value = !Div.value;
  };
  
  // Fetch users from Laravel API on component mount
  onMounted(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users");
      // Assuming `response.data.user` is an array of user objects
      allUsers.value = response.data.user.map((user) => ({
        id: user.id,
        name: user.nickname,
        oneLiner: user.oneliner,
        profileImage: user.profile_image,
        gender: user.gender,
        relationshipType: user.relationship_type,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  });
  
  // Computed property for filtered users
  const filteredUsers = computed(() => {
    let results = allUsers.value;
  
    // Filter by search query (nickname/name)
    if (searchQuery.value) {
      results = results.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
  
    // Filter by gender if selected
    if (subjectFilter.value) {
      results = results.filter(
        (user) =>
          user.gender &&
          user.gender.toLowerCase() === subjectFilter.value.toLowerCase()
      );
    }
  
    // Filter by relationship type if selected
    if (relationshipFilter.value) {
      results = results.filter(
        (user) =>
          user.relationshipType &&
          user.relationshipType.toLowerCase() ===
            relationshipFilter.value.toLowerCase()
      );
    }
  
    return results;
  });
  
  /**
   * Like a user profile
   * Sends a POST to /api/like with { liked_user_id: user.id }
   */
  const likeUser = async (user) => {
    try {
      // Retrieve or set your auth token; depends on your auth setup
      // e.g., if using Sanctum, you may not need a Bearer token
      // if using JWT, do something like:

  
      const response = await axios.post(
        "http://127.0.0.1:8000/api/like",
        { liked_user_id: user.id },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.status === 201 && response.data.message === "It’s a match!") {
        alert("It’s a match!");
      } else {
        // If status = 200 or other success message
        alert(response.data.message || "Profile liked successfully!");
      }
    } catch (error) {
      if (error.response) {
        // If there's a validation or a "already liked" scenario:
        alert(error.response.data.message || "Error liking profile.");
      } else {
        console.error(error);
        alert("An unexpected error occurred.");
      }
    }
  };
  </script>
  
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
    height: 82vh;
  }
  </style>
  
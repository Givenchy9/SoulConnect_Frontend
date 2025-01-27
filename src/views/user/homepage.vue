<template>
  <div class="grid grid-cols-5 grid-rows-1 gap-4 m-auto mt-4  dashboard">
    <div class="grid grid-rows-10 col-span-3">
      <h2 class="row-span-1 text-2xl font-bold mb-6">Jouw top 5 voor vandaag</h2>
      <div
        class="row-span-6 border flex space-x-4 py-4 overflow-x-auto no-scrollbar shadow-xs rounded-xl transition-all duration-500">
        <div v-for="(user, index) in topFiveUsers" :key="index"
          class="flex-shrink-0 w-72 bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-90">
          <div class="absolute top-2 left-2 bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded-full">
            {{ index + 1 }}
          </div>

          <img :src="user.profileImage || 'https://via.placeholder.com/300x200'" alt="Foto van {{ user.name }}"
            class="w-full h-40 object-cover" />

          <!-- Inhoud van de kaart -->
          <div class="p-4">
            <h3 class="text-xl font-semibold">{{ user.name }}</h3>

            <p class="text-gray-600 mt-2">{{ user.oneLiner }}</p>

            <div class="mt-4 flex space-x-3">
              <button class="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                @click="dislikeUser(user)">
                Dislike
              </button>
              <button class="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                @click="likeUser(user)">
                Like
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 border row-span-4 shadow-xs m-1 mt-2 rounded-xl transition-all duration-500">
        <div>
          <button
            class="flex items-center justify-center h-full w-full rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">
            <i class="fa-solid fa-comment-dots fa-2xl"></i>
          </button>
        </div>
        <div>
          <RouterLink to="/likes"
            class="flex text-3xl items-center justify-center h-full w-full rounded-md bg-kleur px-3 py-1.5 font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">
            Your likes <i class="fa-regular fa-thumbs-up ml-2"></i>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="col-span-2 border border-gray-300 m-1 mt-2 p-1 rounded-xl transition-all duration-500 w-full">
      <div class="relative w-full max-w-md m-auto">
        <div class="suge bg-white rounded-lg overflow-hidden">
          <div class="bg-gray-200 h-64 w-full flex items-center justify-center">
            <span class="text-gray-600 text-lg">Foto: {{ currentUser.name }}</span>
          </div>

          <div class="p-4">
            <p class="font-semibold text-xl text-center">{{ currentUser.name }}</p>
            <p class="text-blue-600 text-center">{{ currentUser.oneLiner }}</p>
          </div>

          <div class="flex justify-center space-x-4 p-4">
            <button class="flex-1 h-44 bg-red-500 text-white py-20 px-4 rounded hover:bg-red-600 transition"
              @click="dislikeAndNext">
              <i class="fa-solid fa-thumbs-down fa-2xl"></i>
            </button>
            <button class="flex-1 h-44 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              @click="likeAndNext">
              <i class="fa-solid fa-thumbs-up fa-2xl"></i>
            </button>
            <!-- <button class="bg-red-500 text-white p-3 rounded-full shadow hover:bg-red-600 transition"
              @click="dislikeAndNext">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button class="bg-green-500 text-white p-3 rounded-full shadow hover:bg-green-600 transition"
              @click="likeAndNext">]
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Voorbeeld-data

const topFiveUsers = ref([
  {
    name: 'Jasmijntje0836',
    oneLiner: 'One-liner blablabla',
    profileImage: 'https://images.unsplash.com/photo-1603415526960-f7e044a09eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400'
  },
  {
    name: 'Roos_zwolle1123',
    oneLiner: 'One-liner blablabla',
    profileImage: ''
  },
  {
    name: 'SamuraiJack',
    oneLiner: 'I love coding!',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400'
  },
  {
    name: 'JaneDoe145',
    oneLiner: 'Outdoor enthusiast',
    profileImage: ''
  },
  {
    name: 'PeterPan',
    oneLiner: 'Never growing up!',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400'
  },
])

const exploreUsers = ref([
  {
    name: 'Hannahx7648',
    oneLiner: 'One-liner bla bla bla',
    profileImage: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400'
  },
  {
    name: 'Tommy1992',
    oneLiner: 'Coffee lover, musician',
    profileImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400'
  },
  {
    name: 'Anna_02',
    oneLiner: 'Always smiling',
    profileImage: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400'
  },
])

const currentIndex = ref(0)

const currentUser = computed(() => {
  return exploreUsers.value[currentIndex.value] || { name: '', oneLiner: '', profileImage: '' }
})

// Functies voor Like en Dislike
function likeUser(user) {
  console.log('Liked user:', user.name)
}

function dislikeUser(user) {
  console.log('Disliked user:', user.name)
}

// Functies die Like/Dislike uitvoeren en naar de volgende persoon gaan
function likeAndNext() {
  likeUser(currentUser.value)
  moveToNext()
}

function dislikeAndNext() {
  dislikeUser(currentUser.value)
  moveToNext()
}

// Functie om naar de volgende persoon te gaan
function moveToNext() {
  if (exploreUsers.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % exploreUsers.value.length
}
</script>

<style>
.slider {
  height: 84.5vh;
}

.profile {
  height: 320px;
}

.dashboard {
  width: 1300px;
  height: 80vh;
}

.suge {
  width: 55 vh;
  height: 77vh;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* ::-webkit-scrollbar {
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
} */
</style>

Search
<template>
<div class="matches grid grid-cols-5">
<div class="col-span-1">
<div class="matches2 grid grid-rows-4 h-80 bg-kleur rounded-xl m-2">
<div class="m-auto row-span-1">
<div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-1 shadow-md">
<i class="fa-solid fa-magnifying-glass text-gray-500"></i>
<!-- Bind the search input to the reactive property `searchQuery` -->
<input v-model="searchQuery" type="text" class="rounded-xl px-2 py-1 outline-none flex-grow"
placeholder="Zoeken op naam..." />
</div>
</div>
<div class="row-span-3 px-2">
<label for="subjectFilter" class="text-black">Filter op Geslacht:</label>
<select id="subjectFilter" v-model="subjectFilter" class="w-full p-2 mt-2 bg-gray-200 rounded-md">
<option value="">{{ "man" }}</option>
<option value="">{{ "vrouw" }}</option>
<option v-for="subject in uniqueSubjects" :key="subject" :value="subject">
{{ subject }}
</option>
</select>
</div>
</div>
</div>
<div class="kaarten col-span-4 overflow-auto bg-white">
<div class="kaarten2 grid grid-cols-5 grid-rows-3 p-2 gap-4">
<div v-for="(user, index) in filteredUsers" :key="index" :style="{ display: Div ? 'inline-block' : 'none' }"
class="flex-shrink-0 w-56 hover:rotate-6 hover:bg-kleur shadow-md rounded-lg overflow-hidden transform transition duration-700 hover:scale-105">
<img :src="user.profileImage || 'https://via.placeholder.com/300x200'" alt="Foto van {{ user.name }}"
class="h-40 w-40 mt-4 rounded-3xl m-auto object-cover" />

<!-- Inhoud van de kaart -->
<div class="p-4">
<h3 class="text-xl text-center font-semibold">{{ user.name }}</h3>

<!-- <p class="text-gray-600 mt-2">{{ user.oneLiner }}</p> -->

<div class="mt-4 grid grid-cols-4 gap-2">
<!-- <button class="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
@click="dislikeUser(user)">
Dislike
</button> -->
<!-- <button class="col-span-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
@click="likeUser(user)">
Chat <i class="fa-solid fa-comments"></i>
</button> -->
<button class="col-span-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
@click="likeUser(user)">
Like
</button>
<button class="col-span-1 bg-koranje text-white py-2 px-4 rounded hover:bg-doranje transition"
@click="toggleDiv">
<i class="fa-solid fa-right-to-bracket pr-12"></i>
</button>
</div>
</div>
</div>
<div v-for="(user, index) in filteredUsers" :key="index" :style="{ display: !Div ? '' : 'none' }"
class="flex-shrink-0 w-56 h-72 pb-4 hover:rotate-6 bg-gray-300 hover:bg-kleur shadow-md rounded-lg overflow-hidden transform transition duration-700 hover:scale-105">
<img alt="Foto van {{ user.name }}" class="h-40 w-40 mt-4 rounded-3xl m-auto object-cover" />

<!-- <h3 class="text-xl text-center font-semibold">{{ user.name }}</h3> -->
<!-- Inhoud van de kaart -->
<div class="p-4">
<p class="text-gray-600 mt-2">{{ user.oneLiner }}</p>

<div class="mt-4 grid grid-cols-4 space-x-3">
<!-- <button class="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
@click="dislikeUser(user)">
Dislike
</button> -->
<!-- <button class="col-span-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
@click="likeUser(user)">
Like
</button> -->
<button class="col-span-4 bg-koranje text-white py-2 px-4 rounded hover:bg-doranje transition"
@click="toggleDiv">
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
import { ref, computed } from 'vue'


// Reactive properties
const Div = ref(true);
const searchQuery = ref(""); // For search input
const subjectFilter = ref(""); // For subject filter

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
{
name: 'StarGazer99',
oneLiner: 'Looking at the stars, dreaming of worlds beyond.',
profileImage: 'https://images.unsplash.com/photo-1607746860225-d9762a4bc9d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400'
},
{
name: 'LunaMoonbeam',
oneLiner: 'Chasing the moonlight.',
profileImage: ''
},
{
name: 'TechieTim',
oneLiner: 'All about tech and gadgets.',
profileImage: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400'
},
{
name: 'WanderlustRaven',
oneLiner: 'Exploring every corner of the globe.',
profileImage: 'https://images.unsplash.com/photo-1482801055240-664f7ae29283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&q=80&w=400'
},
{
name: 'QuietStorm',
oneLiner: 'Calm on the outside, but a storm within.',
profileImage: ''
},
{
name: 'GamingGuru',
oneLiner: 'Leveling up every day!',
profileImage: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&q=80&w=400'
},
{
name: 'ChefExtraordinaire',
oneLiner: 'Serving up deliciousness!',
profileImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400'
},
{
name: 'NatureLover',
oneLiner: 'Mountains, forests, and lakes are my happy place.',
profileImage: 'https://images.unsplash.com/photo-1528977695567-75f21d259b8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHw%3D&ixlib=rb-1.2.1&q=80&w=400'
},
{
name: 'CityExplorer',
oneLiner: 'Finding charm in every city I visit.',
profileImage: ''
},
{
name: 'ArtisticSoul',
oneLiner: 'Expressing my world through art.',
profileImage: 'https://images.unsplash.com/photo-1506917021594-47d180e3a7fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0fGVufDB8fDB8fHw%3D&ixlib=rb-1.2.1&q=80&w=400'
},
{
name: 'FitnessFreak',
oneLiner: 'Pushing limits every day.',
profileImage: 'https://images.unsplash.com/photo-1554284126-aa88f22d18c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400'
},
{
name: 'BookWorm',
oneLiner: 'Getting lost in the pages of stories.',
profileImage: ''
},
{
name: 'CatLover',
oneLiner: 'Proud cat parent.',
profileImage: 'https://images.unsplash.com/photo-1592194996308-7a9a8ba265d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwbG92ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&q=80&w=400'
},
{
name: 'HistoryBuff',
oneLiner: 'Exploring the past to understand the future.',
profileImage: ''
},
{
name: 'AdventureSeeker',
oneLiner: 'Life is short, make it an adventure.',
profileImage: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWR2ZW50dXJlfGVufDB8fDB8fHw%3D&ixlib=rb-1.2.1&q=80&w=400'
}
])


// Toggle function
const toggleDiv = () => {
Div.value = !Div.value;
};

// Computed property for filtered users
const filteredUsers = computed(() => {
return topFiveUsers.value.filter((user) =>
user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
);
});

// Example functions
const likeUser = (user) => {
console.log("Liked user:", user.name);
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


<template>
  <div class="inff">
    <RouterLink to="/matches"><i class="fa-solid fa-arrow-left-long fa-2xl"></i></RouterLink>
    <div class="infoo grid grid-cols-4">
      <div class="col-span-1">
        <div v-for="(user, index) in filteredUsers" :key="index">
          <img :src="user.profileImage || 'https://via.placeholder.com/300x200'" alt="Foto van {{ user.name }}"
            class="h-72 w-72 mt-4 rounded-3xl m-auto object-cover" />
          <h3 class="text-xl text-center text-white font-semibold">{{ user.name }}</h3>
          <h1 class="text-gl text-center text-white font-semibold">Age: {{ "datum" }}</h1>
          <div class="bg-white opacity-80 rounded-xl h-48 my-2">
            <p class="text-center font-bold">Oneliner</p>
            <hr />
            <p class="px-4 w-full overflow-auto break-words">
              ssadkjaesndsiuahfesjnkjdfiushfebsiudjefihshikfbkjdsniudfhkjbthnsoicdjsuhgurnsbiodjiohghksbiondfuiedsjlbhbvfiuodhihnkjdadsajdwjaijsdijwlkajoadwa
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-rows-4 gap-2 col-span-3">
        <div class="backdrop-blur-xl rounded-xl border">
          <p class="text-center font-bold">Bio</p>
          <hr />
          <p class="px-4 w-full overflow-auto break-words">
            ssadkjaesndsiuahfesjnkjdfiushfebsiudjefihshikfbkjdsniudfhkjbthnsoicdjsuhgurnsbiodjiohghksbiondfuiedsjlbhbvfiuodhihnkjdadsajdwjaijsdijwlkajoadwa
          </p>
        </div>
        <div class="backdrop-blur-xl rounded-xl border">
          <p class="text-center font-bold">Bio hobby</p>
          <hr />
          <p class="px-4 w-full overflow-auto break-words">
            ssadkjaesndsiuahfesjnkjdfiushfebsiudjefihshikfbkjdsniudfhkjbthnsoicdjsuhgurnsbiodjiohghksbiondfuiedsjlbhbvfiuodhihnkjdadsajdwjaijsdijwlkajoadwa
          </p>
        </div>
        <div class="backdrop-blur-xl rounded-xl border">
          <p class="text-center font-bold">Interests</p>
          <hr />
          <p class="px-4 w-full overflow-auto break-words">
            ssadkjaesndsiuahfesjnkjdfiushfebsiudjefihshikfbkjdsniudfhkjbthnsoicdjsuhgurnsbiodjiohghksbiondfuiedsjlbhbvfiuodhihnkjdadsajdwjaijsdijwlkajoadwa
          </p>
        </div>
        <div class="backdrop-blur-xl rounded-xl border">
          <p class="text-center font-bold">Gallery</p>
          <div class="gallery-wrapper">
            <div class="gallery px-2">
              <div v-for="(image, index) in images" :key="index" class="gallery-item " @click="openModal(image.src)">
                <img :src="image.src" :alt="image.alt" class="h-28 w-64 object-cover rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for displaying the image in full screen -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <img :src="selectedImage" alt="Selected Image" class="modal-image" />
        <button class="close-modal" @click="closeModal">X</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// User data
const filteredUsers = ref([
  {
    name: 'Jasmijntje0836',
    oneLiner: 'One-liner blablabla',
    profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
]);

// Gallery images
const images = ref([
  {
    src: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Siberian Tiger",
  },
  { src: "https://www.goodfreephotos.com/albums/animals/mammals/grizzly-bear-in-the-wild.jpg", alt: "Grizzly Bear" },
  { src: "https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg", alt: "Tiger" },
  { src: "https://cdn.pixabay.com/photo/2023/06/26/13/41/wolf-8089783_640.jpg", alt: "Wolf" },
  { src: "https://www.goodfreephotos.com/albums/animals/mammals/wolf-photo-close-up.jpg", alt: "Wolf" },
  { src: "https://www.timeforkids.com/wp-content/uploads/2023/11/G3G5_231117_bear_steps.jpg?w=1024", alt: "Bear" },
  { src: "https://www.timeforkids.com/wp-content/uploads/2020/08/animalVoting.jpg?w=1024", alt: "Zebra" },
  {
    src: "https://www.goodfreephotos.com/albums/animals/mammals/bear-peering-over-a-fallen-tree.jpg",
    alt: "Bear",
  },
]);

// Modal state
const isModalOpen = ref(false);
const selectedImage = ref('');

// Open the modal and display the selected image
const openModal = (imageSrc) => {
  selectedImage.value = imageSrc;
  isModalOpen.value = true;
};

// Close the modal
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style>
.inff {
  background-image: url("https://plus.unsplash.com/premium_photo-1673127327176-397f94c02bbc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhc3Ntb3JwaGlzbXxlbnwwfHwwfHx8MA%3D%3D");
  background-size: cover;
}

.infoo {
  height: 96.5vh;
}

/* Gallery */
.gallery-wrapper {
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
  max-height: 150px;
}

.gallery {
  display: flex;
  gap: 10px;
}

.gallery-item {
  display: inline-block;
  flex-shrink: 0;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
}

.modal-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

/* Scrollbar Styles */
::-webkit-scrollbar {
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
}
</style>

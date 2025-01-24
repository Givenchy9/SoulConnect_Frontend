<template>
    <div class="box grid grid-cols-2 bg-white h-screen rounded-3xl overflow-auto">
        <div v-for="(image, index) in images" :key="index" class="cursor-pointer">
            <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover" @click="showPopup(image)" />
        </div>
    </div>

    <!-- Modal Popup -->
    <div v-if="popupImage" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg overflow-hidden relative">
            <img :src="popupImage.src" :alt="popupImage.alt" class="w-full h-auto object-cover" />
            <button @click="closePopup"
                class="xknop absolute top-2 right-2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900">
                &times;
            </button>
        </div>
    </div>

    <div class="absolute bottom-0 right-0 pr-8 m-auto">
        <button type="submit"
            class="flex shadow-xl m-auto justify-center rounded-md bg-kleur px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">
            Add image
            <i class="fa-solid fa-file-circle-plus px-3 py-1.5"></i>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                { src: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Siberian Tiger" },
                { src: "https://www.goodfreephotos.com/albums/animals/mammals/grizzly-bear-in-the-wild.jpg", alt: "Grizzly Bear" },
                { src: "https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg", alt: "Tiger" },
                { src: "https://cdn.pixabay.com/photo/2023/06/26/13/41/wolf-8089783_640.jpg", alt: "Wolf" },
                { src: "https://www.goodfreephotos.com/albums/animals/mammals/wolf-photo-close-up.jpg", alt: "Wolf" },
                { src: "https://www.timeforkids.com/wp-content/uploads/2023/11/G3G5_231117_bear_steps.jpg?w=1024", alt: "Bear" },
                { src: "https://www.timeforkids.com/wp-content/uploads/2020/08/animalVoting.jpg?w=1024", alt: "Zebra" },
                { src: "https://www.goodfreephotos.com/albums/animals/mammals/bear-peering-over-a-fallen-tree.jpg", alt: "Bear" },
            ],
            popupImage: null,
        };
    },
    methods: {
        showPopup(image) {
            this.popupImage = image;
        },
        closePopup() {
            this.popupImage = null;
        },
    },
};
</script>

<style>
@media (max-width: 800px) {
    .box {
        overflow: auto;
        height: 80vh;
        padding-left: 0;
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

@media (min-width: 1024px) {
    .xknop {
        position: absolute;
        height: 20vh;
        width: 20vh;
        font-size: xx-large;
        margin-top: 150px;
    }
}
</style>

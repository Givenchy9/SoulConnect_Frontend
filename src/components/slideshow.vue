<template>
    <div class="flex absolute top-0 left-0 w-full h-full z-0">
        <!-- First Slideshow -->
        <div class="slideshow relative h-screen w-1/4 overflow-hidden">
            <!-- Slides Wrapper -->
            <div class="flex flex-col transition-transform duration-500 h-full"
                :style="{ transform: `translateY(-${currentSlide1 * 100}%)` }">
                <!-- Individual Slides -->
                <div v-for="(slide, index) in slides1" :key="index"
                    class="w-full flex-shrink-0 h-full bg-cover bg-center"
                    :style="{ backgroundImage: `url(${slide.image})` }">
                </div>
            </div>

            <!-- Navigation Indicators -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                <button v-for="(slide, index) in slides1" :key="index" @click="goToSlide1(index)"
                    class="w-3 h-3 rounded-full" :class="index === currentSlide1 ? 'bg-white' : 'bg-gray-500'"></button>
            </div>
        </div>

        <!-- Second Slideshow -->
        <div class="slideshow relative h-screen w-1/4 overflow-hidden">
            <!-- Slides Wrapper -->
            <div class="flex flex-col transition-transform duration-500 h-full"
                :style="{ transform: `translateY(-${currentSlide2 * 100}%)` }">
                <!-- Individual Slides -->
                <div v-for="(slide, index) in slides2" :key="index"
                    class="w-full flex-shrink-0 h-full bg-cover bg-center"
                    :style="{ backgroundImage: `url(${slide.image})` }">
                </div>
            </div>

            <!-- Navigation Indicators -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                <button v-for="(slide, index) in slides2" :key="index" @click="goToSlide2(index)"
                    class="w-3 h-3 rounded-full" :class="index === currentSlide2 ? 'bg-white' : 'bg-gray-500'"></button>
            </div>
        </div>

        <!-- Third Slideshow -->
        <div class="slideshow relative h-screen w-1/4 overflow-hidden">
            <!-- Slides Wrapper -->
            <div class="flex flex-col transition-transform duration-500 h-full"
                :style="{ transform: `translateY(-${currentSlide3 * 100}%)` }">
                <!-- Individual Slides -->
                <div v-for="(slide, index) in slides3" :key="index"
                    class="w-full flex-shrink-0 h-full bg-cover bg-center"
                    :style="{ backgroundImage: `url(${slide.image})` }">
                </div>
            </div>

            <!-- Navigation Indicators -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                <button v-for="(slide, index) in slides3" :key="index" @click="goToSlide3(index)"
                    class="w-3 h-3 rounded-full" :class="index === currentSlide3 ? 'bg-white' : 'bg-gray-500'"></button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
    setup() {
        // Reactive variables for each slideshow
        const currentSlide1 = ref(0);
        const currentSlide2 = ref(0);
        const currentSlide3 = ref(0);

        // References for the interval IDs so we can clear them later
        const slideInterval1 = ref(null);
        const slideInterval2 = ref(null);
        const slideInterval3 = ref(null);

        // Array of slides for each slideshow with different images
        const slides1 = [
            { image: "https://picsum.photos/1024/1920/?image=52" },
            { image: "https://picsum.photos/1024/1920/?image=54" },
            { image: "https://picsum.photos/1024/1920/?image=58" },
            { image: "https://picsum.photos/1024/1920/?image=50" },
            { image: "https://picsum.photos/1024/1920/?image=53" },
            { image: "https://picsum.photos/1024/1920/?image=55" },
        ];

        const slides2 = [
            { image: "https://picsum.photos/1024/1920/?image=60" },
            { image: "https://picsum.photos/1024/1920/?image=62" },
            { image: "https://picsum.photos/1024/1920/?image=64" },
            { image: "https://picsum.photos/1024/1920/?image=61" },
            { image: "https://picsum.photos/1024/1920/?image=63" },
            { image: "https://picsum.photos/1024/1920/?image=65" },
        ];

        const slides3 = [
            { image: "https://picsum.photos/1024/1920/?image=66" },
            { image: "https://picsum.photos/1024/1920/?image=68" },
            { image: "https://picsum.photos/1024/1920/?image=70" },
            { image: "https://picsum.photos/1024/1920/?image=67" },
            { image: "https://picsum.photos/1024/1920/?image=69" },
            { image: "https://picsum.photos/1024/1920/?image=71" },
        ];


        // Function to move to the next slide for each slideshow
        const nextSlide1 = () => {
            currentSlide1.value = (currentSlide1.value + 1) % slides1.length;
        };
        const nextSlide2 = () => {
            currentSlide2.value = (currentSlide2.value + 1) % slides2.length;
        };
        const nextSlide3 = () => {
            currentSlide3.value = (currentSlide3.value + 1) % slides3.length;
        };

        // Start the automatic slideshow for each one
        const startSlideshow1 = () => {
            slideInterval1.value = setInterval(nextSlide1, 1000);
        };
        const startSlideshow2 = () => {
            slideInterval2.value = setInterval(nextSlide2, 2000);
        };
        const startSlideshow3 = () => {
            slideInterval3.value = setInterval(nextSlide3, 3000);
        };

        // Stop the slideshow to prevent memory leaks
        const stopSlideshow1 = () => {
            clearInterval(slideInterval1.value);
        };
        const stopSlideshow2 = () => {
            clearInterval(slideInterval2.value);
        };
        const stopSlideshow3 = () => {
            clearInterval(slideInterval3.value);
        };

        // Navigate to a specific slide for each slideshow
        const goToSlide1 = (index) => {
            currentSlide1.value = index;
        };
        const goToSlide2 = (index) => {
            currentSlide2.value = index;
        };
        const goToSlide3 = (index) => {
            currentSlide3.value = index;
        };

        // Lifecycle hook to start the slideshow when the component mounts
        onMounted(() => {
            startSlideshow1();
            startSlideshow2();
            startSlideshow3();
        });

        // Lifecycle hook to clean up the intervals when the component is destroyed
        onBeforeUnmount(() => {
            stopSlideshow1();
            stopSlideshow2();
            stopSlideshow3();
        });

        // Return variables and methods to use in the template
        return {
            currentSlide1,
            currentSlide2,
            currentSlide3,
            slides1,
            slides2,
            slides3,
            goToSlide1,
            goToSlide2,
            goToSlide3,
        };
    },
};
</script>

<style scoped>
.slideshow {
    height: 100vh;
    /* Full height of the screen */
    position: relative;
    /* Enables absolute positioning for child elements */
}

.flex {
    display: flex;
    /* Use flexbox to arrange items in a row */
}

.w-1\4 {
    width: 25%;
    /* Each slideshow will take 25% of the available width */
}
</style>
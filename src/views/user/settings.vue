<template>
    <div class="settings grid grid-cols-4 dark:bg-black">
        <div class="settings2 col-span-1 h-screen p-2 bg-kleur dark:bg-gray-800 rounded-r-3xl">
            <div class="rounded-xl h-full">
                <RouterLink to="homepage"><i class="fa-solid fa-arrow-left fa-2xl text-white mt-6 absolute"></i>
                </RouterLink>
                <h1 class="text-white font-bold text-center text-3xl py-2">Instelligen</h1>
                <hr>
                <div class="settings3 grid grid-col-2 gap-2">
                    <RouterLink to="/settings/profile" active-class="bg-black/40"
                        class="knop knoppen py-2 px-4 rounded-full bg-white font-bold text-center hover:bg-white/40 duration-200 hover:text-white mt-40">
                        <i class="fa-solid fa-user fa-2xl py-5 block sm:hidden"></i>
                        <p class="hidden sm:block">Profiel</p>
                    </RouterLink>
                    <RouterLink to="/settings/edit" active-class="bg-black/40"
                        class="knoppen py-2 px-4 rounded-full bg-white font-bold text-center hover:bg-white/40 duration-200 hover:text-white">
                        <i class="fa-solid fa-pen-to-square fa-2xl py-5 block sm:hidden"></i>
                        <p class="hidden sm:block">Bewerken</p>
                    </RouterLink>
                    <RouterLink to="/settings/abonnoment" active-class="bg-black/40"
                        class="knoppen py-2 px-4 rounded-full bg-white font-bold text-center hover:bg-white/40 duration-200 hover:text-white">
                        <i class="fa-solid fa-cloud-arrow-up fa-2xl py-5 block sm:hidden"></i>
                        <p class="hidden sm:block">Abbonnoment</p>
                    </RouterLink>
                    <RouterLink to="/settings/afbeeldingen" active-class="bg-black/40"
                        class="knoppen py-2 px-4 rounded-full bg-white font-bold text-center hover:bg-white/40 duration-200 hover:text-white">
                        <i class="fa-solid fa-image fa-2xl py-5 block sm:hidden"></i>
                        <p class="hidden sm:block">Foto's</p>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="view col-span-3 p-2">
            <router-view></router-view>
        </div>
    </div>
    <div>
        <Footer />
    </div>
</template>

<script setup>
</script>

<style scoped>
@media (max-width: 800px) {
    .settings {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        height: 100vh;
    }

    .settings2 {
        height: 20vh;
        display: inline;
        border-radius: 0;
    }

    .knop {
        margin-top: 0;
    }

    .view {
        margin-bottom: 200vh;
    }

    .settings3 {
        display: flex;
        justify-content: center;
        padding: 1rem 0;
    }

    .knoppen {
        width: 140px;
    }
}
</style>
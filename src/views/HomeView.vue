<script setup lang="ts">
import Slideshow from "@/components/slideshow.vue";
</script>

<template>
  <div class="relative h-screen bg-blue-200 rounded">
    <div class="absolute w-1/2 h-96 mt-32 left-1/2 -translate-x-1/2 z-10">
      <div class="backdrop-blur-3xl ">
        <p class="text-center text-3xl font-bold">Powerd by QuikAppBusiness</p>
        <div>
          <p class="text-white mt-12 p-8">At QuikAtBusiness, we believe in the power of connection, collaboration, and
            innovation.
            With a vision to
            transform the way people interact with each other and with businesses, we are driven by one central mission:
            to make the world more social.

            Founded on the principles of creativity and empowerment, QuikAtBusiness is a forward-thinking company with
            big dreams. We aim to bridge the gap between businesses and individuals by creating platforms and solutions
            that not only solve problems but foster genuine human connections.

            Our team of passionate dreamers, innovators, and creators works relentlessly to deliver services and
            products that bring people closer, inspire positive change, and create meaningful interactions across the
            globe.

            We are more than just a business – we are a movement. We believe that when we bring people together, amazing
            things happen. Join us on our journey as we strive to make the world a more connected, social, and exciting
            place for all.

            Together, let’s build a better tomorrow, today.

          </p>
          <RouterLink to="/register"
            class="flex shadow-xl w-1/2 m-auto justify-center rounded-md bg-kleur px-3 py-5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">
            Make
            you account today!</RouterLink>
        </div>
      </div>
    </div>
    <Slideshow />
    <div class="relative float-right w-1/4 h-screen mx-12 backdrop-blur-2xl border-2 h-1/2 mt-40">
      <div class="p-12">
        <p class="text-center text-2xl">Already an account?</p>
        <RouterLink to="/login"
          class="flex shadow-xl w-full justify-center rounded-md bg-kleur px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">
          Login</RouterLink>
      </div>
    </div>
  </div>
</template>

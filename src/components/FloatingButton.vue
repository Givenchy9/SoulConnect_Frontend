<template>
    <button
      class="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      @click="handleClick"
    >
    <i class="fa-solid fa-bell fa-xl"></i>
    </button>
</template>
  
<script>
  export default {
    methods: {
      handleClick() {
        console.log('Floating button clicked');
      },
    },
  };
</script>

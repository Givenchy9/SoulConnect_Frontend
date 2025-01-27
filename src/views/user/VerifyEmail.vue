<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 class="text-2xl font-bold mb-4">Controleer je e-mail</h1>
        <p class="text-gray-600 mb-6">
          We hebben een verificatiemail gestuurd naar het door jou geregistreerde e-mailadres. Controleer je inbox en klik op de link om je account te verifiëren.
        </p>
        <button
          @click="resendVerificationEmail"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          :disabled="loading"
        >
          Verificatiemail opnieuw verzenden
        </button>
        <p v-if="message" class="text-green-500 mt-4">{{ message }}</p>
        <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const loading = ref(false);
  const message = ref("");
  const error = ref("");
  
  async function resendVerificationEmail() {
    loading.value = true;
    message.value = "";
    error.value = "";
  
    try {
      // Retrieve the registered user ID from localStorage
      const userId = localStorage.getItem("registeredUserId");
  
      if (!userId) {
        throw new Error("Gebruikers-ID niet gevonden. Registreer opnieuw.");
      }
  
      const response = await fetch(`http://127.0.0.1:8000/api/email/resend-verification/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        message.value = data.message || "De verificatiemail is succesvol opnieuw verzonden!";
      } else {
        const data = await response.json();
        error.value = data.message || "Het opnieuw verzenden van de verificatiemail is mislukt.";
      }
    } catch (err) {
      console.error("Error:", err);
      error.value = err.message || "Er is een onverwachte fout opgetreden.";
    } finally {
      loading.value = false;
    }
  }
  </script>
    
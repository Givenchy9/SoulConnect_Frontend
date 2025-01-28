<template>
  <div class="boxz flex justify-center items-center mt-12 w-full">
    <div
      class="w-full bg-gradient-to-b from-kleur to-pink-500 mx-20 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
      <div class="p-12 border-b">
        <div class="flex flex-col items-center">
          <img
            class="h-40 w-40 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
            :src="user.profile_image || '/images/default-avatar.png'"
            alt="User Avatar" />
        </div>
        <div class="mt-4">
          <h3 class="text-center text-xl font-bold text-white dark:text-white">
            {{ user.nickname }}
          </h3>
        </div>
        <div class="text-center mt-2 text-white dark:text-gray-300">
          <p>{{ user.email }}</p>
        </div>
        <hr class="my-4">
        <div class="info grid grid-cols-2 gap-2 mt-4">
          <div class="bg-white rounded-xl p-4 my-2 overflow-auto">
            <p class="text-center font-bold">Bio & Oneliner</p>
            <hr class="my-2">
            <p class="mt-2">{{ user.oneliner }}</p>
            <p class="mt-2">{{ user.profile_text }}</p>
          </div>
          <div class="bg-gradient-to-l from-kleur to-pink-500 p-4 rounded-xl">
            <p class="text-center bg-white font-bold backdrop-blur-3xl rounded-md px-2">General</p>
            <table class="table-auto text-white border-collapse border border-gray-300 w-full mt-2">
              <tbody>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Gender:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ user.gender }}</td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Zoek naar:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ user.looking_for_gender }}</td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Geborte datum:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ formattedBirthdate }}</td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Postcode:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ user.postcode }}</td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Relatie type:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ user.relationship_type }}</td>
                </tr>
              </tbody>
            </table>
            <div class="mt-4">
              <p class="text-center bg-white font-bold backdrop-blur-3xl rounded-md px-2">Interests</p>
              <ul class="list-disc list-inside text-white mt-2">
                <li v-for="interest in user.interests" :key="interest.id">{{ interest.name }}</li>
              </ul>
            </div>
            <div class="mt-4">
              <p class="text-center bg-white font-bold backdrop-blur-3xl rounded-md px-2">Subscriptions</p>
              <ul class="list-disc list-inside text-white mt-2">
                <li v-for="sub in user.subscriptions" :key="sub.id">
                   Status: {{ sub.status }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        id: "",
        email: "",
        nickname: "",
        oneliner: "",
        profile_text: "",
        gender: "",
        profile_image: "",
        looking_for_gender: "",
        birthdate: "",
        postcode: "",
        latitude: "",
        longitude: "",
        relationship_type: "",
        status: "",
        role: "",
        verified: 0,
        created_at: "",
        updated_at: "",
        interests: [], // Array of interest objects
        looking_for_interests: [], // Array of looking for interest objects
        subscriptions: [], // Array of subscription objects
      },
      loading: false,
      error: null,
    };
  },
  computed: {
    formattedBirthdate() {
      if (this.user.birthdate) {
        const date = new Date(this.user.birthdate);
        return date.toLocaleDateString();
      }
      return '';
    }
  },
  methods: {
    async fetchUser() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        this.user = response.data.user;
        console.log("Fetched user data:", this.user);
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to fetch user data.";
        console.error("Error fetching user data:", err);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchUser();
  },
};
</script>

<style scoped>
@media (max-width: 800px) {
  .boxz {
    width: 100%;
    height: auto;
    margin-top: 10px;
    margin-left: 0;
    padding: 10px;
    display: block;
  }

  .info {
    grid-template-columns: 1fr;
    padding-left: 0;
    height: auto;
    overflow: auto;
  }

  /* Adjust button sizes and spacing for smaller screens */
  .info button {
    width: 100%;
    margin-top: 10px;
  }
}

/* Optional: Add transition effects for smoother UI interactions */
input, select, textarea {
  transition: border-color 0.3s;
}

input:focus, select:focus, textarea:focus {
  border-color: #4A90E2; /* Tailwind's blue-500 */
}
</style>
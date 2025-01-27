<template>
  <div class="boxz flex justify-center items-center mt-12 w-full">
    <div
      class="w-full bg-gradient-to-b from-kleur to-pink-500 mx-20 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
      <div class="p-12 border-b">
        <img class="h-40 w-40 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
          alt="User Avatar" />
        <div>
          <h3 class="text-center mt-4 text-xl font-bold text-white dark:text-white">
            {{ user.first_name }}
          </h3>
        </div>
        <div class="text-center mt-2 text-white dark:text-gray-300">
          <p>{{ user.email }}</p>
        </div>
        <!-- <div class="text-center mt-2 text-white dark:text-gray-300">
          <p>One Liner</p>
        </div> -->
        <hr>
        <div class="info grid grid-cols-2 gap-2 mt-4">
          <div class="bg-white rounded-xl h-48 my-2">
            <p class="text-center font-bold">Bio & Oneliner</p>
            <hr>
          </div>
          <div class="mt-2 bg-gradient-to-l from-kleur to-pink-500">
            <p class="text-center bg-white font-bold backdrop-blur-3xl">General</p>
            <table class="table-auto text-white border-collapse border border-gray-300 w-full">
              <!-- <thead>
                <tr class="backdrop-blur-3xl">
                  <th class="px-4 py-2 border border-gray-300 text-left"></th>
                  <th class="px-4 py-2 border border-gray-300 text-left"></th>
                </tr>
              </thead> -->
              <tbody>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Gender:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ "Man" }}</td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Zoek naar:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ "Vrouw" }}</td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Geborte datum:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ "23-02-2-1998" }}</td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Postcode:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ "8462AB" }}</td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Relatie type:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ "Vriendschap" }}</td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Status:</td>
                  <td class="px-4 py-2 border border-gray-300">{{ "Active" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  components: {
  },
  data() {
    return {
      user: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        avatar: "",
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchUserById(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:3007/users/${userId}`);
        this.user = response.data;
        console.log("Fetched user data:", this.user);
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to fetch user data.";
        console.error("Error fetching user data:", err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    const userId = localStorage.getItem("userId");
    console.log("Logged-in user ID:", userId);
    if (userId) {
      this.fetchUserById(userId);
    } else {
      this.error = "User is not logged in.";
    }
  },
};
</script>
<style>
@media (max-width: 800px) {
  .boxz {
    /* margin-top: 10px;
    padding-top: 100px; */
    width: 100%;
    height: 80vh;
    margin-top: 10px;
    margin-left: -81px;
    padding-left: 10px;
    padding-right: 10px;
    display: block;
  }

  .info {
    grid-template-columns: 1fr;
    padding-left: 0;
    height: auto;
    overflow: auto;
  }

  /* .woorden {
    padding-left: 10px;
    padding-right: 10px;
  } */
}
</style>

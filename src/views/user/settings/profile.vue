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
          <!-- Removed the file input for profile image -->
        </div>
        <div class="mt-4">
          <h3 class="text-center text-xl font-bold text-white dark:text-white">
            <span v-if="!isEditing">{{ user.first_name }}</span>
            <input
              v-else
              type="text"
              v-model="editableUser.first_name"
              class="text-center mt-4 text-xl font-bold text-black dark:text-white bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </h3>
        </div>
        <div class="text-center mt-2 text-white dark:text-gray-300">
          <p>{{ user.email }}</p>
          <!-- Email is displayed as read-only -->
        </div>
        <hr class="my-4">
        <div class="info grid grid-cols-2 gap-2 mt-4">
          <div class="bg-white rounded-xl p-4 my-2 overflow-auto">
            <p class="text-center font-bold">Bio & Oneliner</p>
            <hr class="my-2">
            <div v-if="!isEditing">
              <p class="mt-2">{{ user.oneliner }}</p>
              <p class="mt-2">{{ user.profile_text }}</p>
            </div>
            <div v-else>
              <input
                type="text"
                v-model="editableUser.oneliner"
                placeholder="One Liner"
                class="w-full p-2 border border-gray-300 rounded mb-2 text-black dark:text-white bg-white dark:bg-gray-700"
              />
              <textarea
                v-model="editableUser.profile_text"
                placeholder="Profile Text"
                class="w-full p-2 border border-gray-300 rounded text-black dark:text-white bg-white dark:bg-gray-700"
              ></textarea>
            </div>
          </div>
          <div class="bg-gradient-to-l from-kleur to-pink-500 p-4 rounded-xl">
            <p class="text-center bg-white font-bold backdrop-blur-3xl rounded-md px-2">General</p>
            <table class="table-auto text-white border-collapse border border-gray-300 w-full mt-2">
              <tbody>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Gender:</td>
                  <td class="px-4 py-2 border border-gray-300">
                    <span v-if="!isEditing">{{ user.gender }}</span>
                    <select
                      v-else
                      v-model="editableUser.gender"
                      class="w-full p-1 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                    >
                      <option disabled value="">Select Gender</option>
                      <option>Man</option>
                      <option>Vrouw</option>
                      <option>Other</option>
                    </select>
                  </td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Zoek naar:</td>
                  <td class="px-4 py-2 border border-gray-300">
                    <span v-if="!isEditing">{{ user.looking_for_gender }}</span>
                    <select
                      v-else
                      v-model="editableUser.looking_for_gender"
                      class="w-full p-1 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                    >
                      <option disabled value="">Select Gender</option>
                      <option>Man</option>
                      <option>Vrouw</option>
                      <option>Other</option>
                    </select>
                  </td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Geborte datum:</td>
                  <td class="px-4 py-2 border border-gray-300">
                    <span v-if="!isEditing">{{ formattedBirthdate }}</span>
                    <input
                      v-else
                      type="date"
                      v-model="editableUser.birthdate"
                      class="w-full p-1 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                    />
                  </td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Postcode:</td>
                  <td class="px-4 py-2 border border-gray-300">
                    <span v-if="!isEditing">{{ user.postcode }}</span>
                    <input
                      v-else
                      type="text"
                      v-model="editableUser.postcode"
                      class="w-full p-1 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                    />
                  </td>
                </tr>
                <tr class="backdrop-blur-3xl">
                  <td class="px-4 py-2 border border-gray-300">Relatie type:</td>
                  <td class="px-4 py-2 border border-gray-300">
                    <span v-if="!isEditing">{{ user.relationship_type }}</span>
                    <select
                      v-else
                      v-model="editableUser.relationship_type"
                      class="w-full p-1 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                    >
                      <option disabled value="">Select Type</option>
                      <option>Vriendschap</option>
                      <option>Serieuze relatie</option>
                      <option>Dating</option>
                      <!-- Add other options as needed -->
                    </select>
                  </td>
                </tr>
                <!-- Removed Status Field -->
              </tbody>
            </table>
            <!-- Interests Section -->
            <div class="mt-4">
              <p class="text-center bg-white font-bold backdrop-blur-3xl rounded-md px-2">Interests</p>
              <div v-if="!isEditing">
                <ul class="list-disc list-inside text-white mt-2">
                  <li v-for="interest in user.interests" :key="interest.id">{{ interest.name }}</li>
                </ul>
              </div>
              <div v-else>
                <select
                  multiple
                  v-model="editableUser.interests"
                  class="w-full p-2 border border-gray-300 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                >
                  <option v-for="interest in availableInterests" :key="interest.id" :value="interest.id">
                    {{ interest.name }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Subscriptions Section (Read-Only) -->
            <div class="mt-4">
              <p class="text-center bg-white font-bold backdrop-blur-3xl rounded-md px-2">Subscriptions</p>
              <ul class="list-disc list-inside text-white mt-2">
                <li v-for="sub in user.subscriptions" :key="sub.id">
                  {{ sub.subscription.name }} - Status: {{ sub.status }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Action Buttons -->
        <div class="mt-4 flex justify-center space-x-4">
          <button
            v-if="!isEditing"
            @click="enableEditing"
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit Profile
          </button>
          <button
            v-if="isEditing"
            @click="saveProfile"
            :disabled="loading || !isFormValid"
            class="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
          <button
            v-if="isEditing"
            @click="cancelEditing"
            :disabled="loading"
            class="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
        <!-- Loading and Error States -->
        <div v-if="loading" class="flex justify-center items-center mt-4">
          <p class="text-gray-500">Loading...</p>
        </div>
        <div v-if="error" class="flex justify-center items-center mt-4">
          <p class="text-red-500">{{ error }}</p>
        </div>
        <div v-if="successMessage" class="flex justify-center items-center mt-4">
          <p class="text-green-500">{{ successMessage }}</p>
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
            first_name: "",
            last_name: "",
            email: "",
            profile_image: "",
            oneliner: "",
            profile_text: "",
            gender: "",
            looking_for_gender: "",
            birthdate: "",
            postcode: "",
            relationship_type: "",
            subscriptions: [], // Array of subscription objects
            interests: [], // Array of interest objects
          },
          editableUser: {
            first_name: "",
            oneliner: "",
            profile_text: "",
            gender: "",
            looking_for_gender: "",
            birthdate: "",
            postcode: "",
            relationship_type: "",
            interests: [], // Array of interest IDs
          },
          availableInterests: [], // List of all possible interests
          isEditing: false,
          loading: false,
          error: null,
          successMessage: null,
        };
      },
      computed: {
        formattedBirthdate() {
          if (this.user.birthdate) {
            const date = new Date(this.user.birthdate);
            return date.toLocaleDateString();
          }
          return '';
        },
        isFormValid() {
          // Basic validation: ensure required fields are filled
          return this.editableUser.nickname;
                 this.editableUser.gender;
                 this.editableUser.looking_for_gender;
        }
      },
      methods: {
        async fetchUser() {
          this.loading = true;
          this.error = null;
          try {
            const response = await axios.get(`http://localhost:8000/api/user`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            this.user = response.data.user;
            // Initialize editableUser with current user data
            this.editableUser = {
              first_name: this.user.nicname,
              oneliner: this.user.oneliner,
              profile_text: this.user.profile_text,
              gender: this.user.gender,
              looking_for_gender: this.user.looking_for_gender,
              birthdate: this.user.birthdate,
              postcode: this.user.postcode,
              relationship_type: this.user.relationship_type,
              interests: this.user.interests.map(interest => interest.id),
            };
            console.log("Fetched user data:", this.user);
          } catch (err) {
            this.error = err.response?.data?.message || "Failed to fetch user data.";
            console.error("Error fetching user data:", err);
          } finally {
            this.loading = false;
          }
        },
        async fetchAvailableInterests() {
          try {
            const response = await axios.get(`http://localhost:8000/api/interests`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            this.availableInterests = response.data.interests;
          } catch (err) {
            console.error("Error fetching available interests:", err);
          }
        },
        enableEditing() {
          this.isEditing = true;
          this.successMessage = null;
        },
        cancelEditing() {
          this.isEditing = false;
          this.error = null;
          this.successMessage = null;
          // Reset editableUser to current user data
          this.editableUser = {
            first_name: this.user.first_name,
            oneliner: this.user.oneliner,
            profile_text: this.user.profile_text,
            gender: this.user.gender,
            looking_for_gender: this.user.looking_for_gender,
            birthdate: this.user.birthdate,
            postcode: this.user.postcode,
            relationship_type: this.user.relationship_type,
            interests: this.user.interests.map(interest => interest.id),
          };
        },
        async saveProfile() {
          this.loading = true;
          this.error = null;
          this.successMessage = null;
          try {
            const payload = {
              first_name: this.editableUser.first_name,
              oneliner: this.editableUser.oneliner,
              profile_text: this.editableUser.profile_text,
              gender: this.editableUser.gender,
              looking_for_gender: this.editableUser.looking_for_gender,
              birthdate: this.editableUser.birthdate,
              postcode: this.editableUser.postcode,
              relationship_type: this.editableUser.relationship_type,
              interests: this.editableUser.interests,
            };

            const response = await axios.put(`http://localhost:8000/api/user/profile`, payload, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
              }
            });
            this.user = response.data.user;
            this.successMessage = response.data.message || "Profile updated successfully.";
            this.isEditing = false;
            console.log("Updated user data:", this.user);
          } catch (err) {
            this.error = err.response?.data?.message || "Failed to update profile.";
            if (err.response?.data?.errors) {
              this.error = Object.values(err.response.data.errors).flat().join(' ');
            }
            console.error("Error updating profile:", err);
          } finally {
            this.loading = false;
          }
        }
      },
      mounted() {
        this.fetchUser();
        this.fetchAvailableInterests();
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

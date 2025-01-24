<template>
    <div class="box flex justify-center items-center mt-20 w-full">
        <div
            class="w-full mx-20 bg-kleur rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
            <div class="text-center p-12 border-b">
                <img class="h-24 w-24 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                    alt="User Avatar" />
                <h3 class="mt-4 text-xl font-bold text-white dark:text-white">
                    {{ user.first_name }}
                </h3>
                <div class="mt-2 text-white dark:text-gray-300">
                    <p>{{ user.email }}</p>
                </div>
                <hr>
                <div class="info grid grid-cols-2 gap-2 mt-4">
                    <div class="bg-white rounded-xl h-20 mt-2">1</div>
                    <div class="bg-white rounded-xl h-20 mt-2">2</div>
                    <div class="bg-white rounded-xl h-20 mt-2">1</div>
                    <div class="bg-white rounded-xl h-20 mt-2">2</div>
                    <div class="bg-white rounded-xl h-20 mt-2">1</div>
                    <div class="bg-white rounded-xl h-20 mt-2">2</div>
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
                avatar: "https://via.placeholder.com/150",
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
    .box {
        margin-top: 0;
    }
    .info{
        height: 30vh;
        overflow: auto;
    }
}
</style>

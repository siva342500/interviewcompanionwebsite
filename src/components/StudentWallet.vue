<template>
  <div>
    <div class="header">
      <h1>Wallet Details</h1>
    </div>
    <div class="student-profile-container">
      <div class="wallet-details" v-if="walletData">
        <p><strong>Balance:</strong> ₹{{ walletData.balance }}</p>
      </div>
      <p v-else>Loading wallet details...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      studentId: null, // Student ID fetched from route params
      studentData: null, // Holds student data
      walletData: null, // Holds wallet data
    };
  },
  async created() {
    this.studentId = this.$route.params.studentId; // Get studentId from route params
    await this.fetchStudentDetails(); // Fetch both student and wallet details
  },
  methods: {
    async fetchStudentDetails() {
      const token = localStorage.getItem("token"); // Retrieve the auth token from localStorage
      const studentId = this.studentId;

      if (token && studentId) {
        try {
          const apiUrl = `https://interview-companion-440607.uc.r.appspot.com/api/wallets/student/${this.studentId}`;

          const response = await axios.get(apiUrl, {
            headers: {
              "auth-token": `${token}`, // Include the token in the Authorization header
            },
          });

          // Check if the response is successful and contains data
          if (response.data.status === "success") {
            this.studentData = response.data.student; // Set student details
            this.walletData = response.data.wallet; // Set wallet details
          } else {
            console.error("Failed to fetch student or wallet details.");
          }
        } catch (error) {
          console.error("An error occurred while fetching data.", error);
        }
      } else {
        console.error("No token or student ID found. Please log in again.");
      }
    },
  },
};
</script>

<style scoped>
.student-profile-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1,
h2 {
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
}

p {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

strong {
  color: #555;
}
</style>

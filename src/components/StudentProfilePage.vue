<template>
  <div>
    <!-- Header Section -->
    <div class="header">
      <h1 v-if="studentData">Welcome, {{ studentData.name }}</h1>
    </div>

    <!-- Main Content Section -->
    <div class="student-profile-container">
      <div class="student-details" v-if="studentData">
        <h2>Personal Details</h2>
        <p><strong>Name:</strong> {{ studentData.name }}</p>
        <p><strong>Email:</strong> {{ studentData.email }}</p>
        <p><strong>Phone:</strong> {{ studentData.phone }}</p>
      </div>
      <p v-else>Loading student details...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      studentId: null,
      studentData: null,
    };
  },
  async created() {
    // Get studentId from route params
    this.studentId = this.$route.params.studentId;

    // Fetch student details
    await this.fetchStudentDetails();
  },
  methods: {
    async fetchStudentDetails() {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const studentId = this.studentId; // Get student ID from route params

      if (token && studentId) {
        try {
          const apiUrl = `https://api.interview-companion.com/api/students/${studentId}`;

          const response = await axios.get(apiUrl, {
            headers: {
              "auth-token": `${token}`, // Include the token in the Authorization header
            },
          });

          // Handle the response with the student data
          if (response.data) {
            this.studentData = response.data;
          } else {
            console.error("Failed to fetch student profile.");
          }
        } catch (error) {
          console.error(
            "An error occurred while fetching student profile.",
            error
          );
        }
      } else {
        console.error("No token found. Please log in again.");
      }
    },
  },
};
</script>

<style scoped>
/* Header Styling */
.header {
  text-align: center;
  margin-bottom: 20px;
}
h1 {
  text-align: center;
}
/* Main Profile Container */
.student-profile-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

/* Personal Details Section */
/* .student-details {
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
} */
</style>

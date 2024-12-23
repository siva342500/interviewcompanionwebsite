<template>
  <div class="available-companions-page">
    <!-- Use the HeaderPage component -->
    <!-- <HeaderPage :activePage="activePage" :setActivePage="setActivePage" /> -->

    <h1>Available Experts for {{ selectedTechnology }}</h1>

    <!-- Display Loading State -->
    <p v-if="isLoading">Loading experts...</p>

    <!-- Display No Experts Message -->
    <p v-if="!isLoading && availableExperts.length === 0">
      No experts available for this technology.
    </p>

    <!-- Display the List of Experts -->
    <div v-else>
      <form @submit.prevent="submitSelection">
        <div
          v-for="expert in availableExperts"
          :key="expert.expert_id"
          class="expert-card"
        >
          <input
            type="checkbox"
            :value="expert.expert_id"
            v-model="selectedCompanions"
            id="expert-{{ expert.expert_id }}"
          />
          <label :for="'expert-' + expert.expert_id">
            <h3>{{ expert.name }}</h3>
          </label>
          <p>Skills: {{ JSON.parse(expert.skills).join(", ") }}</p>
          <p>
            Status: {{ expert.is_available ? "Available" : "Not Available" }}
          </p>
        </div>
        <div class="submit-section">
          <button :disabled="selectedCompanions.length === 0" type="submit">
            Submit Selection
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import HeaderPage from "./HeaderPage.vue"; // Import the HeaderPage component
import axios from "axios";

export default {
  name: "AvailableCompanionPage",
  // components: {
  //   HeaderPage, // Declare the component to be used in the template
  // },
  data() {
    return {
      selectedTechnology: "", // Selected technology passed as a query parameter
      availableExperts: [], // List of available experts for the selected technology
      selectedCompanions: [], // Array of selected companion IDs
      interviewIds: [], // Array to store interview IDs from URL
      isLoading: false, // Track loading state
      studentId: localStorage.getItem("studentId"), // Fetch student ID from localStorage
      activePage: "home", // Default active page for header navigation
    };
  },
  methods: {
    setActivePage(page) {
      this.activePage = page;
    },

    async fetchAvailableExperts() {
      try {
        this.isLoading = true; // Start loading
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const response = await axios.get(
          `https://interview-companion-440607.uc.r.appspot.com/api/experts/skill_name/${this.selectedTechnology}`,
          {
            headers: {
              "auth-token": token, // Pass token in headers
            },
          }
        );

        // Filter and parse the 'skills' field
        this.availableExperts = response.data.experts.filter((expert) => {
          const skillsArray = JSON.parse(expert.skills);
          return (
            skillsArray.includes(this.selectedTechnology) && expert.is_available
          );
        });
      } catch (error) {
        console.error("Error fetching available experts:", error);
        alert("Failed to load experts. Please try again.");
      } finally {
        this.isLoading = false; // End loading
      }
    },

    async submitSelection() {
      if (!this.studentId) {
        alert("Student ID is missing. Please log in again.");
        return;
      }

      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        // Prepare payloads by correctly matching companions with interview IDs
        const payloadArray = this.selectedCompanions.map((companionId) => {
          // Find the interview ID based on the companion ID
          const interviewId = this.interviewIds.find((id, index) => {
            return (
              index ===
              this.availableExperts.findIndex(
                (expert) => expert.expert_id === companionId
              )
            );
          });

          return {
            student_id: this.studentId, // Include student_id from localStorage
            companions: [companionId], // Single companion ID as an array
            interview_id: interviewId, // Correctly mapped interview ID
          };
        });

        // Send notifications for each selected companion
        const notifications = await Promise.all(
          payloadArray.map(async (payload) => {
            const response = await axios.post(
              "https://interview-companion-440607.uc.r.appspot.com/api/notifications/send",
              payload,
              {
                headers: {
                  "auth-token": token, // Pass token in headers
                },
              }
            );
            return response.status === 200 ? "Success" : "Failed";
          })
        );

        // Handle results
        if (notifications.every((status) => status === "Success")) {
          alert("All notifications sent successfully!");
          this.$router.push({ name: "StudentNotificationPage" });
        } else {
          alert("Some notifications failed to send. Please check logs.");
        }

        this.selectedCompanions = []; // Reset selection
      } catch (error) {
        console.error("Error during submission:", error);
        alert("An error occurred while submitting. Please try again.");
      }
    },
  },
  created() {
    // Get technology and interview_ids from query parameters
    const queryParams = new URLSearchParams(this.$route.query);
    this.selectedTechnology = queryParams.get("technology") || ""; // Get technology from query or set a default
    this.interviewIds = JSON.parse(queryParams.get("interview_ids") || "[]"); // Get interview_ids from query

    if (this.selectedTechnology) {
      this.fetchAvailableExperts(); // Fetch experts when the component is created
    }
  },
};
</script>

<style scoped>
.available-companions-page {
  padding: 20px;
}

.expert-card {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.expert-card h3 {
  margin-top: 0;
}

.submit-section {
  margin-top: 20px;
  text-align: center;
}

.submit-section button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-section button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>

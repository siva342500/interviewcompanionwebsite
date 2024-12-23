<template>
  <div class="page-container">
    <div class="content">
      <h1>Expert Details</h1>
      <p v-if="loading">Loading expert details...</p>
      
      <div v-else>
        <!-- Expert Details Form -->
        <form>
          <!-- Name -->
          <div class="form-group">
            <label for="name"><strong>Name:</strong></label>
            <input
              id="name"
              type="text"
              v-model="expert.name"
              class="form-control"
              :disabled="true"
            />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email"><strong>Email:</strong></label>
            <input
              id="email"
              type="email"
              v-model="expert.email"
              class="form-control"
              :disabled="true"
            />
          </div>

          <!-- Phone -->
          <div class="form-group">
            <label for="phone"><strong>Phone:</strong></label>
            <input
              id="phone"
              type="text"
              v-model="expert.phone"
              class="form-control"
              :disabled="true"
            />
          </div>              
        </form>
        <p v-if="message" class="error-message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ExpertPersonalDetails",
  data() {
    return {
      expert: null,
      loading: true,
      message: "",
      expertId: null,
      token: null,
    };
  },
  created() {
    this.getLocalStorageData(); // Retrieve token and expert ID from local storage
    this.fetchExpertDetails(); // Fetch expert details when the component is created
  },
  methods: {
    // Retrieve token and expert ID from local storage
    getLocalStorageData() {
      this.token = localStorage.getItem("token");
      this.expertId = localStorage.getItem("expertId");

      if (!this.token || !this.expertId) {
        console.error("Token or Expert ID is missing. Please log in again.");
        alert("Session expired. Please log in again.");
        // Optionally, redirect to login page here
      }
    },

    // Fetch expert details from the API
    async fetchExpertDetails() {
      try {
        const response = await axios.get(
          `https://interview-companion-440607.uc.r.appspot.com/api/experts/${this.expertId}`,
          {
            headers: {
              "auth-token": this.token,
            },
          }
        );

        // Log the full response to inspect the data structure
        console.log("API Response:", response);

        if (response.data) {
          // Map the API response to Vue's expert object
          this.expert = {
            expert_id: response.data.expert_id,
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
                    
            skills: JSON.parse(response.data.skills), // Parse the skills JSON
          };
        } else {
          console.error("No expert data found.");
          this.message = "Expert details not found.";
        }
      } catch (error) {
        console.error("Error fetching expert details:", error.response?.data || error);
        this.message = "Error loading expert details. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 400px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin: 15px 0;
}

label {
  font-weight: bold;
}

input.form-control {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>

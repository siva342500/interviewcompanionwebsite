<template>
  <div class="page-container">
    <div class="content">
      <h1>Contact Us</h1>
      <p v-if="loading">Submitting your message...</p>

      <div v-else>
        <form @submit.prevent="submitMessage">
          <!-- Subject Input -->
          <div class="form-group">
            <label for="subject"><strong>Subject:</strong></label>
            <input
              id="subject"
              type="text"
              v-model="subject"
              class="form-control"
              required
            />
          </div>

          <!-- Message Input -->
          <div class="form-group">
            <label for="message"><strong>Message:</strong></label>
            <textarea
              id="message"
              v-model="message"
              class="form-control"
              required
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="form-group">
            <button type="submit" class="btn-submit">Submit</button>
          </div>
        </form>

        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ExpertContactUs",
  data() {
    return {
      subject: "",
      message: "",
      expertId: null,
      token: null,
      loading: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  created() {
    this.getLocalStorageData(); // Retrieve token and expert ID from local storage
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

    // Submit the message to the API
    async submitMessage() {
      if (!this.subject || !this.message) {
        alert("Please fill in both the subject and the message.");
        return;
      }

      this.loading = true;
      this.errorMessage = ""; // Reset previous error message
      this.successMessage = ""; // Reset previous success message

      try {
        const response = await axios.post(
          "https://interview-companion-440607.uc.r.appspot.com/api/whatsapp/send-whatsapp-message",
          {
            subject: this.subject,
            message: this.message,
            expertId: this.expertId,
          },
          {
            headers: {
              "auth-token": this.token,
            },
          }
        );

        // Check if response status is successful
        if (
          response.data &&
          response.data.status === "Message sent successfully"
        ) {
          this.successMessage = "Message sent successfully";
          this.subject = ""; // Clear subject field
          this.message = ""; // Clear message field
        } else {
          this.errorMessage = "Failed to send message. Please try again later.";
        }
      } catch (error) {
        console.error(
          "Error submitting message:",
          error.response?.data || error
        );
        this.errorMessage = "Error sending message. Please try again.";
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

input.form-control,
textarea.form-control {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

button.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #070708;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button.btn-submit:hover {
  background-color: #000000;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>

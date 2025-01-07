<template>
  <AppHeader></AppHeader>
  <div>
    <h2>Send a Message</h2>
    <form @submit.prevent="sendMessage">
      <div class="form-group">
        <label for="subject">Subject:</label>
        <input
          id="subject"
          type="text"
          v-model="subject"
          placeholder="Enter subject"
          required
        />
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea
          id="message"
          v-model="message"
          placeholder="Enter your message"
          required
        ></textarea>
      </div>
      <button type="submit" class="submit-button">Send</button>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2"; // Import SweetAlert2
import axios from "axios";
import AppHeader from "./AppHeader.vue";
export default {
   components: {
    AppHeader,
  },
  data() {
    return {
      subject: "",
      message: "",
      studentId: this.$route.params.studentId, // Get student ID from route params
    };
  },
  methods: {
    async sendMessage() {
      const token = localStorage.getItem("token"); // Retrieve token

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Authentication Required",
          text: "You are not logged in. Please log in to continue.",
        });
        return;
      }

      try {
        const apiUrl =
          "https://api.interview-companion.com/api/send-whatsapp-message";

        const payload = {
          subject: this.subject,
          message: this.message,
          studentId: this.studentId,
        };

        const response = await axios.post(apiUrl, payload, {
          headers: {
            "auth-token": token,
          },
        });

        // Check if the response includes a success status
        if (response.data.status === "Message sent successfully") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Message sent successfully!",
          });

          // Reset form fields
          this.subject = "";
          this.message = "";
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Failed to send the message. Please try again.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while sending the message. Please try again.",
        });
      }
    },
  },
};
</script>

<style scoped>
/* Form Styling */
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  font-size: 14px;
  color: #333;
}
input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #000000;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button.submit-button:hover {
  background-color: #a9a9a9;
}
</style>

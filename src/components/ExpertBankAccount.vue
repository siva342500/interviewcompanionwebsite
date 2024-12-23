<template>
  <div class="page-container">
    <div class="content">
      <h1>Bank Account Details</h1>
      <p v-if="loading">Loading bank details...</p>
      <div v-else>
        <!-- Bank details form -->
        <form @submit.prevent="updateBankDetails">
          <label>Account Holder Name:</label>
          <input
            type="text"
            v-model="bankDetails.account_holder_name"
            required
          />

          <label>Account Number:</label>
          <input type="text" v-model="bankDetails.account_number" required />

          <label>IFSC Code:</label>
          <input type="text" v-model="bankDetails.ifsc_code" required />

          <label>Bank Name:</label>
          <input type="text" v-model="bankDetails.bank_name" required />

          <button type="submit">Update</button>
        </form>

        <!-- Success Message -->
        <p v-if="message" class="success-message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ExpertBankAccount",
  data() {
    return {
      bankDetails: {
        account_holder_name: "",
        account_number: "",
        ifsc_code: "",
        bank_name: "",
      },
      loading: true,
      message: "",
      expertId: null,
      token: null,
    };
  },
  created() {
    this.getLocalStorageData(); // Retrieve token and expert ID from local storage
    this.fetchBankDetails(); // Fetch bank details when the component is created
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

    // Fetch bank details from the API
    async fetchBankDetails() {
      try {
        const response = await axios.get(
          `https://interview-companion-440607.uc.r.appspot.com/api/bank-accounts/${this.expertId}`,
          {
            headers: {
              "auth-token": this.token,
            },
          }
        );

        // Log the full response to inspect the data structure
        console.log("API Response:", response);

        if (response.data && response.data.data) {
          const data = response.data.data;
          console.log("Bank Details:", data);

          // Map the API response to Vue's bankDetails object
          this.bankDetails = {
            account_holder_name: data.accountHolderName || "",
            account_number: data.accountNumber || "",
            ifsc_code: data.ifscCode || "",
            bank_name: data.bankName || "",
          };
        } else {
          console.error("Invalid response data or no bank details found.");
        }
      } catch (error) {
        console.error(
          "Error fetching bank details:",
          error.response?.data || error
        );
        alert("Error loading bank details. Please try again.");
      } finally {
        this.loading = false;
      }
    },

    // Update bank details via API
    async updateBankDetails() {
      try {
        const response = await axios.put(
          `https://interview-companion-440607.uc.r.appspot.com/api/bank-accounts/${this.expertId}`,
          {
            accountHolderName: this.bankDetails.account_holder_name,
            accountNumber: this.bankDetails.account_number,
            ifscCode: this.bankDetails.ifsc_code,
            bankName: this.bankDetails.bank_name,
          },
          {
            headers: {
              "auth-token": this.token,
            },
          }
        );

        this.message = "Bank details updated successfully!";
        console.log("Update Response:", response.data);
      } catch (error) {
        console.error(
          "Error updating bank details:",
          error.response?.data || error
        );
        alert("Failed to update bank details. Please try again.");
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

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #6f7174;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #5e5f61;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>

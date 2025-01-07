<template>
  <AppHeader></AppHeader>
  <div class="student-profile-container">
    <!-- Payment History -->
    <div class="payment-history" v-if="paymentHistory.length > 0">
      <h2>Payment History</h2>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <!-- Display only the records for the current page -->
          <tr v-for="payment in paginatedPayments" :key="payment.id">
            <td>{{ payment.payment_id }}</td>
            <td>{{ payment.razorpay_order_id }}</td>
            <td>{{ payment.amount }}</td>
            <td>{{ payment.status }}</td>
            <td>{{ formatDate(payment.created_at) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">
          Next
        </button>
      </div>
    </div>
    <p v-else>Loading payment history...</p>
  </div>
</template>

<script>
import axios from "axios";
import AppHeader from "./AppHeader.vue";
export default {
   components: {
    AppHeader,
  },
  data() {
    return {
      studentId: null, // Student ID from route params
      paymentHistory: [], // All payment records
      currentPage: 1, // Current page in the pagination
      itemsPerPage: 5, // Number of items to show per page
    };
  },
  computed: {
    // Calculate the paginated payments based on the current page
    paginatedPayments() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.paymentHistory.slice(startIndex, endIndex);
    },
    // Calculate the total number of pages
    totalPages() {
      return Math.ceil(this.paymentHistory.length / this.itemsPerPage);
    },
  },
  async created() {
    this.studentId = this.$route.params.studentId; // Get student ID from route params
    await this.fetchPaymentHistory(); // Fetch payment history
  },
  methods: {
    // Fetch Payment History
    async fetchPaymentHistory() {
      const token = localStorage.getItem("token"); // Get auth token from localStorage
      const apiUrl = `https://api.interview-companion.com/api/payments/student/${this.studentId}`;

      if (token && this.studentId) {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              "auth-token": `${token}`, // Include auth-token
            },
          });

          // Check if response is valid
          if (
            response.data.status === "success" &&
            Array.isArray(response.data.payments)
          ) {
            this.paymentHistory = response.data.payments; // Set payment history
          } else {
            console.error(
              "Failed to fetch payment history. Invalid response structure."
            );
          }
        } catch (error) {
          console.error("Error fetching payment history:", error);
        }
      } else {
        console.error("Missing token or student ID.");
      }
    },

    // Format Date
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.student-profile-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  /* border: 1px solid #ccc;
  border-radius: 8px; */
  background-color: #f9f9f9;
}

h1,
h2 {
  font-family: Arial, sans-serif;
  color: #333;
}

p {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

strong {
  color: #555;
}

/* Pagination Styles */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 10px 15px;
  border: none;
  background-color: #1b1c1d;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  font-size: 16px;
  color: #333;
}
</style>

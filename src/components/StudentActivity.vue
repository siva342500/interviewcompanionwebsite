<template>
  <div>
    <h1>Your Activity</h1>

    <!-- Button Controls for Switching Between Sections -->
    <div class="row button-group">
      <div class="row">
        <div class="col-lg-6">
          <button
            @click="setActiveTab('reservedHistory')"
            :class="{ active: activeTab === 'reservedHistory' }"
            class="btn"
          >
            Reserved History
          </button>
        </div>
        <div class="col-lg-6">
          <button
            @click="setActiveTab('activeReservations')"
            :class="{ active: activeTab === 'activeReservations' }"
            class="btn"
          >
            Active Reservations
          </button>
        </div>
      </div>
    </div>

    <!-- Reserved History Section -->
    <section v-if="activeTab === 'reservedHistory'">
      <h2>Reserved History</h2>
      <table v-if="reservedHistory.length > 0" class="table">
        <thead>
          <tr>
            <th>Interview Date</th>
            <th>Time</th>
            <th>Technology</th>
            <th>Expert Name</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedReservedHistory" :key="item.mapping_id">
            <td>{{ item.interview.interview_date }}</td>
            <td>{{ item.interview.interview_time }}</td>
            <td>{{ item.interview.skills.skill_name }}</td>
            <td>{{ item.expert.name }}</td>
            <td>{{ item.payment.status }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <p>No reserved history available.</p>
      </div>

      <!-- Pagination for Reserved History -->
      <div class="pagination">
        <button
          @click="changePage('reservedHistory', 'prev')"
          :disabled="currentReservedHistoryPage === 1"
        >
          Previous
        </button>
        <span>Page {{ currentReservedHistoryPage }}</span>
        <button
          @click="changePage('reservedHistory', 'next')"
          :disabled="currentReservedHistoryPage === totalReservedHistoryPages"
        >
          Next
        </button>
      </div>
    </section>

    <!-- Active Reservations Section -->
    <section v-if="activeTab === 'activeReservations'">
      <h2>Active Reservations</h2>
      <table v-if="activeReservations.length > 0" class="table">
        <thead>
          <tr>
            <th>Interview Date</th>
            <th>Time</th>
            <th>Technology</th>
            <th>Expert Name</th>
            <th>Payment Status</th>
            <!-- <th>Action</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in paginatedActiveReservations"
            :key="item.mapping_id"
          >
            <td>{{ item.interview.interview_date }}</td>
            <td>{{ item.interview.interview_time }}</td>
            <td>{{ item.interview.skills.skill_name }}</td>
            <td>{{ item.expert.name }}</td>
            <td>{{ item.payment.status }}</td>
            <!-- <td>
              <button
                class="cancel-button"
                @click="confirmCancelReservation(item)"
              >
                Cancel Reservation
              </button>
            </td> -->
          </tr>
        </tbody>
      </table>
      <div v-else>
        <p>No active reservations available.</p>
      </div>

      <!-- Pagination for Active Reservations -->
      <div class="pagination">
        <button
          @click="changePage('activeReservations', 'prev')"
          :disabled="currentActiveReservationsPage === 1"
        >
          Previous
        </button>
        <span>Page {{ currentActiveReservationsPage }}</span>
        <button
          @click="changePage('activeReservations', 'next')"
          :disabled="
            currentActiveReservationsPage === totalActiveReservationsPages
          "
        >
          Next
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentActivity",
  data() {
    return {
      activeTab: "reservedHistory", // Default active tab
      reservedHistory: [], // Array to store past interviews
      activeReservations: [], // Array to store today's and future interviews
      studentId: 1, // Example student_id (replace with dynamic ID if needed)
      currentReservedHistoryPage: 1, // Current page for reserved history
      currentActiveReservationsPage: 1, // Current page for active reservations
      itemsPerPage: 5, // Number of items per page
    };
  },
  computed: {
    // Calculate the total number of pages for Reserved History
    totalReservedHistoryPages() {
      return Math.ceil(this.reservedHistory.length / this.itemsPerPage);
    },
    // Calculate the total number of pages for Active Reservations
    totalActiveReservationsPages() {
      return Math.ceil(this.activeReservations.length / this.itemsPerPage);
    },
    // Paginate Reserved History data
    paginatedReservedHistory() {
      const startIndex =
        (this.currentReservedHistoryPage - 1) * this.itemsPerPage;
      return this.reservedHistory.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    // Paginate Active Reservations data
    paginatedActiveReservations() {
      const startIndex =
        (this.currentActiveReservationsPage - 1) * this.itemsPerPage;
      return this.activeReservations.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
  },
  methods: {
    // Fetch student activity data from the API
    async fetchStudentActivity() {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        if (!token) {
          alert("Authorization token is missing. Please log in.");
          this.$router.push({ name: "Login" }); // Redirect to login if token is missing
          return;
        }

        const response = await axios.get(
          `https://interview-companion-440607.uc.r.appspot.com/api/mappings/student/${this.studentId}`,
          {
            headers: {
              "auth-token": token, // Pass the token in headers
            },
          }
        );

        if (response.data.success) {
          const data = response.data.data;

          // Filter Reserved History (Past Interviews)
          this.reservedHistory = data.filter((item) => {
            const interviewDate = new Date(item.interview.interview_date);
            return interviewDate < new Date(); // Interviews before today
          });

          // Filter Active Reservations (Today and Future Interviews)
          this.activeReservations = data.filter((item) => {
            const interviewDate = new Date(item.interview.interview_date);
            return (
              interviewDate >= new Date() && item.payment.status !== "CANCELLED"
            ); // Today and future dates, excluding cancelled
          });
        } else {
          alert("Failed to fetch student activity. Please try again.");
          console.error(
            "Failed to fetch student activity:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching student activity:", error);
        alert(
          "An error occurred while fetching activity data. Please try again."
        );
      }
    },

    // Set the active tab (Reserved History or Active Reservations)
    setActiveTab(tab) {
      this.activeTab = tab;
      if (tab === "reservedHistory") {
        this.currentReservedHistoryPage = 1; // Reset to first page when tab is changed
      } else {
        this.currentActiveReservationsPage = 1; // Reset to first page when tab is changed
      }
    },

    // Handle pagination for reserved history or active reservations
    changePage(tab, direction) {
      if (tab === "reservedHistory") {
        if (
          direction === "next" &&
          this.currentReservedHistoryPage < this.totalReservedHistoryPages
        ) {
          this.currentReservedHistoryPage++;
        } else if (
          direction === "prev" &&
          this.currentReservedHistoryPage > 1
        ) {
          this.currentReservedHistoryPage--;
        }
      } else if (tab === "activeReservations") {
        if (
          direction === "next" &&
          this.currentActiveReservationsPage < this.totalActiveReservationsPages
        ) {
          this.currentActiveReservationsPage++;
        } else if (
          direction === "prev" &&
          this.currentActiveReservationsPage > 1
        ) {
          this.currentActiveReservationsPage--;
        }
      }
    },

    // Cancel reservation for active reservations
    confirmCancelReservation(item) {
      if (confirm("Are you sure you want to cancel this reservation?")) {
        this.cancelReservation(item);
      }
    },

    // Cancel reservation
    async cancelReservation(item) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Authorization token is missing. Please log in.");
          this.$router.push({ name: "Login" });
          return;
        }

        // Payload for the API
        const payload = {
          interview_id: item.interview_id,
          student_id: item.student_id,
          expert_id: item.expert_id,
          amount: item.payment.amount,
          status: "CANCELLED",
        };

        const response = await axios.post(
          `https://interview-companion-440607.uc.r.appspot.com/api/cancel-reservation`,
          payload,
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        if (response.data.success) {
          alert("Reservation canceled successfully.");

          // Move the canceled reservation to Reserved History
          const canceledIndex = this.activeReservations.findIndex(
            (res) => res.mapping_id === item.mapping_id
          );
          if (canceledIndex !== -1) {
            const canceledItem = this.activeReservations.splice(
              canceledIndex,
              1
            )[0];
            canceledItem.payment.status = "CANCELLED";
            this.reservedHistory.push(canceledItem);
          }
        } else {
          alert("Failed to cancel the reservation. Please try again.");
          console.error("API Error:", response.data.message);
        }
      } catch (error) {
        console.error("Error canceling reservation:", error);
        alert("An error occurred while canceling the reservation.");
      }
    },
  },
  mounted() {
    this.fetchStudentActivity(); // Fetch data when the component is mounted
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.col-lg-6 {
  width: 50%;
}

.section {
  margin: 20px 0;
}

.button-group {
  text-align: center;
  margin-bottom: 20px;
  text-decoration: line-through;
}

.button-group button {
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
}

.button-group button.active {
  background-color: #9e9a9a;
  color: rgb(16, 15, 15);
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.cancel-button {
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #e60000;
}

.pagination {
  text-align: center;
}

.pagination button {
  padding: 5px 10px;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  background-color: #f0f0f0;
}

.pagination span {
  margin: 0 10px;
}
</style>

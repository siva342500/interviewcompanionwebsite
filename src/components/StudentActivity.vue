<template>
  <AppHeader :notificationCount="notificationCount"></AppHeader>
  <div>
    <div class="heading-container">
      <h1>Your Activity</h1>
    </div>

    <!-- Button Controls for Switching Between Sections -->
    <div class="row button-group">
      <div class="row">
        <div class="col-lg-6">
          <button
            @click="setActiveTab('activeReservations')"
            :class="{ active: activeTab === 'activeReservations' }"
            class="btn"
          >
            Active Reservations
          </button>
        </div>
        <div class="col-lg-6">
          <button
            @click="setActiveTab('reservedHistory')"
            :class="{ active: activeTab === 'reservedHistory' }"
            class="btn"
          >
            Reserved History
          </button>
        </div>
      </div>
    </div>

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
            <td>{{ item.interview.skills?.skill_name || "N/A" }}</td>
            <td>{{ item.expert.name }}</td>
            <td>{{ item.payment.status }}</td>
            <!-- <td>
              <button
                @click="handleCancelReservation(item)"
                class="btn btn-danger"
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
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedReservedHistory" :key="item.mapping_id">
            <td>{{ item.interview.interview_date }}</td>
            <td>{{ item.interview.interview_time }}</td>
            <td>{{ item.interview.skills?.skill_name || "N/A" }}</td>
            <td>{{ item.expert.name }}</td>
            <td>{{ item.payment.status }}</td>
            <td>
              <!-- Show rate button only when payment status is not "CANCELLED" -->
              <button
                v-if="
                  item.payment.status !== 'CANCELLED' &&
                  !getRatingForInterview(item.interview.interview_id)
                "
                @click="openRatingModal(item)"
                class="rate-btn"
              >
                Rate
              </button>
              <span v-else>
                {{
                  getRatingForInterview(item.interview.interview_id)?.rating ||
                  "No Rating"
                }}
              </span>
            </td>
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

    <!-- Rating Modal -->
    <div v-if="showRatingModal" class="modal">
      <div class="modal-content">
        <h2>Rate Expert</h2>
        <label for="rating">Rating (1-5):</label>
        <input type="number" v-model="rating" min="1" max="5" />
        <label for="comment">Comment:</label>
        <textarea
          v-model="comment"
          placeholder="Write a comment..."
          rows="4"
        ></textarea>
        <button @click="submitRating">Submit Rating</button>
        <button @click="closeRatingModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      activeTab: "activeReservations", // Default active tab
      reservedHistory: [],
      activeReservations: [],
      studentId: 1, // Example student ID (replace with dynamic ID if needed)
      currentReservedHistoryPage: 1,
      currentActiveReservationsPage: 1,
      notificationCount: 0,
      itemsPerPage: 5,
      showRatingModal: false,
      selectedReservation: null,
      rating: 0,
      comment: "", // Added comment field
      expertId: null, // Will store expert_id
      ratingsData: [], // Store ratings data
    };
    
  },
   created() {
    const storedCount = localStorage.getItem("notificationCount");
    this.notificationCount = storedCount ? parseInt(storedCount, 10) : 0; // Get count from local storage
  },
  computed: {
    totalReservedHistoryPages() {
      return Math.ceil(this.reservedHistory.length / this.itemsPerPage);
    },
    totalActiveReservationsPages() {
      return Math.ceil(this.activeReservations.length / this.itemsPerPage);
    },
    paginatedReservedHistory() {
      const startIndex =
        (this.currentReservedHistoryPage - 1) * this.itemsPerPage;
      return this.reservedHistory.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
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
    async fetchStudentActivity() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Authorization token is missing. Please log in.");
          this.$router.push({ name: "Login" });
          return;
        }

        const response = await axios.get(
          `https://api.interview-companion.com/api/mappings/student/${this.studentId}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        if (response.data.success) {
          const data = response.data.data;
          this.reservedHistory = data.filter((item) => {
            const interviewDate = new Date(item.interview.interview_date);
            return interviewDate < new Date();
          });
          this.activeReservations = data.filter((item) => {
            const interviewDate = new Date(item.interview.interview_date);
            return (
              interviewDate >= new Date() && item.payment.status !== "CANCELLED"
            );
          });

          // Fetch ratings data after fetching the activity
          await this.fetchRatings();
        } else {
          alert("Failed to fetch student activity.");
        }
      } catch (error) {
        console.error("Error fetching student activity:", error);
      }
    },

    async fetchRatings() {
      try {
        const response = await axios.get(
          `https://api.interview-companion.com/api/ratings/student/${this.studentId}`
        );
        if (response.data.ratings) {
          this.ratingsData = response.data.ratings;
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    },

    // Method to get rating for a specific interview ID
    getRatingForInterview(interviewId) {
      return this.ratingsData.find(
        (rating) => rating.interview_id === interviewId
      );
    },

    setActiveTab(tab) {
      this.activeTab = tab;
      if (tab === "reservedHistory") {
        this.currentReservedHistoryPage = 1;
      } else {
        this.currentActiveReservationsPage = 1;
      }
    },

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

    handleCancelReservation(item) {
      if (
        confirm(
          `Are you sure you want to cancel the reservation for interview on ${item.interview.interview_date}?`
        )
      ) {
        // Call API to cancel reservation (implement the cancellation logic here)
        alert(
          `Reservation for interview on ${item.interview.interview_date} has been cancelled.`
        );
      }
    },

    openRatingModal(item) {
      this.selectedReservation = item;
      this.expertId = item.expert.expert_id; // Store expert ID
      this.showRatingModal = true;
    },

    closeRatingModal() {
      this.showRatingModal = false;
      this.comment = ""; // Clear comment field
    },

    async submitRating() {
      try {
        if (this.rating < 1 || this.rating > 5) {
          alert("Please provide a rating between 1 and 5.");
          return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
          alert("Authorization token is missing. Please log in.");
          this.$router.push({ name: "Login" });
          return;
        }

        const response = await axios.post(
          `https://api.interview-companion.com/api/rate`,
          {
            interview_id: this.selectedReservation.interview.interview_id,
            student_id: this.studentId,
            expert_id: this.expertId,
            rating: this.rating,
            comment: this.comment,
          },
          {
            headers: {
              "auth-token": token, // Include the auth token in the headers
            },
          }
        );

        if (response.data) {
          alert("Your rating has been submitted.");
          this.fetchStudentActivity(); // Refresh activity data
          this.closeRatingModal(); // Close modal after submission
        } else {
          alert("Failed to submit rating.");
        }
      } catch (error) {
        console.error("Error submitting rating:", error);
      }
    },
  },

  mounted() {
    this.fetchStudentActivity();
  },
};
</script>

<style scoped>
.button-group {
  margin-top: 20px;
}

.btn.active {
  background-color: #000;
  color: #fff;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}

.rate-btn {
  background-color: green;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}
.heading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

h1 {
  text-align: center; /* Ensure text is centered */
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

/* Responsive Styles */

/* Mobile */
@media only screen and (max-width: 767px) {
  .btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .button-group {
    margin-top: 10px;
  }

  .row {
    margin-right: 0;
    margin-left: 0;
  }

  .pagination {
    text-align: center;
    margin-top: 10px;
  }

  .pagination button {
    margin: 0 5px;
    padding: 5px 10px;
  }

  .modal-content {
    width: 90%;
    padding: 10px;
  }

  .table {
    font-size: 12px;
  }

  .rate-btn {
    font-size: 14px;
    padding: 5px 10px;
  }

  /* Adjust table content */
  table th,
  table td {
    padding: 8px 5px;
  }

  h1,
  h2 {
    font-size: 18px;
  }

  .pagination button {
    padding: 5px;
  }
}

/* Tablet */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .btn {
    width: 48%;
    margin-bottom: 10px;
  }

  .button-group {
    margin-top: 15px;
  }

  .pagination {
    text-align: center;
    margin-top: 10px;
  }

  .pagination button {
    margin: 0 5px;
    padding: 7px 15px;
  }

  .modal-content {
    width: 70%;
    padding: 20px;
  }

  .rate-btn {
    font-size: 16px;
    padding: 8px 15px;
  }
  .centered-heading {
    text-align: center;
    margin-top: 20px; /* Optional, for some spacing */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  table th,
  table td {
    padding: 10px;
  }

  h1,
  h2 {
    font-size: 20px;
  }
}

/* Desktop */
@media only screen and (min-width: 1025px) {
  .btn {
    width: auto;
    margin-bottom: 0;
  }

  .button-group {
    margin-top: 20px;
  }

  .pagination {
    margin-top: 20px;
  }

  .pagination button {
    margin: 0 10px;
    padding: 10px 20px;
  }

  .modal-content {
    width: 50%;
    padding: 20px;
  }

  .rate-btn {
    font-size: 18px;
    padding: 10px 20px;
  }

  table th,
  table td {
    padding: 15px 20px;
  }

  h1,
  h2 {
    font-size: 24px;
  }
}
</style>

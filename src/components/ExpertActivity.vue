<template>
  <div class="activity-container">
    <div class="content">
      <h1>Expert Activity</h1>

      <!-- Buttons for toggling views -->
      <div class="button-row">
        <button
          :class="{ active: currentView === 'active' }"
          @click="showActiveReservations"
        >
          Active Reservations
        </button>
        <button
          :class="{ active: currentView === 'history' }"
          @click="showReservationHistory"
        >
          Reservation History
        </button>
      </div>

      <!-- Loading state -->
      <p v-if="loading">Loading your activities...</p>

      <!-- Display Active Reservations -->
      <div v-else-if="currentView === 'active'">
        <h2>Active Reservations</h2>
        <table v-if="paginatedData.length > 0" class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Interview Date</th>
              <th>Interview Time</th>
              <th>Skill</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(reservation, index) in paginatedData" :key="index">
              <td>{{ startIndex + index + 1 }}</td>
              <td>{{ reservation.interview.interview_date }}</td>
              <td>
                {{ reservation.interview.interview_time }}
                {{ reservation.interview.time_zone }}
              </td>
              <td>
                {{
                  reservation.interview.skills
                    ? reservation.interview.skills.skill_name
                    : "N/A"
                }}
              </td>
              <td>
                ${{
                  reservation.interview.skills
                    ? reservation.interview.skills.amount
                    : "N/A"
                }}
              </td>

              <td>
                <span>{{
                  getClaimStatus(reservation.interview.interview_id)
                }}</span>
              </td>
              <td>
                <button
                  :disabled="
                    isClaimed(reservation.interview.interview_id) ||
                    isPastOrToday(reservation.interview.interview_date)
                  "
                  @click="claimInterview(reservation)"
                >
                  Claim Now
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No active reservations found.</p>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">
            Previous
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages">
            Next
          </button>
        </div>
      </div>

      <!-- Display Reservation History -->
      <div v-else-if="currentView === 'history'">
        <h2>Reservation History</h2>
        <table v-if="paginatedData.length > 0" class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Interview Date</th>
              <th>Interview Time</th>
              <th>Skill</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(history, index) in paginatedData" :key="index">
              <td>{{ startIndex + index + 1 }}</td>
              <td>{{ history.interview.interview_date }}</td>
              <td>
                {{ history.interview.interview_time }}
                {{ history.interview.time_zone }}
              </td>
              <td>
                {{
                  history.interview.skills
                    ? history.interview.skills.skill_name
                    : "N/A"
                }}
              </td>
              <td>
                ${{
                  history.interview.skills
                    ? history.interview.skills.amount
                    : "N/A"
                }}
              </td>

              <td>
                <span>{{
                  getClaimStatus(history.interview.interview_id)
                }}</span>
              </td>
              <td>
                <button
                  :disabled="
                    isClaimed(history.interview.interview_id) ||
                    isPastOrToday(history.interview.interview_date)
                  "
                  @click="claimInterview(history)"
                >
                  Claim Now
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No reservation history found.</p>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">
            Previous
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ExpertActivity",
  data() {
    return {
      token: null,
      expertId: null,
      allActivities: [],
      activeReservations: [],
      reservationHistory: [],
      claims: [],
      loading: false,
      currentView: "active",
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const data =
        this.currentView === "active"
          ? this.activeReservations
          : this.reservationHistory;
      return data.slice(start, end);
    },
    totalPages() {
      const data =
        this.currentView === "active"
          ? this.activeReservations
          : this.reservationHistory;
      return Math.ceil(data.length / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
  },
  created() {
    this.getLocalStorageData();
    this.fetchActivities();
    this.fetchClaims();
  },
  methods: {
    getLocalStorageData() {
      this.token = localStorage.getItem("token");
      this.expertId = localStorage.getItem("expertId");
      if (!this.token || !this.expertId) {
        alert("Session expired. Please log in again.");
      }
    },
    async fetchActivities() {
      if (!this.token || !this.expertId) return;
      this.loading = true;
      try {
        // Fetching active and history activities using the same API but filtered
        const response = await axios.get(
          `https://api.interview-companion.com/api/mappings/expert/${this.expertId}`,
          { headers: { "auth-token": this.token } }
        );
        if (response.data.success) {
          this.allActivities = response.data.data;
          this.filterActivities();
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchClaims() {
      try {
        const response = await axios.get(
          `https://api.interview-companion.com/api/claims/expert/${this.expertId}`,
          { headers: { "auth-token": this.token } }
        );
        if (response.data.success) {
          this.claims = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    },
    filterActivities() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.activeReservations = [];
      this.reservationHistory = [];

      this.allActivities.forEach((activity) => {
        const interviewDate = new Date(activity.interview.interview_date);
        if (interviewDate >= today) {
          this.activeReservations.push(activity);
        } else {
          this.reservationHistory.push(activity);
        }
      });
    },
    isClaimed(interviewId) {
      return this.claims.some((claim) => claim.interview_id === interviewId);
    },
    getClaimStatus(interviewId) {
      const claim = this.claims.find(
        (claim) => claim.interview_id === interviewId
      );
      return claim ? claim.status : "Not Claimed";
    },
    async claimInterview(reservation) {
      const claimData = {
        interview_id: reservation.interview.interview_id,
        student_id: reservation.student.student_id, // Pass the student_id from the reservation data
        expert_id: this.expertId,
        skill_id: reservation.interview.skills.skill_id,
        amount: reservation.interview.skills.amount,
        status: "pending",
        bankaccount_id: 1, // Update with the actual bank account ID if required
      };

      try {
        const response = await axios.post(
          `https://api.interview-companion.com/api/claims`,
          claimData,
          { headers: { "auth-token": this.token } }
        );
        if (response.data.success) {
          alert("Claim submitted successfully.");
          this.fetchClaims();
        } else {
          alert("Failed to submit claim.");
        }
      } catch (error) {
        console.error("Error submitting claim:", error.response?.data || error);
        alert(
          error.response?.data?.errors?.student_id?.[0] || "An error occurred."
        );
      }
    },
    showActiveReservations() {
      this.currentView = "active";
    },
    showReservationHistory() {
      this.currentView = "history";
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    isPastOrToday(interviewDate) {
      const interviewDateObj = new Date(interviewDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return interviewDateObj > today;
    },
  },
};
</script>

<style scoped>
/* Add your styling here */
</style>

<style scoped>
/* Add styles for button rows, tables, etc., here. */
</style>

<style scoped>
.activity-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.content {
  width: 100%;
  max-width: 900px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.button-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.button-row button {
  padding: 10px 15px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.button-row button.active {
  background-color: #0e1011;
  color: #fff;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #131414;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
h1 {
  text-align: center;
}
.pagination button.active {
  background-color: #0d0d0e;
}
</style>

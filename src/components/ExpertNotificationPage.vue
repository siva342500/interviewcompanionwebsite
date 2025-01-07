<template>
  <div class="page-container">
    <div class="content">
      <h1>Expert Notifications</h1>
      <p v-if="loading">Loading notifications...</p>
      <div v-else>
        <div v-if="filteredNotifications.length > 0">
          <!-- Notification Table -->
          <table class="notification-table">
            <thead>
              <tr>
                <th>Message</th>
                <th>Interview Date</th>
                <th>Interview Time & Zone</th>
                <th>Tech Requirements</th>
                <th>Job Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="notification in paginatedNotifications"
                :key="notification.notification_id"
              >
                <td>{{ notification.message }}</td>
                <td>{{ notification.interview.interview_date }}</td>
                <td>
                  {{ notification.interview.interview_time }} &nbsp;{{
                    notification.interview.time_zone
                  }}
                </td>
                <td>{{ notification.interview.tech_requirements }}</td>
                <td>{{ notification.interview.job_description }}</td>
                <td>{{ notification.interview.status }}</td>
                <td>
                  <button
                    @click="showConfirmationDialog(notification.interview_id)"
                  >
                    Confirm Interview
                  </button>
                  <button @click="showRejectDialog(notification.interview_id)">
                    Reject Interview
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination Controls -->
          <div class="pagination">
            <button :disabled="currentPage === 1" @click="prevPage">
              Previous
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="nextPage">
              Next
            </button>
          </div>
        </div>
        <div v-else>
          <p>No pending notifications.</p>
        </div>
      </div>

      <!-- Confirmation Dialog -->
      <div v-if="showDialog" class="modal">
        <div class="modal-content">
          <h3>Are you sure you want to confirm this interview?</h3>
          <button @click="confirmInterview(selectedInterviewId)">
            Confirm
          </button>
          <button @click="closeDialog">Close</button>
        </div>
      </div>

      <!-- Reject Dialog -->
      <div v-if="showRejectDialogFlag" class="modal">
        <div class="modal-content">
          <h3>Are you sure you want to reject this interview?</h3>
          <button @click="rejectInterview(selectedInterviewId)">Reject</button>
          <button @click="closeRejectDialog">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NotificationPage",
  data() {
    return {
      notifications: [], // All notifications fetched from API
      loading: true, // Loading state
      showDialog: false, // Modal visibility for confirm dialog
      showRejectDialogFlag: false, // Modal visibility for reject dialog
      selectedInterviewId: null, // Selected interview ID for confirmation/rejection
      currentPage: 1, // Current page number
      itemsPerPage: 5, // Number of items per page
    };
  },
  computed: {
    // Filter notifications where interview status is "PENDING"
    filteredNotifications() {
      return this.notifications.filter(
        (notification) =>
          notification.interview && notification.interview.status === "PENDING"
      );
    },
    // Paginate notifications
    paginatedNotifications() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNotifications.slice(start, end);
    },
    // Total number of pages
    totalPages() {
      return Math.ceil(this.filteredNotifications.length / this.itemsPerPage);
    },
  },
  async created() {
    this.fetchNotifications();
  },
  methods: {
    async fetchNotifications() {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const expertId = localStorage.getItem("expertId"); // Assuming expert ID is stored in localStorage

      if (token && expertId) {
        try {
          const response = await axios.get(
            `https://api.interview-companion.com/api/notifications/${expertId}`,
            {
              headers: {
                "auth-token": `${token}`, // Include the token in the Authorization header
              },
            }
          );
          // Store fetched notifications
          this.notifications = response.data.data.data;
        } catch (error) {
          console.error("Error fetching notifications:", error);
        } finally {
          this.loading = false; // Stop loading indicator
        }
      } else {
        console.error(
          "No token found or expertId is missing. Please log in again."
        );
      }
    },
    showConfirmationDialog(interviewId) {
      this.selectedInterviewId = interviewId;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.selectedInterviewId = null;
    },
    async confirmInterview(interviewId) {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (token) {
        try {
          const response = await axios.post(
            `https://api.interview-companion.com/api/interviews/${interviewId}/confirm`,
            { status: "CONFIRMED" },
            {
              headers: {
                "auth-token": `${token}`, // Include the token in the Authorization header
              },
            }
          );
          if (response.data.message === "Interview confirmed successfully.") {
            alert(response.data.message); // Show success message
            this.fetchNotifications(); // Refresh notifications
          } else {
            alert("Failed to confirm the interview.");
          }
        } catch (error) {
          console.error("Error confirming the interview:", error.response.data);
          alert(error.response.data.message || "An error occurred.");
        } finally {
          this.closeDialog(); // Close the confirmation dialog
        }
      } else {
        console.error("No token found. Please log in again.");
      }
    },
    showRejectDialog(interviewId) {
      this.selectedInterviewId = interviewId;
      this.showRejectDialogFlag = true;
    },
    closeRejectDialog() {
      this.showRejectDialogFlag = false;
      this.selectedInterviewId = null;
    },
    async rejectInterview(interviewId) {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (token) {
        try {
          const response = await axios.post(
            `https://api.interview-companion.com/api/interviews/${interviewId}/reject`,
            { status: "CANCELLED" },
            {
              headers: {
                "auth-token": `${token}`, // Include the token in the Authorization header
              },
            }
          );
          if (response.data.message === "Interview rejected successfully.") {
            alert(response.data.message); // Show success message
            this.fetchNotifications(); // Refresh notifications
          } else {
            alert("Failed to reject the interview.");
          }
        } catch (error) {
          console.error("Error rejecting the interview:", error.response.data);
          alert(error.response.data.message || "An error occurred.");
        } finally {
          this.closeRejectDialog(); // Close the reject dialog
        }
      } else {
        console.error("No token found. Please log in again.");
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.content {
  flex: 1;
  padding: 20px;
}

.notification-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.notification-table th,
.notification-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.notification-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

button {
  background-color: #6f7174;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #808284;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.modal-content button {
  margin: 10px;
}
</style>

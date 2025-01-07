<template>
  <AppHeader></AppHeader>
  <div class="page-container">
    <div class="content">
      <h1>Confirmed Interviews</h1>
      <p v-if="loading">Loading interviews...</p>
      <div v-else>
        <div v-if="interviews.length > 0">
          <table class="interview-table">
            <thead>
              <tr>
                <th>Expert Name</th>
                <th>Tech Requirements</th>
                <th>Interview Date</th>
                <th>Interview Time</th>
                <th>Job Description</th>
                <th>Skills</th>
                <th>Average Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="interview in interviews" :key="interview.interview_id">
                <td>{{ interview.name }}</td>
                <td>{{ interview.tech_requirements }}</td>
                <td>{{ interview.interview_date }}</td>
                <td>
                  {{ interview.interview_time }} {{ interview.time_zone }}
                </td>
                <td>{{ interview.job_description }}</td>
                <td>{{ parseSkills(interview.skills).join(", ") }}</td>
                <td>{{ interview.average_rating }}</td>
                <td>
                  <button @click="reserveInterview(interview)">Reserve</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>No confirmed interviews found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "StudentNotificationPage",
  components: {
    AppHeader,
  },
  data() {
    return {
      studentId: localStorage.getItem("studentId"),
      authToken: localStorage.getItem("token"),
      interviews: [],
      loading: true,
      studentProfile: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9876543210",
      },
    };
  },
  methods: {
    parseSkills(skills) {
      try {
        const parsedSkills = JSON.parse(skills);
        return Array.isArray(parsedSkills) ? parsedSkills : [];
      } catch (e) {
        console.error("Error parsing skills:", e);
        return [];
      }
    },
    async fetchInterviews() {
      try {
        const response = await axios.get(
          `https://api.interview-companion.com/api/interviews/confirmed-experts/${this.studentId}`,
          {
            headers: {
              "auth-token": `${this.authToken}`,
            },
          }
        );
        if (response.data) {
          this.interviews = response.data;
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
        alert("Failed to fetch confirmed interviews. Please try again later.");
      } finally {
        this.loading = false;
      }
    },

    async reserveInterview(interview) {
      const amount = interview.amount || 1;
      try {
        const response = await axios.post(
          "https://api.interview-companion.com/api/create-order",
          {
            amount: amount * 100,
            receipt: `receipt_${interview.interview_id}`,
            student_id: this.studentId,
            interview_id: interview.interview_id,
          },
          {
            headers: {
              "auth-token": `${this.authToken}`,
            },
          }
        );

        if (response && response.data) {
          const orderId = response.data.order_id;
          this.initiatePayment(orderId, interview, amount);
        } else {
          alert("Failed to create payment order. Please try again.");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to create payment order. Please try again.");
      }
    },

    initiatePayment(orderId, interview, amount) {
      if (typeof window.Razorpay === "undefined") {
        alert("Razorpay SDK is not loaded");
        return;
      }

      const options = {
        key: "rzp_test_c0ALHfuoiS0luD",
        amount: amount * 100,
        currency: "INR",
        name: "Interview Reservation",
        description: `Interview with ${interview.name}`,
        order_id: orderId,
        handler: async (response) => {
          const paymentDetails = {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: amount,
            student_id: this.studentId,
            expert_id: interview.expert_id,
            currency: "INR",
            interview_id: interview.interview_id,
          };

          try {
            const storePaymentResponse = await axios.post(
              "https://api.interview-companion.com/api/store-payment",
              paymentDetails,
              {
                headers: {
                  "auth-token": `${this.authToken}`,
                },
              }
            );

            if (storePaymentResponse.status === 200) {
              alert("Payment successful and stored successfully.");
              this.fetchInterviews();
            } else {
              alert("Failed to store payment details. Please try again.");
            }
          } catch (error) {
            console.error("Error storing payment details:", error);
            alert("Failed to store payment details. Please try again.");
          }
        },
        prefill: {
          name: this.studentProfile.name,
          email: this.studentProfile.email,
          contact: this.studentProfile.contact,
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    },
  },
  created() {
    this.fetchInterviews();
  },
};
</script>

<style scoped>
.page-container {
  padding: 80px 20px 20px; /* Account for fixed header */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
}

.interview-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.interview-table th,
.interview-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

button {
  background-color: #0c0e0d;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #050605;
}

@media (max-width: 768px) {
  .interview-table {
    font-size: 12px;
  }
  .interview-table th,
  .interview-table td {
    padding: 8px;
  }
}

@media (max-width: 576px) {
  .interview-table {
    font-size: 10px;
  }
  .interview-table th,
  .interview-table td {
    padding: 6px;
  }
  .content {
    padding: 10px;
  }
}

@media (max-width: 360px) {
  .interview-table {
    display: block;
    overflow-x: auto;
  }
  .content {
    padding: 5px;
  }
}
</style>

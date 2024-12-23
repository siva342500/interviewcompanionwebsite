<template>
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
export default {
  name: "StudentNotificationPage",

  data() {
    return {
      studentId: localStorage.getItem("studentId"),
      authToken: localStorage.getItem("token"),
      interviews: [],
      loading: true,
      studentProfile: {
        name: "",
        email: "",
        contact: "",
      },
    };
  },
  methods: {
    parseSkills(skills) {
      try {
        return JSON.parse(skills) || [];
      } catch (e) {
        console.error("Error parsing skills:", e);
        return [];
      }
    },

    async fetchInterviews() {
      try {
        const response = await axios.get(
          `https://interview-companion-440607.uc.r.appspot.com/api/interviews/confirmed-experts/${this.studentId}`,
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
          "https://interview-companion-440607.uc.r.appspot.com/api/create-order",
          {
            amount: amount,
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
      const options = {
        key: "rzp_test_c0ALHfuoiS0luD",
        amount: amount * 100,
        currency: "INR",
        name: "Interview Reservation",
        description: `Interview with ${interview.name}`,
        order_id: orderId,
        handler: async (response) => {
          console.log("Payment Success Response:", response);
          const paymentDetails = {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: amount,
            student_id: this.studentId,
            expert_id: interview.expert_id,
            currency: "INR",
            interview_id: interview.interview_id,
            payment_status: "successful",
          };

          try {
            const storePaymentResponse = await axios.post(
              "https://interview-companion-440607.uc.r.appspot.com/api/store-payment",
              paymentDetails,
              {
                headers: {
                  "auth-token": `${this.authToken}`,
                },
              }
            );
            if (storePaymentResponse.status === 200) {
              alert("Payment successful and stored successfully.");
            } else {
              alert("Failed to store payment details. Please try again.");
            }
          } catch (error) {
            alert("Failed to store payment details. Please try again.");
          }
        },
        prefill: {
          name: this.studentProfile.name,
          email: this.studentProfile.email,
          phone: this.studentProfile.contact,
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.content {
  width: 100%;
  max-width: 1200px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
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

.interview-table th {
  background-color: #f4f4f4;
}

.interview-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.interview-table tr:hover {
  background-color: #f1f1f1;
}

button {
  background-color: #28a745;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>

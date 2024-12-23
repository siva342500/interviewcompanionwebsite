<template>
  <div>
    <h6>Reserve your companion your interview</h6>

    <div class="page-container">
      <div class="content">
        <div class="interview-form">
          <!-- Form for Interview Reservation -->
          <form @submit.prevent="submitInterview">
            <!-- Select Technology Dropdown -->
            <div class="form-group">
              <label for="technology">Select Technology</label>
              <select v-model="selectedTechnology" id="technology" required>
                <option disabled value="">Select a technology</option>
                <option
                  v-for="skill in skills"
                  :key="skill.skill_id"
                  :value="skill.skill_name"
                >
                  {{ skill.skill_name }}
                </option>
              </select>
            </div>

            <!-- Interview Date -->
            <div class="form-group">
              <label for="interview_date">Interview Date</label>
              <input
                type="date"
                v-model="interviewDate"
                id="interview_date"
                required
              />
            </div>

            <!-- Interview Time -->
            <div class="form-group">
              <label for="interview_time">Interview Time</label>
              <input
                type="time"
                v-model="interviewTime"
                id="interview_time"
                required
              />
            </div>

            <!-- Interview Time Zone -->
            <div class="form-group">
              <label for="time_zone">Select Time Zone</label>
              <select v-model="timeZone" id="time_zone" required>
                <option disabled value="">Select Time Zone</option>
                <option value="IST">IST</option>
                <option value="EDT">EDT</option>
                <option value="BST">BST</option>
                <option value="GST">GST</option>
              </select>
            </div>

            <!-- Job Description -->
            <div class="form-group">
              <label for="job_description">Job Description</label>
              <textarea
                v-model="jobDescription"
                id="job_description"
                required
              ></textarea>
            </div>

            <button type="submit">Reserve Interview</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentInterviewForm",

  data() {
    return {
      skills: [], // Skills list fetched from API
      selectedTechnology: "", // Selected technology for the interview
      interviewDate: "", // Interview date
      interviewTime: "", // Interview time
      timeZone: "", // Selected time zone
      jobDescription: "", // Job description
      studentId: localStorage.getItem("studentId"), // Student ID from localStorage
      availableExperts: [], // Available experts based on selected technology
    };
  },
  methods: {
    // Fetch available skills for the technology dropdown
    async fetchSkills() {
      try {
        const response = await axios.get(
          "https://interview-companion-440607.uc.r.appspot.com/api/skills"
        );
        this.skills = response.data; // Assuming the skills data is in the root of the response
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    },

    // Fetch experts based on the selected technology
    async fetchAvailableExperts() {
      if (!this.selectedTechnology) return; // If no technology is selected, don't fetch experts

      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const response = await axios.get(
          `https://interview-companion-440607.uc.r.appspot.com/api/experts/skill_name/${this.selectedTechnology}`,
          {
            headers: {
              "auth-token": token, // Pass token in headers
            },
          }
        );

        // Parse the 'skills' string into an array and filter the experts based on selected technology
        this.availableExperts = response.data.experts.filter((expert) => {
          const skillsArray = JSON.parse(expert.skills); // Parse the skills string into an array
          return (
            skillsArray.includes(this.selectedTechnology) && expert.is_available
          );
        });
      } catch (error) {
        console.error("Error fetching available experts:", error);
      }
    },

    // Submit the interview request
    async submitInterview() {
      const expertsAccepted = this.availableExperts.map(
        (expert) => expert.expert_id
      );

      if (expertsAccepted.length === 0) {
        alert("No experts available for this technology.");
        return;
      }

      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        // Prepare the payload for creating the interview
        const interviewData = {
          student_id: this.studentId, // Pass the student ID
          tech_requirements: this.selectedTechnology, // Pass selected technology as tech_requirements
          experts_accepted: expertsAccepted, // Pass expert IDs that match the technology
          interview_date: this.interviewDate, // Interview date
          interview_time: this.interviewTime, // Interview time
          time_zone: this.timeZone, // Interview time zone
          job_description: this.jobDescription, // Job description
        };

        // Send the interview data to the API to create the interview
        const response = await axios.post(
          "https://interview-companion-440607.uc.r.appspot.com/api/interviews/create",
          interviewData,
          {
            headers: {
              "auth-token": token, // Add token to the request header
            },
          }
        );

        if (response.data) {
          alert("Interview reserved successfully!");

          // Store the interview IDs in localStorage
          const interviewIds = response.data.interviews.map(
            (interview) => interview.interview_id
          );
          localStorage.setItem("interview_ids", JSON.stringify(interviewIds));

          // Redirect to the available experts page after successful submission
          // In StudentInterviewForm.vue after successful interview submission:
          this.$router.push({
            name: "AvailableCompanionPage",
            params: { studentId: this.studentId }, // Pass studentId as a route parameter
            query: {
              technology: this.selectedTechnology,
              interview_ids: JSON.stringify(interviewIds),
            }, // Pass technology as a query parameter
          });
        } else {
          alert("Failed to reserve the interview.");
        }
      } catch (error) {
        console.error("Error submitting interview:", error);
        alert("An error occurred while reserving the interview.");
      }
    },
  },

  created() {
    this.fetchSkills(); // Fetch skills when the component is created
  },

  watch: {
    // Fetch available experts when the selected technology changes
    selectedTechnology(newVal) {
      if (newVal && newVal.trim() !== "") {
        // Check if technology is valid
        this.fetchAvailableExperts(); // Fetch experts when a valid technology is selected
      } else {
        this.availableExperts = []; // Clear available experts if no technology is selected
      }
    },
  },
};
</script>

<style scoped>
/* .page-container {
  display: flex;
  height: 100vh;
} */

.content {
  flex: 1;
  /* padding: 20px; */
  overflow-y: auto;
}

.interview-form {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h6 {
  text-align: center;
  margin-bottom: 20px;
}

/* .form-group {
  margin-bottom: 20px;
} */

label {
  font-size: 14px;
  font-weight: bold;
  /* display: block; */
  float: left;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  /* margin-bottom: 10px; */
  border: 1px solid #ccc;
  border-radius: 5px;
}
textarea {
  height: 10px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #8c8d8f;
  color: rgb(22, 20, 20);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #8c8e91;
}

button:focus {
  outline: none;
}

textarea {
  height: 150px;
}

textarea:focus,
input:focus,
select:focus {
  border-color: #929394;
}

form {
  display: flex;
  flex-direction: column;
}

form input,
form select,
form textarea {
  margin-bottom: 15px;
}
</style>

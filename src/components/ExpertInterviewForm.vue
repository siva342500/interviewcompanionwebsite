<template>
  <div id="app">
    <main class="main-content">
      <!-- Select Technology Section (hidden after success) -->
      <section v-if="!showEnrollHistory" class="services">
        <h2 class="title">Select Technology</h2>
        <div class="skills-container">
          <!-- Display list of skills -->
          <div
            v-for="skill in skills"
            :key="skill.skill_id"
            class="skill-card"
            :class="{ selected: isSkillSelected(skill.skill_name) }"
            @click="toggleSkill(skill.skill_name)"
          >
            <span class="skill-name">{{ skill.skill_name }}</span>
            <!-- Display checkmark icon if selected -->
            <span v-if="isSkillSelected(skill.skill_name)" class="check-icon"
              >✔</span
            >
          </div>
        </div>
        <button @click="submitSelectedSkills(selectedSkills)">
          Submit Skills
        </button>
      </section>

      <!-- Enroll History Section (displayed after success) -->
      <section v-if="showEnrollHistory">
        <EnrollHistory />
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import EnrollHistory from "./EnrollHistory.vue"; // Import EnrollHistory component

export default {
  components: {
    EnrollHistory, // Register the component
  },
  data() {
    return {
      skills: [], // List of skills
      selectedSkills: [], // Selected skills
      showEnrollHistory: false, // Toggle visibility for Enroll History
    };
  },
  created() {
    this.fetchSkills();
  },
  methods: {
    // Fetch skills from API
    async fetchSkills() {
      try {
        const response = await fetch(
          "https://interview-companion-440607.uc.r.appspot.com/api/skills"
        );
        const data = await response.json();
        this.skills = data;
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    },
    // Check if a skill is selected
    isSkillSelected(skill) {
      return this.selectedSkills.includes(skill);
    },
    // Toggle skill selection
    toggleSkill(skill) {
      if (this.isSkillSelected(skill)) {
        this.selectedSkills = this.selectedSkills.filter((s) => s !== skill);
      } else {
        this.selectedSkills.push(skill);
      }
    },
    // Submit selected skills and display Enroll History
    async submitSelectedSkills(selectedSkillNames) {
      const token = localStorage.getItem("token");
      const expertId = localStorage.getItem("expertId");

      if (token && expertId) {
        try {
          const response = await axios.post(
            "https://interview-companion-440607.uc.r.appspot.com/api/experts/multiple-skills",
            {
              expert_id: expertId,
              skill_names: selectedSkillNames,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "auth-token": token,
              },
            }
          );

          // Check if API response is successful
          if (
            response.data.message ===
            "Skills successfully updated for the expert."
          ) {
            alert("Skills submitted successfully!");
            this.showEnrollHistory = true; // Hide skills and show Enroll History
          } else {
            alert("Failed to submit skills. Unexpected response.");
          }
        } catch (error) {
          console.error(
            "Error submitting skills:",
            error.response?.data || error
          );
          alert(
            error.response?.data?.message ||
              "An error occurred. Please try again."
          );
        }
      } else {
        alert("Authentication failed. Please log in again.");
      }
    },
  },
};
</script>

<style scoped>
/* General styling */
.services {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.skills-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skill-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.skill-card:hover {
  background-color: #f0f8ff;
  border-color: #060606;
}

.skill-card.selected {
  border-color: #326a1a;
  background-color: #f0f8ff;
}

.check-icon {
  color: #326a1a;
  font-size: 18px;
}

button {
  background-color: #0e0f0e;
  color: #fff;
  border: none;
  padding: 12px;
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #545554;
}
</style>

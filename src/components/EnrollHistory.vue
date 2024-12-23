<template>
  <div class="enroll-history">
    <h2 class="title">Your Enrolled Technologies</h2>
    <div v-if="enrolledSkills.length > 0" class="skills-container">
      <div v-for="skill in enrolledSkills" :key="skill" class="skill-card">
        <span class="skill-name">{{ skill }}</span>
        <button @click="deleteSkill(skill)" class="delete-btn">DELETE</button>
      </div>
    </div>
    <div v-else><p>No enrolled technologies.</p></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enrolledSkills: [],
      expertId: localStorage.getItem("expertId"),
      token: localStorage.getItem("token"),
    };
  },
  created() {
    this.fetchSkills();
  },
  methods: {
    async fetchSkills() {
      try {
        const response = await fetch(
          `https://interview-companion-440607.uc.r.appspot.com/api/experts/${this.expertId}/skills`,
          {
            headers: { "auth-token": `${this.token}` },
          }
        );
        const data = await response.json();
        console.log("API response:", data);

        if (data.skills && Array.isArray(data.skills)) {
          this.enrolledSkills = data.skills.map(skill => {
            // Clean up escape characters and extra spaces
            return skill.replace(/\\|"/g, '').trim();
          });
        } else {
          this.enrolledSkills = [];
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        this.enrolledSkills = [];  // Set empty array in case of a fetch error
      }
    },

    async deleteSkill(skill) {
      try {
        const response = await fetch(
          `https://interview-companion-440607.uc.r.appspot.com/api/experts/skills/${this.expertId}/${skill}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              'auth-token': `${this.token}`,
            },
          }
        );
        if (response.ok) {
          // Remove the deleted skill from the list of enrolled skills
          this.enrolledSkills = this.enrolledSkills.filter((s) => s !== skill);
          alert(`${skill} deleted successfully!`);
        } else {
          throw new Error("Failed to delete skill.");
        }
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    },
  },
};
</script>

<style scoped>
/* General container styling */
.enroll-history {
  margin: 20px;
  padding: 10px;
}

/* Title styling */
.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Responsive container for skills */
.skills-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

/* Skill card styling */
.skill-card {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
}

/* Hover effect for skill cards */
.skill-card:hover {
  transform: scale(1.05);
}

/* Skill name styling */
.skill-name {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

/* Delete button styling */
.delete-btn {
  background-color: #d9534f;
  color: white;
  padding: 5px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #c9302c;
}

/* No skills message styling */
.no-skills-message {
  text-align: center;
  font-size: 16px;
  color: #888;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .skills-container {
    flex-direction: column;
    gap: 10px;
  }

  .skill-card {
    width: 100%;
    padding: 10px;
  }

  .title {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 18px;
  }

  .skill-name {
    font-size: 16px;
  }

  .delete-btn {
    font-size: 14px;
    padding: 4px 12px;
  }

  .skill-card {
    width: 90%;
    padding: 8px;
  }
}
</style>

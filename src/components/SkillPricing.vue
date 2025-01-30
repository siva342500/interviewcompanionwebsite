<template>
  <div>
    <!-- Header -->
    <Header></Header>

    <!-- Skill Pricing Section -->
    <section class="skill-pricing">
      <div class="container">
        <h1 class="text-center mb-5">Skill Pricing</h1>

        <div class="row">
          <div class="col-md-6" v-for="skill in skills" :key="skill.skill_id">
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="card-title">{{ skill.skill_name }}</h3>
                <p class="card-text">Amount: ${{ skill.amount }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/HeaderPage.vue";
import Footer from "@/components/FooterPage.vue";

export default {
  name: "SkillPricing",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      skills: [
        {
          skill_id: 3,
          skill_name: "JAVA",
          amount: "100.00"
        },
        {
          skill_id: 4,
          skill_name: "ANGULAR",
          amount: "200.00"
        },
        {
          skill_id: 6,
          skill_name: "Business Analyst",
          amount: "6000.00"
        },
        {
          skill_id: 7,
          skill_name: "C++ Developer",
          amount: "6000.00"
        },
        {
          skill_id: 8,
          skill_name: "Product Owner",
          amount: "6000.00"
        },
        {
          skill_id: 9,
          skill_name: "Product Manager",
          amount: "8000.00"
        },
        {
          skill_id: 10,
          skill_name: "Salesforce Developer",
          amount: "6000.00"
        },
        {
          skill_id: 11,
          skill_name: "Salesforce Admin",
          amount: "6000.00"
        },
        {
          skill_id: 12,
          skill_name: "Java Developer",
          amount: "6000.00"
        },
        {
          skill_id: 13,
          skill_name: "UI Developer",
          amount: "6000.00"
        },
        {
          skill_id: 14,
          skill_name: "APIGEE Admin",
          amount: "6000.00"
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Skill Pricing Section */
.skill-pricing {
  padding: 60px 0;
}

.skill-pricing h1 {
  font-weight: bold;
  color: black;
}

.skill-pricing .card {
  border: 1px solid #ddd;
  border-radius: 8px;
}

.skill-pricing .card-title {
  font-size: 1.5rem;
  color: black;
}

.skill-pricing .card-text {
  font-size: 1.2rem;
  color: #555;
}

.skill-pricing .card-body {
  text-align: center;
}

@media (max-width: 768px) {
  .skill-pricing {
    padding: 40px 0;
  }

  .skill-pricing h1 {
    font-size: 1.5rem;
  }

  .skill-pricing .card-title {
    font-size: 1.2rem;
  }

  .skill-pricing .card-text {
    font-size: 1rem;
  }
}
</style>

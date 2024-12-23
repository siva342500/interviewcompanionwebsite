<template>
  <div>
    <!-- Header -->
    <Header />

    <div class="container mt-5">
      <!-- Toggle Buttons -->
      <div class="text-center mb-4">
        <button
          class="btn bg-black me-2"
          style="color: white"
          :class="{ active: activeService === 'student' }"
          @click="activeService = 'student'"
        >
          Student Services
        </button>
        <button
          class="btn btn-secondary"
          :class="{ active: activeService === 'expert' }"
          @click="activeService = 'expert'"
        >
          Expert Services
        </button>
      </div>

      <!-- Student Services Section -->
      <div v-if="activeService === 'student'">
        <h3 class="text-center mb-4">Student Services</h3>
        <div
          v-for="(service, index) in studentServices"
          :key="index"
          class="row mb-5"
        >
          <!-- Image Column -->
          <div :class="getImageColumnClass(index)" class="col-lg-6 text-center">
            <img
              :src="service.image"
              :alt="service.title"
              class="img-fluid rounded"
            />
          </div>
          <!-- Text Column -->
          <div
            :class="getTextColumnClass(index)"
            class="col-lg-6 d-flex flex-column justify-content-center"
          >
            <h4 class="service-title">{{ service.title }}</h4>
            <p class="service-description">{{ service.description }}</p>
          </div>
        </div>
      </div>

      <!-- Expert Services Section -->
      <div v-if="activeService === 'expert'">
        <h3 class="text-center mb-4">Expert Services</h3>
        <div
          v-for="(service, index) in expertServices"
          :key="index"
          class="row mb-5"
        >
          <!-- Image Column -->
          <div :class="getImageColumnClass(index)" class="col-lg-6 text-center">
            <img
              :src="service.image"
              :alt="service.title"
              class="img-fluid rounded"
            />
          </div>
          <!-- Text Column -->
          <div
            :class="getTextColumnClass(index)"
            class="col-lg-6 d-flex flex-column justify-content-center"
          >
            <h4 class="service-title">{{ service.title }}</h4>
            <p class="service-description">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/HeaderPage.vue";
import Footer from "@/components/FooterPage.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      activeService: "student", // Default to Student Services
      studentServices: [
        {
          title: "Reserve Companion for Training",
          description:
            "Enhance your skills with personalized training sessions. By reserving a training companion, you get access to tailored sessions designed to meet your specific needs. Whether you're looking to improve technical, interpersonal, or managerial skills, this service provides the guidance you need to excel. Gain confidence and expertise in your chosen field with focused, hands-on training. Explore advanced techniques and real-world applications that prepare you for success. From foundational concepts to advanced strategies, this training will help you stay ahead in your career. Make learning an interactive and rewarding experience with a dedicated companion by your side.",
          image: "/siderimages4.jpg",
        },
        {
          title: "Reserve Your Interview Companion",
          description:
            "Prepare for interviews with expert guidance. Reserving an interview companion ensures that you have the support you need to excel in mock interviews and real-life scenarios. Get personalized feedback, strategies for answering challenging questions, and the confidence to present your best self. With this service, you'll gain insights into industry expectations and improve your chances of landing the job you want. From communication techniques to body language tips, your companion will help you refine every aspect of your interview performance. Be ready to tackle any challenge with expert assistance tailored to your goals.",
          image: "/siderimages1.jpg",
        },
        {
          title: "Reserve Companion for Resume Prep",
          description:
            "Craft a standout resume with the help of an experienced companion. This service is designed to showcase your strengths and achievements in the best light. From formatting to content optimization, your companion will provide valuable input to create a professional, impactful resume. Highlight your skills and experiences effectively to attract the attention of recruiters. Gain insights into what employers look for and tailor your resume to align with industry standards. With this assistance, you'll have a polished document that sets you apart in a competitive job market. Make a lasting impression with a resume that reflects your true potential.",
          image: "/siderimages.webp",
        },
        {
          title: "Reserve Companion for Mock Interview",
          description:
            "Simulate real interview scenarios with a dedicated mock interview companion. This service helps you practice common questions, refine your responses, and build the confidence needed for high-pressure situations. Receive constructive feedback on your performance and learn how to improve your delivery, content, and demeanor. Mock interviews are tailored to your target job roles, ensuring relevance and effectiveness. Whether you're preparing for technical, HR, or behavioral interviews, this service equips you with the skills to succeed. Overcome nervousness and make a strong impression with practice sessions that boost your readiness.",
          image: "/siderimages1.jpg",
        },
        {
          title: "Reserve Companion for Coding Test",
          description:
            "Ace your coding tests with the help of a knowledgeable companion. This service provides guided practice, problem-solving strategies, and coding tips tailored to your needs. Work on real-world coding challenges and improve your efficiency in solving problems under time constraints. Your companion will help you understand key concepts, debug effectively, and optimize your solutions. Gain confidence in tackling coding assessments with expert guidance and hands-on practice. Whether you're preparing for a competitive exam or a job interview, this service ensures you're ready to perform at your best. Master coding techniques and achieve your goals with dedicated support.",
          image: "/siderimages4.jpg",
        },
      ],
      expertServices: [
        {
          title: "Earn Money by Enrolling as Interview Companion",
          description:
            "Share your expertise and earn by becoming an interview companion. This service allows professionals to guide job seekers through their interview preparation. Provide valuable insights, mock interviews, and constructive feedback to help others succeed. Build your reputation as a trusted mentor while earning for your time and knowledge. As an interview companion, you'll play a crucial role in shaping the careers of aspiring candidates. Enjoy the satisfaction of helping others achieve their goals while enhancing your own professional network. Contribute to the community and make a meaningful impact with your expertise.",
          image: "/siderimages1.jpg",
        },
        {
          title: "Enroll to Train",
          description:
            "Become a trainer and share your skills with eager learners. This service offers professionals the opportunity to conduct training sessions in their area of expertise. Empower individuals to improve their abilities while earning recognition and income. Whether you specialize in technical skills, leadership, or personal development, your contribution can inspire growth and achievement. Design and deliver impactful training sessions that meet the needs of diverse learners. As a trainer, you'll not only share knowledge but also gain valuable experience in mentoring and communication. Make a difference in the lives of others while advancing your own career.",
          image: "/siderimages4.jpg",
        },
        {
          title: "Enroll for Resume",
          description:
            "Help job seekers craft exceptional resumes by enrolling in this service. Use your experience to guide candidates in presenting their skills and achievements effectively. Offer insights into resume optimization, formatting, and content enhancement to make their profiles stand out. As a resume mentor, you'll play a vital role in boosting candidates' confidence and improving their chances of success. Share your knowledge to help individuals secure their dream jobs while earning for your expertise. This service is an opportunity to empower others while building your own credibility as a trusted career advisor.",
          image: "/siderimages.webp",
        },
        {
          title: "Enroll Mock Interview",
          description:
            "Join as a mock interview mentor and help candidates excel in their job interviews. Provide realistic interview scenarios, constructive feedback, and strategies for improvement. Your guidance can make a significant difference in their preparation and performance. As a mentor, you'll assist candidates in refining their responses, enhancing their confidence, and mastering the art of interviews. Earn recognition and income while contributing to the success of aspiring professionals. This service offers a rewarding experience where you can share your knowledge and help others achieve their career aspirations.",
          image: "/siderimages1.jpg",
        },
        {
          title: "Enroll Coding Test Companion",
          description:
            "Support candidates in acing their coding assessments by becoming a coding test companion. Offer guidance on problem-solving techniques, coding best practices, and efficient debugging methods. Help candidates overcome challenges and improve their performance in coding tests. This service allows you to share your expertise, earn income, and build a reputation as a reliable mentor. Contribute to the success of job seekers by providing practical advice and hands-on assistance. Be a part of their journey towards achieving their career goals and leave a lasting impact with your mentorship.",
          image: "/siderimages4.jpg",
        },
      ],
    };
  },
  methods: {
    getImageColumnClass(index) {
      // Alternate: Even-indexed items show image first
      return index % 2 === 0 ? "order-lg-1" : "order-lg-2";
    },
    getTextColumnClass(index) {
      // Alternate: Odd-indexed items show text first
      return index % 2 === 0 ? "order-lg-2" : "order-lg-1";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
}

button {
  padding: 10px 20px;
  font-size: 16px;
}

button.active {
  background-color: #050505;
  color: white;
  border: none;
}

.row {
  display: flex;
  align-items: center;
}

.service-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.service-description {
  font-size: 16px;
  color: #555;
}

.img-fluid {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>

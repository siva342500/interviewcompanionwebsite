import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue"; // Import your login page component
import HomePage from "../components/HomePage.vue"; // Assuming HomePage is the default landing page
import StudentProfilePage from "@/components/StudentProfilePage.vue";
import HomePage1 from "@/components/HomePage1.vue";
import StudentInterviewForm from "@/components/StudentInterviewForm.vue";
import AvailableCompanionPage from "@/components/AvailableCompanionPage.vue";
import StudentNotificationPage from "@/components/StudentNotificationPage.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import StudentAccount from "@/components/StudentAccount.vue";
import StudentPersonalDetails from "@/components/StudentPersonalDetails.vue";
import StudentWallet from "@/components/StudentWallet.vue";
import StudentPaymentHistory from "@/components/StudentPaymentHistory.vue";
import ReferAFriend from "@/components/ReferAFriend.vue";
import StudentContactUs from "@/components/StudentContactUs.vue";
import StudentActivity from "@/components/StudentActivity.vue";
import ExpertHomePage from "@/components/ExpertHomePage.vue";
import ExpertNotificationPage from "@/components/ExpertNotificationPage.vue";
import ExpertActivity from "@/components/ExpertActivity.vue";
import EnrollHistory from "@/components/EnrollHistory.vue";
import ExpertPersonalDetails from "@/components/ExpertPersonalDetails.vue";
import ExpertContactUs from "@/components/ExpertContactUs.vue";
import ExpertBankAccount from "@/components/ExpertBankAccount.vue";
import AboutUs from "@/components/AboutUs.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import StudentRegister from "@/components/StudentRegister.vue";
import ExpertRegister from "@/components/ExpertRegister.vue";
import ServicesPage from "@/components/ServicesPage.vue";
const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/student-register",
    name: "StudentRegister",
    component: StudentRegister,
  },
  {
    path: "/expert-register",
    name: "ExpertRegister",
    component: ExpertRegister,
  },
  {
    path: "/about",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/services-page",
    name: "ServicesPage",
    component: ServicesPage,
  },
  {
    path: "/registrationform",
    name: "RegistrationForm",
    component: RegistrationForm,
  },
  {
    path: "/header/:studentId",
    name: "HeaderPage",
    component: HeaderPage,
  },
  {
    path: "/student-account/:studentId",
    name: "StudentAccount",
    component: StudentAccount,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage, // This route should point to your LoginPage component
  },
  {
    path: "/students/:studentId",
    name: "StudentProfilePage",
    component: StudentProfilePage, // This route should point to your LoginPage component
  },
  {
    path: "/home/:studentId",
    name: "HomePage1",
    component: HomePage1, // This route should point to your LoginPage component
  },
  {
    path: "/expert-home-page/:expertId",
    name: "ExpertHomePage",
    component: ExpertHomePage, // This route should point to your LoginPage component
  },
  {
    path: "/expert-personal-details/:expertId",
    name: "ExpertPersonalDetails",
    component: ExpertPersonalDetails, // This route should point to your LoginPage component
  },
  {
    path: "/expert-contact-us/:expertId",
    name: "ExpertContactUs",
    component: ExpertContactUs, // This route should point to your LoginPage component
  },
  {
    path: "/expert-activity/:expertId",
    name: "ExpertActivity",
    component: ExpertActivity, // This route should point to your LoginPage component
  },
  {
    path: "/expert-bank-account/:expertId",
    name: "ExpertBankAccount",
    component: ExpertBankAccount, // This route should point to your LoginPage component
  },
  {
    path: "/enroll-history/:expertId",
    name: "EnrollHistory",
    component: EnrollHistory, // This route should point to your LoginPage component
  },
  {
    path: "/expert-notification/:expertId",
    name: "ExpertNotificationPage",
    component: ExpertNotificationPage, // This route should point to your LoginPage component
  },
  {
    path: "/student/:studentId",
    name: "StudentInterviewForm",
    component: StudentInterviewForm,
  },
  {
    path: "/available-companion/:studentId",
    name: "AvailableCompanionPage",
    component: AvailableCompanionPage,
  },
  {
    path: "/student-notification/:studentId",
    name: "StudentNotificationPage",
    component: StudentNotificationPage,
  },
  {
    path: "/student-personal/:studentId",
    name: "StudentPersonalDetails",
    component: StudentPersonalDetails,
  },
  {
    path: "/student-wallet/:studentId",
    name: "StudentWallet",
    component: StudentWallet,
  },
  {
    path: "/refer-friend/:studentId",
    name: "ReferAFriend",
    component: ReferAFriend,
  },
  {
    path: "/refer-friend/:studentId",
    name: "StudentContactUs",
    component: StudentContactUs,
  },
  {
    path: "/student-activity/:studentId",
    name: "StudentActivity",
    component: StudentActivity,
  },
  {
    path: "/student-payment-history/:studentId",
    name: "StudentPaymentHistory",
    component: StudentPaymentHistory,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

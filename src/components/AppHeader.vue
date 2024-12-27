<template>
  <header class="app-header">
    <div class="header-content">
      <i class="fa fa-arrow-left back-arrow" @click="goBack"></i>
      <h1 class="header-title">
        <span
          :class="{ active: activePage === 'home' }"
          @click="navigate('home')"
        >
          Home
        </span>
        <span
          :class="{ active: activePage === 'notification' }"
          @click="navigate('student-notification')"
        >
          Notification
        </span>
        <span
          :class="{ active: activePage === 'activity' }"
          @click="navigate('student-activity')"
        >
          Activity
        </span>
        <span
          :class="{ active: activePage === 'account' }"
          @click="navigate('student-account')"
        >
          Account
        </span>
      </h1>
      <img src="../../public/logo.jpeg" alt="Logo" class="logo" />
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      // Get studentId from localStorage when the component is created
      studentId: localStorage.getItem("studentId"),
    };
  },
  props: {
    activePage: {
      type: String,
      required: true,
    },
  },
  methods: {
    navigate(page) {
      // Navigate with studentId included in the route
      if (this.studentId) {
        this.$router.push(`/${page}/${this.studentId}`);
      } else {
        console.error("Student ID is not available.");
      }
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style>
/* Header Styling */
.app-header {
  --background-color: #000000 !important;
  --color: rgb(255, 255, 255) !important;
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #000000;
  color: rgb(255, 255, 255);
}

.back-arrow {
  font-size: 20px;
  cursor: pointer;
}

.header-title span {
  cursor: pointer;
  padding: 5px 10px;
  font-size: 18px;
}

.header-title span.active {
  background-color: #000000;
  color: white;
  border-radius: 5px;
}

.logo {
  height: 40px;
  width: 40px;
  object-fit: cover;
}
</style>

<template>
  <div id="app">
    <!-- Header Section -->
    <!-- <header class="app-header">
      <h1>My Application</h1>
    </header> -->

    <!-- Main Content Section -->
    <main>
      <router-view></router-view>
      <!-- Displays the active route component -->
    </main>

    <!-- Footer Section -->
    <!-- <footer class="app-footer">
      <nav class="header-navigation">
       
        <div class="nav-item">
          <i class="icon fa fa-home"></i>
          <span>Home</span>
        </div>

      
        <div class="nav-item">
          <i class="icon fa fa-bell"></i>
          <span>Notification</span>
        </div>

       
        <div class="nav-item">
          <i class="icon fa fa-tasks"></i>
          <span>Activity</span>
        </div>

             <div class="nav-item">
          <i class="icon fa fa-user"></i>
          <span>Account</span>
        </div>
      </nav>
    </footer> -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Global Styles */

/* App Container */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
}

/* Header Styling */
.app-header {
  background-color: #5d5e60;
  color: white;
  text-align: center;
  padding: 10px 0;
}

/* Main Content Styling */
main {
  flex: 1; /* Makes the main content fill the remaining space */
  padding: 20px;
}

/* Footer Styling */
.app-footer {
  background-color: #292a2b;
  color: white;
  text-align: center;
  padding: 20px 0; /* Adds padding inside the footer */
  border-top: 1px solid #e7e7e7;
  position: relative; /* Ensures footer stays at the bottom */
}

/* Navigation Styling */
.header-navigation {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* Navigation Item Styling */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 14px;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #cecdc8;
}

/* Icon Styling */
.icon {
  font-size: 20px;
  margin-bottom: 5px;
}
</style>

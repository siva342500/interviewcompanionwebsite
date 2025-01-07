<template>
  <!-- Header -->
  <header class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container">
      <img
        src="../../public/logo.jpeg"
        style="width: 40px; height: 40px; margin-top: 5px; margin-right: 10px"
        alt="Logo"
      />
      <a class="navbar-brand" href="#">Interview Companion</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link"  :class="{ active: $route.path === '/' }" >Home</router-link>
          </li>
          <li class="nav-item">
             <router-link
              to="/services-page"
              class="nav-link"
              :class="{ active: $route.path === '/services-page' }"
              >Services</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/about"
              class="nav-link"
              :class="{ active: $route.path === '/about' }"
              >About Us</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link"
              :class="{ active: $route.path === '/login' }"
            >
              Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/registrationform"
              class="nav-link"
              :class="{ active: $route.path === '/registrationform' }"
            >
              Sign Up
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Header Style */
.navbar {
  margin-bottom: 40px;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-nav .nav-link {
  color: #ffffff;
  font-size: 1.1rem;
}

.navbar-nav .nav-link.active {
  color: #010101;
  background-color: white;
}

.navbar-toggler {
  border-color: #ffffff;
}

.navbar-toggler-icon {
  background-color: #090909;
}

.navbar-nav .nav-item .nav-link {
  padding: 12px;
}
</style>

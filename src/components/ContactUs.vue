<template>
<div>
<Header></Header>


<section>
  <div class="container text-center" >
    <h6>Address</h6>
    <p>Interview Companion,Bangalore,Bangalore,Karnataka,560102,India</p>
    <h6> Contact Number</h6>
    <p> +91-7997116117</p>
    <p>sivaanudamu123@gmail.com</p>
   </div>


</section>
<Footer></Footer>

</div>

    </template>
    <script>
    import Header from "@/components/HeaderPage.vue";
    import Footer from "@/components/FooterPage.vue";

    export default{
       name: "ContactUs",
       components:{
       Header,
       Footer,
       },
    }

    </script>
    <style scoped>

    </style>
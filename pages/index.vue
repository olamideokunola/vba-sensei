<template>
  <div class="">

    <!--Learning Paths-->
    <div class="bg-primary py-8 flex flex-row align-center justify-around">
      <div class="hero-img pl-16 pr-0 py-8">
        <img src="~/assets/imgs/route3.png"/>
      </div>
      <div class="bg-primary py-4 pr-16 pl-0 bg-local learning-path-bkg">
        <div
          class="text-6xl text-center font-bold text-white">
            Obtain access to great <br>
            learning resources <br>
            for VBA Developers
        </div>

        <div class="text-white text-center mt-12 text-2xl"> 
          Choose from beginner of intermediate <br> learning paths <br>

          <nuxt-link to="/video_courses">
            <button class="bg-black hover:bg-gray align-middle mt-4 px-24 py-4 text-xl text-white rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Learning Paths
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!--Courses-->
    <div
      class="bg-black py-8 course-bkg flex pl-64"
      >
      <div class="pt-64 pb-64">
        <div
          class="text-6xl text-center font-bold text-white ">
            Explore our <br>
            suite of courses
        </div>

        <div class="text-white text-center mt-8 text-2xl"> 
          Select a course <br>

          <button class="bg-primary hover:bg-gray align-middle mt-4 px-32 py-4 text-xl text-white rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Courses
          </button>
        </div>
      </div>
    </div>

    <!--Reference documents-->
    <div
      class="bg-gray py-32 px-16 flex flex-row justify-around"
      >
      <div>
        <img class="reference-img rounded-lg" src="~/assets/imgs/books_stack_with_bg.png">
      </div>
      <div class="py-4">
        <div
          class="text-6xl text-center font-bold text-white">
            Download <br>
            reference documents
        </div>

        <div class="text-white text-center mt-16 text-2xl"> 
          Our reference materials will provide guidance <br>
          on your journey to mastery <br>

          <button class="bg-black hover:bg-primary align-middle mt-4 px-24 py-4 text-xl text-white rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Reference materials
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

import {
  defineComponent,
  useFetch,
  useContext,
  ref,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

export default {
  auth: false,
  components: {

  },
  // layout: 'home',
  setup() {

    const item = ref('item text')

    return {
      item
    }
  }
}
</script>

<style>

.hero-img {
  width: 400px;
}

.learning-path-bkg {
  background-image: url("../assets/imgs/route2_trans_15.png");
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  background-size: contain;
}


.course-bkg {
  background-image: url("../assets/imgs/path-bkg.jpg");
  background-repeat: no-repeat;
  background-blend-mode: normal;
  background-size: auto 100%;
  background-position: center;
}

.reference-img {
  width: 500px;
}

html {
  scroll-behavior: smooth;
}
</style>

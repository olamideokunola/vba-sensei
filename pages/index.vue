<template>
  <div class="">

    <!-- Button to scroll to top of page -->
    <TopButton/>

    <!--Learning Paths-->
    <div class="bg-primary py-8 flex sm:flex-row sm:align-center sm:justify-around flex-col">
      <div class="sm:pl-16 sm:pr-0 sm:py-8 py-12 flex flex-col contents-center">
        <h1
          class="sm:hidden text-3xl text-center font-bold text-white pb-16">
            Obtain access to great <br>
            learning resources <br>
            for VBA Developers
        </h1>
        <img class="w-4/6 sm:w-4/6 self-center" src="~/assets/imgs/route3.png"/>
      </div>
      <div class="bg-primary sm:py-4 sm:pr-16 sm:pl-0 sm:bg-local py-4 learning-path-bkg flex flex-col">
        <h1
          class="hidden sm:block sm:text-6xl text-2xl text-center font-bold text-white">
            Obtain access to great <br>
            learning resources <br>
            for VBA Developers
        </h1>

        <div class="text-white text-center sm:mt-12 mt-6 text-2xl"> 
          <p >Choose beginner or intermediate <br> learning paths <br></p>
          <nuxt-link to="/video_courses">
            <button class="bg-black hover:bg-gray align-middle sm:mt-4 sm:px-24 sm:py-4 px-16 py-4 mt-6 text-xl text-white rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Learning Paths
            </button> 
          </nuxt-link>
        </div>
      </div>
    </div>

    <!--Courses-->
    <div
      class="bg-black sm:py-8 course-bkg flex sm:pl-64"
      >
      <!-- course-bkg -->
      <div class="pt-64 pb-64">
        <div
          class="text-6xl text-center font-bold sm:text-white text-black p-4">
            <p>Explore our <br>
            suite of courses</p>
        </div>

        <div class="sm:text-white text-black text-center mt-8 text-2xl"> 
          Select a course <br>
          <nuxt-link to="/video_courses">
            <button class="bg-primary hover:bg-gray align-middle mt-4 px-32 py-4 text-xl text-white rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Courses
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!--Reference documents-->
    <div
      class="bg-gray py-32 px-16 flex sm:flex-row flex-col justify-around "
      >
      <div>
        <img class="rounded-lg sm:w-4/6" src="~/assets/imgs/books_stack_with_bg.png">

        <!-- reference-img -->
      
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

import TopButton from '~/components/TopButton.vue'


import {
  defineComponent,
  useFetch,
  useContext,
  ref,
  watchEffect,
  watch,
  reactive,
  onMounted,
  onBeforeUnmount,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

export default {
  auth: false,
  components: {
    TopButton
  },
  // layout: 'home',
  setup(props, { root: { $fire, } }) {

    const item = ref('item text')
    // alert(process.env.NODE_ENV)
    // const mainDoc = ref(null)

    // const state = reactive({
    //   scrollPos: mainDoc.value ? mainDoc.value.scrollTop : 0
    // })


    // // const scrollPos = ref(scr.width)

    // watch(
    //   () => mainDoc, 
    //   (main, prevMain) => {
    //     alert('scrolPos changed!')
    //   }, 
    //   {
    //     flush: 'post',
    //     deep: true
    //   }
    // )

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

@media only screen and (max-width: 600px) {
  .course-bkg {
    background-image: none;
    background-color: white;
    background-repeat: no-repeat;
    background-blend-mode: normal;
    background-size: auto 100%;
    background-position: center;
  }
}
</style>

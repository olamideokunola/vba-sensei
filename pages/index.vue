<template>
  <div class="">
    <div 
      v-if="showUpButton"
      class="flex flex-col floating-button rounded-full w-16 h-16 bg-black justify-center border-black border-2">
      <a href="#header">
        <p class="text-primary text-center">Top</p>
      </a>
    </div>
    <!--Learning Paths-->
    <div class="bg-primary py-8 flex sm:flex-row sm:align-center sm:justify-around flex-col">
      <div class="sm:pl-16 sm:pr-0 sm:py-8 py-12 flex flex-col contents-center">
        <div
          class="sm:hidden text-4xl text-center font-bold text-white pb-16">
            Obtain access to great <br>
            learning resources <br>
            for VBA Developers
        </div>
        <img class="w-4/6 sm:w-4/6 self-center" src="~/assets/imgs/route3.png"/>
      </div>
      <div class="bg-primary sm:py-4 sm:pr-16 sm:pl-0 sm:bg-local py-4 learning-path-bkg flex flex-col">
        <div
          class="hidden sm:block sm:text-6xl text-2xl text-center font-bold text-white">
            Obtain access to great <br>
            learning resources <br>
            for VBA Developers
        </div>

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
import Logo from '~/components/Logo.vue'

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

  },
  // layout: 'home',
  setup(props, { root: { $fire, } }) {

    const item = ref('item text')

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

    const showUpButton = ref(false)

    const onScroll = () => {
        // alert('scroll event just occured!')
        if(window.scrollTop > 100)
        {
          
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', () => {
            if(window.pageYOffset > 300) {
            // alert('scrollTop > 300')  
              showUpButton.value = true          
            } else if(window.screenTop == 0) {
              showUpButton.value = false          
            }
        })
    })

    onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    //state.scrollPos = mainDoc.value.scrollTop
    // state.scrollPos = mainDoc.value.ownerDocument.defaultView.scrollTop
    })

    return {
      item,   
      showUpButton   
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

.floating-button {
  position: fixed;
  z-index: 999;
  bottom: 10px;
  right: 10px;
  opacity: 0.7;
}

.floating-button:hover {
  opacity: 1.0;
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

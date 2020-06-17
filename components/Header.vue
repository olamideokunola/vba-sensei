<template>
    <div class="container mx-auto px-8 menu flex flex-row items-center justify-between">
        <div class="logo p-4">
            <nuxt-link to="/"> 
                <img src="~/assets/imgs/vba sensei 3.png">
            </nuxt-link>
        </div>
        <div class="menu flex flex-row">
            <ul
                v-for="(menuitem, id) in menuitems"
                :key="id"
                >
                <li class="p-2">
                    <nuxt-link :to="menuitem.link" class="text-gray-900 text-xl hover:font-bold" href="/">{{ menuitem.name }}</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="sidemenu p-4 flex flex-row items-center justify-between">
            <div class="flex flex-row" 
                v-if="$auth.loggedIn">
                <!-- logout button -->
                <button
                    class="bg-black shadow-md hover:bg-gray text-white px-4 py-2 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    @click="logout"
                    >
                    Sign out
                </button>
                <!-- username -->
                <div class="avatar bg-white border-2 border-gray mx-2 py-2 px-4 text-black rounded-full ">
                    {{$auth.user.firstname}}
                </div>
            </div>
            <div v-else>
                <!-- login -->
                <nuxt-link to="/signin">
                    <button
                        class="bg-black shadow-md hover:bg-gray text-white px-4 py-2 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        >
                        Sign in
                    </button>
                </nuxt-link>
                <!-- register -->
                <nuxt-link to="/register">
                    <button class="bg-black shadow-md hover:bg-gray text-white px-4 py-2 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        Register
                    </button>
                </nuxt-link>
            </div>

            
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            menuitems: [
                { name: 'Dashboard',
                  link: '/'
                },
                { name: 'Courses',
                  link: '/video_courses'
                },
                { name: 'Classes',
                  link: '/'
                },
                { name: 'Blog',
                  link: '/'
                },
                { name: 'Search',
                  link: '/'
                },
                { name: 'Q&A',
                  link: '/'
                }
        ]
    }},
    methods: {
        logout() {
            this.$auth.logout()
        }
    }
}
</script>

<style scoped>

.logo {
    width: 250px
}

.avatar {

}

</style>
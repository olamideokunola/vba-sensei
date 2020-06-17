<template>
    <div class="menu flex flex-row items-start justify-around py-32 bg-lightblue">
        <div>
            <img  class="logo" src="~/assets/imgs/vba sensei 3.png"/>
            <p>
                Find resources to aid your learning and use of VBA to <br>
improve your work efficiency and contribute to growth <br>
in your career
            </p>
        </div>
        <div class="menu">
            <h4 class="text-2xl font-medium">VBA SENSEI</h4>
            <ul
                v-for="(menuitem, id) in menuitems"
                :key="id"
                >
                <li class="pt-2">
                    <a class="text-gray-900 text-xl hover:text-gray-700" href="#">{{ menuitem }}</a>
                </li>
            </ul>
        </div>
        <div class="">
            <h4 class="text-2xl font-medium">WHO WE ARE</h4>
            <ul
                v-for="(menuitem, id) in whowearemenuitems"
                :key="id"
                >
                <li class="pt-2">
                    <a class="text-gray-900 text-xl hover:text-gray-700" href="#">{{ menuitem }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            menuitems: [
                'Dashboard',
                'Courses',
                'Classes',
                'Blog',
                'Search',
                'Q&A'
            ],
            whowearemenuitems: [
                'Who we are',
                'Contact'
            ]
    }}
}
</script>

<style scoped>

.logo {
    width: 250px
}

.avatar {

}

</style>
<template>
    <div class="menu flex sm:flex-row flex-col sm:items-start items-center justify-center sm:justify-around align-between py-32 bg-lightblue">
        <div class="flex flex-col">
            <img  class="logo align-center self-center sm:self-start" src="~/assets/imgs/vba sensei 3.png"/>
            <p class="text-center sm:text-left text-xl px-24 sm:px-0">
                Find resources to aid your learning and use of VBA to <br>
                your work efficiency and contribute to growth <br>
                in your career
            </p>
        </div>
        <div class="menu py-12 sm:py-0 flex flex-col">
            <h4 class="text-2xl font-medium">VBA SENSEI</h4>
            <ul
                class="text-center sm:text-left"
                v-for="(menuitem, id) in menuitems"
                :key="id"
                >
                <li class="pt-2">
                    <a class="text-gray-900 text-xl hover:text-gray-700" href="#">{{ menuitem }}</a>
                </li>
            </ul>
        </div>
        <div class="flex flex-col">
            <h4 class="text-2xl font-medium">WHO WE ARE</h4>
            <ul
                class="text-center sm:text-left"
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
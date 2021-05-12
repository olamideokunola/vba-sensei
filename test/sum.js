import $fire from '@nuxtjs/firebase'

function sum(a, b) {
    console.log($fire.name)
    return a + b;
}
module.exports = sum;
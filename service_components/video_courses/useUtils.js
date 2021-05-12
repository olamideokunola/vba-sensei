import {
    defineComponent,
    useFetch,
    useContext,
    ref,
    computed,
    useAsync,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

function useUtils(fire) {

    const getImageUrl = async (pth) => {
        
        
        //alert('In getDownloadUrl 2: '  + ref)
        try {
            console.log('In getImageUrl 1')

            var dbRef = fire.storage.ref(pth)
            const url = await dbRef.getDownloadURL()

            //alert('Here is the url: ' + url)

            return '' // url
        } catch (e) {
            console.log('In getImageUrl, error is: ' + e.message)
        }
    }

    return {
        getImageUrl  
    }
  }

  export { useUtils }
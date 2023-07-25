import useApi from 'src/composables/UseApi'

// export default function postService() {
//     const { list } = useApi('search?limit=10')

//     return{
//         list
//     }
// }

export default function postService(url) {
    if(url.length !== null)
        url = 'pokemon?limit=10000&offset=0'
    const { list } = useApi(url)

    return{
        list
    }
}
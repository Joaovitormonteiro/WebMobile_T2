import { api } from 'boot/axios'

export default function useApi(url: string){
    const list = async() => {
        try{
            const { data } = await api.get(url)       
                
            return data.results
        }catch(error){
            throw new Error(error)
        }
    }

    return{
        list
    }
}
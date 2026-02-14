import axios from '@/lib/axios'
export const getUser = async(id : string)=>{
    try {


        const res = await axios.get(`/user/${id}`)



        console.log('Data: ', res)

        return res.data

        
    } catch (error) {
        console.log('Error in get user function: ', error)
    }
}
import { useState,useEffect } from "react"
import supabase from "../config/supabaseClient"
import SmoothieCard from "../component/SmoothieCard"

// component



const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies,setSmoothies] = useState(null)

useEffect(()=>{
  const fetchSmoothies = async ()=>{
    const {data,error} = await supabase
    .from('smoothies')
    .select()


    if(error){
      setFetchError('failed fetching smoothies')
      console.log(error)
      setSmoothies(null)
    }

    if(data){
      setSmoothies(data)
      setFetchError(null)
      console.log(data)
    }


  }

  fetchSmoothies()

},[])

 
  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies&& (
   <div className="smoothie">

    {/* order by buttons */}

    <div className="smoothie-grid">
    {smoothies.map((smoothies)=>{
          return (
            <SmoothieCard key={smoothies.id} smoothie={smoothies} />
          )
        })}
    </div>
   </div>
      )}
    </div>
  )
}

export default Home
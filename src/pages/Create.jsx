import { useState } from "react"
import supabase from "../config/supabaseClient"
import { useNavigate } from "react-router-dom"
const Create = () => {
const navigate = useNavigate()
  const [title,setTitle] = useState('')
  const [method,setMethod] = useState('')
  const [rating,setRating] = useState('')
  const [formError,setFormError] = useState('')
  
  const handleSubmit = async(e)=>{
    e.preventDefault()

    if(!title || !method || !rating){
     setFormError('Please fill in all field correctly')
      return
    }

    const {data,error} = await supabase
    .from('smoothies')
    .insert([{title,method,rating}])
    .select()


    if(error){
      setFormError('there was an error')
    }

    if(data){
      console.log(data)
      setFormError(null)
      navigate('/')
    }

   
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title"
        value={title} onChange={(e)=>setTitle(e.target.value)} />


<label htmlFor="method">method</label>
        <input type="text" id="method"
        value={method} onChange={(e)=>setMethod(e.target.value)} />


<label htmlFor="rating">rating</label>
        <input type="text" id="rating"
        value={rating} onChange={(e)=>setRating(e.target.value)} />
      
      <button>Create Smoothies</button>
      {formError&&(<p className="error">{formError}</p>)}

      </form>
    </div>
  )
}

export default Create
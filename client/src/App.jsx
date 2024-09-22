import { useEffect, useState } from 'react';
import './App.css';
import Formtables from "./component/Formtables";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080"

function App() {
 

   
   const [addSection,setaddSection] = useState(false)
   const [editSection,seteditSection] = useState(false)
   const [Formdata,setFormdata] = useState(
      {
         name : "",
         rollno : "",
         email : "",
         mobile : "",   
      }
   )
   const [Formdataedit,setFormdataedit] = useState(
      {
         name : "",
         rollno : "",
         email : "",
         mobile : "",
         _id : ""  
      }
   )
   const [dataList,setdataList] = useState([])



   const handleonChange = (e) =>{
      const {value,name} = e.target
      setFormdata((prev)=>{
         return{
            ...prev,
            [name] : value
            
         }
      })
   }
   
   const handleSubmit = async(e) =>{
      e.preventDefault()
      const data = await axios.post("/create",Formdata)
      console.log(data)
      if(data.data.success){
         setaddSection(false)
         alert(data.data.message)
         getFetchData()
      }
   }
   const getFetchData = async(e) => {
      const data = await axios.get("/")
      console.log(data)
      if(data.data.success){
         setdataList(data.data.data)
      
      }
   }
   useEffect(()=>{
       getFetchData()
   },[])
   
   const handleDelete = async(id)=>{
      const data = await axios.delete("/delete/"+ id)
      
      if(data.data.success){
         getFetchData()
         alert(data.data.message)
      }
   }

   const handleUpdate = async(e)=>{
      e.preventDefault()
      const data = await axios.put("/update",Formdataedit)
      if(data.data.success){
         getFetchData()
         alert(data.data.message)
         seteditSection(false)
      }
   }


   const handleEditOnChange = async()=>{
      const {value,name} = e.target
      setFormdataedit((prev)=>{
         return{
            ...prev,
            [name] : value
            
         }
      })
   }
   const handleEdit = (el) =>{
      setFormdataedit(el)
      seteditSection(true)
   }





return (
  <>
   <div className='container'>
    <button className='btn btn-add' onClick={()=>setaddSection(true)}>ADD</button>
     {
      addSection &&(
         <Formtables
         handleSubmit = {handleSubmit} 
         handleonChange= {handleonChange}
         handleclose={()=>setaddSection(false)}
         rest = {Formdata}
         />
      )
     }
     {
      editSection &&(
         <Formtables
         handleSubmit = {handleUpdate} 
         handleonChange= {handleEditOnChange}
         handleclose={()=>seteditSection(false)}
         rest = {Formdataedit}
         />
      )
     }


         <div className="tableContainer">
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Rollno</th>
                     <th>Email</th>
                     <th>Mobile</th>
                     <th>
                        
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {  dataList[0] ? (
                     dataList.map((el,index)=>{
                        return(
                           <tr key={index}>
                              <td>{el.name}</td>
                              <td>{el.rollno}</td>
                              <td>{el.email}</td>
                              <td>{el.mobile}</td>
                              <td>
                                <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                                <button className='btn btn-delete' onClick={()=>{console.log(el._id);
                                 handleDelete(el._id);}}>Delete</button>
                              </td>
                           </tr>
                        )
                     }))
                     :
                     (
                        <tr>
                           <td colSpan="5" style={{ textAlign: 'center' }}>No Data :(</td>
                       </tr>
                     )
                  }
               </tbody>
            </table>
         </div>
  






    
   </div>
  </>
 )

}
export default App

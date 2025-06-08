import { useEffect, useState } from 'react';
import './App.css';
import Formtables from "./component/Formtables";
import axios from "axios";
import Header from './component/Header';


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
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleonChange = (e) =>{
     const {value,name} = e.target
     setFormdata((prev)=>{
        return{
           ...prev,
           [name] : value,
           
        };
     });
  };
  
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
  const getFetchData = async() => {
    setLoading(true);
    try {
      const data = await axios.get("/");
      if(data.data.success){
        setdataList(data.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  const filteredData = dataList.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCards = () => (
    <div className="cards-container">
      {filteredData.map((el, index) => (
        <div key={index} className="student-card">
          <h3>{el.name}</h3>
          <div className="student-info">Roll No: {el.rollno}</div>
          <div className="student-info">Email: {el.email}</div>
          <div className="student-info">Mobile: {el.mobile}</div>
          <div className="card-actions">
            <button className="btn btn-edit" onClick={() => handleEdit(el)}>Edit</button>
            <button className="btn btn-delete" onClick={() => handleDelete(el._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );

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


  const handleEditOnChange = async(e)=>{
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

   <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <button className='btn btn-add' onClick={() => setaddSection(true)}>ADD</button>
      <div className="view-toggle">
         <button 
            className={`btn toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
         >
            Table View
         </button>
         <button 
            className={`btn toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
            onClick={() => setViewMode('card')}
         >
            Card View
         </button>
      </div>
   </div>

   {loading ? (
      <div className="loading-spinner" />
   ) : (
      viewMode === 'table' ? (
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
      ) : (
         renderCards()
      )
   )}
   
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
   </div>
  </>
 )

}
export default App

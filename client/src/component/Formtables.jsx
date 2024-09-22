import React from "react";
import "../App.css";
import { IoClose } from "react-icons/io5";

const Form = ({handleSubmit,handleonChange,handleclose,rest}) => {
    return(
    
    <div className='addContainer'>
    
            <form onSubmit={handleSubmit}>
            <div className='close-btn' onClick={handleclose}><IoClose /></div>
        
               <label htmlFor="Student_name">Student Name:</label>
               <input type="text" id='Student_name' name='name' onChange={handleonChange} value={rest.name} />

               <label htmlFor="Roll_no">Rollno:</label>
               <input type="number" id='Roll_no' name='rollno' onChange={handleonChange} value={rest.rollno} />

               <label htmlFor="Email">Email:</label>
               <input type="text" id='Email' name='email' onChange={handleonChange} value={rest.email} />

               <label htmlFor="mobile">Mobile:</label>
               <input type="number" id='Mobile' name='mobile' onChange={handleonChange} value={rest.mobile} /><br />

               <button className='btn'>Submit</button>
            </form>
         </div>
    )
}
export default Form;
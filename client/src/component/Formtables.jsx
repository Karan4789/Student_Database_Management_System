import React from "react";
import "../App.css";
import { IoClose } from "react-icons/io5";

const Form = ({ handleSubmit, handleonChange, handleclose, rest }) => {
  return (
    <div className="addContainer" onClick={(e) => e.target === e.currentTarget && handleclose()}>
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}>
          <IoClose />
        </div>
        
        <h2 style={{marginBottom: '24px', color: '#333'}}>
          {rest._id ? 'Edit Student' : 'Add New Student'}
        </h2>

        <label htmlFor="Student_name">Student Name</label>
        <input 
          type="text" 
          id="Student_name" 
          name="name" 
          onChange={handleonChange} 
          value={rest.name}
          placeholder="Enter student name"
          required 
        />

        <label htmlFor="Roll_no">Roll Number</label>
        <input 
          type="number" 
          id="Roll_no" 
          name="rollno" 
          onChange={handleonChange} 
          value={rest.rollno}
          placeholder="Enter roll number"
          required 
        />

        <label htmlFor="Email">Email</label>
        <input 
          type="email" 
          id="Email" 
          name="email" 
          onChange={handleonChange} 
          value={rest.email}
          placeholder="Enter email address"
          required 
        />

        <label htmlFor="Mobile">Mobile</label>
        <input 
          type="tel" 
          id="Mobile" 
          name="mobile" 
          onChange={handleonChange} 
          value={rest.mobile}
          placeholder="Enter mobile number"
          required 
        />

        <button className="btn">
          {rest._id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Form;
# Student Database Management System (MERN Stack)

## 📌 Project Overview
The **Student Database Management System** is a full-stack web application that allows users to efficiently manage student records. It provides CRUD (Create, Read, Update, Delete) functionality with secure authentication and a responsive UI.

## 🚀 Technologies Used
- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Hooks
- **Styling**: CSS

## 🎯 Features
- Create, Read, Update, and Delete (CRUD) student records
- Search and filter students based on different parameters

## 📂 Project Structure
```
student-database/
│── backend/            # Express.js server
│   ├── index.js       # Main backend file
│
│── frontend/           # React app
│   ├── src/
│   │   ├── Main.jsx # Reusable UI components
│   │   ├── App.css      # Application pages
│   │   ├── App.jsx      # Main React app
│
│── package.json        # Dependencies and scripts
│── README.md           # Project documentation
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/student-database.git
cd student-database
```

### 2️⃣ Install Dependencies
#### Backend:
```bash
cd backend
npm install
```
#### Frontend:
```bash
cd frontend
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the backend directory with the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Run the Application
#### Start the Backend Server:
```bash
cd backend
npm start
```
#### Start the Frontend:
```bash
cd frontend
npm start
```
The app will be available at `http://localhost:3000/`

## 🛠 API Endpoints
| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | `/api/students`    | Fetch all student records |
| POST   | `/api/students`    | Add a new student         |
| PUT    | `/api/students/:id`| Update student details    |
| DELETE | `/api/students/:id`| Delete a student record   |

## 💡 Future Enhancements
- Role-based access control (Admin, Teacher, Student)
- Export student records as CSV/PDF
- Data analytics and visualization

## 🤝 Contribution
Feel free to fork this repository and submit pull requests with improvements.

## 📜 License
This project is licensed under the **MIT License**.

---


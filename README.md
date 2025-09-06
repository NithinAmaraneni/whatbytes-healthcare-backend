# Healthcare Backend API

A RESTful backend API for managing patients, doctors, and their mappings, built using **Node.js**, **Express**, and **PostgreSQL**. This project provides user authentication, CRUD operations for patients and doctors, and the ability to assign patients to doctors.  

---

## 🛠️ Tech Stack

- **Backend Framework:** Node.js + Express  
- **Database:** PostgreSQL (with Sequelize ORM)  
- **Authentication:** JWT (JSON Web Tokens) + bcrypt  
- **Environment Management:** dotenv  
- **Development Tools:** nodemon  

---

## ⚡ Features

- **User Authentication:**  
  - Register and login with secure password hashing (bcrypt).  
  - JWT-based authentication for protected routes.  

- **Patient Management:**  
  - Add, view, update, and delete patients (per authenticated user).  

- **Doctor Management:**  
  - Add, view, update, and delete doctors.  

- **Patient-Doctor Mapping:**  
  - Assign doctors to patients.  
  - Retrieve all doctors assigned to a patient.  
  - Remove doctor from a patient.  

- **Database Security:**  
  - Passwords are stored securely in PostgreSQL.  
  - Only authenticated users can access sensitive routes.  

---

## 📂 Project Structure

healthcare-backend/
│── config/
│ └── db.js # PostgreSQL connection
│── controllers/ # Logic for each API
│── middleware/
│ └── auth.js # JWT authentication middleware
│── models/ # Sequelize models (User, Patient, Doctor, Mapping)
│── routes/ # API route definitions
│── server.js # Entry point
│── .env # Environment variables
│── package.json

yaml
Copy code

---

## ⚙️ Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd healthcare-backend
Install dependencies

bash
Copy code
npm install
Create a PostgreSQL database

Database name: healthcare

Update .env with your database credentials:

ini
Copy code
PORT=5000
DB_HOST=localhost
DB_NAME=healthcare
DB_USER=postgres
DB_PASS=yourpassword
JWT_SECRET=supersecretkey
Start the server

bash
Copy code
npm run dev
The server will start on http://localhost:5000

Sequelize will automatically sync models to the database.

🧪 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user and get JWT

Patients (Authenticated)
Method	Endpoint	Description
POST	/api/patients	Add a new patient
GET	/api/patients	Get all patients for logged-in user
GET	/api/patients/:id	Get details of a specific patient
PUT	/api/patients/:id	Update patient details
DELETE	/api/patients/:id	Delete a patient

Doctors (Authenticated)
Method	Endpoint	Description
POST	/api/doctors	Add a new doctor
GET	/api/doctors	Get all doctors
GET	/api/doctors/:id	Get doctor details
PUT	/api/doctors/:id	Update doctor details
DELETE	/api/doctors/:id	Delete a doctor

Patient-Doctor Mappings (Authenticated)
Method	Endpoint	Description
POST	/api/mappings	Assign a doctor to a patient
GET	/api/mappings	Get all patient-doctor mappings
GET	/api/mappings/:patientId	Get all doctors assigned to a patient
DELETE	/api/mappings/:id	Remove doctor from a patient

All authenticated routes require the Authorization header:

makefile
Copy code
Authorization: Bearer <your-token>
🔑 Security Features
Passwords are hashed using bcrypt before storing in PostgreSQL.

Routes are protected using JWT middleware.

Only the user who created a patient can manage their records.

🚀 Testing
Use Postman or cURL to test all endpoints.

Example registration request:

json
Copy code
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Nithin",
  "email": "nithin@example.com",
  "password": "password123"
}
📈 Future Enhancements
Add role-based access control (admin vs regular users).

Implement search and filtering for patients and doctors.

Add pagination for large datasets.

Create a frontend interface to interact with the API.
# 🎯 Role-Based Ticketing System

## Project Overview
This is a **Role-Based Ticketing System** built as part of a mini-project. The system allows users to create support tickets, while admins can manage and update ticket statuses.

## Tech Stack
### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Frontend
- React.js (Class-Based Components)
- Redux/Context API
- Tailwind CSS / Bootstrap
- React Router

## Features
### Backend
✅ User Authentication (JWT-based login & signup)  
✅ Role-Based Access Control (User & Admin)  
✅ Ticket CRUD Operations  
✅ Secure Routes  

### Frontend
✅ Login & Signup Pages  
✅ User Dashboard (Create & View Tickets)  
✅ Admin Dashboard (View & Update All Tickets)  
✅ State Management with Redux/Context API  
✅ Responsive Design with Tailwind CSS/Bootstrap  

## API Endpoints
| Endpoint         | Method | Description                 | Access    |
|----------------|-------|----------------------------|----------|
| `/signup`      | POST  | Register User/Admin        | Public   |
| `/login`       | POST  | Authenticate & Get Token   | Public   |
| `/tickets`     | POST  | Create Ticket              | User Only |
| `/tickets`     | GET   | View Tickets (User: Own, Admin: All) | Authenticated |
| `/tickets/:id` | PUT   | Update Ticket Status       | Admin Only |

## Installation
### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```




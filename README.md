# MERN Ecommerce App

A basic full-stack ecommerce application built using the MERN stack.  
This project was created to practice full-stack development and understand real-world deployment workflow.


## Features

### Authentication
- User registration
- User login
- JWT token authentication
- Protected cart routes

### Products
- Add product
- Get all products
- Get single product
- Delete product
- Product image using image URL

### Cart System
- Add to cart
- Remove from cart
- Update quantity
- Calculate total price

### UI
- Responsive product cards
- Toast notifications
- Loading spinner
- Navbar navigation

----------------------------------

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

### Deployment
- Frontend → Vercel
- Backend → Render

----------------------------------

## Project Structure

```bash
mern-ecommerce-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
│   └── vite.config.js
│
└── README.md
```

----------------------------------

## Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

----------------------------------

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/mern-ecommerce-app.git
```

----------------------------------

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

----------------------------------

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
----------------------------------

## API Routes

### Auth Routes

```http
POST /api/auth/register
POST /api/auth/login
```

### Product Routes

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
DELETE /api/products/:id
```

### Cart Routes

```http
POST   /api/cart
GET    /api/cart
DELETE /api/cart/:productId
PUT    /api/cart/:productId
```

----------------------------------

## Live Deployment

### Frontend
Add your Vercel frontend URL here.

### Backend
Add your Render backend URL here.

----------------------------------

## Challenges Faced During Development

- MongoDB Atlas IP access configuration
- Render deployment connection issue
- Vercel root directory setup
- Cart total calculation bug
- Image URL rendering issue
- Axios baseURL production issue

All issues were debugged and fixed during development.

----------------------------------

## Future Improvements

- Product search & filters
- Payment gateway integration
- Order management
- Admin role system
- Product reviews
- Wishlist feature
- Better responsive design

----------------------------------

## Author

**Harsh Pansuriya**

Built as a MERN stack practice project to improve full-stack development skills and understand frontend-backend deployment workflow.

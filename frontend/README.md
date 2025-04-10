# PlanIt - Event Planning Made Easy

PlanIt is a full-stack event planning application that allows users to create, manage, and collaborate on events.

## Project Structure

This project is organized into two main parts:

- **Backend**: A Node.js/Express API with MongoDB database
- **Frontend**: A React-based user interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/planit.git
   cd planit
   ```

2. Set up the backend
   ```
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/planit
   PORT=5000
   ```

4. Set up the frontend
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server (from the backend directory)
   ```
   npm run dev
   ```

2. Start the frontend development server (from the frontend directory)
   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Features

- Create and manage events
- Specify event details like name, location, date, and cost
- Suggest alternative times for events
- View event details and time suggestions

## API Endpoints

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event
- `POST /api/events` - Create a new event
- `PUT /api/events/:id/suggest-time` - Suggest a time for an event

## Technologies Used

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

### Frontend
- React
- CSS

## Future Enhancements

- User authentication
- RSVP functionality
- Adding event tags
- Image uploads for event banners
- Email notifications
- Calendar integration
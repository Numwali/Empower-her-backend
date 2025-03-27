# 🚀 EmpowerHer Backend

This is the backend API for the EmpowerHer platform, handling user authentication, therapist matching, community interactions, and mental health resources.

## 🛠 Tech Stack

- 🟢 **Node.js** - Backend runtime
- ⚡ **Express.js** - Server framework
- 🗄 **MongoDB** - Database
- 🔄 **Mongoose** - ODM for MongoDB
- 🔑 **JWT** - Authentication
- 🌍 **Dotenv** - Environment variables

## 📦 Installation

### 1️⃣ Prerequisites
Ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **MongoDB** (local or cloud)

### 2️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/empowerher.git
cd empowerher/backend
```

### 3️⃣ Install Dependencies

```sh
npm install
```

### 4️⃣ Environment Setup

Create a `.env` file in the root and add:

```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5️⃣ Start the Server

```sh
npm run dev
```

The server will run at `http://localhost:5000/`.

## 📁 Project Structure

```
backend/
│── src/
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   ├── models/           # Mongoose models
│   ├── middleware/       # Authentication & validation
│   ├── config/           # Database connection
│   ├── app.js            # Express app setup
│── .env                  # Environment variables
│── package.json          # Dependencies
│── server.js             # Server entry point
```

## 🛠 Available Scripts

- `npm run dev` - Start the development server (nodemon)
- `npm run start` - Start in production mode

## 📜 License

This project is licensed under the **MIT License**.


const allowedOriginsList = [
 "https://empower-her-seven.vercel.app",
 "https://empower-her-backend.onrender.com",
 "http://localhost:3000",
 "http://localhost:4000",
];

export const corsOptions = {
 origin: function (origin, callback) {
   // Check if the origin is in the allowedOriginsList
   if (!origin || allowedOriginsList.includes(origin)) {
     // Allow the request
     callback(null, true);
   } else {
     // Block the request
     callback(new Error("Not allowed by CORS"));
   }
 },
 credentials: true,
};

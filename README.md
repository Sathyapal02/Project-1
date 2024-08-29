Project Overview  
The Trip Planner Website is a dynamic web application designed to assist users in efficiently planning their trips by providing personalized recommendations. The recommendations are tailored based on the number of days, budget, and the number of travelers.  

Features  
AI-Powered Recommendations: Utilizes the Gemini AI API to generate customized travel plans.  
User Data Management: Integrated with Firebase for managing user data and preferences.  
Routing: Implemented with React Router DOM, featuring nested and dynamic routes for a complex application structure.  
Location Autocomplete: Integrated react-google-places-autocomplete for form inputs, allowing users to search locations easily.  
Authentication: Secure sign-in with Google using React OAuth2.  
UI Components: Built with shadcn, a Tailwind CSS-based UI library, for creating buttons, input boxes, pop-up messages, etc.  

Technologies Used  
React  
Gemini AI API  
Firebase  
TailwindCSS  
shadcn (Tailwind CSS UI library)  
React Router DOM  

Key Functionalities  
Generate Trip Plan: After submitting the form, the application converts the input into a prompt, sends it to the Gemini AI Model, saves the result in Firebase, and displays it to the user.  
User Profile Management: The GetUserProfile function is called upon successful login, storing user data such as email, image, and ID in local storage for a personalized experience.  
API Integration: Utilizes X-Goog-FieldMask to request specific data from the Google API as needed.  

Setup & Installation  
Clone the repository: git clone https://github.com/Sathyapal02/project-1.git    
Install dependencies: npm install  
Set up Firebase and Gemini AI API keys in the .env file.  
Start the development server: npm start  

Live Demo  
Check out the live version of the project here: https://trip-planner-swart.vercel.app

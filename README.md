# Notes Website
A simple solution to access, manage and edit you notes at one place

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [License](#license)

## Introduction
Notes Website is a web application developed while learning the MERN stack. The app allows users to create, edit, and manage their personal notes securely. It incorporates a responsive user interface using React.js, enabling users to intuitively interact with their notes. The backend is built using Node.js and Express.js, providing a RESTful API for secure management of notes. User authentication and authorization features have been implemented using JWT (JSON Web Tokens) to ensure secure access to personal notes.

## Features

- **Create, Edit, and Manage Notes**: Users can create, edit, and manage their personal notes through the website. This allows them to easily jot down their thoughts, ideas, reminders, and more, and organize them effectively.

- **Responsive User Interface**: The user interface of the Notes Website is designed to be responsive, adapting to different screen sizes and devices. This ensures a seamless and intuitive experience for users, whether they are accessing the app from a desktop computer, laptop, tablet, or mobile phone.

- **RESTful API**: The backend of the Notes Website is built using Node.js and Express.js, providing a RESTful API for interacting with the notes data. This allows for secure and efficient communication between the frontend and backend components of the application.

- **User Authentication and Authorization**: The app incorporates user authentication and authorization features using JWT (JSON Web Tokens). This ensures that only authenticated users have access to their personal notes and prevents unauthorized access.

## Installation

To install and use the Notes Website, follow these steps:

1. Clone the repository: `git clone https://github.com/akshit-mehra/inotebook.git`
2. Navigate to the project directory: `cd inotebook`
3. Install the required dependencies:
   - Frontend: `npm install`
   - Backend: `cd backend && npm install`
4. Configure the environment variables:
   - Add an  `.env` to both the `client` and `backend` directories.
   - Update the environment variables in the `.env` files to match your configuration (e.g., database connection details, JWT secret).
5. Start the development server:
   - Frontend: In the `home` directory, run `npm run start`.
   - Backend: In the `backend` directory, run `nodemon`.
6. Access the Notes Website in your web browser at `http://localhost:3000`.

Feel free to explore the Notes Website, create, edit, and manage your personal notes securely.

## License

The Notes Website is released under the [MIT License](LICENSE). You are free to use, modify, and distribute this software. See the [LICENSE](LICENSE) file for more details.

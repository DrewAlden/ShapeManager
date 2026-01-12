This project allows users to create different types of shapes, then contact a server to
calculate their area, perimeter, volume, and surface area where relevant.

The two folders, backend and frontend, are the server and client directories respectively.

To install packages, run npm install from within the backend directory. The frontend
has no extra packages to install.

Requirements:
- Node.js
- A way to run the frontend.
  - Python 3 is used for the example running instructions, but the client can also be
    quickly tested using VSCode's Live Server extension

Instructions to run:
- Run the server from within the backend folder with "npm start"
- Run the client from the frontend folder with "python3 -m http.server 8000"
  - Navigate to http://localhost:8000 in a browser to see the working index.html page
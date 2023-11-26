# Whiteboard ✨
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![React Beautiful DND](https://img.shields.io/badge/react_beautiful_dnd-13.0.0-0baf7c)
![Firebase](https://img.shields.io/badge/Firebase-10.5.2-ffa611)
![Material UI](https://img.shields.io/badge/Material_UI-11.11.1-06b6d4)
![Zustand](https://img.shields.io/badge/Zustand-^4.4.6-333383)

## Overview

**Website Link**: https://kanban-793f5.web.app/

This is a Kanban board application, a tool used in project management to help visualize your workflow, minimize your work-in-progress and maximize work efficency. Built with the following technologies

- **Firebase**: My backend service for handling user authencation and database functionality.
- **React**: My frontend library of choice for building UI.
- **React-Beautiful-DND**: Library used to handle user drag-and-drop functionality within the app.
- **Material-UI**: UI and components library used to rapidly develop highly customizable and user accessible components. 

## Features

- **Kanban Board:** Organize your tasks into customizable columns.
- **Drag-and-Drop:** Easily move tasks between columns with a smooth drag-and-drop interface.
- **Realtime Updates:** Changes to the board are reflected in real-time thanks to Firebase.
- **Searching & Filtering** Easily search and find tasks by task details or labels.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JS0Nwong/Whiteboard.git
cd Whiteboard
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase configuration and update the `src/firebase/firebase.js` file with your configuration details.

4. Run the application:

```bash
npm start
```

Visit `http://localhost:3000` in your browser to see the Kanban board app in action.

## Deployment

To deploy the app, build the project and deploy it to a hosting service of your choice. For Firebase hosting, you can use:

```bash
firebase deploy
```

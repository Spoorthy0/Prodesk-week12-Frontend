# Real-Time Chat Application - Frontend

## Overview

This is the frontend of a real-time chat application built using React, Tailwind CSS, and Socket.io Client.

The application allows users to:

* Join a chat room using a username
* Send and receive messages in real time
* View typing indicators
* Switch between chat rooms
* Persist chat messages using Local Storage
* Stay logged in after page refresh

## Technologies Used

* React
* Vite
* Tailwind CSS
* Socket.io Client
* React Router DOM

## Installation

```bash
npm install
```

## Run the Application

```bash
npm run dev
```

The application will start on:

```txt
http://localhost:5173
```

## Features

### User Login

Users enter a username and select a room before joining the chat.

### Real-Time Messaging

Messages are sent and received instantly using WebSockets.

### Typing Indicator

Users can see when another participant is typing.

### Chat Rooms

Available rooms:

* General
* Tech Support

Messages are isolated within their respective rooms.

### Message Persistence

Messages are stored in Local Storage and remain available after page refresh.

### Session Persistence

Username and selected room are stored in Local Storage so users remain logged in after refreshing the page.

## Project Structure

```txt
src
│
├── pages
│   ├── Login.jsx
│   └── Chat.jsx
│
├── App.jsx
├── main.jsx
├── index.css
```

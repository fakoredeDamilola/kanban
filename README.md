# Kanban Management Board

A **Kanban Board** built with **Next.js**, **TypeScript**, and **Styled Components**, featuring **drag-and-drop** (DND) functionality. It allows users to log in using **Google authentication**, **email**, and **password**, and efficiently create and assign tasks. The backend is developed separately with **Node.js and GraphQL**.

## Features

- 🌟 **User Authentication** (Google, Email, Password)
- 🏗 **Drag and Drop** for easy task management
- 🎨 **Styled Components** for custom UI
- ⚡ **Next.js** for server-side rendering and performance
- 📊 **GraphQL API** for seamless backend communication

## Technologies Used

### Frontend

- **Next.js** (React Framework)
- **TypeScript** (Static Typing)
- **Styled Components** (CSS-in-JS)
- **React-Beautiful-DND** (Drag-and-Drop Functionality)
- **NextAuth.js** (Authentication)

### Backend (Separate Repository)

- **Node.js**
- **GraphQL**
- **PostgreSQL / MongoDB** (Database)

## Getting Started

### Prerequisites

- **Node.js** (Latest Version)
- **Yarn or npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/fakoredeDamilola/kanban.git
cd kanban

# Install dependencies
yarn install  # or npm install
```

### Environment Variables

Create a `.env` file in the root directory

```bash
cp .env.example .env
```

### Running the Application

```bash
# Start the development server
yarn dev  # or npm run dev
```

## Usage

- **Log in** using Google or email/password.
- **Create tasks** and assign them to team members.
- **Drag and drop** tasks between different status columns.
- **Update tasks** in real time.

## Deployment

This project can be deployed on **Vercel**:

```bash
# Deploy using Vercel CLI
vercel deploy
```

## Contributing

Feel free to submit pull requests or open issues to improve the project!

## License

MIT License

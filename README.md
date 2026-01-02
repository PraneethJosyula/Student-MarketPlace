# Student Marketplace Platform

A full-stack MVP marketplace designed specifically to cater to University students to sell items in a controlled space.

## Features

- **Fake Authentication**: Simulate login with a dropdown selector
- **Browse Listings**: View all available items with prices and seller information
- **Create Listings**: Simple form to add new items to the marketplace
- **Buy Items**: Purchase items with a single click (marks as sold)
- **Dashboard**: View "My Listings" and "My Purchases" for the current user
- **Admin Controls**: Admin users can delete any listing
- **Mock Data**: All data is stored in local state (no backend required)

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## How to Use

1. **Select a User**: Use the dropdown in the top-right to "log in" as different users
2. **Browse Items**: View all available listings on the home page
3. **Create Listings**: Click "Create Listing" to add new items
4. **Buy Items**: Click "Buy Now" on any available item
5. **View Dashboard**: See your listings and purchase history
6. **Admin Features**: Log in as "Admin User" to delete any listing

## Mock Users

- **John Student** (student) - Has 2 listings
- **Sarah Grad** (student) - Has 1 listing, 1 purchase
- **Mike Senior** (student) - Has 1 listing
- **Admin User** (admin) - Can delete any listing

## Technology Stack

- **Frontend**: React 18 with React Router
- **Styling**: Custom CSS with modern design
- **Build Tool**: Vite
- **State Management**: React useState hooks
- **Data**: Mock arrays simulating database tables

## Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # React entry point
└── index.css        # Global styles
```

All functionality is contained in a single `App.jsx` file for simplicity, including:
- Mock data arrays
- User authentication simulation
- Listing management
- Transaction tracking
- Admin controls

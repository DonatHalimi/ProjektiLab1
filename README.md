# ProjektiLab1 - E-Commerce Clothing Store

A full-stack **E-Commerce Clothing Store** developed as part of **Lënda Laboratorike 1 (Programim)** at the **UBT Faculty of Computer Science**.

The application provides a complete online shopping experience where users can browse clothing products, manage their cart and wishlist, create accounts, complete payments, and select transportation options. An administrative panel is also included for managing the store's data and users.

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)

  * [Customer Features](#customer-features)
  * [Administration](#administration)
* [Technologies Used](#technologies-used)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Database Configuration](#database-configuration)
  * [Running the Application](#running-the-application)
* [Usage](#usage)
* [Authors](#authors)

---

## Overview

**ProjektiLab1 - E-Commerce Clothing Store** is a full-stack web application designed to simulate a modern online clothing store.

The frontend is built with **ReactJS**, while the backend is powered by **Node.js and Express.js**. The application uses a database to persist users, products, categories, orders, payments, wishlists, transportation options, and other store-related information.

The project follows a client-server architecture:

<img width="5459" height="5861" alt="diagram (4)" src="https://github.com/user-attachments/assets/b805d2f1-a457-455c-80d1-529de9738c60" />

---

## Features

### Customer Features

* **User Registration & Login**

  * Create a new account
  * Authenticate existing users
  * JWT-based authentication
  * Protected user routes

* **Product Browsing**

  * Browse available clothing products
  * View products by category
  * View detailed product information
  * View product brands and related information

* **Shopping Cart**

  * Add products to the cart
  * Remove products from the cart
  * Update product quantities
  * Review cart items before checkout

* **Wishlist**

  * Add products to a personal wishlist
  * Remove products from the wishlist
  * View saved products

* **Payments**

  * Checkout functionality
  * Payment processing
  * Payment records

* **Transportation**

  * View available transportation/delivery options
  * Select a transportation method for an order

* **User Profile**

  * View and manage account information
  * Access personal shopping data

* **Additional Pages**

  * Home
  * About Us
  * Categories
  * FAQs
  * Contact
  * Testimonials

* **Responsive User Interface**

  * Modern shopping interface
  * Product-focused layouts
  * Navigation and footer components
  * Success and cancellation pages for payment flow

### Administration

The application includes a dedicated **Admin Panel** for managing the store.

Administrators can manage:

* Users
* Roles
* Products
* Categories
* Brands
* Countries
* Suppliers
* Transportation options
* Slideshow content
* About Us content
* Payments

The admin panel provides separate tables and add/edit interfaces for managing the application's data.

---

## Technologies Used

### Frontend

* **ReactJS**
* **Redux Toolkit**
* **React Router**
* **Tailwind CSS**
* **CSS Modules**
* **Axios**
* **React Icons / UI libraries**

### Backend

* **Node.js**
* **Express.js**
* **JWT Authentication**
* **REST API**
* **CORS**
* **Middleware-based authorization**

### Database

* **MongoDB**

### Development Tools

* **npm**
* **Git**
* **GitHub**
* **Create React App**

---

## Project Structure

The project is divided into two main applications: `client` and `server`.

```text
donathalimi-projektilab1/
│
├── client/                         # React frontend
│   ├── public/
│   └── src/
│       ├── app/                    # Redux store
│       ├── components/             # Reusable UI components
│       ├── context/                # React contexts
│       ├── features/               # Redux features
│       ├── Pages/
│       │   ├── AddEdit/             # Admin add/edit pages
│       │   ├── Admin/               # Admin dashboard
│       │   └── Tables/              # Admin data tables
│       ├── schemas/                 # Validation schemas
│       ├── services/                # Client-side services
│       └── styles/                  # Component styles
│
├── server/                         # Node.js backend
│   ├── controllers/                # Request controllers
│   ├── db/                         # Database configuration
│   ├── middleware/                 # Authentication middleware
│   └── routes/                     # REST API routes
│
├── package.json                    # Root project configuration
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
└── README.md
```

---

## Getting Started

### Prerequisites

Before running the project, make sure the following are installed:

* **Node.js**
* **npm**
* **MongoDB**
* **Git**

You can verify your Node.js and npm installations with:

```bash
node --version
npm --version
```

---

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/DonatHalimi/donathalimi-projektilab1.git
```

Navigate into the project:

```bash
cd donathalimi-projektilab1
```

#### 2. Install client dependencies

```bash
cd client
npm install
```

#### 3. Install server dependencies

Open another terminal or navigate back to the project root:

```bash
cd ../server
npm install
```

---

### Database Configuration

The application requires a running **MongoDB** instance.

Make sure MongoDB is installed and running on your machine.

The database connection is configured in:

```text
server/db/db.js
```

Update the connection configuration if your MongoDB instance uses a different host, port, or database name.

---

### Running the Application

Start the backend server from the `server` directory:

```bash
npm start
```

Then start the React frontend from the `client` directory:

```bash
npm start
```

The frontend will normally be available at:

```text
http://localhost:3000
```

The backend API will run on the port configured in the server application.

> Make sure MongoDB is running before starting the backend.

---

## Usage

Once the application is running, users can:

1. Open the application's homepage.
2. Browse available clothing products.
3. Navigate through different product categories.
4. Open individual products to view their details.
5. Create an account or log in.
6. Add products to the shopping cart.
7. Save products to the wishlist.
8. Review and manage cart items.
9. Select a transportation/delivery option.
10. Complete the checkout and payment process.
11. View their profile and shopping information.

Administrators can access the **Admin Panel** to manage products, users, categories, brands, suppliers, payments, transportation options, and other store content.

---

## Authors

Developed by:

* **[Donat Halimi](https://github.com/DonatHalimi)**
* **[Mal Mikullovci](https://github.com/MalMikullovci)**

### Course

**Lënda Laboratorike 1 (Programim)**
**UBT – Faculty of Computer Science**

# E-Commerce-App

## Table of Contents

  - [Description](#description)
  - [Architecture](#architecture)
  - [Technologies and Tools Used](#technologies-and-tools-used)
  - [Features](#features)
  - [Principles](#principles)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

## Description

Store is a simple web app designed for managing and displaying product information. The application allows users to view product details such as name, image, prices, and descriptions. Additionally, it provides essential functionalities for managing the product catalog.

## Architecture

The E-commerce App follows the MVC (Model-View-Controller) architecture, ensuring a clear separation of concerns and facilitating maintainability and scalability of the application.

## Technologies and Tools Used

* **Backend:**
    * **Database:** MongoDB
    * **Framework:** Express.js framework for building RESTful APIs,Error Handling, Router, Templating .
    * **Runtime:** Node.js
    * **ORM:** Mongoose
    * **Templating:** EJS
    * **Cloud Service:** MongoDB Atlas
    * **Additional Libraries:**
        * `Axios`
        * `connect-flash`
        * `dotenv`
        * `joi` (validation)
        * `method-override`
        * `nodemon` (development)
* **Frontend:**
    * **HTML5, CSS3, JavaScript (ES6+)**
    * **Framework:**  Bootstrap 5, AOS, Starability.css (star rating)
    * **Additional Libraries:**
        * `Font Awesome` (Icons)
        * `Unplash` (Pictures)
        * `Font Awesome Animation`
        * `Google Fonts` (Fonts)
* **Version Control:** Git
* **Payment Gateway:** Stripe
* **Authentication:** Passport.js
* **Package Management:** npm
* **Deployment:** Render(aws)

## Features
* **Basic Features:**
    * **User Registration and Authentication:** Seamlessly sign up and log in to your account to access personalized shopping experiences 
    * **Product Reviews and Ratings:** Make informed purchasing decisions by reading reviews and ratings from other shoppers.
    * **Wishlist:** Create a wishlist of your favorite products to save for later or share with friends and family.
    * **Shopping Cart:** Add items to your shopping cart for easy checkout, with the ability to adjust quantities and remove products as needed
    * **Multiple Payment Options:** Choose from a variety of payment methods, including credit/debit cards, PayPal, and other popular payment gateways.
    * **Responsive Design:** Experience a seamless shopping experience across devices.
    
* **Key Features:**
    * **User Authentication:**  It is secured with SHA-256 along with salt Programming.
    * **Middleware for Product Authentication:**  Various middleware for checking user authentication, product authorship, seller status, review validation, and product validation.
    * **Buyer Restrictions:**  Buyers can only buy, view and review products.
    * **Seller Privileges:** Sellers have additional functionalities such as adding new products, editing, and deleting. also it can accessible of all buyer features.
    * **Seller Product Edit/Delete:** Sellers can only edit or delete their own products, not those of other sellers.
    * **Session Expiry/MaxAge:**  Sessions expire after 7 days.
    * **Product Deletion Cascades:** Deleting a product removes it from the cart and wishlist.
    
## Live Demo

See the action: [Live Demo](https://shop-he5h.onrender.com)

## Screenshots

**Home Page**

![Home](https://github.com/Masterjii/E-commerce-Day-10/assets/122020633/5c5ce769-b561-44dd-8a47-a453bb4d0e08)


**Landing Page**

![Landing](https://github.com/Masterjii/E-commerce-Day-10/assets/122020633/0966035b-a506-4a1e-a4f4-ef45147594b1)

## Principles

The project follows the following software development principles:

1. **DRY (Don't Repeat Yourself):**
   - The codebase adheres to the DRY principle, minimizing redundancy and promoting code reusability. Repeated logic or functionality is consolidated to avoid duplication.

2. **SOC (Separation of Concerns):**
   - The application design follows the SOC principle by dividing the code into distinct modules or components, each handling a specific concern. This separation enhances maintainability and readability.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
- Install [MongoDB](https://www.mongodb.com/try/download/community) and ensure it's running.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Masterjii/E-commerce-Day-10.git

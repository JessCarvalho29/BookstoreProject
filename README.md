# 25S JavaScript Frameworks - 201
# Bookstore CRUD Project

A full-stack web application that manages a bookstore inventory with CRUD functionalities, allowing to Create, Read, Update, and Delete books. 
Includes authentication with username and password or using GitHub account.

## Live Site: 

## Tech Stack

| Purpose             | Technology               |
|---------------------|--------------------------|
| Backend Framework   | Node.js, Express.js      |
| Database            | MongoDB Atlas, Mongoose  |
| Authentication      | Passport (local + GitHub)|
| Views / Templates   | Handlebars (HBS)         |
| Styling             | Tailwind CSS             |
| Deployment          | Render.com               |
| Version Control     | Git, GitHub              |

## Features

1. Authentication
  1.1 Register and login with username and password
  1.2 Login with GitHub account
  1.3 Session-based authentication with logout and flash messages

2. Book Management
  1.1 View all books
  1.2 Add a new book
  1.3 Edit existing books
  1.4 Delete books with confirmation
  1.5 Books include: `Title`, `Author`, `Price`, `Quantity`, `Cover Image URL` and `Description`

## The Additional Feature: Search
Users can filter books using a search input that matches `title` or `author` (case-insensitive).

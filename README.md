# project-part2
CS 5610 Project Part 2 Foundation Building

# Get2Gether - Event Planning and RSVP Application

Get2Gether is a web-based SaaS platform for event planning, allowing users to create, view, and RSVP to events.

## Overview
Get2Gether allows users to register, login, create events, view events, and RSVP for events. It is built using **Express.js** for the backend, **Prisma ORM** for database management, and **PostgreSQL** as the database. The application includes user authentication, event management, and RSVP functionality.


## Part 2 Project Submission
Objectives:
 
 API Development (api Folder):
    
    Implemented the following endpoints:
    - /ping: A simple endpoint to test API responsiveness.
    - 1 GET Endpoint: For the /events page which lists all event items.
    - 1 POST Endpoint: POST /events inserts one item (separate from the register endpoint). This must use the requireAuth       middleware.

Authentication Endpoints:
 -  /login
 -  /register
 -  /logout
 - requireAuth Middleware: Checks for the token cookie and returns a 401 error if the token is invalid.

Client Development (client Folder):

Authentication Pages:
 -  Register Page: Connects to the /register endpoint.
 -  Login Page: Accepts username and password, connects to the /login endpoint.
Functional Pages:
 -  Homepage: Public page describing your website with links to login/register.
 -   Items List Page: GET /events displays all items by connecting to the GET endpoint.
  - Item Insertion Page: POST /events Allows insertion of a new item by connecting to the POST endpoint.

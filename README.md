# MathsTracker

## About

The MathsTracker application is an application which can be used by school
teachers. Teachers can add students to their profile and they can then assign a
level of difficulty to each of their student. The student will then be able to
log in and get mathematics questions assigned to them depending on the profile
their teacher has selected for them.

MathsTracker is great for use by teachers as it will then show the teachers
statistics on each of their students. It will show them what days the student
has done the exercises and the marks the student got for the exercise.

The application will also track how long the students took on each of the
exercise. The teacher will then be able to cater to the different students'
needs depending on these metrics.

# Software Requirements

## Tech Stack

I will be using the MERN stack. (MongoDB, Express.js, React and node.js) I'll be
using create react app to create the front end of the app. I will be using react
instead of Next.js as I feel that since this is more of a systems tool, SEO
optimization would be less important.

I'm more familiar with this stack which will allow for quicker production of the
application. The use of a NoSQL db mongodb will aid in being more flexible as to
the database requirements while building the application.

## Deployment

I will deploy the application through heroku. Heroku makes it easy to implement
and will allow for cost effective scaling if need be.

# System Requirements

## Functional Requirements

- An admin user must be able to register from the sign in page
- All users must be able to sign in from the same sign in page
- An admin/teacher user must be able to create student profiles which then gives
  login details for that user
- Admin user must be able to see statistics for each of their students
- Admin user must be able to assign a level of mathematics difficulty to each
  student
- Admin user must see examples of a question at each level of difficulty so as
  to assign the correct level for the student
- Student user must be able to login and see their daily streak count
- Student user must see historical results from previously completed exercises
- Student user must be able to start a mathematics lesson

## Non-Functional Requirements

- The application must be mobile friendly
- When logging in the user must be logged in within 2 seconds
- When the user is logged in the design of the page must be intuitive
- Visible confirmation messages when any settings are changed
- If there is an error, the error message must be displayed visibly and
  communicated clearly
- The student user must be able to see the next exercise to be done in a clear
  manner

## User Stories

- As a Teacher, I want to be able to add a student to my 'class'
- As a Teacher, I want to be able to set the difficulty of the maths problems
  for each of my students.
- As a Teacher, I want to be able to see statistics for each of my students that
  give me an insight into how they are getting on with the exercises
- As a Student, I want it to be fun to login to my account and do maths problems
- As a Student, I want an easy to use and intuitive interface that is attractive
  and inviting

# BYTZ Academy Backend

Express.js backend for BYTZ Academy with course management and student subscription system.

## Features

- **Course Management**: Create, read, update, and delete courses
- **Student Management**: Create and manage student profiles
- **Subscription System**: Students can subscribe to courses and view their current courses
- **Database Integration**: MySQL database with proper schema and relationships
- **RESTful API**: Clean API endpoints following REST conventions
- **Security**: Rate limiting, CORS, and helmet middleware
- **Error Handling**: Comprehensive error handling and validation

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **mysql2** - MySQL driver for Node.js
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **helmet** - Security middleware
- **express-rate-limit** - Rate limiting

## Database Schema

The system uses three main tables:

1. **courses** - Stores course information
2. **students** - Stores student profiles
3. **subscriptions** - Manages student-course relationships

## API Endpoints

### Courses
- `GET /api/courses` - Get all active courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course (soft delete)

### Students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student

### Subscriptions
- `GET /api/subscriptions/student/:studentId` - Get student's subscriptions
- `POST /api/subscriptions` - Subscribe student to course
- `DELETE /api/subscriptions/:studentId/:courseId` - Unsubscribe student from course
- `GET /api/subscriptions/course/:courseId` - Get course subscribers

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Database Setup**
   - Install MySQL
   - Create database named `bytz`
   - Run the schema script: `backend/database/schema.sql`
   - Update database credentials in `.env`
   - If you get connection errors, try changing `DB_HOST` to `127.0.0.1` or `localhost` in `.env`

3. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```
   PORT=3001
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=bytz
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the Server**
   ```bash
   npm run dev
   ```

## Database Connection

The application uses a connection pool for efficient database connections. Make sure your MySQL server is running and accessible with the credentials provided in the `.env` file.

## Sample Data

The schema includes sample data for:
- 5 courses across different categories
- 5 students with basic information
- Sample subscriptions linking students to courses

## Security Features

- **Rate Limiting**: Limits requests to prevent abuse
- **CORS**: Configured for cross-origin requests
- **Helmet**: Security headers
- **Input Validation**: Basic validation on API endpoints

## Future Enhancements

- JWT authentication for secure API access
- User registration and login system
- Password hashing for student accounts
- Advanced search and filtering
- Pagination for large datasets
- File upload for course materials

## API Response Format

All API responses follow this format:
```json
{
  "success": true|false,
  "message": "Optional message",
  "data": "Response data (optional)",
  "error": "Error details (optional)"
}
```

## Error Handling

The application includes comprehensive error handling:
- Database connection errors
- Validation errors
- Not found errors (404)
- Server errors (500)
- Rate limiting errors

## Development

- Use `npm run dev` for development with nodemon
- Use `npm start` for production
- The server runs on port 3001 by default
- API documentation is available at the root endpoint
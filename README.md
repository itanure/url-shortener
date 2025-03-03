# URL Shortener

A full-stack URL shortener service built with Node.js, React, and MongoDB.

## Architecture

### Backend
- **Technology**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **Key Features**:
  - URL shortening with custom slugs
  - Visit tracking
  - User authentication
  - Rate limiting
  - Dependency injection using tsyringe

### Frontend
- **Technology**: React with TypeScript
- **Key Features**:
  - Responsive design
  - URL shortening interface
  - Copy to clipboard functionality
  - Error handling
  - Route handling for short URLs

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Running the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/itanure/url-shortener.git
   cd url-shortener
   ```

2. Start the services using Docker Compose:
   ```sh
   docker-compose up --build
   ```

3. Access the application:
   Open your browser and go to [http://localhost:3000](http://localhost:3000)

### Project Structure

- `docker-compose.yml`: Docker Compose configuration file.
- `src/`: Source code for the URL shortener service.

## Improvements

### Authentication and User Management
- Implement user registration and login UI
- Add protected routes for authenticated users
- Integrate with existing backend authentication API

### API Performance Optimizations
- Implement Redis caching for original URL lookups
- Add cache invalidation strategy
- Set up TTL (Time To Live)

### License

This project is licensed under the MIT License.
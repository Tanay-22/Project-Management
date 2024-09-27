# Project Management Microservices

This is a Project Management System that is divided into multiple microservices, each responsible for handling different aspects of the system. The project includes the following services: User Service, Project Service, Issue Service, Chat Service, and Subscription Service.

## Microservices Overview

### 1. **User Service**
**Responsibilities:**  
This service is responsible for managing user data and handling user authentication.

**Models:**
- `User`

**Endpoints:**
- `POST /users` - Create a new user.
- `GET /users/{id}` - Get details of a specific user.
- `PUT /users/{id}` - Update user details.
- `DELETE /users/{id}` - Delete a user.

**Communication:**
- Other services call this service to retrieve or update user information.
- Manages user roles and authentication.

### 2. **Project Service**
**Responsibilities:**  
This service manages projects and project-related data.

**Models:**
- `Project`
- `Invitation`

**Endpoints:**
- `POST /projects` - Create a new project.
- `GET /projects/{id}` - Get project details.
- `PUT /projects/{id}` - Update project details.
- `DELETE /projects/{id}` - Delete a project.
- `POST /projects/{id}/invitations` - Send project invitation to a user.

**Communication:**
- Interacts with the User service to retrieve project owners and team members.
- Interacts with the Issue service to manage issues related to projects.

### 3. **Issue Service**
**Responsibilities:**  
This service handles issues related to projects, including comments on issues.

**Models:**
- `Issue`
- `Comment`

**Endpoints:**
- `POST /issues` - Create a new issue.
- `GET /issues/{id}` - Get issue details.
- `PUT /issues/{id}` - Update issue details.
- `DELETE /issues/{id}` - Delete an issue.
- `POST /issues/{id}/comments` - Add a comment to an issue.

**Communication:**
- Interacts with the Project service to link issues to projects.
- Communicates with the User service to manage issue assignees and comment authors.

### 4. **Chat Service**
**Responsibilities:**  
This service manages project-related chats and messages.

**Models:**
- `Chat`
- `Message`

**Endpoints:**
- `POST /chats` - Create a chat for a project.
- `GET /chats/{id}` - Get chat details.
- `POST /chats/{id}/messages` - Send a message in a chat.
- `GET /chats/{id}/messages` - Get all messages for a specific chat.

**Communication:**
- Interacts with the Project service to link chats to projects.
- Communicates with the User service to identify users participating in the chat.

### 5. **Subscription Service**
**Responsibilities:**  
This service handles user subscriptions for different plans (Free, Monthly, Annually).

**Models:**
- `Subscription`
- `PlanType`

**Endpoints:**
- `POST /subscriptions` - Create a subscription for a user.
- `GET /subscriptions/{userId}` - Get subscription details for a user.
- `PUT /subscriptions/{id}` - Update subscription details.
- `DELETE /subscriptions/{id}` - Cancel a subscription.

**Communication:**
- Communicates with the User service to manage subscriptions for users.

---

## Technologies Used:
- **Backend:** Spring Boot, Java
- **Database:** MySQL
- **Messaging:** Feign for inter-service communication
- **Authentication:** JWT-based authentication
- **Frontend:** React (optional)
- **API Documentation:** Swagger (optional)

## How to Run

1. **Clone the repository:**
   ```bash
   git clone <repository-url>

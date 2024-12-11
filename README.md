# Real-Time Event Ticketing System

## Introduction

The Real-Time Event Ticketing System is a comprehensive solution designed to manage event ticketing with high efficiency. The system consists of three major components:

- **CLI Application (Java)**: Implements core functionality using the Producer-Consumer pattern to handle concurrent ticket releases and purchases.
- **Frontend (React)**: Provides a user-friendly interface for managing tickets, customers, vendors, and system configurations.
- **Backend (Spring Boot)**: Handles API requests, data persistence, and business logic.

This project showcases the integration of modern technologies to deliver a seamless ticketing experience.

---

## Setup Instructions

### Prerequisites

Ensure the following software and tools are installed:

- **Java**: Version 11 or later
- **Node.js**: Version 16 or later
- **npm**: Included with Node.js installation
- **Spring Boot**: Included in the project setup
- **Git**: For version control

### Clone the Repository

```bash
git clone https://github.com/yourusername/real-time-event-ticketing-system.git
cd real-time-event-ticketing-system
```

### Backend (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build the application using Maven:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start at `http://localhost:8080` by default.

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will start at `http://localhost:3000` by default.

### CLI Application (Java)

1. Navigate to the CLI directory:
   ```bash
   cd cli
   ```
2. Compile and run the CLI application:
   ```bash
   javac -d bin src/*.java
   java -cp bin Main
   ```

---

## Usage Instructions

### Configuring and Starting the System

1. **Configuration**:
   - Use the **ConfigurationForm** component in the React frontend to set system parameters, such as `totalTickets`, `releaseRate`, `retrievalRate`, and `maxCapacity`.
   - Submit the form to save the configuration.

2. **Starting the System**:
   - Navigate to the **Control Panel** in the React UI.
   - Click the "Start System" button to begin ticketing operations. The system state will be updated to "Running."

### UI Controls

1. **Configuration Form**:
   - Set system parameters and submit.
   - Displays success or error messages based on validation results.

2. **Control Panel**:
   - Start or stop the system.
   - Displays current system status.

3. **Customer and Vendor Management**:
   - Add or remove customers/vendors using the respective buttons.
   - Displays logs for actions taken.

4. **Log Display**:
   - Automatically updates every 5 seconds.
   - Shows system events and actions with timestamps.

5. **Ticket Display**:
   - Shows the remaining ticket count in real-time.

---

## Contributions

Contributions are welcome! Please fork the repository, make changes, and create a pull request.


---

Feel free to contact (mailto:senulijayodya@gmail.com) for any questions or issues.


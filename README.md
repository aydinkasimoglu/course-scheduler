# Course Scheduler

This is a web application that allows you to simply create a course schedule for your school.

## Screenshots

<img src="/screenshots/Screenshot 1.png" width="600"/>
<img src="/screenshots/Screenshot 2.png" width="600"/>
<img src="/screenshots/Screenshot 3.png" width="600"/>

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

### Installing

Clone the repository to your computer.

```bash
git clone https://github.com/aydinkasimoglu/course-scheduler.git
```

Install the dependencies.

```bash
cd course-scheduler
npm install
```
### Configuration

Create a `.env` file in the root directory of the project and add the following variable.

```conf
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<db_name>"
```

### Migration

Run the migration. This project uses [Prisma](https://www.prisma.io/) as an ORM. To create the database tables, run the following command.

```bash
npx prisma migrate dev
```

### Running

Run the development server. The server will run on port 3000 by default.

```bash
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Express Playground Project

This repository contains a collection of small subprojects designed to demonstrate and practice different aspects of Express.js development. Each subproject focuses on a specific topic or functionality.

## Project Structure

- **express201**

  - **Description**: A foundational Express project covering the basics of setting up an Express server, routing, middleware. Also uses `.ejs` templtes and server rendering.
  - **To Run**:
    ```bash
    cd express201
    npm install
    nodemon
    ```

- **movieApi**

  - **Description**: A simple API for viewing movie data. Covers getting all movies info, specific movie data, search by movie title and cast.
  - **To Run**:
    ```bash
    cd movieApi
    npm install
    npm start
    ```

- **movieViewApp**

  - **Description**: A frontend application built to consume the `movieApi`. Includes templates and basic UI interactions using Express's view engine. Can also work with `https://api.themoviedb.org/3` api. To run with external api you have to
  - **To Run**:
    Generate .env file with next fields:

  ```
    API_KEY=<generate key for api.themoviedb.org>
    API_ACCESS_TOKEN=<generate token for api.themoviedb.org>

    NOW_PLAYING_URL=http://localhost:3030/most_popular (use https://api.themoviedb.org/3/movie/now_playing to run with external API)

    API_BASE_URL=http://localhost:3030(use https://api.themoviedb.org/3 to run with external API)

    IMAGE_BASE_URL=http://image.tmdb.org/t/p/w300

    CLIENT_SECRET=<for configuring passport stratedy>
    CLIENT_ID=<for configuring passport stratedy>
    CALLBACK_URL=<for configuring passport stratedy>

    SESSION_SECRET=<for authorisation, generate random value>
  ```

  ```bash
  cd movieViewApp
  npm install
  nodemon
  ```

- **multerUploader**

  - **Description**: Demonstrates file upload functionality using `multer` middleware in Express.
  - **To Run**:
    ```bash
    cd multerUploader
    npm install
    npm start
    ```

- **react-express-multer**

  - **Description**: Combines a React frontend and an Express backend to handle file uploads with `multer`.
  - **To Run Backend**:
    ```bash
    cd react-express-multer/backend
    npm install
    npm start
    ```
  - **To Run Frontend**:
    ```bash
    cd react-express-multer/frontend
    npm install
    npm start
    ```

- **uploadToS3**
  - **Description**: Implements file upload functionality to AWS S3 using the AWS SDK. Covers setting up S3 buckets and configuring access credentials.
  - **To Run**:
    ```bash
    cd uploadToS3
    npm install
    npm start
    ```

## Requirements

- Node.js (v16 or later)
- npm or yarn
- nodemon
- AWS credentials for `uploadToS3` (if running that project, need to generate .env file)

```
AWS_SECRET_KEY=<IAM user secret key>
SECRET_ACCESS_KEY=<IAM user secret access key>
DEFAULT_BUCKET=<bucket name>
DEFAULT_REGION=<region where your bucket is>
SIGNATURE_VERSION=
```

## How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/olha-dev-fullstack/express-movie-app.git
   cd <repository-folder>
   ```
2. Navigate to the desired project directory and follow the instructions in the **To Run** section for each project.


# RESTful API for a Task Management System

Develop a RESTful API using Node.js that allows users to manage tasks. The
system should support creating, retrieving, updating, and deleting tasks. Each task should
have a title, description, creation date, and status (e.g., pending, in progress, completed).




## Installation

Install  with npm Please make sure you have Node.js and MongoDB installed on your system.

```bash
  npm install 
```

create folder logs
```bash
  mkdir logs 
```
create environment variables file
```bash
  touch .env
```

copy all .env.exmpale file  and paste .env file
## API Reference

#### Get all tasks 

```http
  GET http://localhost:8080/api/v1/task
```

#### post tasks 

```http
  post http://localhost:8080/api/v1/task
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**.|
| `description`      | `string` | **Required** |
| `status`      | `string` | **Default value panding**.  |
| `creationDate`      | `string` | **pressent date and time**.  |

#### find one 

```http
  GET http://localhost:8080/api/v1/task/:id
```


#### Delete tasks 

```http
  Delete http://localhost:8080/api/v1/task/:id
```


#### update tasks 

```http
  put http://localhost:8080/api/v1/task/:id
```

# user routes 

#### get  user 

```http
  get http://localhost:8080/api/v1/user
```
#### register user 

```http
  post http://localhost:8080/api/v1/user/register
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userName`      | `string` | **Required**.|
| `email`      | `string` | **Required** |
| `fullName`      | `string` |  **Required**.  |
| `password`      | `string` | **Required**.  |

#### login user 

```http
   post http://localhost:8080/api/v1/user/login
```
#### logout

```http
    post http://localhost:8080/api/v1/user/logout
```

#### change password 

```http
    post http://localhost:8080/api/v1/user/change-Password
```
#### current user

```http
    post http://localhost:8080/api/v1/user/current-user
```
#### updatev account
```http
    post http://localhost:8080/api/v1/user/update-account
```

### note 

login function not woek If I fix this problem it, I will push it to GitHub.


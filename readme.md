# Messenger made with NodeJS

## Requirements 

- NodeJS
- MongoDB (see https://www.mongodb.com/)

## Installation

- Create .env file 
- Copy/Paste .env.example content in .env with your data

```
npm install 
or
yarn
```

## Run the project

```
npm run start
or
yarn start
```

In watch mode
```
npm run start-watch
or
yarn start-watch
```

## Routes 

### Authentication 

#### Login (POST)

```
/auth/login
{
    "mail": "toto@example.com",
    "password": "Password2206"
}
```

#### Register (POST)

```
/auth/register
{
    "mail": "toto@example.com",
    "username": "toto1234",
    "password": "Password2206"
}
```

### User ressource (GET)
```
/users
```
<br>

### Conversation ressource 

#### GET
```
/conversations

/conversations?limit=10&page=1
```

#### POST

```
/conversations

{
    "name": "Conversation name",
    "users": [
        "61d596c4449d687cc4fcfeae",
        "61d5adcaaa3d6bf0f03cefd8"
    ]
}
```

#### PUT

```
/conversations/{id}

{
    "name": "New conversation name",
}
```

#### DELETE

```
/conversations/{id}
```

### Message Ressource (GET)

```
/conversations/{id}/messages
```

## Developers 

<table>
    <tr>
        <td align="center">
            <a href="https://github.com/Ericar974">
                <img src="https://avatars.githubusercontent.com/u/70965684?s=100&v=4" height="100" witdh="100"/><br>
                <b>Armand Dorard</b>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/CanberraMenthonnex">
                <img src="https://avatars.githubusercontent.com/u/70761366?v=4" height="100" witdh="100"/><br>
                <b>Canberra Menthonnex</b>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/LucasDaval">
                <img src="https://avatars.githubusercontent.com/u/70761367?s=100&v=4" height="100" witdh="100"/><br>
                <b>Lucas Daval</b>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/Mario2206">
                <img src="https://avatars.githubusercontent.com/u/60718973?s=100&v=4" height="100" witdh="100"/><br>
                <b>Mathieu Raimbault</b>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/arcausin">
                <img src="https://avatars.githubusercontent.com/u/82374375?v=4" height="100" witdh="100"/><br>
                <b>Alexis D'Ambrosio</b>
            </a>
        </td>
    </tr>
</table>

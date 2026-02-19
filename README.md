# Buzz! 🐝🍯

Buzz is a tool where content sections store the stories/other info that go into that days print/paper. Used by Design as a reference point, regularly used by news arts, sports, opinion;
enterprise, prime quad (occasionally). Typically, it is filled out a couple of hours before the paper is designed, a day before it is put on stands. These notes include what art or articles will be used and how the newspaper should be laid out. The Content section fills this out, while Design Editors use it to design and lay out the paper.

![Buzz Example](./public/Buzz_Ex.png)

There will be a new Figma and Design doc coming soon!
Figma Link: https://www.figma.com/design/r2RNwGFdQtzBkVkH7v93uS/Buzz?node-id=11-176&p=f

## Technology Stack

**Frontend:**
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white)


**Backend:**
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) 
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white) 
![Kubernetes](https://img.shields.io/badge/-Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white)

**Tools & Libraries:**
![Webpack](https://img.shields.io/badge/-Webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=black)
![Passport.js](https://img.shields.io/badge/-Passport.js-34E27A?style=flat-square&logo=passport&logoColor=black)
Slack OAuth

## How do I install Buzz?
To install buzz onto your local machine. 
1. Clone the Repository
```
git clone https://github.com/dailybruin/buzz.git
```
2. Go into the /buzz directory
```
cd buzz
```
3. Install all dependencies
```
npm install 
```

## Getting Setup

1. Fill in the `.env` file
```
CLIENT_SECRET=
SESSION_SECRET=    
MONGO_URL=
NODE_ENV= 
ADMINS=
BOT_TOKEN=
CLIENT_TOKEN=
CLIENT_ID=
```

2. To build the images, run 
```
docker-compose build
```

3. To run the containers, run 
```
docker-compose up
```
*The docker containers are already volume mounted and so your developed local changes are already reflected in the localhost once you save them.

4. Visit [http://localhost:3000/](http://localhost:3000/)


## How do I contribute?
If you'd like to contribute:
1. Create a branch, to standardize branch naming conventions; branches are usually named after the ticket number assigned to it.
```
git checkout -b <Ticket_Number>
```
2. Develop on the branch, stage, commit, and push the code to the branch
```
git add .
git commit -m "<Ticket_Number> : <commit message">
git push
```
*The first push will require a push upstream 
```git push --set-upstream origin <branch_name>```

3. Make a Pull Request (PR) on GitHub, usually you will need to visit the exact branch in GitHub and then creating a PR. 
![PR Image](./public/PR_instructions.png)
Hit Create Pull Request. Then await for approval from an administrator.

4. Once approved, your changes will be merged and you've made a contribution into production!

## File Structure
```
BUZZ/
├── controllers/
├── db/
│   └── models/
│       ├── DesignNote.js
│       ├── InstagramStory.js
│       ├── Member.js
│       ├── Modular.js
│       ├── Schedule.js
│       ├── User.js
│       └── index.js
├── login/
├── public/
├── routes/
│   ├── api/
│   │   ├── designNotes.js
│   │   ├── index.js
│   │   ├── member.js
│   │   ├── modulars.js
│   │   ├── schedule.js
│   │   ├── story.js
│   │   └── utils.js
│   ├── auth.js
│   ├── index.js
│   └── session.js
├── src/
│   ├── components/
│   │   ├── Filler/
│   │   ├── Home/
│   │   ├── Linebreak/
│   │   ├── PhotoInitials/
│   │   ├── Shared/
│   │   └── Staff/
│   ├── services/
│   ├── App.js
│   ├── App.test.js
│   ├── config.js
│   ├── history.js
│   ├── index.css
│   ├── index.js
│   └── serviceWorker.js
├── .babelrc
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── index.js
├── package-lock.json
├── package.json
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

## Deployment

1. `webpack --config webpack.prod.js`

2. `docker-compose build`

3. `docker-compose up`

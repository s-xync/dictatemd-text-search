# dictatemd-text-search
## This project has two parts, backend and frontend
### Backend
- You need mongodb and redis running in your system or in docker on their default ports 27017, 6379
- You can `npm i` and `npm start`
- You can visit `http://localhost:3001/api-docs` to view the swagger documentation
- The backend on initial search fetches from db and then caches it on redis. If a new document is added, it will clear the caches.
- Recording: https://drive.google.com/file/d/1stqdLek4vup7QkwshVBKIIiMHfMzKfOJ/view?usp=sharing

### Frontend
- You just need to do `npm i` and `npm run dev`
- You can visit `http://localhost:3000` to see list of posts and do search. You have the button to add new blog which will take you to that screen.
- Recording: https://drive.google.com/file/d/1Gc1s_yKx0mQC_mbeOdSXIxtAZxxm5X9q/view?usp=sharing
  

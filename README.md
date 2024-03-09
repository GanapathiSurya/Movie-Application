Movie Application 

Introduction 
The Movie App is developed using NestJS and MongoDB. It has two types of users – Admin and Normal User. Normal user can fetch the details of all movies. Admin user can fetch the movie details, add/update/remove the movie details in the application. It is built with Authentication and Authorization for all endpoints. This app covers all scenarios mentioned in problem statement and more details for the same provided as well.  

Installations required: 
1) VS Code 
2) Node JS 
3) Postman 
4) MongoDB Server 

Procedure to Setup Movie App: 

1) Open VS Code > New Window > New Terminal (CTRL + shift + `) 

2) Clone the GitHub repository from the below link using command  
> git clone repo-url

3) Go inside project directory  
> cd movie-app 

4) Install dependencies for project by using below command 
> npm install 

5) Run Server  
> npm run start:dev 

6) Server starts running at http://localhost:8001 

Running Movie App APIs 

Register Admin user 
API:  POST http://localhost:8001/users/register 
Request:  
 { 

       "name":"Admin", 

       "email":"admin@movie-app.com", 

       "password":"qwe@1234" 

   } 
      

Register Normal user 
API:  POST http://localhost:8001/users/register 
Request:  

{ 

    "name": "Surya", 

    "email": "suryagvg2000@gmail.com", 

    "password":"qwe@1234" 

}       
               

Signin User  
API:  POST http://localhost:8001/users/signin 
Request:  
 { 

    "email":"suryagvg2000@gmail.com", 
    "password":"qwe@1234" 

  } 

Note: Collect the token in the response (highlighted) for either normal user or admin. 

Add new movie (Normal User) 
API:  POST http://localhost:8001/movies 
 
Headers 
Authorization : {token} (SignIn as normal user and pass the token) 
Request:  
 { 

    "title": "Inception", 

    "genre": "Action", 

    "rating": 4, 

    "link": "https://www.link2.com" 

    } 
	 

Add new movie (Admin) 
API:  POST http://localhost:8001/movies 
Headers:  
Authorization: {token} (SignIn as Admin and pass the admin token ) 
Request:  
 { 

    "title": "Inception", 

    "genre": "Action", 

    "rating": 4, 

    "link": "https://www.link2.com" 

    } 
	 

Get the list of all movies  
API:  GET http://localhost:8001/movies 
Headers:  
Authorization: {token} (Pass the admin/normal user token) 
Request: None (Payload empty) 
         

Search for the list of all movies by genre/ title 
API:  GET http://localhost:8001/movies?genre=Horror 
Headers:  
Authorization: {token} {Pass the admin/normal user token ) 
 
Request: None (Payload empty) 
              

Update new movie  
API:  PUT http://localhost:8001/movies/{id} // collect the id in GET API response 
Headers:  
Authorization: {token} (SignIn as Admin and pass the admin token ) 
Request:  
	{ 

    "title": "Hereditary", 

    "genre": "Horror", 

    "rating": 4.8, 

    "link": https://www.link4.com 

}  
               

Delete movie 

     API:  DELETE http://localhost:8001/movies/{id} // collect the id in GET API response 
     Headers:  
     Authorization: {token} (SignIn as Admin and pass the admin token )  
     Request: None (Payload empty) 


Scenarios: 
Test the below scenarios from Postman 

1) Signup should allow user to signup/signin as admin. 

2) System should allow user to signup/signin as normal user. 

3) System should not allow the same email to be registered again. 

4) System should not allow non-registered user to signin. 

5) System should not allow user to signin in case of incorrect credentials. 

6) System should allow admin user to perform operations like fetch, add, update, delete movie details. 

7) System should allow normal user to fetch movies details (all movies or based on genre, title etc). 

8) System should not allow normal user to add/update/remove the movie details. 

9) System should not allow the user to perform any action after unsuccessful authentication (invalid token, expired token, empty token). 

10) ystem should not allow admin user to update/remove non-existent movie (Invalid Id) 
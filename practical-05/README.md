# practical-05

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Description
Update project car showroom.

· In the navbar component show nav buttons on the right “home”, “login” and “register”.

· Create two components login-form and register-form.

· On click “home”, “login” and “register” buttons navigate the respective page.


For login-form add email and password input.

1) Email filed value must be an email address.

2) password must be 8-12 characters long and contain at least one numeric digit and a special character.

3) Last show button submits. On click first check validations if the form is valid then send all inputs value in post “https://testapi.io/api/dartya//login” if response status code 200 then navigate to home using programmatic routing. Or On error show alert    


For register-form.

1) Email filed value must be an email address.

2) password must be 8-12 characters long and contain at least one numeric digit and a special character.

3) Conform password input and validate both passwords are the same.

4) Role filed with dropdown admin, employee, and customer.

5) Gender with radio input.

6) Age with numeric input.

7) DOB with date input.

8) Last show button submits. On click first check validations if the form is valid then send all inputs value in post API of the user if response status code 200 then navigate to login using programmatic routing. Or On error show alert


· Create a new page car detail

· On click info in gallery cards info button navigate to details/{id} get data of particular car from Api using id and show it.

· Also add back button to navigate to home again.

## Demo 
# Website URLs
Deployed on netlify platform :-

[netlify](https://vuejs-mn-pr-05.netlify.app/)

## Repo Link
[Practical - 05](https://github.com/mansinakrani/vuejs-practicals.git)
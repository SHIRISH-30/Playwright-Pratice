//we will create a class here 
//so that we can use it as a objects and use the members and function present in the class
class LoginPage{

        //just like selenium 
        //make a constructor saying the this.page=page
        constructor(page){
            this.page=page;
            //as its login so BASE_URL bhi initalized kardo 
            this.baseUrl=process.env.BASE_URL;

            //locators me this dalke likh
            this.usernameInput= page.getByPlaceholder('Username')
            this.passwordInput=page.getByPlaceholder('Password')
            this.loginBtn=page.getByRole('button',{name:'Login'})
        }


       

        //actions 
        
        //open function 
        async open(){
            console.log(`Opening Login Page url: ${this.baseUrl}`)
            await this.page.goto(this.baseUrl);
            console.log("Login page url hitted")
        }
        async login(username, password){
            await this.usernameInput.fill(username)
            await this.passwordInput.fill(password)
            await this.loginBtn.click()
        }
}

module.exports={LoginPage}
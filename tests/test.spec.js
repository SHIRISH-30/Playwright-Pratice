//import the modules 
const {test,expect}=require("@playwright/test")
const {LoginPage}=require("../pages/LoginPage")
const users=require("../data/user")
const constants =require("../data/consants")



//now before every test case I want to run
test.beforeEach(async({page})=>{
      let loginPage=new LoginPage(page);
      await loginPage.open();    
})


//test cases/scenario 
test("User can login with valid creds @smoke",async({page})=>{
  
  const loginPage = new LoginPage(page);

  //use getby to locate the element 
  loginPage.login(users.standardUser.username,users.standardUser.password)

  //we want to check something thus use expect 
  await expect(page).toHaveURL(constants.urls.inventory);
  await expect(page.locator('.title')).toHaveText(constants.text.productTtile);

})

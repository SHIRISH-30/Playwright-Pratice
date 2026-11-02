//imports
const {test,expect}=require("@playwright/test")
const { LoginPage } = require("../pages/LoginPage")
const {Inventory}=require("../pages/InventoryPage")
const consants=require("../data/consants")
const users=require("../data/user")

//runs before every test case
test.beforeEach(async({page})=>{
    //Login Page login karna 
    let loginPage=new LoginPage(page);
    let inventory=new Inventory(page);
    await loginPage.open();
    await loginPage.login(users.standardUser.username,users.standardUser.password)
    


})

//test cases/scenario for inventory 
test("cart badge updates while adding product",async({page})=>{
    
    let inventory=new Inventory(page);

    //add product to the cart 
    await inventory.addProductToCart(consants.text.sauceLabBackPackText)
    await inventory.addProductToCart(consants.text.sauceLabBikeLight)
    const cartCount=await inventory.getCartBadge()
    //check if cartBadge is 2 
    expect(cartCount).toBe(2)

})

test('testing the dropdown',async({page})=>{
    let inventory=new Inventory(page);
    //dropdown select kar
    await inventory.sortBy(consants.sortOptions.priceLowtoHigh);
    //graab the prices
    const prices= await inventory.getAllProductPrices();
    //now make a sorted price and compare prices
    const sortedPrice=[...prices].sort((a,b)=>a-b);
    expect(prices).toEqual(sortedPrice)

    await inventory.sortBy(consants.sortOptions.priceHightoLow);
    const newprices=await inventory.getAllProductPrices();

    const DescPrice=[...prices].sort((a,b)=>b-a);
    
    expect(newprices).toEqual(DescPrice)
})


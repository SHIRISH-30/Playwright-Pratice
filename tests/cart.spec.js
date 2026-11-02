//imports
const {test,expect}=require("@playwright/test")
const { LoginPage } = require("../pages/LoginPage")
const {Inventory}=require("../pages/InventoryPage")
const {Cart}=require("../pages/Cart")
const consants=require("../data/consants")
const users=require("../data/user")


//test cases
test.beforeEach(async({page})=>{
    let loginPage=new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.standardUser.username,users.standardUser.password)
})

//test cases/scenario 
test('added products appear in cart correctly',async({page})=>{
    let inventory=new Inventory(page);
    let cart=new Cart(page);
    await inventory.addProductToCart(consants.text.sauceLabBackPackText)
    await inventory.addProductToCart(consants.text.sauceLabBikeLight)
    //go to the cart 
    await cart.openCart();
    await expect(page).toHaveURL(consants.urls.cart);
    const itemNames=await cart.getproductsinCart();
    //check
    expect(itemNames).toEqual([consants.text.sauceLabBackPackText,consants.text.sauceLabBikeLight])

})

test('to check the remove btn in cartpage', async ({ page }) => {
    let inventory = new Inventory(page);
    let cart = new Cart(page);

    // Add two products
    await inventory.addProductToCart(consants.text.sauceLabBackPackText);
    await inventory.addProductToCart(consants.text.sauceLabBikeLight);

    // Open cart
    await cart.openCart();

    // Remove Backpack
    await cart.removeProduct(consants.text.sauceLabBackPackText);

    // Verify one product remains
    expect(await cart.getCount()).toBe(1);

    // Verify the remaining product is Bike Light
    const remainingProducts = await cart.getproductsinCart();
    expect(remainingProducts).toEqual([
        consants.text.sauceLabBikeLight
    ]);
});

test('add a product to cart and then head to checkout',async({page})=>{
    let inventory = new Inventory(page);
    let cart = new Cart(page);

    // Add two products
    await inventory.addProductToCart(consants.text.sauceLabBackPackText);
    await inventory.addProductToCart(consants.text.sauceLabBikeLight);

    // Open cart
    await cart.openCart();
    await cart.checkOut();

    //fill the information
    await cart.fillinfo(consants.checkoutData.firstname,consants.checkoutData.lastname,consants.checkoutData.zipcode)
    //click on continue
    await cart.continuetoOverview();

    await expect(page).toHaveURL(consants.urls.checkout);

    const subtotal=await cart.getSubtotalCost();
    const tax=await cart.getTaxCost();
    const total=await cart.getTotal();
    const finalTotal=subtotal+tax
    expect(total).toEqual(finalTotal)

    //finish btn
    await cart.clickfinishbtn();
    expect(page).toHaveURL(consants.urls.completepage);
    console.log(await cart.completeheader.textContent())
    expect(cart.completeheader).toHaveText('Thank you for your order!')



})

class Cart{

    //constructor 
    constructor(page){
        this.page=page;
        this.baseurl=process.env.BASE_URL;

        //locators 
        //cart icon 
        this.carticon=page.locator('[data-test="shopping-cart-link"]')
        //product name in cart 
        this.itemNames=page.locator('[data-test="inventory-item-name"]')
        //cart item 
        this.cartitemname=page.locator('[data-test="inventory-item-name"]')
        //checkout btn
        this.checkoutBtn=page.locator('[data-test="checkout"]')
        this.firstnamefield=page.locator('[data-test="firstName"]')
        this.lastnamefield=page.locator('[data-test="lastName"]')
        this.zipcodefield=page.locator('[data-test="postalCode"]')
        this.continuebtn=page.locator('[data-test="continue"]')
        this.subTotalfield=page.locator('[data-test="subtotal-label"]')
        this.taxfield=page.locator('[data-test="tax-label"]')
        this.totalprice=page.locator('[data-test="total-label"]');
        this.finishBtn=page.locator('[data-test="finish"]')
        this.completeheader=page.locator('[data-test="complete-header"]')
        
    }

    //methods 

    //open the cart 
    async openCart(){
        await this.carticon.click()
    } 

    //to get all products in the cart 
    async getproductsinCart(){
        return await this.itemNames.allTextContents();
    }

   getCartitem(productname) {
    return this.page
        .locator('.cart_item_label')
        .filter({ hasText: productname });
}

    async removeProduct(productname){
        const item= await this.getCartitem(productname);
        console.log(item)
        console.log(await item.getByRole('button',{name:'Remove'}))
        await item.getByRole('button',{name:'Remove'}).click();

    }

    async getCount(){
        return await this.itemNames.count();
    }

    async checkOut(){
        await this.checkoutBtn.click();

    }

    async fillinfo(firstname,lastname,zipcode){
        await this.firstnamefield.fill(firstname)
        await this.lastnamefield.fill(lastname)
        await this.zipcodefield.fill(zipcode)

    }
    async continuetoOverview(){
        await this.continuebtn.click();
    }

    async getSubtotalCost(){
        const text=await this.subTotalfield.textContent();
        console.log(text)
        return parseFloat(text.replace('Item total: $',''));
    }

    async getTaxCost(){
        const text=await this.taxfield.textContent();
        console.log(text)
        return parseFloat(text.replace('Tax: $',''));
    }

    async getTotal(){
        const text=await this.totalprice.textContent();
        console.log(text)
        return parseFloat(text.replace('Total: $',''));
    }

    async clickfinishbtn(){
        await this.finishBtn.click()
    }

}
module.exports={Cart}
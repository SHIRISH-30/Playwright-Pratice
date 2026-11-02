class Inventory{

    //constructor
    constructor(page){
        this.page=page;
         this.baseUrl=process.env.BASE_URL;


        //locators

        //to get all card 
        this.InventoryItems=page.locator('[data-test="inventory-item"]')
        //to get cart badge
        this.cartBadge=page.locator('.shopping_cart_badge')
        //dropdown
        this.dropdown=page.locator('.product_sort_container')
        //price 
        this.priceTexts=page.locator('[data-test="inventory-item-price"]')

    }

    //actions/methods

    //to return the prodcut card which is required
    getProductCard(productname){
        return this.InventoryItems.filter({hasText:productname})
    }

    async addProductToCart(productname){
        //to get the product 
        const product = this.getProductCard(productname);
        //now after getting the product , add to cart 
        await product.getByRole('button',{name:'Add to Cart'}).click()

    }

    //to get cart Badge Count
    async getCartBadge(){
        const cartCount=await this.cartBadge.count()
        if(cartCount===0) return 0;
        return parseInt(await this.cartBadge.textContent(),10)
    }

    //sorting of dropdown
    async sortBy(option){
        await this.dropdown.selectOption(option); //this will slect low to high 
    }
    async getAllProductPrices(){
        const prices=await this.priceTexts.allTextContents();  //[$7.99,$4.99, ......]
        //now I have remoove the dollar sign and return array 
        return prices.map((p)=>{ parseFloat(p.replace('$',''))})
    }



}

module.exports={Inventory}
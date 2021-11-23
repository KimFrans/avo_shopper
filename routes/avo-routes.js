module.exports = function AvoRoutes(avoDeals){
   
    async function home(req, res){
        try {
            res.render('index', {
                topavo: await avoDeals.topFiveDeals()
            })
        }
        catch (err) {
            console.log(err)

        }
    }

    async function showTop5(req, res){
        try {
            res.render('index', {
                topavo: await avoDeals.topFiveDeals()
            });
        } catch (err) {
            
        }
    }

    async function addNewDeal(req, res){
        try{
            const store  = req.body.shops;
            const quantity = req.body.qty;
            const price = req.body.price;

            if(quantity && price != ''){
                await avoDeals.createDeal(store, quantity, price)
            }

            res.render('addDeal', {
                shops : await avoDeals.listShops()
            });
        }
        catch(err){
            console.log(err)
        }
    }

    async function viewAllShops(req, res){
        try{
            res.render('allStores', {
                shops : await avoDeals.listShops()
            });
        }
        catch(err){
            console.log(err)
        }
    }

    async function addNewShop(req, res){
        try{
            const shopRequest = req.body.shopName;

            if(shopRequest != ""){
                await avoDeals.createShop(shopRequest)
            }

            res.render('addShops', {
                shops : await avoDeals.listShops()
            });
        }
        catch(err){
            console.log(err)
        }
    }

    async function addNewShopPage(req, res){
        try{
            res.render('addShops', {
                shops : await avoDeals.listShops()
            });
        }
        catch(err){
            console.log(err)
        }
    }

    async function budgetDeals(req, res){
        try{
            const limit = req.body.budget
            await avoDeals.recommendDeals(limit)
            res.render('recommendations', {
                budgetDeal: await avoDeals.recommendDeals(limit)
            });
        }
        catch(err){
            console.log(err)
        }
    }

    async function main(req, res){
        try {
            res.render('index', {
                topavo: await avoDeals.topFiveDeals()
            })
        }
        catch (err) {
            console.log(err)

        }
    }

    async function shopDeals(req, res){
        try{
            // const shopDealName = req.body.deals
            // await avoDeals.dealsForShop(shopDealName)
            res.render('avoDealPerShop', {
                shops : await avoDeals.listShops(),
                // deal : await avoDeals.dealsForShop(shopDealName)
            });
        }
        catch(err){
            console.log(err)
        }
    }

    async function Deals(req, res){
        try{
            const shopDealName = req.body.deals
            await avoDeals.dealsForShop(shopDealName)
            res.render('avoDealPerShop', {
                shops : await avoDeals.listShops(),
                deal : await avoDeals.dealsForShop(shopDealName)
            });
        }
        catch(err){
            console.log(err)
        }
    }


    return {
        home,
        main,
        addNewDeal,
        viewAllShops,
        addNewShop,
        addNewShopPage,
        budgetDeals,
        showTop5,
        shopDeals,
        Deals

    }
}
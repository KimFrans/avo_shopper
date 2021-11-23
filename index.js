const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const avoShopperWeb = require('./avo-shopper');
const pg = require('pg')
const Pool = pg.Pool;
const avoRoute = require('./routes/avo-routes')

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const pool = new Pool({
    connectionString: connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/avo-shopper',
    ssl: {
        useSSL,
        rejectUnauthorized: false
    }
});

const app = express();
const AvoRoutes = avoShopperWeb(pool)
const avoShopperRoute = avoRoute(AvoRoutes)
const PORT =  process.env.PORT || 3019;


// enable the static folder...
app.use(express.static('public'));

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');


app.get('/', avoShopperRoute.home);
app.get('/addNewDeal', avoShopperRoute.addNewDeal);
app.get('/recommendations', avoShopperRoute.budgetDeals);
app.post('/add-deals', avoShopperRoute.addNewDeal);
app.get('/all-shops', avoShopperRoute.viewAllShops);
app.get('/addNew-shop', avoShopperRoute.addNewShopPage);
app.post('/add-shop', avoShopperRoute.addNewShop);
app.post('/budget', avoShopperRoute.budgetDeals);
app.get('/backToMain', avoShopperRoute.main);
app.get('/back', avoShopperRoute.main);
app.get('/backToAddDeals', avoShopperRoute.addNewDeal);
app.get('/backToAllStores', avoShopperRoute.viewAllShops);
app.get('/shopDeal', avoShopperRoute.shopDeals);
app.post('/shop-deal', avoShopperRoute.Deals);


// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`AvoApp started on port ${PORT}`)
});
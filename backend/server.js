const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); 
const PORT = process.env.PORT || 4000; 

const db = require('./routes/queries');

const cookieParser = require('cookie-parser');

app.use(cors({
  origin: process.env.FE_ORIGIN,
  credentials: true
}));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', db.createSessionToken, (req, res) => {
 res.send('API is running...'); 
}); 

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});


app.get('/auth', db.authenticateToken, db.checkAuth);

app.get('/products', db.getProducts);

app.get('/products/id/:id', db.getProductById);

app.get('/products/category/:category', db.productsByCategory);

app.get('/products/type/:type', db.productsByType);

app.get('/products/search/:searchQuery', db.searchProducts);

app.post('/user/createuser',db.authenticateToken, db.createUser);

app.post('/user/login', db.authenticateToken, db.loginUser);

app.post('/user/signout', db.signout);
 
app.get('/cart/', db.authenticateToken, db.getCartItems);

app.post('/cart/merge', db.authenticateToken, db.mergeCartItems);

app.post('/cart/override', db.authenticateToken, db.overrideCartItems);

app.post('/cart/:id', db.authenticateToken, db.addItemToCart);

app.delete('/cart/:id', db.authenticateToken, db.removeItemFromCart);

app.delete('/cart/clear/:id', db.authenticateToken, db.clearItemFromCart);

app.get('/orders/', db.authenticateToken, db.loadPreviousOrders);

app.post('/orders/', db.authenticateToken, db.orderItems);


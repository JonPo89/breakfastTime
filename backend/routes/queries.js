const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'breakfast_time',
    password: 'postgres',
    port: 5432
});


const createSessionToken = () => {
    const payload = { cartItems: [] };
    const secret = 'indicative_secreT1!';
    const options = { expiresIn: '24h'};
    return jwt.sign(payload, secret, options);
}

const updateTokenWithUser = (token, user) => {
    if (!token) {
        console.log('updateTokenWithUser, no token');
        return jwt.sign({ user_id: user.user_id, username: user.username, name: user.name, email: user.email, cartItems: user.cartItems ? user.cartItems : [] }, 'indicative_secreT1!', { expiresIn: '1h' });
    }
    const decoded = jwt.verify(token, 'indicative_secreT1!');
    const secret = 'indicative_secreT1!';
    const newPayload = {
        ...decoded,
        user_id: user.user_id,
        name: user.name,
        username: user.username,
        email: user.email,
        cartItems: user.cartItems ? user.cartItems : []
        
    }
    return jwt.sign(newPayload, secret);
};

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) return next();
    
    jwt.verify(token, 'indicative_secreT1!', (err, decoded) => {
        if (err){
            res.clearCookie('token');
            return res.status(403).send('Invalid Access Token');
        } 
        req.user = {... decoded};
        
        return next();
    });
};

const signout = (req, res, next) => { 
    req.user = {cartItems: []};
    res.clearCookie('token');
    res.status(200).send({isAuthenticated: false});
};

const checkAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        
        if (!token) {
            token = createSessionToken();
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 3600000
            });
            return res.status(200).json({ isAuthenticated: false });
        }
        
        jwt.verify(token, 'indicative_secreT1!', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token invalid or expired' });
            }

            req.user = {... decoded};
            if (req.user.user_id) {
                res.status(200).json({ isAuthenticated: true, user: {user_id: req.user.user_id, username: req.user.username, name: req.user.name, email: req.user.email} });
            
            } else {
                return res.status(200).json({ isAuthenticated: false });
            }
            
        });
    } catch (error) {
        console.error('Error in checkAuth:', error);
        res.status(500).json({ message: 'Server error during authentication check' });
    }
};

const createUser = async (req, res) => {
    const { username, name, password, email } = req.body;
    try {
        const usernameCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (usernameCheck.rows.length > 0) {
            return res.status(400).json({error:'Username already taken'});
        } else if (emailCheck.rows.length > 0) {
            return res.status(400).json({error: 'Email already taken'});
        } else if (password.length < 7) {
            return res.status(400).json({error:'Password must be at least 6 characters long.'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        pool.query(
            'INSERT INTO users (username, name, password_hash, email) VALUES ($1, $2, $3, $4) RETURNING *', 
            [username, name, hashedPassword, email], async (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error creating user');
                }
                const user = results.rows[0];
                const token = jwt.sign({ user_id: user.user_id, username: user.username, name: user.name, email: user.email, cartItems: user.cartItems }, 'indicative_secreT1!', { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 3600000 });

                req.user = { user_id: user.user_id, username: user.username, name: user.name, email: user.email, cartItems: req.user ? req.user.cartItems : [] };

                return res.status(201).json({ user: {user_id: req.user.user_id, username: req.user.username, name: req.user.name, email: req.user.email} });
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).send('Error hashing password'); 
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userExists = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
        if (userExists.rows.length > 0) {
            const validPassword = await bcrypt.compare(password, userExists.rows[0].password_hash);
            if (validPassword) {
                const token = updateTokenWithUser(req.cookies.token || null, userExists.rows[0]);
                res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 3600000 });

                req.user = {user_id: userExists.rows[0].user_id, username: userExists.rows[0].username, name: userExists.rows[0].name, email: userExists.rows[0].email, cartItems: req.user ? req.user.cartItems : []};
                return res.status(201).json({token: token, user:{user_id: req.user.user_id, username: req.user.username, name: req.user.name, email: req.user.email}});
            } else {
                return res.status(401).send('Invalid credentials');
            }
        } else {
            return res.status(401).send('Invalid credentials');
        };
    } catch (err) {
        console.log(err);
        res.status(401).send('Invalid credentials');
    }
};


const getProducts = (req, res) => {
    pool.query('SELECT products.*, product_images.image_url, product_images.image_name FROM products JOIN product_images ON product_images.product_id = products.product_id WHERE product_images.is_primary = true;', (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).json(results.rows);
    })
};

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT products.*, product_images.image_url, product_images.image_name FROM products JOIN product_images ON products.product_id = product_images.product_id WHERE products.product_id = $1;', [id], (err, results) => {
        if (err) {
            throw err;
        }
        const product = results.rows[0];
        product.images = results.rows.map(image => ({
            name: image.image_name,
            url: image.image_url
        }))
        res.status(200).json(product);
    } )
};

const productsByType = (req, res) => {
    const type = req.params.type;
    pool.query('SELECT * FROM products WHERE product_type = $1', [type], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error receiving products');
        }
        res.status(200).json(results.rows);
    })
};

const productsByCategory = (req, res) => {
    const category = req.params.category;
    pool.query('SELECT * FROM products WHERE card_category = $1', [category], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error receiving products');
        }
        res.status(200).json(results.rows);
    })
};

const searchProducts = (req, res) => {
    const searchQuery = req.params.searchQuery.toLowerCase();
    const words = searchQuery.split(' ');
    const queryStart = 'SELECT products.* FROM products JOIN tags ON products.product_id = tags.product_id WHERE ';

    const queryWords = words.map(word => `%${word}%`);
    console.log(queryWords);
    const whereConditions = words.map((word, index) => `
        LOWER(products.name) LIKE $${index+1} 
        OR LOWER(products.card_category) LIKE $${index+1} 
        OR LOWER(products.product_type) LIKE $${index+1} 
        OR LOWER(tags.name) LIKE $${index+1}
    `).join(' OR ');
    
    pool.query(`${queryStart + whereConditions}`, queryWords, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error searching for products');
        }
        res.status(200).json(results.rows);
    })
};

const getCartItems = (req, res) => {

    pool.query(' SELECT product_id, quantity FROM cart_items WHERE user_id = $1', [req.user.user_id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving cart items');
        }
        req.user.cartItems = results.rows;
        res.status(200).json(results.rows);
    })
}

const mergeCartItems = async (req, res) => {
    const userId = req.body;
    try {
        for (let item of req.user.cartItems) {
            await pool.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = $3 RETURNING *', [userId, item.product_id, item.quantity]
            );
        }   
        getCartItems(req,res);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error merging carts')
    }
};

const overrideCartItems = async (req, res) => {
    const cartItems = req.body.cartItems;
    try{
        await pool.query('DELETE FROM cart_items WHERE user_id = $1', [req.user.user_id]);
        for (let item of cartItems) {
            await pool.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)', [req.user.user_id, item.product_id, item.quantity]);
        }
        console.log('through to getItems');
        getCartItems(req, res);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error overriding cart');
    }
}

const addItemToCart = async (req, res) => {
    const productId = parseInt(req.params.id);
    
    /*if (!req.user) {
        req.user = {cartItems: []};
    } else if (!req.user.cartItems) {
        req.user.cartItems = [];
    };
    let cartLocation = req.user.cartItems.findIndex(item => item.product_id === productId);

    if (cartLocation !== -1){
        req.user.cartItems[cartLocation].quantity ++;
    } else {
        req.user.cartItems.push({product_id: productId, quantity: 1});
        cartLocation = req.user.cartItems.length -1; 

    }
    */

    if (req.user && req.user.user_id) {
        
        pool.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, 1) ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart_items.quantity + 1 RETURNING *', [req.user.user_id, productId], (err, results) => {
            if (err) {
                console.error(`Database error while adding product ${productId} to cart for user ${req.user.user_id}`,err);
                res.status(500).send('Error adding product to cart');
            }
            
            res.status(200).json(results.rows[0]);
        })
    } else {
        return res.status(200).send({product_id: productId, quantity: 1});
    }
}

const removeItemFromCart = async (req, res) => {
    const product_id = parseInt(req.params.id);

    /*
    const cartLocation = req.user.cartItems.findIndex(item => item.product_id === product_id);
    if (cartLocation !== -1) { 
        if (req.user.cartItems[cartLocation].quantity > 1) {
            req.user.cartItems[cartLocation].quantity --;
        } else {
            req.user.cartItems.splice(cartLocation, 1);
        }
    }
    */
    if (req.user && req.user.user_id) {
        pool.query('UPDATE cart_items SET quantity = quantity - 1 WHERE user_id = $1 AND product_id = $2', [req.user.user_id, product_id], (err, results) => {
            if (err) {
                console.log(`Error lowering quantity of ${product_id} from user ${req.user.user_id}`, err);
                res.status(500).send('Error reducing quantity');
            }
            pool.query(`DELETE FROM cart_items WHERE quantity < 1`);
            res.status(200).json(`Successfully reduced quantity of product ${product_id}`);
        })
    } else {
        res.status(200).json('User not signed in. Successfully remove product ' + product_id)
    }
};

const clearItemFromCart = async (req, res) => {
    const product_id = parseInt(req.params.id);
    console.log(product_id + 'balh' + req.user.user_id)
    if (req.user && req.user.user_id) {
        pool.query('DELETE FROM cart_items WHERE product_id = $1 AND user_id = $2', [product_id, req.user.user_id], (err, response) => {
            if (err) {
                console.log(`Error removing product ${product_id} from ${req.user.user_id} cart: `, err);
                res.status(500).send('Error removing product from cart');
            }
            res.status(200).json('Successfully removed product ' + product_id);
        })
    } else {
        res.status(200).json('User not signed in.  Successfully removed product');
    }
    
};

const orderItems = async (req, res) => {
    if (!req.user) {
        return res.status(400).send('User must be signed in');
    };
    const userId = req.user.user_id;
    const date = new Date().toISOString();
    try {
        const {rows: cartItems} = await pool.query(
            'SELECT * FROM cart_items WHERE user_id = $1', 
            [userId]
        );

        if (cartItems.length === 0) {
            return res.status(400).send('No items in cart');
        };

        const {rows: orderIdResult } = await pool.query(
            'INSERT INTO orders (user_id, date_created) VALUES ($1, $2) RETURNING order_id', 
            [userId, date]
        ); 
        const orderId = orderIdResult[0].order_id

        const insertOrderItems = cartItems.map((item) => (
            pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)', 
                [orderId, item.product_id, item.quantity]
            )
        ));
        await Promise.all(insertOrderItems);

        await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
        res.status(200).json(orderId);

    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating order');
    }
};

const loadPreviousOrders = async (req, res) => {
    if (!req.user) {
        return res.status(400).send('User not logged in');
    };
    const userId = req.user.user_id;
    
    try {
        const {rows: orderIds} = await pool.query(
            'SELECT * FROM orders WHERE user_id = $1 ORDER BY order_id DESC',
            [userId]
        );
        
        if (orderIds.length === 0) {
            return res.status(200).send('No previous orders found');
        }

        const orders = await Promise.all(
            orderIds.map(async (orderId) => {
                const {rows: orderItems} = await pool.query(
                    'SELECT * FROM order_items WHERE order_id = $1',
                    [orderId.order_id]
                );

                return {
                    orderId: orderId.order_id,
                    orderItems: orderItems.map(orderItem => ({
                        product_id: orderItem.product_id,
                        quantity: orderItem.quantity
                        })),
                    dateCreated: orderId.date_created
                }
            })
        
        );
        res.status(200).json(orders);
        

    }catch (err) {
        console.log('Error loading previous orders for user ' + userId, err);
        res.status(500).send('Error loading previous orders');
    }
    
};


module.exports = {
    createSessionToken,
    authenticateToken,
    signout,
    createUser,
    loginUser,
    getCartItems,
    mergeCartItems,
    overrideCartItems,
    addItemToCart,
    getProducts,
    getProductById,
    removeItemFromCart,
    clearItemFromCart,
    productsByCategory,
    productsByType,
    searchProducts,
    checkAuth,
    orderItems,
    loadPreviousOrders
};


const express = require('express');
const ProductManager = require('./productManeger');

const app = express();
const port = 3000;

app.get('/products', async (req, res) => {
    try {
        const productManager = new ProductManager();
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getProducts(limit);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productManager = new ProductManager();
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);

        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

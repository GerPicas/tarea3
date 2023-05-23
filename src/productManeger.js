const fs = require('fs/promises');

class ProductManager {
    constructor() {
        this.productsFilePath = 'ruta/al/archivo/products.json'; // Ajusta la ruta al archivo de productos
    }

    async getProducts(limit) {
        const productsData = await this.readProductsFile();
        let products = JSON.parse(productsData);

        if (limit && limit < products.length) {
            products = products.slice(0, limit);
        }

        return products;
    }

    async getProductById(productId) {
        const productsData = await this.readProductsFile();
        const products = JSON.parse(productsData);

        const product = products.find((p) => p.id === productId);
        return product;
    }

    async readProductsFile() {
        const fileData = await fs.readFile(this.productsFilePath, 'utf8');
        return fileData;
    }
}

module.exports = ProductManager;

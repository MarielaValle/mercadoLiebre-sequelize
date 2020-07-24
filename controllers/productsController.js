const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

saveProducts = function () {
	let productsJson = JSON.stringify(products);
	fs.writeFileSync(productsFilePath, productsJson)// lo pongo entre comillas porque ahora no quiero que lo guarde en data porque me lo desordena

}

let toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let formatPrice = (price, discount) => toThousand(Math.round(price * (1 - (discount / 100))));




const controller = {
	// Root - Show all products
	root: (req, res) => {

		res.render('products', { products: products, toThousand, formatPrice });
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		let id = req.params.id
		products.forEach(function (product) {
			if (product.id == id) {
				producto = product
			}


		});

		res.render('detail', {producto, toThousand, formatPrice});
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic

		let lastId = products.length;

		const productToCreate = {
			id: lastId + 1,
			name: req.body.name,
			price: parseFloat(req.body.price),
			discount: parseFloat(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: "image"
		};
		products.push(productToCreate);
		saveProducts(products)

		res.send("Agregado!")

	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let productToEdit = products.find(item => item.id == req.params.productId);
		res.render("product-edit-form", { productToEdit });
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let productEdited = null;
		products.forEach(product => {
			if (product.id == req.params.productId) {
				product.name = req.body.name;
				product.price = parseFloat(req.body.price);
				product.discount = parseFloat(req.body.discount);
				product.category = req.body.category;
				product.description = req.body.description;
				productEdited = product;
			}
		});
		saveProducts(products);
		res.send("Editado!");



	},
	delete: (req, res) => {
		// Do the magic
		const productToErase = products.find(item => item.id == req.params.productId);
		res.render("product-delete-form", { productToErase });
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic

		products = products.filter(product => product.id != req.params.productId);
		saveProducts(products);


		res.send("Eliminado!");
	}
};

module.exports = controller;
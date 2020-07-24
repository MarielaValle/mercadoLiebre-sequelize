const db = require("../database/models");



    const controller = {
        // Root - Show all products
        root: (req, res) => {
            db.Product.findAll()
                .then(products => {
                    res.render("products", {products, toThousand, formatPrice});
                })
                .catch(error => console.log(error));
        }
    }
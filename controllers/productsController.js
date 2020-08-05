const db = require("../database/models");


let toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let formatPrice = (price, discount) => toThousand(Math.round(price * (1 - (discount / 100))));

  
const controller = {
        // Root - Show all products
        root: (req, res) => {
            db.Product.findAll()
                .then(products => {
                    res.render("products", {products, toThousand, formatPrice});
                })
                .catch(error => console.log(error));
        },


        detail: (req, res) => {

            db.Product.findByPk(req.params.id)
    
                .then(function (producto) {
    
                   
    
                    res.render('detail', { producto,toThousand, formatPrice });
    
                })
                .catch(error => console.log(error));
        },
        create: (req, res) => {
            // Do the magic
            res.render('product-create-form')
        },


        store: (req, res, next) => {      //crear producto nuevo

            db.Product.create({
               
			name: req.body.name,
			price: parseFloat(req.body.price),
			discount: parseFloat(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: "image"
            })
    
            res.send("Agregado!")
    
    
    
        }
    


    

    }


    module.exports = controller;
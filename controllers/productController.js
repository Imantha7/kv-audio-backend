import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export function addProduct(req,res){

    console.log(req.user)

    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return
    }
    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to perform this action"
        })
        return
    }

    const data = req.body;

    const newProduct = new Product(data)

    newProduct.save().then(() => {
      res.json({ message: "Product added successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Product adding failed" });
    });
    
}

export async function getProducts(req,res){

    try{
      
      if(isItAdmin(req)){
        const products = await Product.find();
        res.json(products);
        return;
      }else{
        const products = await Product.find({availability:true});
        res.json(products);
        return;
      }
      
    }catch(e){
      res.status(500).json({
        message : "Failed to get products"
      })
    }
  }

  export async function updateProduct(req,res){
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            const newdata = req.body;

            await Product.updateOne({key: key},newdata)
            res.json({
                message: "Product updated successfully"
            })
        }else{
            res.status(403).json({
                message: "You are not authorized to perform this action"
            })
        }
    }catch(e){
        res.status(500).json({
            message: "Failed to update product"
        })
    }
  }

  export async function deleteProduct(req,res){
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            await Product.deleteOne({key: key})
            res.json({
                message: "Product deleted successfully"
            })
        }else{
            res.status(403).json({
                message: "You are not authorized to perform this action"
            })
            return
        }
    }catch(e){
            res.status(500).json({
                message: "Failed to delete producr"
            })
    }
  }
  

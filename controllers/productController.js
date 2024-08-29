const Product = require("../models/productSchema")
 
const handleGetAllProducts = async (req, res) =>{
    try{
        const data = await Product.find({})
        console.log({numberOfItems: data.length})
        res.send(data)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
}

const handleAddNewProduct = async (req, res)=>{
    const body = req.body;
    // console.log({bodyRecieved : body})
    if(!body.name || !body.price ) return res.status(400).json({error : 'name and price are required'})
    const newProduct = new Product({
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        brand: body.brand,
    });
    try{
        const result = await newProduct.save()
        console.log("added new Product")
        res.status(200).json({msg : "recorded successfully",data : result})
    }
    catch (err) {
        if (err.code === 11000) { // MongoDB duplicate key error code
            res.status(400).json({ error: "Product name is already registered" });
        } else {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

const handleAddManyProducts = async (req, res) => {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "An array of products is required" });
    }

    try {
        const result = await Product.insertMany(products, { ordered: true });
        console.log("Added new products");
        res.status(200).json({ msg: "Products recorded successfully", data: result });
    } catch (err) {
        if (err.code === 11000) { // MongoDB duplicate key error code
            res.status(400).json({ error: "One or more product names are already registered" });
        } else {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

const handleGetSingleProduct = async (req, res) =>{
    const productId = req.params.id
    try{
        const data  = await Product.findOne({_id : productId})
        console.log("data found", data)
        res.send(data)
    }catch(err){
        console.log(err)
        res.send(err)
    }
   
}


module.exports ={
    handleGetAllProducts,
    handleAddNewProduct,
    handleAddManyProducts,
    handleGetSingleProduct
}
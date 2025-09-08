const mongoose=require("mongoose");

async function display_data(){
    try {
        const fetch_data=await mongoose.connection.db.collection("allshoes");
        
        const data=await fetch_data.find({}).toArray();
        // console.log('data',data)
        global.shoes_items=data;
        // console.log("global.shoes_items",global.shoes_items)
        const fetch_Catdata=await mongoose.connection.db.collection("categories");
        const Catdata=await fetch_Catdata.find({}).toArray();
        global.shoes_catItems=Catdata;
        // console.log(Catdata)
       
    } catch (error) {
        
    }
}
 module.exports=display_data;
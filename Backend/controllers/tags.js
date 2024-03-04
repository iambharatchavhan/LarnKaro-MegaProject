const Tag = require("../models/Tag");

exports.tags = async (req, res) => {
     
    try{

        const { name, description } = req.body;

        if (!name || !description) {
          return res.status(400).json({
            success: false,
            message: "please Fill all the details correctly",
          });
        }
      
        // create entry in database 
      
        const tagsDetails = await Tag.create({name,description})
      
        console.log(tagsDetails)
      
        res.status(200).json({
            success:true,  
            message:"Tags created successfully"

        })
      

    }catch(error){
       res.status(500).json({
          success:false,
          message:"something went wrong while creating tags"
       })
    }
};


exports.getAllTags = async (req,res)=>{
    
    try {
        
       const allTags = await Tag.find({},{name:true, description:true})
       
       res.status(200).json({
        success:true,
        message:"All tags are found successfully",
        allTags,
       })

    } catch (error) {

      res.status(500).json({
       success:false,
       message:"Something went wrong while fetching the tags"
      })      
    }
}
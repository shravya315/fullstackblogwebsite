import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../configs/models/blogModel.js'
import Comment from '../configs/models/comment.js';
import main from '../configs/gemini.js';


export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } =
      JSON.parse(req.body.blog);

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "missing required fields"
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs"
    });

    // Generate optimized URL
    const optimizationImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" }
      ]
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizationImageUrl,
      isPublished
    });

    res.json({
      success: true,
      message: "Blog added successfully"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Blog cannot be added"
    });
  }
};

export const getAllBlogs= async(req, res)=>{
    try{
        const blogs= await Blog.find({isPublished: true})
        res.json({success:true, blogs})
    } catch(error){
        res.json({success:false, message:error.message})
    }
}

export const getBlogById= async(req, res)=>{
    try{
        const {blogId}= req.params;
        const blog= await Blog.findById(blogId)
        if(!blog){
            return res.json({success:false, message: "blog noe found"});
        }
        res.json({success:true, blog})
    }catch(error){
        res.json({success: false, message: error.message})

    }
}

export const deleteBlogById= async(req, res)=>{
    try{
        const {id}= req.body;
        await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({blog: id});

        res.json({success:true, message: "blog deleted successfully"})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

export const togglePublish= async(req, res)=>{
    try{
        const {id}= req.body;
        const blog= await Blog.findById(id);
        blog.isPublished= !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog status updated"})

    }catch(error){
        res.json({success:false, message: error.message})
    }
}

export const addComment= async(req, res)=>{
    try{
        const{blog, name, content}= req.body;
        await Comment.create({blog, name, content});
        res.json({success: true, message: "comment added for review"})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

export const getBlogComments= async(req, res)=>{
try{
    const{blogId}= req.body;
    const comments= await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
    res.json({success: true, comments})
}catch(error){
    res.json({success:false, message: error.message})
}
}

export const generateContent= async(req, res)=>{
  try{
    const {prompt}= req.body;
    const content= await main(prompt + 'Generate a blog content for this topic in simple text format')
    res.json({success:true, content})
  }catch(error){
    res.json({success: false, message: error.message})
  }
}

export const toggleCommentApproval = async (req, res) => {
  try {
    const { id } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.json({ success: false, message: "Comment not found" });
    }

    comment.isApproved = !comment.isApproved;
    await comment.save();

    res.json({
      success: true,
      message: `Comment ${comment.isApproved ? "Approved" : "Unapproved"}`
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

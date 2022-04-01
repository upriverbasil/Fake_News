import mongoose from "mongoose";

const fakeNewsSchema = mongoose.Schema({
    websiteName:String,
    articleLink:String,
    publishDate:String,
    domain:[String],
    tags:[String],
    title:String,
    summary:String,
    content:[String],
    authorName:[String],
    authorWebsite:[String],
    additionalLinks:[String],
    topImage:String,
    imageLinks:[String],
    audioLinks:[String],
    videoLinks:[String],
    links_in_text:[String],
    upvotes: {
        type: [String],
        default: []
    },
    downvotes: {
        type: [String],
        default: []
    },
    
})

const fakeNews = mongoose.model('fakeNews',fakeNewsSchema)

export default fakeNews;
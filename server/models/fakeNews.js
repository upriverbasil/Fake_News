import mongoose from "mongoose";

const fakeNewsSchema = mongoose.Schema({
    websiteName:String,
    articleLink:String,
    publishDate:String,
    domain:[String],
    tags:[String],
    title:String,
    authorName:[String],
    authorWebsite:[String],
    additionalLinks:[String],
    imageLinks:[String],
    audioLinks:[String],
    videoLinks:[String],
    links_in_text:[String],
    upvoteCount: {
        type: Number,
        default: 0
    },
    downvoteCount: {
        type: Number,
        default: 0
    },
    
})

const fakeNews = mongoose.model('fakeNews',fakeNewsSchema)

export default fakeNews;
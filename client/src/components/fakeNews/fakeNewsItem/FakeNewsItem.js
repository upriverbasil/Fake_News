import {React, useState, useEffect} from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  ButtonBase,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useDispatch} from "react-redux";
import moment from "moment";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltOutlined from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from '@material-ui/icons/Delete';
import { likeNews, dislikeNews,getFakeNewsItem, deleteNews} from "../../../actions/fakeNews";
import useStyles from "./styles";
import { useNavigate, useLocation} from "react-router-dom";
import Boom from "../../../images/Boom.png"
import IndiaToday from "../../../images/IndiaToday.png"
import FactCrescendo from "../../../images/FactCrescendo.png"
import AltNews from "../../../images/AltNews.png"
import WebQoof from "../../../images/WebQoof.png"
import VishvasNews from "../../../images/VishvasNews.png"
import Factly from "../../../images/Factly.png"
import NewsMobile from "../../../images/NewsMobile.png"
import NewsChecker from "../../../images/NewsChecker.png"
import DigitEye from "../../../images/DigitEye.jpeg"
const FakeNewsItem = ({ news }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();
  const [webname,setWebName] = useState("")
  const [image,setImage] = useState(null);
  useEffect(()=>{
    if(news){
      const allowed_webnames = ["India Today", "Fact Crescendo", "Alt News", "BOOM","WebQoof","Vishvas News","Factly","NewsMobile","Newschecker","Digit Eye"]
      const imagenames = [IndiaToday, FactCrescendo, AltNews, Boom,WebQoof,VishvasNews,Factly,NewsMobile,NewsChecker,DigitEye]
      let website = news.websiteName
      // console.log(website.split(" ").join(""))
      const location = "../../../images/"
      for(let i = 0; i<allowed_webnames.length;i++){
        if(website.split(" ").join("").toLowerCase().includes(allowed_webnames[i].split(" ").join("").toLowerCase())){
          setWebName(allowed_webnames[i])
          setImage(imagenames[i])
          // console.log(image)
          break
        }
        if(website.split("_").join("").toLowerCase().includes(allowed_webnames[i].split(" ").join("").toLowerCase())){
          setWebName(allowed_webnames[i])
          setImage(imagenames[i])
          break
        }
      }
      // console.log(website)
    }
    
    
  },[news])
  const Likes = () => {
    if (news.upvotes.length > 0) {
      return news.upvotes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {news.upvotes.length > 2
            ? `You and ${news.upvotes.length - 1} others`
            : `${news.upvotes.length} like${
                news.upvotes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{news.upvotes.length}{" "}
          {news.upvotes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const DisLikes = () => {
    if (news.downvotes.length > 0) {
      return news.downvotes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbDownAltIcon fontSize="small" />
          &nbsp;
          {news.downvotes.length > 2
            ? `You and ${news.downvotes.length - 1} others`
            : `${news.downvotes.length} Dislike${
                news.downvotes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbDownAltOutlined fontSize="small" />
          &nbsp;{news.downvotes.length}{" "}
          {news.downvotes.length === 1 ? "DisLike" : "DisLikes"}
        </>
      );
    }

    return (
      <>
        <ThumbDownAltOutlined fontSize="small" />
        &nbsp;DisLike
      </>
    );
  };

  const openFakeNews = () => {
    navigate(`/fake-news/${news._id}`);
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openFakeNews}>
        <CardMedia
          className={classes.media}
          image={
            news.topImage != null
              ? news.topImage.startsWith("https://")
                ? news.topImage
                : "https://" + news.topImage
              : news.imageLinks == null
              ? "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              : (news.imageLinks[0].startsWith("https://")
                  ? news.imageLinks[0]
                  : "https://" + news.imageLinks[0]) ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={news.title}
        />
        <div className={classes.overlay}>
          {image?<img height="40px" width="40px" src={image}></img> : null}
          {/* <Typography variant="h6">{webname}</Typography> */}
          <Typography variant="body2">
            {moment(news.publishDate, "DD-MM-YYYY HH:mm:ss").fromNow()}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {news.tags == null ? "No tags" : news.tags.map((tag) => `#${tag.split(' ').join('_')} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {news.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {news.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likeNews(news._id))}
        >
          <Likes />
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(dislikeNews(news._id))}
        >
          <DisLikes />
          
        </Button>
        { user?.adminStatus ?
        <Button size="small" color="primary" onClick={()=>{dispatch(deleteNews(news._id)); window.location.reload()}}><DeleteIcon fontSize="small" /> Delete</Button>
          : null
        }
      </CardActions>
    </Card>
  );
};

export default FakeNewsItem;

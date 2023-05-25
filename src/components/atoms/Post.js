import classnames from "classnames";
import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect, useSelector } from "react-redux";
import {
  Article,
  Description,
  SharedActor,
  SharedImage,
  SocialActions,
  SocialCounts,
} from "../Home/Main";
import image from '../../images/user.svg'
import { useDispatch } from "react-redux";
import { commentPostAPI, createNotification, likePostAPI } from "../../actions";

const Post = ({ user, article, identity }) => {
  console.log(article)
  const userRole = useSelector(state => state.userState.role)
  const [liked, setLiked] = useState(article.usersWhoLiked?.includes(user.email));
  const [showTextBox, setShowTextBox] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch()
  const handleLike = (isLiked) => {
    if (isLiked) {

      dispatch(likePostAPI({
        article: article,
        count: article.likeCount + 1,
        rem: false,
        email: user.email
      }))

      dispatch(createNotification(user, article.actor, 'like', article.id))
    } else {
      dispatch(likePostAPI({
        article: article,
        count: article.likeCount - 1,
        rem: true,
        email: user.email
      }))
    }
    setLiked(isLiked)
  }
  const handleCommentClick = () => {
    setShowTextBox(!showTextBox);
    setShowComment(!showComment)
    setText("");
  };

  const handlePost = () => {
    dispatch(commentPostAPI({ article: article, comment: { actor: user.email, message: text } }))
    console.log(user)
    dispatch(createNotification(user, article.actor, 'comment', article.id))
    setText('')
  };

  return (
    <Article>
      <SharedActor>
        <a href="#anc">
          <img src={article.actor.image || image} alt=" ad " />
          <div>
            <span>{article.actor.title}</span>
            <span>{article.actor.description}</span>
            <span>{article.actor.date.toDate().toLocaleDateString()}</span>
          </div>
        </a>

        <button>
          <img src="images/ellipsis.png" alt="abc" />
        </button>
      </SharedActor>

      <Description>{article.description}</Description>

      <SharedImage>
        <a href="#skdmk">
          {!article.sharedImg && article.video ? (
            <ReactPlayer width={"100%"} url={article.video} />
          ) : (
            article.sharedImg && <img src={article.sharedImg} alt="dncnd" />
          )}
        </a>
      </SharedImage>

      <SocialCounts>
        <li>
          <button>
            <img src="images/like-icon.png" alt="" />
            <img src="images/clap-icon.png" alt="" />
            <span></span>
          </button>
        </li>
        <li>
          <p>{`${article.likeCount}`} </p>
        </li>
      </SocialCounts>

      <SocialActions>
        <button
          className={classnames({
            notLiked: !liked,
            liked: liked,
          })}
          onClick={() => {
            handleLike(!liked)
          }}
        >
          <i class="far fa-thumbs-up"></i>
          <span>{!liked ? "Like" : "Dislike"}</span>
        </button>
        <button onClick={handleCommentClick}>
          <i class="far fa-comment"></i>
          <span>Comment</span>
        </button>
        {/* <button>
          <i class="fas fa-share"></i>
          <span>Share</span>
        </button> */}
      </SocialActions>
      {(userRole && showTextBox) ?
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handlePost}>Post</button>
        </div>
        : ''}
      {showComment && (
        (article.comments.length) ? article.comments.map(elem => {
          return <div className="commentDiv">
            <div className="commentProfile">{elem.actor === user.email ? "You" : elem.actor}</div>
            <div className="commentText">{elem.message}</div>
          </div>
        }) : 'No Comments Yet'


      )}
    </Article>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.userState.loading,
  };
};

export default connect(mapStateToProps)(Post);



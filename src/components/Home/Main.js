import { useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "../atoms/PostModal";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { getArticlesAPI } from "../../actions";
import Post from "../atoms/Post";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  if (!props.user) return <></>;

  return (
    <>
      {props.articles.length === -1 ? (
        <p>There are no articles to show.</p>
      ) : (
        <Container>
          {props.identity === 1 && (
            <ShareBox>
              <div>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <button
                  onClick={handleClick}
                  disabled={props.loading ? true : false}
                  className="post-space"
                >
                  Share your idea...
                </button>
              </div>

              <div>
                <button>
                  <img
                    src="/images/photo-icon.png"
                    className="post-icon"
                    alt=""
                  />
                  <span>Photo</span>
                </button>

                <button>
                  <img
                    src="/images/video-icon.png"
                    className="post-icon"
                    alt=""
                  />
                  <span>Video</span>
                </button>

                <button>
                  <img
                    src="/images/event-icon.png"
                    className="post-icon"
                    alt=""
                  />
                  <span>Event</span>
                </button>

                <button>
                  <img
                    src="/images/article-icon.png"
                    className="post-icon"
                    alt=""
                  />
                  <span>Write article</span>
                </button>
              </div>
            </ShareBox>
          )}

          <Content>
            {props.loading && <img src="./images/spin-loader.gif" />}
            {props.articles.length != 0 &&
              props.articles.map((article, key) => (
                <Post
                  key={key}
                  article={article}
                  myName={props.user.name}
                />
              ))}
          </Content>

          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  border-radius: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px 0;
  background: #fff;

  div {
    button {
      outline: none;
      color: #e6a106;
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;

      &:hover {
        background-color: rgba(0, 0, 0, 0.07);
        border-radius: 6px;
      }
    }

    .post-space {
      box-shadow: 1px 1px 2px 1px rgba(159, 156, 156, 0.75);
    }

    .post-icon {
      width: 27px;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px;

      img {
        width: 48px;
        margin-right: 8px;
        border-radius: 50%;
      }

      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0, 15);
        border-radius: 35px;
        background-color: #fff;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }

        span {
          color: #e6a106;
        }
      }
    }
  }
`;

export const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

export const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;

        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    outline: none;
    border: none;
    top: 0;
    background: transparent;
  }
`;

export const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

export const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

export const SocialCounts = styled.ul`
  line-height: 100%;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  list-style: none;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e6a106;

  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
      border: none;
      background-color: #fff;
    }
  }

  img {
    width: 18px;
  }
`;

export const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #e6a106;
    border: none;
    background-color: #fff;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

export const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

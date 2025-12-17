import React from "react";
import "../Style/VideoPostComp.css";
import PostOptionsMenu from "../../GlobalUse/PostOptionsMenu";
import { useGlobalHideMethod } from "../../../Hooks/useGlobleFun";



export default function GroupPostVideoComp({ index, post, handleShowHideOptionsOnVideoPage, handleVideoLikeDisLike }) {
  
  //ye ek custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
  const { isShowComp, isShowHideComp, containerRef } = useGlobalHideMethod();

  //niche bnaye huye object me userId ka use bs function me props pass krne k liye ho rha hai;
  // taki function error naa de de, 
  // lekin hm userId ka use nhii kr rhe hai videoPage me;
  const formatatedVideoData = {
    profileName: post.postInfo.name,
    picId: post.headline.picId,
    userId: -2 //userId jb 1 ho rha hai to null return kr de rha hai isiliye 1 nhi rakhenege;
  }

  return (

    <div className="total-post" key={index}>

      <div className="right-video-post">
        <div className="post_video_top_parent">
          <div className="right-video-post-content">
            <div className="post-logo">
              <a href={post.postLogo.link}>
                <img
                  className="post-img-logo"
                  src={post.postLogo.imgSrc}
                  alt={post.postLogo.alt}
                />
              </a>
            </div>

            <div className="post-logo-after">
              <div className="right-left">
                <div className="logo-name">
                  <span className="post-name">{post.postInfo.name}</span>
                  <span> · </span>
                  <a className="text-follow" href={post.postInfo.followLink}>
                    <span>Follow</span>
                  </a>
                </div>
                <div className="post-location-time">
                  <span className="post-time-date">{post.postInfo.timeDate}</span>
                  <span> · </span>
                  <a className="global-icon" href={post.postInfo.globalIconLink}>
                    <i className="fa-solid fa-earth-americas"></i>
                  </a>
                </div>
              </div>
              <div ref={containerRef}>
                <div className="menu-3dot" onClick={() => isShowHideComp()}>
                  <span>
                    <i className={post.postInfo.menuIcon}></i>
                  </span>
                  {isShowComp ? <div className="Menu_List_Style_VideoPage">
                    <PostOptionsMenu
                      data={formatatedVideoData}
                      handleShowHidePost={handleShowHideOptionsOnVideoPage} />
                  </div> : <></>}
                </div>
              </div>
            </div>
          </div>
          <p className="script-line">{post.headline.text}</p>
        </div>

        <div className="post-picture">
          <video className={post.headline.videoClass} controls>
            <source src={post.headline.videoSrc} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>

        <div className="like-page-comment-page-share-page">
          <div className="video-post-like-comment-share">
            <div className="like-logo-like-icon" onClick={() => handleVideoLikeDisLike(post.headline.picId)}>
              <span className={post.headline.isLikedByMe ? "yesLikedVideo like-logo-like" : "like-logo-like"}><i className={post.actions.like.icon}></i></span>
              <span className={post.headline.isLikedByMe ? "yesLikedVideo text_Like_Comment_Share" : "text_Like_Comment_Share"} >{post.actions.like.text}</span>
            </div>

            <div className="comment-logo-comment-icon">
              <a href="#">
                <img
                  className="comment-logo-comment"
                  src={post.actions.comment.iconSrc}
                  alt=""
                />
              </a>
              <span className="text_Like_Comment_Share">Comment</span>
            </div>
            <div className="share-logo-share-icon">
              <a href="#">
                <img
                  className="share-logo-share"
                  src={post.actions.share.iconSrc}
                  alt=""
                />
              </a>
              <span className="text_Like_Comment_Share">Share</span>
            </div>
          </div>

          <div className="like-count-comment-count-share-count">
            <div className="like-count">
                <img className="like-emoj" src={post.actions.like.iconSrc} alt="" />
              <span>{post.headline.isLikedByMe ? <>You and </>:<></> }{post.actions.like.count}</span>
              <span> · </span>
            </div>
            <div className="comment-count">
              <span>{post.actions.comment.text}</span>
              <span> · </span>
            </div>
            <div className="view-count">
              <span>{post.actions.views}</span>
              <span>views</span>
            </div>
          </div>
        </div>
      </div>
    </div>


  )

}
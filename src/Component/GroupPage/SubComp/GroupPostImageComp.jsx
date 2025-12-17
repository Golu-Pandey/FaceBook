import React from "react";
import "../Style/GroupPostComp.css";
import { useGlobalHideMethod } from "../../../Hooks/useGlobleFun";
import PostOptionsMenu from "../../GlobalUse/PostOptionsMenu";


export default function GroupPostImageComp({ index, post ,handleShowHideOptionsOnGroupPage, handleGroupLikeDisLike}) {
  const { isShowComp, isShowHideComp, containerRef } = useGlobalHideMethod();

    //niche bnaye huye object me userId ka use bs function me props pass krne k liye ho rha hai;
        // taki function error naa de de, 
        // lekin hm userId ka use nhii kr rhe hai videoPage me;
        const formatatedVideoData = {
          profileName: post["post-group-logo-end"]["grou-text-style1-name"],
          picId: post["picId"],
          userId: -2 //userId jb 1 ho rha hai to null return kr de rha hai isiliye 1 nhi rakhenege;
        }

  return (
    <div className="group-post-1" key={index}>
      <div className="total-line-hed">
        <div className="group-top-post-content">
          <div className="right-content">
            <a href="">
              <img
                className="right-content-1"
                src={post["right-content"]["right-content-1"]}
                alt=""
              />
            </a>
            <div className="group-post-logo">
              <a href="">
                <img
                  src={post["right-content"]["group-post-logo"]}
                  alt=""
                />
              </a>
            </div>
          </div>

          <div className="totally-top-post-heder">
            <div className="post-group-logo-end">
              <div className="group-post-summary">
                <span className="grou-text-style">
                  {post["post-group-logo-end"]["grou-text-style"]}
                </span>
              </div>
              <div className="group-post-summary1">
                <span className="grou-text-style1">
                  {post["post-group-logo-end"]["grou-text-style1-name"]}
                </span>
                <span className="grou-text-style3">
                  <img
                    src={post["post-group-logo-end"]["grou-text-style3"]["icon"]}
                    alt=""
                  />{" "}
                  {post["post-group-logo-end"]["grou-text-style3"]["text"]}
                </span>
                <span className="grou-text-style1"> · </span>
                <span className="grou-text-style1">
                  {post["post-group-logo-end"]["grou-text-style1-time"]}
                </span>
                <span className="grou-text-style1"> · </span>
                <span className="grou-text-style4">
                  <a href="">
                    {/* replace variable to json value */}
                    <i className={post["post-group-logo-end"]["grou-text-style4"]}></i>
                  </a>
                </span>
              </div>
            </div>
            <div ref={containerRef}>
              <div className="group-menu" onClick={() => isShowHideComp()}>
                <img src={post["group-menu"]} alt="" />

                {isShowComp ? <div className="Menu_List_Style_GroupPage">
                  <PostOptionsMenu  
                     data={formatatedVideoData}
                    handleShowHidePost={handleShowHideOptionsOnGroupPage} />
                </div>
                  : <></>
                }

              </div>
            </div>
          </div>
        </div>

        <div className="detail-post">
          <p>{post["detail-post"]}</p>
        </div>
      </div>

      <div className="post-image-group">
        <img src={post["post-image-group"]} alt="" />
      </div>

      <div className="like-comment-logo-box">
        {/* Like / Comment / Share Counts */}
        {"count-number-like-comment-share" in post["like-comment-logo-box"] && (
          <div className="count-number-like-comment-share">
            <div className="like-cout-4">
                <img
                  className="group-blue-like"
                  src={
                    post["like-comment-logo-box"]["count-number-like-comment-share"]["like-cout-4"]["group-blue-like"]
                  }
                  alt=""
                />
              <span>
                {post["like-comment-logo-box"]["count-number-like-comment-share"]["like-cout-4"]["count"]}
              </span>
            </div>
            <div className="comment-share-count-to">
              <div className="comment-count-5">
                <span>
                  {post["like-comment-logo-box"]["count-number-like-comment-share"]["comment-count-5"]["count"]}
                </span>
                <span>
                  {
                    post["like-comment-logo-box"]["count-number-like-comment-share"]["comment-count-5"]["text"]
                  }
                </span>
              </div>
              <div className="share-count-6">
                <span>
                  {post["like-comment-logo-box"]["count-number-like-comment-share"]["share-count-6"]["count"]}
                </span>
                <span>
                  {
                    post["like-comment-logo-box"]["count-number-like-comment-share"]["share-count-6"]["text"]
                  }
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Like / Comment / Share Icons */}
        <div className="group-bottom-content">
          <div className="like-icon-group" onClick={()=> handleGroupLikeDisLike(post["picId"])}>
            <span className={post["isLikedByMe"] ? "yesGroupLiked group-icon-like1" : "group-icon-like1"} >
              {/* replace variable to json value */}
              <i className={post["like-comment-logo-box"]["group-bottom-content"][0]}></i>
            </span>
            <span className={post["isLikedByMe"] ? "yesGroupLiked group-icon_text" : "group-icon_text"}>Like</span>
          </div>
          <div className="comment-icon-group">
              <img
                className="group-icon-img-1"
                src={post["like-comment-logo-box"]["group-bottom-content"][1]}
                alt=""
              />
            <span className="group-icon_text">Comment</span>
          </div>
          <div className="share-icon-group">
              <img
                className="group-icon-img-2"
                src={post["like-comment-logo-box"]["group-bottom-content"][2]}
                alt=""
              />
            <span className="group-icon_text">Share</span>
          </div>
        </div>

        {post["like-comment-logo-box"]["border-line"] && (
          <div className="border-line"></div>
        )}

        {/* Comment Box */}
        <div className="logo-grop-botto">
          <img
            className="golu-group-logo"
            src={post["like-comment-logo-box"]["logo-grop-botto"]["golu-group-logo"]}
            alt=""
          />
          <div className="comment-box-bottom">
            <input
              type="text"
              placeholder={
                post["like-comment-logo-box"]["logo-grop-botto"]["comment-box-bottom"]["placeholder"]
              }
            />
            {post["like-comment-logo-box"]["logo-grop-botto"]["comment-box-bottom"]["icons"].map(
              (icon, i) => (
                <a
                  className="group-bottom-comment-total-icon"
                  href=""
                  key={i}
                >
                  <i className={icon}></i>
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
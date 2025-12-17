import React, { useState } from "react";
import "../Style/ProfilePostCard.css";
import { useGlobalHideMethod, useGlobalSeeMoreSeeLessString } from "../../../Hooks/useGlobleFun";
import ProfilePostOptionsMenu from "../../GlobalUse/ProfilePostOptionsMenu";
import PostOptionsMenu from "../../GlobalUse/PostOptionsMenu";

const ProfilePostCard = ({ navigateToProfile, loggedUserId, data,
  //for hide the post
  handleShowHidePost,
  //for like the post
  handlePostLikeDisLike,
  //for delete post
  handleDeletePost,
  //ye edit wale k liye hai;
  handleEditPostDialogue
}) => {

  //ye custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
  const { isShowComp, isShowHideComp, containerRef } = useGlobalHideMethod();
  const { stringBeforeIndex, stringAfterIndex } = useGlobalSeeMoreSeeLessString(data.discription, 30);

  //ye state defined isliye kiye hai , qki seeMore k basis pe data ko pura display kr rhe hai ya kuchh hi data display kr rhe hai
  const [seeMore, setSeeMore] = useState(true);
  //ye function defined kiye hai taki SeeMore ya SeeLess pe onClick kr seeMore k value ko update kr rhe hai
  const isHideShow = () => {
    setSeeMore(!seeMore);
  }


  return (
    <div className="post_card">

      <div className="Header_box_parent">
        <div className="Header_box_top">
          <div className="photo-box-1-left">
            <div className="post-profile-pic-wrapper" >
              <a href="" className="aTag_Style" onClick={() => navigateToProfile(data.userId)}> <img src={data.profilePic} alt="profile" className="post-profile-pic" /></a>
            </div>
            <div className="logo-box-1-tittle">
              <div className="logo-title-inner">
                <a href="" className="aTag_Style" onClick={() => navigateToProfile(data.userId)}><span className="profile_name">{data.profileName}</span> </a>
                {data.vipProfile ?
                  <img className="verified-blue-tick" src="/Image/HomePage/Post/verified-blue-tick_img.png" alt="verified" /> :
                  <></>
                }
              </div>
              <div className="logo-time-tittle">
                <span className="post_time">{data.postTime}</span>
                <img className="global-logo" src="/Image/HomePage/Post/global-logo_img.jpeg" alt="global" />
              </div>
            </div>
          </div>

          <div ref={containerRef}>
            <div className="photo-box-1-right" onClick={isShowHideComp}>
              <img className="dot" src="/Image/HomePage/Post/menu_img.jpg" alt="menu" />
              {/*  yhaa pahle isHideShow ki value check kregwa ki ye true hai ya false
      agr isHideShow ki value false hai to kuchh sho nhii krega
      agr isHideShow ki value true hai to ab yha 2 tarh ka componenet show hoga , userID k basis pe
      aur ab userID ki value check krega 
      agar userId ki value 1 hai to card_1 show krega aur userId ki value 1 k alawa kuchh aur hai to card_2 show hoga*/}
              {isShowComp ? (data.userId == loggedUserId ?
                <div className="Menu_List_Style">
                  <ProfilePostOptionsMenu 
                  loggedUserId={loggedUserId}
                  data={data}
                    // for delete the post
                    handleDeletePost={handleDeletePost}
                    //for edit the post
                     handleEditPostDialogue={handleEditPostDialogue}
                      />
                </div>
                : <div className="Menu_List_Style">
                  <PostOptionsMenu 
                  loggedUserId={loggedUserId}
                  data={data}
                    //for Hide the post;
                    handleShowHidePost={handleShowHidePost} />
                </div>) : <></>}
            </div>
          </div>

        </div>
        <div className="Header_box_down">
          <span className="Summary" onClick={isHideShow}>
            {seeMore && stringAfterIndex.length != 0 ? <>{stringBeforeIndex} <br /> <span>....</span> <span className="SeeMore_SeeLess">See more</span></> : <div>{stringBeforeIndex}{stringAfterIndex} <br /> 
            {stringAfterIndex.length != 0 ? <span className="SeeMore_SeeLess">See less</span> : <></>} </div>}
          </span>
        </div>
      </div>

      <div className="photo-box-2 post-card_img">
        {data.post ? <img src={data.post} alt="post" className="post-img" /> : <></>}
      </div>


      <div className="post-reaction_parent">
        <div className="post-reaction">
          <div className="reaction-icons">
            <div className="icon_all_emoji">
              {data.reaction.map((icon, i) => {
                //i=0,1,2
                if (data.likedCount > i) {
                  return (
                    <img key={i} src={icon} alt="emoji" className="emoji-icon" />
                  )
                }
              }
              )}
            </div>
            <div>
              <span className="text_Like_style">
                {
                  data.likedCount === 0
                    ? (data.isLikedByYou ? <></> : <></>)
                    : data.likedCount === 1
                      ? (data.isLikedByYou ? <>You</> : <>{data.likedBy}</>)
                      : data.likedCount === 2
                        ? (data.isLikedByYou ? <>You and 1 others</> : <>{data.likedBy} and 1 other</>)
                        : (data.isLikedByYou
                          ? <>You and {data.likedCount - 1} others</>
                          : <>{data.likedBy} and {data.likedCount - 1} others</>
                        )
                }
              </span>
            </div>
          </div>
          <div className="comment_share_count">
            <span className="text_Like_style">{data.commentedCount} comments</span>
            <span className="text_Like_style">{data.sharedCount} shares</span>
          </div>
        </div>

        <div className="Footer_box_parent">
          <div className="like_icon_text" onClick={() => handlePostLikeDisLike(data.picId, data.userId)}>
            <span className={data.isLikedByYou ? "yesLiked liked" : "liked"}><i class="fa-slab-press fa-regular fa-thumbs-up"></i></span>
            <span className={data.isLikedByYou ? "yesLiked style_All_text_reaction_name" : "style_All_text_reaction_name"}>Like</span>
          </div>

          <div className="comment_icon_text">
            <img className="comment" src="/Image/HomePage/Post/comment_img.jpg" alt="comment" />
            <span className="style_All_text_reaction_name">Comment</span>
          </div>
          <div className="share_icon_text">
            <img className="share" src="/Image/HomePage/Post/share-logo_img.jpg" alt="share" />
            <span className="style_All_text_reaction_name">Share</span>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ProfilePostCard;

// profilename={data.profilename}
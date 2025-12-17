import React, { useState } from "react";
import "../Style/PostComp.css";
import { useGlobalSeeMoreSeeLessString } from "../../../Hooks/useGlobleFun";
import ProfilePostCard from "../../UserProfilePage/SubComp/ProfilePostCard";
import PostMenuUndo from "../../GlobalUse/PostMenuUndo";

const PostComp = ({ navigateToProfile, loggedUserId, postData,
  //for hide the post
  handleShowHidePost,
  //for like the post
  handlePostLikeDisLike,
  //for delete post
  handleDeletePost,
  //ye edit wale k liye hai;
  handleEditPostDialogue
}) => {


  return (

    <div className="profile-posts">
      {postData.map((post) => {
        return <>{post.isHidePost ?
          <PostMenuUndo ProfileName={post.profileName}
            handleShowHidePost={handleShowHidePost}
            PostPicId={post.picId}
            PostPicUserId={post.userId} />
          :
          <ProfilePostCard navigateToProfile={navigateToProfile}
            loggedUserId={loggedUserId}
            key={post.picId}
            data={post}
            //for hide the post
            handleShowHidePost={handleShowHidePost}
            //for like the post
            handlePostLikeDisLike={handlePostLikeDisLike}
            //for delete post
            handleDeletePost={handleDeletePost}
            //ye edit wale k liye hai;
            handleEditPostDialogue={handleEditPostDialogue}
          />
        }</>
      })
      }

    </div>

  );
};

export default PostComp;

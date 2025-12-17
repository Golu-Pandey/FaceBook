

import React from "react";
import ProfilePostCard from "./ProfilePostCard";
import "../Style/ProfilePosts.css";

const ProfilePosts = ({ navigateToProfile, loggedUserId,  data,
  handleProfilePostLikeDisLike,
  handleDeleteProfilePageUserPost,
  handleUserProfilePageEditPostDialogue
}) => {
  return (
    <div className="profile-posts">
      {data.map((post) => (
        <ProfilePostCard navigateToProfile={navigateToProfile}
          loggedUserId={loggedUserId}
          key={post.picId}
          data={post}
          // for hide the post
          handleShowHidePost={() => console.log("handleShowHidePost")}
          // /for like the post
          handlePostLikeDisLike={handleProfilePostLikeDisLike}
          //for delete post
          handleDeletePost={handleDeleteProfilePageUserPost}
          //ye edit wale k liye hai;
          handleEditPostDialogue={handleUserProfilePageEditPostDialogue}



        />


      ))}

    </div>
  );
};

export default ProfilePosts;


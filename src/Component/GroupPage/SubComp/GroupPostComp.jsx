import React from "react";
import GroupPostImageComp from "./GroupPostImageComp";
import "../Style/GroupPostComp.css";
import GroupPostVideoComp from "../../VideoPage/SubComp/GroupPostVideoComp";
import PostMenuUndo from "../../GlobalUse/PostMenuUndo";

export default function GroupPostComp({ activity, groupPostsList, handleShowHideOptionsOnGroupPage, handleGroupLikeDisLike }) {


  return (
    <div className="group-right-page">
      {/* Heading */}
      <span className="grou-text-style2">{activity}</span>
      {/* Posts Loop */}
      {groupPostsList.map((postItem, index) => {
        const post = postItem["group-post-1"];
        const isHidePost = post.postType == 'IMAGE' ? post.isHidePost : post.headline.isHidePost;
        console.log({ post });

        return (<> {isHidePost ?
          <div className="total-post" key={index}>
            <PostMenuUndo
              handleShowHidePost={handleShowHideOptionsOnGroupPage}
              ProfileName={post.postType == 'IMAGE' ? post["post-group-logo-end"]["grou-text-style1-name"] : post["postInfo"]["name"]}
              PostPicId={post.postType == 'IMAGE' ? post["picId"] : post["headline"]["picId"]}
              PostPicUserId={-2}
            />
          </div>
          :
          <div>
            {post.postType == 'IMAGE' ?
              <GroupPostImageComp index={index} post={post}
                handleShowHideOptionsOnGroupPage={handleShowHideOptionsOnGroupPage}
                handleGroupLikeDisLike={handleGroupLikeDisLike}
                />
              :
              <GroupPostVideoComp index={index} post={post}
                handleShowHideOptionsOnVideoPage={handleShowHideOptionsOnGroupPage}
                handleVideoLikeDisLike={handleGroupLikeDisLike}
              />}
          </div>}

        </>)

      })}
    </div>
  );
}

import React from "react";
import "../Style/VideoPostComp.css";
import GroupPostVideoComp from "./GroupPostVideoComp";
import PostMenuUndo from "../../GlobalUse/PostMenuUndo";

const VideoPostComp = ({ videoPostsList, handleShowHideOptionsOnVideoPage ,handleVideoLikeDisLike}) => {



  return (
    <div className="right-video-page">
      {videoPostsList.map((post, index) => {
        return <>{post.headline.isHidePost ?
          <div className="total-post" key={index}>
            <PostMenuUndo
              ProfileName={post.postInfo.name}
              handleShowHidePost={handleShowHideOptionsOnVideoPage}
              PostPicId={post.headline.picId}
              PostPicUserId={-2}
            />
          </div>
          :
          <GroupPostVideoComp index={index}
            post={post}
            handleShowHideOptionsOnVideoPage={handleShowHideOptionsOnVideoPage}
            handleVideoLikeDisLike={handleVideoLikeDisLike}
             />
        }
        </>
      }

      )}



    </div>
  );
};

export default VideoPostComp;

import React, { useEffect, useState } from "react";
import NavBarComp from "../NavBar/NavBarComp";
import LeftSidebarComp from "./SubComp/LeftSidebarComp"; // JSON based sidebar
import VideoPostComp from "./SubComp/VideoPostComp"; // JSON based video posts
import "./VideoPage.css"; // optional main page styles
import { useGlobalProfilePageNavigator } from "../../Hooks/useGlobleFun";
import postData from "../../ConstDataObject/HomePage/PostComp/PostComp.json"
import videoPostData from "../../ConstDataObject/VideoPage/VideoPostComp/VideoPostComp.json";

export default function VideoPage() {

  //ye ek custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
  const { loggedUserId, onNavigate } = useGlobalProfilePageNavigator();

  // VideoPage ke PostData ko Display Karne ke liye ye State Defind kiye hai. aur 
  // updatedVideoPostsList state me starting value localStorage k 'updatedVideoPostsListKey' key se nikal kr rakh rha hu;
  // agar localStorage k 'updatedVideoPostsListKey' key pe koi value nhi hai to mai updatedVideoPostsList ko empty array se initialise kr de rha hu;
  const [updatedVideoPostsList, setUpdatedVideoPostsList] = useState(() => {
    const locallyStoredUpdatedVideoPostsList = localStorage.getItem('updatedVideoPostsListKey');
    if (!locallyStoredUpdatedVideoPostsList)
      return [];

    return JSON.parse(locallyStoredUpdatedVideoPostsList);
  }
  );

  //yhaa pe post ko hide krne ka code likhe hai;
  const handleShowHideOptionsOnVideoPage = (videoPostPicId, postUserId) => {
    //yha se Video-page pe changes dikhane k liye code likha gya hai; 
    const newVideoPostDataList = updatedVideoPostsList.map((userVideoPost, index) => {
      if (userVideoPost.headline.picId == videoPostPicId) {
        return { ...userVideoPost, headline: { ...userVideoPost.headline, isHidePost: !userVideoPost.headline.isHidePost } };
      }
      else {
        return userVideoPost;
      }
    })

    setUpdatedVideoPostsList([...newVideoPostDataList]);
  }

    //yhaa pe post ko like, dislike krne ka code likhe hai;
  const handleVideoLikeDisLike = (videoPostPicId) => {
   //yha se Video-page pe changes dikhane k liye code likha gya hai; 
    const newVideoPostDataList = updatedVideoPostsList.map((userVideoPost, index) => {
      if (userVideoPost.headline.picId == videoPostPicId) {
        return { ...userVideoPost, headline: { ...userVideoPost.headline, isLikedByMe: !userVideoPost.headline.isLikedByMe } };
      }
      else {
        return userVideoPost;
      }
    })

    setUpdatedVideoPostsList([...newVideoPostDataList]);
  }

//jb updatedVideoPostsList me koi bhi change ho ya koi bhi key ki value update ho, tb ye eseEffect call hoga; 
  useEffect(() => {
    if (updatedVideoPostsList.length) {
      localStorage.setItem('updatedVideoPostsListKey', JSON.stringify(updatedVideoPostsList));
    }
    else {
      setUpdatedVideoPostsList(videoPostData.videoPosts);
      localStorage.setItem('updatedVideoPostsListKey', JSON.stringify(videoPostData.videoPosts));
    }

  }, [updatedVideoPostsList]);





  return (
    <div className="video-page-container">
      {/* Top Navbar */}
      <NavBarComp navigateToProfile={onNavigate}
        loggedUserId={loggedUserId}
        totalFbUsers={postData}
      />

      <div className="video-page-content">
        {/* Left Sidebar */}
        <LeftSidebarComp />

        {/* Main Video Content */}
        <div className="video-main-section">
          <VideoPostComp
            videoPostsList={updatedVideoPostsList}
            handleShowHideOptionsOnVideoPage={handleShowHideOptionsOnVideoPage}
            handleVideoLikeDisLike={handleVideoLikeDisLike}
          />
        </div>
      </div>
    </div>
  );
}


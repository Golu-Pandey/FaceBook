import React, { useEffect, useState } from "react";
import NavBarComp from "../NavBar/NavBarComp";
import GroupPostComp from "./SubComp/GroupPostComp"; // JSON-driven posts
import "./GroupPage.css"; // main page styles
import { useGlobalProfilePageNavigator } from "../../Hooks/useGlobleFun";
import postData from "../../ConstDataObject/HomePage/PostComp/PostComp.json"
import GroupPostData from "../../ConstDataObject/GroupPage/GroupPostComp/GroupPostComp.json";
import LeftSidebarData from "../../ConstDataObject/GroupPage/LeftSidebarComp/LeftSidebarComp.json";
import LeftSidebarSubComp from "./SubComp/LeftSidebarSubComp";


export default function GroupPage() {

  //ye ek custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
  const { loggedUserId, onNavigate } = useGlobalProfilePageNavigator();

  // GroupPage ke PostData ko Display Karne ke liye ye State Defind kiye hai. aur 
  // updatedGroupPostsList state me starting value localStorage k 'updatedGroupPostsListKey' key se nikal kr rakh rha hu;
  // agar localStorage k 'updatedGroupPostsListKey' key pe koi value nhi hai to mai updatedGroupPostsList ko empty array se initialise kr de rha hu;
  const [updatedGroupPostsList, setUpdatedGroupPostsList] = useState(() => {
    const locallyStoredUpdatedGroupPostsList = localStorage.getItem('updatedGroupPostsListKey');
    if (!locallyStoredUpdatedGroupPostsList)
      return [];

    return JSON.parse(locallyStoredUpdatedGroupPostsList);
  }
  );

  //yhaa pe post ko hide krne ka code likhe hai;
  const handleShowHideOptionsOnGroupPage = (groupPostPicId, postUserId) => {
    //yha se Group-page pe changes dikhane k liye code likha gya hai; 
    const newGroupPostDataList = updatedGroupPostsList.map((userGroupPost, index) => {
      const group = userGroupPost["group-post-1"];

      // For IMAGE POSTS
      if (group.postType == 'IMAGE') {
        if (group.picId == groupPostPicId) {
          return { ...userGroupPost, "group-post-1": { ...group, isHidePost: !group.isHidePost } }
        }
        else {
          return userGroupPost;
        }
      }
      else {
        // For VIDEO POSTS
        if (group.headline.picId == groupPostPicId) {
          return { ...userGroupPost, "group-post-1": { ...group, headline: { ...group.headline, isHidePost: !group.headline.isHidePost } } };
        }
        else {
          return userGroupPost;
        }
      }
    })
    // console.log({ newGroupPostDataList })
    setUpdatedGroupPostsList([...newGroupPostDataList]);
  }

  //yhaa pe post ko like, dislike krne ka code likhe hai;
  const handleGroupLikeDisLike = (groupPostPicId) => {
    //yha se Video-page pe changes dikhane k liye code likha gya hai; 
    const newGroupPostDataList = updatedGroupPostsList.map((userGroupPost, index) => {
      const group = userGroupPost["group-post-1"];

      // For IMAGE POSTS
      if (group.postType == 'IMAGE') {

        if (group.picId == groupPostPicId) {
          const originalLikedCount = group["like-comment-logo-box"]["count-number-like-comment-share"]["like-cout-4"]["count"];
          const likedCountLocal = !group.isLikedByMe ? originalLikedCount + 1 : originalLikedCount - 1;

          return {
            ...userGroupPost, "group-post-1": {
              ...group, isLikedByMe: !group.isLikedByMe, "like-comment-logo-box": {
                ...group["like-comment-logo-box"],
                "count-number-like-comment-share": {
                  ...group["like-comment-logo-box"]["count-number-like-comment-share"],
                  "like-cout-4": {
                    ...group["like-comment-logo-box"]["count-number-like-comment-share"]["like-cout-4"],
                    count: likedCountLocal
                  }
                }
              }
            }
          }
        }
        else {
          return userGroupPost;
        }
      }
      else {
        // For VIDEO POSTS
        if (group.headline.picId == groupPostPicId) {
          return { ...userGroupPost, "group-post-1": { ...group, headline: { ...group.headline, isLikedByMe: !group.headline.isLikedByMe } } };
        }
        else {
          return userGroupPost;
        }
      }
    })
    // console.log({ newGroupPostDataList })
    setUpdatedGroupPostsList([...newGroupPostDataList]);
  }

  //jb updatedGroupPostsList me koi bhi change ho ya koi bhi key ki value update ho, tb ye eseEffect call hoga; 
  useEffect(() => {
    if (updatedGroupPostsList.length) {
      localStorage.setItem('updatedGroupPostsListKey', JSON.stringify(updatedGroupPostsList));
    }
    else {
      setUpdatedGroupPostsList(GroupPostData["group-right-page"]["group-posts"]);
      localStorage.setItem('updatedGroupPostsListKey', JSON.stringify(GroupPostData["group-right-page"]["group-posts"]));
    }

  }, [updatedGroupPostsList]);

    //ye GroupPage k leftSideBar me dikh rhe list ka data;
  const leftSideBarTotalData = LeftSidebarData?.["group-left-page"]?.["group-content-left"];

  return (
    <div className="group-page-container">
      {/* Top Navbar */}
      <NavBarComp navigateToProfile={onNavigate}
        loggedUserId={loggedUserId}
        totalFbUsers={postData}
      />

      <div className="group-page-content">
        {/* Left Sidebar */}
        <LeftSidebarSubComp data={leftSideBarTotalData} />

        {/* Main Group Page Content */}
        <div className="group-main-section">
          <GroupPostComp
            activity={GroupPostData["group-right-page"]["grou-text-style2"]}
            groupPostsList={updatedGroupPostsList}
            handleShowHideOptionsOnGroupPage={handleShowHideOptionsOnGroupPage}
            handleGroupLikeDisLike={handleGroupLikeDisLike}
          />

        </div>
      </div>
    </div>
  );
}



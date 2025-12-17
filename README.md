# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


import userProfilePageData from "../../../ConstDataObject/UserProfilePage/UserProfilePage.json";
const mydaata = userProfilePageData.userFriends;


import React from "react";
import "./UserProfilePage.css";

// Sub-components import
import ProfileHeader from "./SubComp/ProfileHeader";
import ProfileIntro from "./SubComp/ProfileIntro";
import ProfileFriends from "./SubComp/ProfileFriends";
import ProfilePosts from "./SubComp/ProfilePosts";
import ProfilePhotos from "./SubComp/ProfilePhotos";

const UserProfilePage = () => {
  return (
    <div className="user-profile-page">
      <ProfileHeader />
      <div className="profile-main">
        <div className="profile-left">
          <ProfileIntro />
          <ProfilePhotos />
          <ProfileFriends />
        </div>
        <div className="profile-right">
          <ProfilePosts />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;




 return (<>
        {post.postType=='IMAGE' ? <GroupPostImageComp post={post}/>  : <GroupPostVideoComp post={post}/> }
        
        </>)

<!-- { "name": "Professional dashboard", "icon": "/Image/HomePage/LeftSidebar/Professional_Dashboard_img.png", "path": "/dashboard" }, -->

 
<!--  -->
<!-- <input
                type="text"
                placeholder={
                  currentPath === "surya"
                    ? "Search Surya FaceBook"
                    : "Search Facebook"
                }
              /> -->





// src/Component/Sidebar/sidebarData.js

export const sidebarItems = [
  { name: "Golu Pandey", icon: "/Image/HomePage/LeftSidebar/Golu_Profile_img.jpg", path: "/" },
  { name: "Meta AI", icon: "/Image/HomePage/LeftSidebar/Meta_Ai_img.png", path: "/" },
  { name: "Friends", icon: "/Image/HomePage/LeftSidebar/Friends_img.png", path: "/friends" },
  { name: "Professional dashboard", icon: "/Image/HomePage/LeftSidebar/Professional_Dashboard_img.png", path: "/dashboard" },
  { name: "Feeds", icon: "/Image/HomePage/LeftSidebar/Feeds_img.png", path: "/feeds" },
  { name: "Groups", icon: "/Image/HomePage/LeftSidebar/Groups_img.png", path: "/group" },
  { name: "Marketplace", icon: "/Image/HomePage/LeftSidebar/Market_Place_img.jpg", path: "/marketplace" },
  { name: "Video", icon: "/Image/HomePage/LeftSidebar/Video_img.jpg", path: "/video" },
  { name: "Birthdays", icon: "/Image/HomePage/LeftSidebar/Birthday_img.png", path: "/birthdays" },
  { name: "Chat with AIs", icon: "/Image/HomePage/LeftSidebar/Chat_With_AIs_img.png", path: "/chat-ai" },
  { name: "Events", icon: "/Image/HomePage/LeftSidebar/Events_img.jpg", path: "/events" },
  { name: "Gaming video", icon: "/Image/HomePage/LeftSidebar/Gaming_Video_img.png", path: "/gaming" },
  { name: "Memories", icon: "/Image/HomePage/LeftSidebar/Memories_img.jpg", path: "/memories" },
  { name: "Messenger", icon: "/Image/HomePage/LeftSidebar/Messenger_img.jpg", path: "/memories" },
  { name: "Messenger Kids", icon: "/Image/HomePage/LeftSidebar/Messenger_Kids_img.png", path: "/memories" },
  { name: "Orders and payments", icon: "/Image/HomePage/LeftSidebar/Orders_And_Payments_img.png", path: "/memories" },
  { name: "Pages", icon: "/Image/HomePage/LeftSidebar/Pages_img.png", path: "/memories" },
  { name: "Play games", icon: "/Image/HomePage/LeftSidebar/Play_Games_img.jpg", path: "/memories" },
  { name: "Recent ad activity", icon: "/Image/HomePage/LeftSidebar/Recent_Ad_Activity_img.png", path: "/memories" },
  { name: "Reels", icon: "/Image/HomePage/LeftSidebar/Reels_img.jpg", path: "/memories" },
  { name: "Saved", icon: "/Image/HomePage/LeftSidebar/Saved_img.png", path: "/memories" },
];

<!--agr active lgana hai to aise - ${activeView === "grid" ? "active" : ""}`} lga de,, agr disable active krna hai to ise - ${activeView === "grid" ? "active" : ""}`} hta de  -->

import "../Style/ProfileHeader.css";
import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const ProfileHeader = ({ data , friendsData}) => {
  return (
    <div className="profile-header_Page">

      <div className="bg_cover">
        <img src={data.coverPic} alt="cover" className="cover-img" />
        <div className="Cover_Photo_Edit">
          <img src="/Image/UserProfilePage/Profile_Header/Camera_icon.jpeg" alt="" />
          <span>Edit cover photo</span>
        </div>
      </div>
      <div className="Profile_Photo_Camera">
        <img src={data.profilePic} alt="profile" className="profile-img" />
        <div className="Profile_Photo_edit">
                <img src="/Image/UserProfilePage/Profile_Header/Camera_icon.jpeg" alt="" />
        </div>
        <div className="Profile_Name_Follower_Following">

          <h2 className="profile_header">{data.profileName}</h2>
          <div className="Following_text_style">
          <span className="follower_Text">{data.profileFollowers} followers  </span><span className="follower"> • </span>  <span className="follower_Text"> {data.profileFollowing} following</span>
          </div>
          <div className="Other_Profile_Pic_All">
            {/* {friendsData.slice(0,8) ==> give the new array jiske pass  friendsData ka 0 se 7th index tak ka element rahega*/}
              {friendsData.slice(0,8).map((friend, index) =>{
                // console.log("riend.userProfile => ",friend.userProfile)
                return <img key={index} className="profile_img" src={friend.userProfile} alt="" />
              })
            }
          </div>
        </div>

        <div className="right_Header_box">

          <div className="left_container">

            <div className="child-left_container">
              <div className="edit_Profile">
                <img src="/Image/UserProfilePage/Profile_Header/Edit_icon.png" alt="" />
                <span className="edit_add_style">Edit</span>
              </div>
              <div className="Dashboard_icon">
                <img className="Dashboard_img" src="/Image/UserProfilePage/Profile_Header/Professional_dashboard_icon.png" alt="" />
                <span className="Dashboard_text">Professional dashboard</span>
              </div>
            </div>
           
           <div className="child-left_container">
            <div className="Arrow_bottom">
              <KeyboardArrowDownIcon />
            </div>
            <div className="Add_story">
              <img src="/Image/UserProfilePage/Profile_Header/Add_Story_icon.png" alt="" />
              <span className="edit_add_style">Add to story</span>
            </div>
            </div>

          </div>
        </div>


      </div>
      <ProfileMenu />
    </div>
  );
};
export default ProfileHeader;


import React from "react";
import "./PostOptionsMenu.css";
import AccessTimeFilledSharpIcon from '@mui/icons-material/AccessTimeFilledSharp';
import AnnouncementSharpIcon from '@mui/icons-material/AnnouncementSharp';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const PostOptionsMenu = ({ loggedUserId, data, handleShowHidePost }) => {

  // agar login user hi post ka user hai, to kuch show mat karo
  if (data.userId == loggedUserId) return null;

  return (
    <div className="options-container">

      <div className="option-item">
        <div className="option-icon">
          <i className="fa-solid fa-circle-plus"></i>
        </div>
        <div className="option-texts">
          <span className="option-title">Interested</span>
          <span className="option-subtext">More of your posts will be like this.</span>
        </div>
      </div>

      <div className="option-item">
        <div className="option-icon">
          <RemoveCircleSharpIcon />
        </div>
        <div className="option-texts">
          <span className="option-title">Not interested</span>
          <span className="option-subtext">Fewer of your posts will be like this.</span>
        </div>
      </div>

      <div className="option-item">
        <div className="option-icon">
          <i className="fa-solid fa-bookmark"></i>
        </div>
        <div className="option-texts">
          <span className="option-title">Save video</span>
          <span className="option-subtext">Add this to your saved items.</span>
        </div>
      </div>

      <div className="option-item">
        <div className="option-icon">
          <i className="fa-jelly fa-regular fa-link"></i>
        </div>
        <div className="option-texts">
          <span className="option-title">Copy link</span>
        </div>
      </div>

      <div className="option-item">
        <div className="option-icon">
          <i className="fa-solid fa-bell"></i>
        </div>
        <div className="option-texts">
          <span className="option-title">Turn on notifications for this post</span>
        </div>
      </div>

      {/* 👇 Hide post button — function parent se aaya hai */}
      <div
        className="option-item">
        <div className="option-icon">
          <i className="fa-solid fa-rectangle-xmark"></i>
        </div>
        <div className="option-texts" onClick={()=> handleShowHidePost(data.picId, data.userId)}>
          <span className="option-title">Hide post</span>
          <span className="option-subtext">See fewer posts like this.</span>
        </div>
      </div>

      <div className="option-item">
        <div className="option-icon">
          <AccessTimeFilledSharpIcon />
        </div>
        <div className="option-texts">
          <span className="option-title">Snooze {data.profileName} for 30 days</span>
          <span className="option-subtext">Temporarily stop seeing posts.</span>
        </div>
      </div>

      <div className="option-item">
        <div className="option-icon">
          <CancelRoundedIcon/>
        </div>
        <div className="option-texts">
          <span className="option-title">Unfollow {data.profileName}</span>
          <span className="option-subtext">
            Stop seeing posts from this Page. They won't be notified that you unfollowed.
          </span>
        </div>
      </div>

      <div className="option-item">
        <div className="option-icon">
          <AnnouncementSharpIcon />
        </div>
        <div className="option-texts">
          <span className="option-title">Report post</span>
          <span className="option-subtext">
            We won’t let {data.profileName} know who reported this.
          </span>
        </div>
      </div>

      <div className="option-item">
        <div className="option-icon">
          <i className="fa-solid fa-semibold fa-user-xmark"></i>
        </div>
        <div className="option-texts">
          <span className="option-title">Block {data.profileName} profile</span>
          <span className="option-subtext">
            You won't be able to see or contact each other.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostOptionsMenu;

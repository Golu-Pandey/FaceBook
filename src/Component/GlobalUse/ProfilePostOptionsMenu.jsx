import React from 'react';
import "./ProfilePostOptionsMenu.css"
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import LanguageIcon from '@mui/icons-material/Language';
const ProfilePostOptionsMenu = ({ loggedUserId, data,
  //for create the post;
  handleDeletePost,
  //for edit the post
  handleEditPostDialogue
}) => {
  // sirf userId 1 ke liye menu show hoga
  if (data.userId !== loggedUserId) return null;

  return (
    <div className="menu-container">

      <div className="menu-item_saved">
        <a className="menu-icon" href=""><i class="fa-solid fa-bookmark"></i></a>

        <div className="save_Post_text">
          <span className="menu-text">Save Post</span>
          <span className="menu-text_2">Add this to your saved items.</span>
        </div>
      </div>


      <div className="menu-item">

        <ChatBubbleIcon sx={{
          width: '18px',
          height: '18px',
          color: 'black'
        }} />
        <span className="menu-text">Who can comment on your post?</span>
      </div>

      <div className="menu-item">

        <EditIcon sx={{
          width: '20px',
          height: '20px',
          color: 'black'
        }} />
        <span className="menu-text">View edit history</span>
      </div>

      <div className="menu-item">
        <img className="Menu_Icon_image" src="/Image/MessengerPage/Menu_card_Edit_Post_Audience.jpeg" alt="" />
        <span className="menu-text">Edit post audience</span>
      </div>

      <div className="menu-item">
        <a className="menu-icon" href=""><i class="fa-solid fa-magnifying-glass"></i></a>
        <span className="menu-text">Change alt text</span>
      </div>

      <div className="menu-item"
        onClick={() => handleEditPostDialogue(data.userId, data.picId)}
      >
        <CropOriginalIcon sx={{
          width: '20px',
          height: '20px',
          color: 'black'
        }} />
        <span className="menu-text">Edit post</span>
      </div>

      <div className="menu-item" onClick={() => handleDeletePost(data.userId, data.picId, data.post)} >
        <a className="menu-icon" href=""><i class="fa-solid fa-trash"></i></a>
        <span className="menu-text">Delete post</span>
      </div>

      <div className="menu-item">
        <a className="menu-icon" href=""><i class="fa-solid fa-bell-slash"></i></a>
        <span className="menu-text">Turn off notifications for this post</span>
      </div>

      <div className="menu-item">
        <img className="Menu_Icon_image" src="/Image/MessengerPage/Menu_card_Share_Partnership.jpeg" alt="" />
        <span className="menu-text">Share partnership ad code</span>
      </div>

      <div className="menu-item">
        <LanguageIcon sx={{
          width: '20px',
          height: '20px',
          color: 'black'
        }} />
        <span className="menu-text">Turn off translations</span>
      </div>

      <div className="menu-item">
        <CalendarMonthIcon sx={{
          width: '20px',
          height: '20px',
          color: 'black'
        }} />
        <span className="menu-text">Edit date</span>
      </div>

      <div className="menu-item">
        <a className="menu-icon" href=""><i class="fa-solid fa-rotate-left"></i></a>
        <span className="menu-text">Rotate left</span>
      </div>

      <div className="menu-item">
        <a className="menu-icon" href=""> <i class="fa-solid fa-rotate-right"></i></a>
        <span className="menu-text">Rotate right</span>
      </div>

      <div className="menu-item">
        <FileDownloadIcon sx={{
          width: '20px',
          height: '20px',
          color: 'black'
        }} />

        <span className="menu-text">Download</span>
      </div>

      <div className="menu-item">
        < AccountCircleIcon sx={{
          width: '20px',
          height: '20px',
          color: 'black'
        }} />
        <span className="menu-text">Make Profile Picture</span>
      </div>

      <div className="menu-item">
        <PhotoSizeSelectActualIcon sx={{
          width: '20px',
          height: '20px',
          color: 'black'
        }} />
        <span className="menu-text">Make Cover Photo</span>
      </div>

      <div className="menu-item">
        <a className="menu-icon" href=""><i class="fa-solid fa-image"></i></a>
        <span className="menu-text">Move to another album</span>
      </div>

      <div className="menu-item">
        <OpenInFullRoundedIcon sx={{
          width: '20px',
          height: '20px',
          color: 'black'
        }} />
        <span className="menu-text">Enter full-screen</span>
      </div>

      <div className="menu-item">
        <a className="menu-icon" href=""><i class="fa-solid fa-code"></i></a>
        <span className="menu-text">Embed</span>
      </div>

    </div>
  );
};

export default ProfilePostOptionsMenu;

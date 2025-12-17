import React from 'react';
import './PostMenuUndo.css';
import AnnouncementSharpIcon from '@mui/icons-material/AnnouncementSharp';

const PostMenuUndo = ({ ProfileName, handleShowHidePost, PostPicId,PostPicUserId }) => {
  return (
    <div className="action-modal">
      <div className="action-item-Hideen">
        <div className="HideenANdIcon">
        <div className='HideIcon'>
          <span className='hidden-icon'><i class="fa-solid fa-xmark"></i></span>
        </div>
        <div className="textUndo">
        <span className="text">Hidden</span>
        <span className="subtext">Hiding posts helps us personalise your Feed.</span>
        </div>
        </div>
        <button className="undo-button" onClick={() => handleShowHidePost(PostPicId,PostPicUserId)}>Undo</button>
      </div>

      <div className="action-item">
        <div className='snooze'>
            <span className="snooze-icon"><i class="fa-solid fa-clock"></i></span>
        </div>
        <div className="textUndo">
        <span className="text">Snooze {ProfileName} for 30 days</span>
        <span className="subtext">Temporarily stop seeing posts.</span>
        </div>
      </div>

      <div className="action-item">
        <div className="icon report-icon">
           < AnnouncementSharpIcon />
        </div>
        <div className="textUndo">
        <span className="text">Report photo</span>
        <span className="subtext">We won't let {ProfileName} know who reported this.</span>
       </div>
      </div>

      <div className="action-item">
        <div className="icon settings-icon">
         <span><i class="fa-solid fa-arrow-right-arrow-left"></i></span>
        </div>
        <span className="text">Content preferences</span>
      </div>
    </div>
  );
};

export default PostMenuUndo;

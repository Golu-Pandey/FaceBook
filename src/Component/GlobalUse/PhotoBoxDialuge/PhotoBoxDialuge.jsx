import React, { useState } from "react";
import "./PhotoBoxDialuge.css";
import totalImageInPhotoBoxDialuge from "../PhotoBoxDialuge/PhotoBoxDialuge.json";
const PhotoBoxDialuge = ({ handleOpenPhotoDialogue,
  handleSelectDialogueImage, messengerChatPhotoBoxUrl,
  handleConfirmAndSendDialogueImage, flag
}) => {

  return (
    <div className="PhotoBoxDialuge_container">

      {/* TOP BAR */}
      <div className="PhotoBoxDialuge_topBar">
        <button className="PhotoBoxDialugeImageCloseBtn" onClick={() => handleOpenPhotoDialogue()}>
          <i class="fa-solid fa-xmark"></i>
        </button>
        {flag == 'EDITPOST' ?
          <></> :
          <button
            className={`PhotoBoxDialugeImageConfirmBtn ${messengerChatPhotoBoxUrl ? "active" : ""}`}
            disabled={messengerChatPhotoBoxUrl == ''}
            onClick={() => handleConfirmAndSendDialogueImage()}
          >
            Confirm
          </button>
        }
      </div>

      {/* IMAGE GRID */}
      <div className="PhotoBoxDialugeImageGrid">
        {totalImageInPhotoBoxDialuge.map((singleImage, index) => (
          <div
            key={index}
            className={`PhotoBoxDialugeImageParent ${messengerChatPhotoBoxUrl == singleImage.imageUrl ? "selected" : ""}`}
            onClick={() => handleSelectDialogueImage(singleImage.imageUrl)}
          >
            <img className="PhotoBoxDialugeImage" src={singleImage.imageUrl} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoBoxDialuge;




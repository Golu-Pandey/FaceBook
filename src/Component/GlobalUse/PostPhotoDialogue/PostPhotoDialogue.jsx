import React, { useState } from "react";
import "./PostPhotoDialogue.css";

export default function PostPhotoDialogue({
  //ye photo post krne k liye hai;
  imageUrl,
  handleCanclePostImage, handlePostImage, handleTextAreaValue, textAreaValue,
  handleHomePagePhotoIconBoxAgainOnAndOff, flag,
  //ye photo edit krne k liye hai
  handleEditPost
}) {



  return (
    <div className="PostPhotoDialoguePostOverlay">
      <div className="PostPhotoDialoguePost">
        {/* Header */}
        <div className="PostPhotoDialoguePostHeader">
          <h2 className="PostPhotoDialoguePostHeaderh2">Create post</h2>
          <button className="PostPhotoDialogueSelectNewBtn"
            onClick={() => handleHomePagePhotoIconBoxAgainOnAndOff()}
          >Select new photo</button>
          <button className="PostPhotoDialoguePostCloseBtn"
            onClick={() => handleCanclePostImage()}>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Status Input */}
        <textarea
          className="PostPhotoDialoguePostStatusInput"
          placeholder="What's on your mind ?"
          value={textAreaValue}
          onChange={(e) => handleTextAreaValue(e.target.value)}
        />

        {/* Image */}
        {imageUrl ?
          <div className="PostPhotoDialogueImageParent">
            <img className="PostPhotoDialogueImage" src={imageUrl} alt="preview" />
          </div>
          : <></>}

        {/* Post Button */}

        <button className="PostPhotoDialoguePostPostBtn"
          onClick={flag == 'EDITPOST' ? () => handleEditPost() : () => handlePostImage(textAreaValue, imageUrl)}>
          {flag == 'EDITPOST' ? <>Save</> : <>Post</>}
        </button>

      </div>
    </div>
  );
}

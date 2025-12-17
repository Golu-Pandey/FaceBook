import React from "react";
import "../Style/ChatWindowComp.css";
import SendIcon from '@mui/icons-material/Send';
import PhotoBoxDialuge from "../../GlobalUse/PhotoBoxDialuge/PhotoBoxDialuge";

export default function ChatWindowComp({
  userMessageDetails, navigateToProfile,
  // For Type=='TEXT'
  messengerChatInputBoxChange, messengerChatInputBox, handleSendRecivedMessage,
  // For Type=='IMAGE'
  handleOpenPhotoDialogue, messengerChatPhotoBoxDialugeOpen,
  handleSelectDialogueImage, messengerChatPhotoBoxUrl,
  handleConfirmAndSendDialogueImage, handleDeleteMessege }) {


  if (!userMessageDetails || Object.keys(userMessageDetails).length === 0) {
    return <></>
  }

  // console.log({ userMessageDetails }, 'details', Object.keys(userMessageDetails).length  );

  return (
    <div className="messenger-page-center">
      {/* Center Header */}
      <div className="messenger-page-center-header">

        <div className="logo-name-center-content" >
          <div className="logo-name-center-content_left" onClick={() => navigateToProfile(userMessageDetails.user.userDetails.userId)}>
            <div className="messenger_chat_UserCard" >
              <a href="" className={userMessageDetails.user.userDetails.storyActive ? "story-active" : ""}>
                <img
                  className="messenger_chat_profilePic"
                  src={userMessageDetails.user.userDetails.userProfilePic}
                  alt=""
                />
              </a>
              <div className="messenger_chat_userName">
                <span>{userMessageDetails.user.userDetails.userName}</span>
                {userMessageDetails.user.userDetails.statusActive ? <span className="messenger_chat_userName_ActiveNow">Active now</span> : <></>}
              </div>
            </div>
            {userMessageDetails.user.userDetails.statusActive ? <a className="messenger_chat_userNameActive_Symbol" href=""><i className="fa-solid fa-dot"></i></a> : <></>}
          </div>

          <div className="logo-name-center-content_right_icons">
            {[{ "icon": "fa-solid fa-phone", "class": "icon-center" },
            { "icon": "fa-solid fa-video", "class": "icon-center" },
            { "icon": "fa-solid fa-circle-info", "class": "icon-center" }].map((sibgleIcon, index) => (
              <a key={index} className={sibgleIcon.class} href="">
                <i className={sibgleIcon.icon}></i>
              </a>
            ))}
          </div>
        </div>




        {/* Chat Content */}
        <div className="all-content-chat-page">
          {/* add the profile by using  userMessageDetails*/}

          {userMessageDetails.user.userChatDetails.map((messege, idx) => {
            if (messege.userType == "SENDER") {
              if (messege.userMessegeType == "TEXT") {
                return (<div className="userMessege_sender">
                  <div className="userMessege_text_sender">{messege.userMessege}</div>
                  <div
                  onClick={()=> handleDeleteMessege(messege.userMessegeId)}
                  ><span className="Menu_Messenge"><i class="fa-solid fa-ellipsis-vertical"></i></span>
                  </div>
                </div>)
              }
              else if (messege.userMessegeType == "IMAGE") {
                return (<div className="userMessege_sender">
                  <div className="userMessege_text_sender_image">
                    <img src={messege.userMessege} alt="IMAGE" />
                  </div>
                  <div
                  onClick={()=>  handleDeleteMessege(messege.userMessegeId)}
                  ><span className="Menu_Messenge"><i class="fa-solid fa-ellipsis-vertical"></i></span>
                  </div>
                </div>)
              }
            }
            else if (messege.userType == "RECIEVER") {
              if (messege.userMessegeType == "TEXT") {
                return (<div className="userMessege_reciever">
                  <img className="userMessege_reciever_user_profile_img" src={userMessageDetails.user.userDetails.userProfilePic} alt="PROFILE_PIC" />
                  <div className="userMessege_text_reciever">{messege.userMessege}</div>
                  <div
                  onClick={()=>  handleDeleteMessege(messege.userMessegeId)}
                  ><span className="Menu_Messenge"><i class="fa-solid fa-ellipsis-vertical"></i></span>
                  </div>
                </div>)
              }
              else if (messege.userMessegeType == "IMAGE") {
                return (<div className="userMessege_reciever">
                  <img className="userMessege_reciever_user_profile_img" src={userMessageDetails.user.userDetails.userProfilePic} alt="PROFILE_PIC" />
                  <div className="userMessege_text_reciever_image">
                    <img src={messege.userMessege} alt="IMAGE" /></div>
                    <div
                  onClick={()=>  handleDeleteMessege(messege.userMessegeId)}
                  ><span className="Menu_Messenge"><i class="fa-solid fa-ellipsis-vertical"></i></span>
                  </div>
                </div>)
              }
            }

          })}


          <div className="center_profileImg_profileName">
            <img className="user_profile_img" src={userMessageDetails.user.userDetails.userProfilePic} alt="PROFILE_PIC" />
            <span className="Center_Profile_User_Name">{userMessageDetails.user.userDetails.userName}</span>
          </div>
        </div>

        {/* Start Type Chat Box */}
        <div className="start-type-chat-box">
          <div className="chat-start-type-icon">
            {[
              { "icon": "fa-solid fa-microphone", "class": "typing-line-icon" },
              { "icon": "fa-solid fa-image", "class": "typing-line-icon" },
              { "icon": "fa fa-theater-masks", "class": "typing-line-icon" },
              { "text": "GIF", "class": "gif-icon" }
            ].map((iconItem, idx) => {
              if (idx == 1) {
                return <span key={idx} className={iconItem.class}
                  onClick={() => handleOpenPhotoDialogue()}>
                  {iconItem.icon ? <i className={iconItem.icon}></i> : iconItem.text}
                </span>
              }
              return <a key={idx} className={iconItem.class} href="">
                {iconItem.icon ? <i className={iconItem.icon}></i> : iconItem.text}
              </a>

            })}
          </div>

          <div className="input-emoji">
            <input
              type="text"
              className="messenger_chat_bottom_input"
              autoComplete="off"
              placeholder="Type a messeges.."
              value={messengerChatInputBox}
              onChange={(e) => messengerChatInputBoxChange(e.target.value)}
            />
            <a className="smile-icon" href="">
              <i className="fa-solid fa-face-smile"></i>
            </a>
          </div>

          <div className="send_recieve_icons">
            <span className="reciever"
              onClick={() => handleSendRecivedMessage(userMessageDetails.user.userDetails.userId, "RECIEVER", "TEXT")}
            ><SendIcon sx={{ transform: 'rotate(180deg)' }} /></span>
            <span className="sender"
              onClick={() => handleSendRecivedMessage(userMessageDetails.user.userDetails.userId, "SENDER", "TEXT")}
            ><SendIcon /></span>
          </div>
        </div>
      </div>
      <div className="messengerChatPhotoBoxDialugeOpen">
        {messengerChatPhotoBoxDialugeOpen ?
          <div className="chatWindowCompPhotoBoxDialuge">
            <PhotoBoxDialuge
              handleOpenPhotoDialogue={handleOpenPhotoDialogue}
              handleSelectDialogueImage={handleSelectDialogueImage}
              messengerChatPhotoBoxUrl={messengerChatPhotoBoxUrl}
              handleConfirmAndSendDialogueImage={handleConfirmAndSendDialogueImage}
            />
          </div>
          : <></>}
      </div>
    </div >
  );
}

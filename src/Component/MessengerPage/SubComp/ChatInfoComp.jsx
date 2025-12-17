import React from "react";
import "../Style/ChatInfoComp.css";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import FeedbackIcon from '@mui/icons-material/Feedback';
export default function ChatInfoComp({ userMessageDetails }) {

  return (
    <div className="messenger-page-right">
      <div className="right-logo-">
        <img src={userMessageDetails.messengerRightPageUserProfile} alt="messengerRightPage-UserProfile" />
      </div>
      <div className="left-top">
        <span>{userMessageDetails.messengerRightPageUserName}</span>
      </div>
      
       <div className="end-to">
        <p className="encrypted">
          <i className="fa-solid fa-lock"></i> 
          End-to-end encrypted
        </p>
      </div>



      <div className="Messenger_right_Page_center_icon_name">
        
        <div className="Messenger_right_Page_profile">
          <span className="Messenger_right_Page_profile_icon"> 
         <AccountCircleSharpIcon
          sx={{ 
                  width: '23px',
                  height: '23px',
                  borderRadius: '50%',
                  color: 'black'

           }} />
           </span>
          <span className="Messenger_right_Page_Icon_Name">Profile</span>
        </div>

        <div className="Messenger_right_Page_bell">
          <a className="Messenger_right_Page_icon" href="">
             <i className="fa-solid fa-bell"></i>
             </a>
          <span className="Messenger_right_Page_Icon_Name">Mute</span>
        </div>

        <div className="Messenger_right_Page_search">
          <a className="Messenger_right_Page_icon" href="">
            <i className="fa-solid fa-magnifying-glass"></i>
          </a>
          <span className="Messenger_right_Page_Icon_Name">Search</span>
        </div>

      </div>





      <div className="right-page-total-content-icon">

        {/* Chat Info */}
        <details className="chat-info">
          <summary>Chat Info</summary>
          <div className="Privacy-icon-total">
             <p className="Privacy-icon_rotate"><i className="fa-solid fa-thumbtack" ></i></p>
            <span className="Privacy_Name">View pinned messages</span>
          </div>
        </details>

        {/* Customise chat */}
        <details className="chat-info">
          <summary>Customise chat</summary>
          <div className="Customize_chat">
            <span className="change_color_customise_chat_icon"><i className="fa-solid fa-circle"></i></span>
            <span className="Privacy_Name">Change theme</span>
          </div>
          <div className="Customize_chat">
            <span className="change_color_customise_chat_icon"><i className="fa-solid fa-thumbs-up"></i></span>
            <span className="Privacy_Name">Change emoji</span>
          </div>
        </details>

        {/* Media and files */}
        <details className="chat-info">
          <summary>Media and files</summary>
          <div className="Privacy-icon-total">
            <i className="fa-solid fa-image"></i>
            <span className="Privacy_Name">Media</span>
          </div>
          <div className="Privacy-icon-total">
            <i className="fa-solid fa-file-lines"></i>
            <span className="Privacy_Name">Files</span>
          </div>
        </details>

        {/* Privacy and support */}
        <details className="chat-info">
          <summary>Privacy and support</summary>

          <div className="Total_Privacy_and_Support_Icon_name">

          <div className="Privacy-icon-total">
            <i className="fa-solid fa-bell-slash"></i> 
            <span className="Privacy_Name">Mute notifications</span>
          </div>

          <div className="Privacy-icon-total">
            <i className="fa-solid fa-shield-halved"></i>
            <span className="Privacy_Name"> Message permissions</span>
          </div>

          <div className="Privacy-icon-total">
            <i className="fa-regular fa-clock"></i>
            <span className="Privacy_Name"> Disappearing Message</span>
          </div>

          <div className="Privacy-icon-total">
            <i className="fa-solid fa-eye"></i>
            <div className="Read_Receipts">
              <span className="Privacy_Name">Read receipts</span>
            <span className="Read_Receipts_text">On</span>
            </div>
          </div>

          <div className="Privacy-icon-total">
            <i className="fa-solid fa-lock"></i>
            <span className="Privacy_Name">Verify end-to-end encryption</span>
          </div>

          
            <div className="Privacy-icon-total">
            {/* <i className="fa-solid fa-circle-minus"></i> */}
            <img className="Restrict_icon" src="/Image/MessengerPage/Restrict_img.jpeg" alt="" />
            <span className="Privacy_Name">Restrict</span>
          </div>
         

          <div className="Privacy-icon-total">
            <RemoveCircleSharpIcon/>
            <span className="Privacy_Name">Block</span>
          </div>


          <div className="Privacy-icon-total">
            <FeedbackIcon/>
            <span className="Privacy_Name">Report</span>
          </div>
          </div>
        </details>

      </div>

    </div>
  );
}

import PhotoBoxDialuge from "../../GlobalUse/PhotoBoxDialuge/PhotoBoxDialuge";
import PostPhotoDialogue from "../../GlobalUse/PostPhotoDialogue/PostPhotoDialogue";
import "../Style/CenterPostBox.css";
import { useNavigate } from "react-router-dom";
export default function CenterPostBox({ navigateToProfile, loggedUserId, totalFbUsers,
  // ye photo Dialogue ke liye hai
  handleHomePagePhotoIconBoxOnAndOff, homePagePhotoIconBoxOnAndOff,
  handleHomePageSelectDialogueImage, homePagePhotoBoxUrl,
  handleConfirmAndSendDialogueImage ,  
   //ye photo post krne k liye hai
  handleCanclePostImage, postPhotoDialogueOnAndOff,
  handlePostImage, handleHomePagePhotoIconBoxAgainOnAndOff,
  handleTextAreaValue, textAreaValue, flag,
  //ye post edit krne k liye
  handleEditPost
  }) {

  const loggedUserDetails = totalFbUsers.filter((singleUser) => singleUser.userId == loggedUserId)?.[0]


  return (
    <div className="box-shadow">
      <div className="main-center-profile">
        <a href="">
          <img
            className="center-profile-box__figure"
            src={loggedUserDetails.profilePic}
            alt="profile"
            onClick={() => navigateToProfile(loggedUserId)} // 1 = userId
            style={{ cursor: "pointer" }}
          />
        </a>
        <input
          className="create-post"
          type="text"
          placeholder="What's on your mind, Golu?"
        />
      </div>

      <div className="media-live-reel">
        <button className="photo-video">
          <img src="/Image/HomePage/CenterPostBox/live-video.png" alt="live-video" />
          <p>Live video</p>
        </button>

        <button className="photo-video" onClick={() => handleHomePagePhotoIconBoxOnAndOff()}>
          <img src="/Image/HomePage/CenterPostBox/photo-video.png" alt="photo-video" />
          <p>Photo/video</p>
        </button>

        <button className="photo-video">
          <img src="/Image/HomePage/CenterPostBox/reel.png" alt="reel" />
          <p>Reel</p>
        </button>
      </div>

      {/* Yaha pe maine HomePage Me PhotoAndVideo Icon ko Click karne pe ek PhotoBoxDialuge Khulega q Khulega q ki yaha maine condition lgaya hai ki agr ye (homePagePhotoIconBoxOnAndOff) hai to PhotoBoxDialuge ko Show kr do */}
      <div className="homePagePhotoIconBoxOnAndOff_Parent">

        {homePagePhotoIconBoxOnAndOff ?
          <div className="homePagePhotoIconBoxOnAndOff">
            <PhotoBoxDialuge
              handleOpenPhotoDialogue={handleHomePagePhotoIconBoxOnAndOff}
              handleSelectDialogueImage={handleHomePageSelectDialogueImage}
              messengerChatPhotoBoxUrl={homePagePhotoBoxUrl}
              handleConfirmAndSendDialogueImage={handleConfirmAndSendDialogueImage}
              flag={flag}
            />
          </div>
          : <></>}
      </div>

      <div className="PostPhotoDialogue_parent">
        {postPhotoDialogueOnAndOff ?
          <div className="PostPhotoDialogue">
            <PostPhotoDialogue
               //ye photo post krne k liye hai
              imageUrl={homePagePhotoBoxUrl}
              handleCanclePostImage={handleCanclePostImage}
              handlePostImage={handlePostImage}
              handleTextAreaValue={handleTextAreaValue}
              textAreaValue={textAreaValue}
              handleHomePagePhotoIconBoxAgainOnAndOff={handleHomePagePhotoIconBoxAgainOnAndOff}
              flag={flag}
              //ye post edit krne k liye
              handleEditPost={handleEditPost}
              
            />
          </div>
          : <></>
        }
      </div>


    </div>
  );
}

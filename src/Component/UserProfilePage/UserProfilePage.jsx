
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CenterPostBox from "../HomePage/SubComp/CenterPostBox";
import PostBox from "./SubComp/PostBox";
import ProfileHeader from "./SubComp/ProfileHeader";
import ProfileIntro from "./SubComp/ProfileIntro";
import ProfilePhotos from "./SubComp/ProfilePhotos";
import ProfilePosts from "./SubComp/ProfilePosts";
import ProfileFriends from "./SubComp/ProfileFriends";
import postData from "../../ConstDataObject/HomePage/PostComp/PostComp.json"


import "./UserProfilePage.css";
import UserProfilePageData from "../../ConstDataObject/UserProfilePage/UserProfilePage.json";
import NavBarComp from "../NavBar/NavBarComp";
import { useGlobalProfilePageNavigator } from "../../Hooks/useGlobleFun";

const UserProfilePage = () => {
  
  //ye ek custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
  const { loggedUserId, onNavigate } = useGlobalProfilePageNavigator();

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  //userProfilePage  se CenterBox ke Photo k icon pe click krne pe true ya false set kr k phtotBoxDialogue ko show ya hide krne k liye state defined kiye hai;  
  const [userProfilePagePhotoIconBoxOnAndOff, setUserProfilePagePhotoIconBoxOnAndOff] = useState(false)
  //userProfilePage me phtotBoxDialogue ko open krne k baad photo select ya deSeletect kr k final imageUrl store krne k liye ye state defined kiye hai;
  const [userProfilePagePhotoBoxUrl, setUserProfilePagePhotoBoxUrl] = useState('')

  // HomePage se CenterBox ke phtotBoxDialogue pe confirm ya cancle krne pe true ya false set kr k postPhotoDialogueOnAndOff ko show ya hide krne k liye state defined kiye hai;  
  const [userProfilePagePostPhotoDialogueOnAndOff, setUserProfilePagePostPhotoDialogueOnAndOff] = useState(false);
  //HomePage se CenterBox ke phtotBoxDialogue me input text ki value ko store krne k liye ye state defined kiye hai;
  const [userProfilePageTextAreaValue, setUserProfilePageTextAreaValue] = useState('');
  //  console.log({textAreaValue});
  //yha flag ka state defined kr rhe hai taki hm pahchaan sake ki post create krna hai ya post ko edit krna hai;
  const [userProfilePageFlag, setUserProfilePageFlag] = useState('');
  //ye edit k liye state defined ho rha hao jo userId aur picId k basis pe data store krega;
  const [userProfilePagePostDataOfUserIdPicId, setUserProfilePagePostDataOfUserIdPicId] = useState('');




  //filteredUsers me current userProfile k userId ka sb details store ho rha hai;
  const filteredUsers = UserProfilePageData.userDetails.filter(
    (item) => item.user.profileDetails.userId == userId
  );

  //user me current userProfile k userId k "user object" k data ko store kr rha hai;
  //"user object" me current user ka bahut sare keys aur un keys k value ko rakha hu,
  //"user object" me 5 keys (userTotalFriends, profileDetails, profileBiography, userPhotos, userPostlist) hai;
  const user = filteredUsers[0]?.user;

  //friendsData me current userProfile k userId k chhod kr, baki k dusre user k userId ko friends ki tarh store kr ho rha hai;
  const friendsData = UserProfilePageData.userFriends.friendsDisplay.filter(
    (friend) => friend.userId != userId
  )


   // UserProfilePage ke posted post ko Display Karne ke liye ye State Defind kiye hai. aur 
  // updatedProfilePageUserPostlist state me starting value localStorage k userId key se nikal kr rakh rha hu;
  // agar localStorage k userId key pe koi value nhi hai to mai updatedProfilePageUserPostlist ko empty array se initialise kr de rha hu;
  const [updatedProfilePageUserPostlist, setUpdatedProfilePageUserPostlist] = useState(() => {
    const locallyUpdatedProfilePageUserPostlist = localStorage.getItem(userId);

    if (!locallyUpdatedProfilePageUserPostlist)
      return [];

    return JSON.parse(locallyUpdatedProfilePageUserPostlist);
  });

  // UserProfilePage ke posted photo ko Display Karne ke liye ye State Defind kiye hai. aur 
  // updatedProfilePageUseruserPhotos state me starting value localStorage k `userPhotosUserIdKey=${userId}` key se nikal kr rakh rha hu;
  // agar localStorage k `userPhotosUserIdKey=${userId}` key pe koi value nhi hai to mai updatedProfilePageUseruserPhotos ko empty array se initialise kr de rha hu;
  const [updatedProfilePageUseruserPhotos, setUpdatedProfilePageUseruserPhotos] = useState(() => {
    const locallyUpdatedProfilePageUseruserPhotos = localStorage.getItem(`userPhotosUserIdKey=${userId}`);

    if (!locallyUpdatedProfilePageUseruserPhotos)
      return [];

    return JSON.parse(locallyUpdatedProfilePageUseruserPhotos);
  });


  //yhaa pe post ko like, dislike krne ka code likhe hai;
  const handleProfilePostLikeDisLike = (PostPicId, PostPicUserId) => {
    //yha se userProfile page pe changes dikhane k liye code likha gya hai; 
    const newProfilePagePostData = updatedProfilePageUserPostlist.map((userPost, index) => {
      if (userPost.picId == PostPicId && userPost.userId == PostPicUserId) {
        const likedCountLocal = !userPost.isLikedByYou ? userPost.likedCount + 1 : userPost.likedCount - 1

        return { ...userPost, isLikedByYou: !userPost.isLikedByYou, likedCount: likedCountLocal };
      }
      else {
        return userPost;
      }
    });

    setUpdatedProfilePageUserPostlist([...newProfilePagePostData]);

    //yha se home-page pe changes dikhane k liye code likha gya hai; 
    const locallyUpdatedPostData = JSON.parse(localStorage.getItem('updatedPostDataKey')) ?? [];
    // console.log(localStorage.getItem('updatedPostDataKey'))

    const newPostData = locallyUpdatedPostData.map((userPost, index) => {
      if (userPost.picId == PostPicId && userPost.userId == PostPicUserId) {
        const likedCountLocal = !userPost.isLikedByYou ? userPost.likedCount + 1 : userPost.likedCount - 1

        return { ...userPost, isLikedByYou: !userPost.isLikedByYou, likedCount: likedCountLocal };
      }
      else {
        return userPost;
      }
    });

    // console.log({newPostData},{locallyUpdatedPostData});
    localStorage.setItem('updatedPostDataKey', JSON.stringify(newPostData));
  }


  //yhaa pe post ko delete krne ka code likhe hai;
  const handleDeleteProfilePageUserPost = (userId, picId, imageUrl) => {

    const confirmationForDeletePost = window.confirm('Are you Sure to delete this post ?');
    if (confirmationForDeletePost) {
      //yha se profile-page pe changes dikhane k liye code likha gya hai; 
      const newUpdatedProfilePageUserPostlist = updatedProfilePageUserPostlist.filter((curStore) =>
        !(curStore.userId == userId && curStore.picId == picId));
      setUpdatedProfilePageUserPostlist([...newUpdatedProfilePageUserPostlist]);

      //yhaa pr user k profile se ohi photo remove ho rha hai jisko us user k postList k post se delete kr rhe hai;
      const newWUpdatedProfilePageUseruserPhotos = updatedProfilePageUseruserPhotos.filter((curImgUrl) =>
        curImgUrl.image != imageUrl);
      setUpdatedProfilePageUseruserPhotos([...newWUpdatedProfilePageUseruserPhotos]);

      //yha se profile-page pe changes dikhane k liye code likha gya hai; 
      const locallyupdatedPostData = JSON.parse(localStorage.getItem('updatedPostDataKey')) ?? [];
      const newUpdatedPostData = locallyupdatedPostData.filter((curStore) =>
        !(curStore.userId == userId && curStore.picId == picId));
      localStorage.setItem('updatedPostDataKey', JSON.stringify([...newUpdatedPostData]));


      setUserProfilePagePostPhotoDialogueOnAndOff(false);
      setUserProfilePagePhotoIconBoxOnAndOff(false);
      setUserProfilePagePhotoBoxUrl('')
    }
    else {
      console.log('do not delete the post')
    }
  }


  // Post karne wale Photo Icon pe click krne pe ye unction call hoga
  //ye function photo-dialogue ko open ya close krega;
  const handleUserProfilePagePhotoIconBoxOnAndOff = () => {
    setUserProfilePagePhotoIconBoxOnAndOff(!userProfilePagePhotoIconBoxOnAndOff);
    setUserProfilePagePhotoBoxUrl('');
    setUserProfilePagePostPhotoDialogueOnAndOff(false);
  }

  //Photo-dialogue ko open hone k baad, kisi bhii photo pe click krne pe ye call hoga;
  const handleUserProfilePageSelectDialogueImage = (imageUrl) => {
    if (userProfilePagePhotoBoxUrl == imageUrl && !userProfilePagePostPhotoDialogueOnAndOff) {
      setUserProfilePagePhotoBoxUrl('');
    }
    else {
      setUserProfilePagePhotoBoxUrl(imageUrl);
    }
  }

  ///Photo-dialogue ko oepn hone k baad, kisi bhii photo pe click krne ka baad,  
  // jb hm confirm pe click krenge tb ye function call hoga 
  //ye function photo-dialogue ko close kr dega aur post-create krne wale dialogue ko open krega;
  const handleUserProfilePageConfirmAndSendDialogueImage = () => {
    setUserProfilePageFlag('CREATEPOST');
    setUserProfilePagePostPhotoDialogueOnAndOff(true);
    //bs koi bug n aa jaye uske liye false ya empty set kr rhe hai 
    setUserProfilePagePhotoIconBoxOnAndOff(false);
  }

  //jb hme edit krna ho ya phir se new-photo select krna hai tb ye call hoga; aur 
  // photo-dialogue ko open krega, jisse hm new-photo select krenge
  const handleProfilePagePhotoIconBoxAgainOnAndOff = () => {
    setUserProfilePagePhotoIconBoxOnAndOff(true);
  }



  //jb post-create krne wale dialogue ko open rahega aur mai cross button pe click krunga,
  //  post discard karne k liye, tb ye function call hoga;
  const handleUserProfilePageCanclePostImage = () => {

    const confirmationForCanclePost = window.confirm('Are you sure to discard this Post ?');
    if (confirmationForCanclePost) {
      setUserProfilePagePostPhotoDialogueOnAndOff(false);
      setUserProfilePagePhotoIconBoxOnAndOff(false);
      setUserProfilePagePhotoBoxUrl('')
      setUserProfilePagePostDataOfUserIdPicId('');
      setUserProfilePageTextAreaValue('');
      setUserProfilePageFlag('');
    }
    else {
      console.log("do not cancle the post.");
    }
  }

  //jb post-create krne wale dialogue ko open rahega aur 
  // mai kuchh type krunga textArea me, tb ye function call hoga;
  const handleUserProfilePageTextAreaValue = (val) => {
    setUserProfilePageTextAreaValue(val);
  }


  //jb post-create krne wale dialogue ko open rahega, aur mai post pe click krunga tb ye function call hoga;
  const handleUserProfilePagePostImage = (discription, postUrl) => {
    const confirmationForCreatePost = window.confirm('Are you Sure to create new post ?');

    if (confirmationForCreatePost) {
      // yhaa updatedPostData ko use nhi kiye hai qki ho sakta hai ki loggedUserId ka user, updatedPostData me exist hi nhi kr rha ho,
      //  lekin loggedUserId ka user UserProfilePageData me exist krega hi krega; qki UserProfilePageData const hai;
      const filterPhotoPost = UserProfilePageData.userDetails.filter((singalPhotoPostData) =>
        singalPhotoPostData.user.profileDetails.userId == loggedUserId)?.[0];

      // yha pr hm ek new object bnaa rhe hai, jo upr filter kiya huaa data ko use kr rha hai;
      const newPostedPhoto =
      {
        //isme to change krna hi hoga;
        "userId": filterPhotoPost.user.profileDetails.userId,
        "profilePic": filterPhotoPost.user.profileDetails.profilePic,
        "profileName": filterPhotoPost.user.profileDetails.profileName,
        "discription": discription, // yha discription props function se aaya hai;
        "post": postUrl, //yha postUrl props function se aaya hai;

        "vipProfile": false,
        "likedBy": "",
        "likedCount": 0,

        "picId": crypto.randomUUID(),
        "postTime": "8 May",
        "isHidePost": false,
        "reaction": [
          "/Image/HomePage/Post/like-emoji_img.svg",
          "/Image/HomePage/Post/wow-emoji_img.svg",
          "/Image/HomePage/Post/love-emoji_img.svg"
        ],
        "isLikedByYou": false,
        "commentedBy": "Lalu Kumar",
        "commentedCount": 2,
        "sharedBy": "Raju Sharma",
        "sharedCount": 4,
      }

      //if condition isliye lgaye hai ki, agr loggedUser apne hi profile-page me hai aur ohi se post create kr rha hai
      // to post create hote hi uske profile-page me display ho jayega; 
      //  isliye create huye post ko state me hi storekr rhe hai taki create kiya gya post turant display ho sake;
      if (userId == loggedUserId) {
        //ye new-post ko user-profile-page me post me dikhane k liye kiye hai;
        setUpdatedProfilePageUserPostlist([newPostedPhoto, ...updatedProfilePageUserPostlist]);
        //ye new-photo ko user-profile-page me photo me dikhane k liye kiye hai;
        setUpdatedProfilePageUseruserPhotos([{ image: postUrl }, ...updatedProfilePageUseruserPhotos]);
      }
      //else condition isliye lgaye hai ki, agr loggedUser apne profile-page me nhi hai aur dusre k profile-page se post create kr rha hai
      // to post create hote hi uske profile-page me display nhi hoga, lekin
      //  jb loggedUser apne create huye post ko apne profile-page me dekh sakta hai; 
      // isliye create huye post ko pahle locally stored kiye hai;  
      else {
        //ye new-post ko user-profile-page me post me dikhane k liye kiye hai;
        const locallyUpdatedProfilePageUserPostlist = JSON.parse(localStorage.getItem(loggedUserId)) ?? [];
        localStorage.setItem(loggedUserId, JSON.stringify([newPostedPhoto, ...locallyUpdatedProfilePageUserPostlist]));

        //ye post kiye photo ko user-profile-page me photos me dikhane k liye kiye hai;
        const locallyUpdatedProfilePageUseruserPhotos = JSON.parse(localStorage.getItem(`userPhotosUserIdKey=${loggedUserId}`)) ?? [];
        localStorage.setItem(`userPhotosUserIdKey=${loggedUserId}`, JSON.stringify([{ image: postUrl }, ...locallyUpdatedProfilePageUseruserPhotos]));
      }

      //ye new-post ko home-page me post me dikhane k liye kiye hai;
      const locallyupdatedPostData = JSON.parse(localStorage.getItem('updatedPostDataKey')) ?? [];
      localStorage.setItem('updatedPostDataKey', JSON.stringify([newPostedPhoto, ...locallyupdatedPostData]));

      setUserProfilePagePostPhotoDialogueOnAndOff(false);
      setUserProfilePagePhotoIconBoxOnAndOff(false);
      setUserProfilePagePhotoBoxUrl('')
      setUserProfilePagePostDataOfUserIdPicId('');
      setUserProfilePageTextAreaValue('');
      setUserProfilePageFlag('');

    }
    else {
      console.log('do not create the new post.');
    }
  }


  //jb post k menu me dikh rhe "Edit-Post" k option pe click krunga tb ye function call hoga;
  const handleUserProfilePageEditPostDialogue = (userId, picId) => {
    //yhaa post ka userId and picId se updatedProfilePageUserPostlist se jis post ko edit karna hai us post filter kr rha hu
    const filteredUpdatedPostData = updatedProfilePageUserPostlist.filter((curStore) => (curStore.userId == userId && curStore.picId == picId))?.[0];

    //yha jis post ko edit krna hai, uske post k pahle ka sb details ko store kiya hu;
    setUserProfilePagePhotoBoxUrl(filteredUpdatedPostData.post);
    setUserProfilePageTextAreaValue(filteredUpdatedPostData.discription);
    setUserProfilePageFlag('EDITPOST');
    setUserProfilePagePostPhotoDialogueOnAndOff(true);

    setUserProfilePagePostDataOfUserIdPicId({ ...filteredUpdatedPostData })
  }

  //jb hm post ko Edit kr k save pe click krenge tb ye function call hoga;
  const handleUserProfilePostEditPost = () => {

    const confirmationForEditPost = window.confirm('Are you Sure to edit this post ?');
    if (confirmationForEditPost) {
      const newUpdatedProfilePageUserPostlist = updatedProfilePageUserPostlist.map((userPost, index) => {
        if (userPost.picId == userProfilePagePostDataOfUserIdPicId.picId && userPost.userId == userProfilePagePostDataOfUserIdPicId.userId) {
          return { ...userPost, post: userProfilePagePhotoBoxUrl, discription: userProfilePageTextAreaValue };
        }
        else {
          return userPost;
        }
      });
      //ye user-profile-page pe edited-post ko dikhane krne k liye likhe hai;
      setUpdatedProfilePageUserPostlist([...newUpdatedProfilePageUserPostlist]);


      //ye profile-page k photo wale box me pe edited-post-photo ko dikhane k liye likhe hai;
      const newUpdatedProfilePageUseruserPhotos = updatedProfilePageUseruserPhotos.map((userPostImageUrl, index) => {
        if (userPostImageUrl.image == userProfilePagePostDataOfUserIdPicId.post) {
          return { image: userProfilePagePhotoBoxUrl };
        }
        else {
          return userPostImageUrl;
        }
      });
      //ye user-profile-page pe edited-photo ko photoList me dikhane krne k liye likhe hai;
      setUpdatedProfilePageUseruserPhotos([...newUpdatedProfilePageUseruserPhotos]);


      //ye home-page pe edited-post ko dikhane k liye likhe hai;
      const loacllyUpdatedPostData = JSON.parse(localStorage.getItem('updatedPostDataKey')) ?? [];
      const newUpdatedPostData = loacllyUpdatedPostData.map((userPost, index) => {
        if (userPost.picId == userProfilePagePostDataOfUserIdPicId.picId && userPost.userId == userProfilePagePostDataOfUserIdPicId.userId) {
          return { ...userPost, post: userProfilePagePhotoBoxUrl, discription: userProfilePageTextAreaValue };
        }
        else {
          return userPost;
        }
      });
      localStorage.setItem('updatedPostDataKey', JSON.stringify([...newUpdatedPostData]));


      setUserProfilePagePostDataOfUserIdPicId('');
      setUserProfilePagePhotoBoxUrl('');
      setUserProfilePageTextAreaValue('');
      setUserProfilePageFlag('');
      setUserProfilePagePostPhotoDialogueOnAndOff(false);
      setUserProfilePagePhotoIconBoxOnAndOff(false);
    }
    else {
      console.log('do not edit the post')
    }
  }



  //jb updatedProfilePageUserPostlist me koi bhi change ho ya koi bhi key ki value update ho, tb ye eseEffect call hoga; 
  useEffect(() => {
    if (updatedProfilePageUserPostlist.length) {
      localStorage.setItem(userId, JSON.stringify(updatedProfilePageUserPostlist));
    }
    else {
      setUpdatedProfilePageUserPostlist(user.userPostlist);
      localStorage.setItem(userId, JSON.stringify(user.userPostlist));
    }

  }, [updatedProfilePageUserPostlist]);

  //jb updatedProfilePageUseruserPhotos me koi bhi change ho ya koi bhi key ki value update ho, tb ye eseEffect call hoga; 
  useEffect(() => {
    if (updatedProfilePageUseruserPhotos.length) {
      localStorage.setItem(`userPhotosUserIdKey=${userId}`, JSON.stringify(updatedProfilePageUseruserPhotos));
    }
    else {
      setUpdatedProfilePageUseruserPhotos(user.userPhotos);
      localStorage.setItem(`userPhotosUserIdKey=${userId}`, JSON.stringify(user.userPhotos));
    }

  }, [updatedProfilePageUseruserPhotos]);



  return (
    <div className="user-profile-page">
      {user ? (
        <div>
          <NavBarComp navigateToProfile={onNavigate}
            loggedUserId={loggedUserId}
            totalFbUsers={postData}
          />
          <ProfileHeader data={user.profileDetails} friendsData={friendsData} />
          <div className="profileBottomContent">
            <div className="profileLeftContent">
              <ProfileIntro data={user.profileBiography} userId={userId} />
              <ProfilePhotos data={updatedProfilePageUseruserPhotos} />
              <ProfileFriends navigateToProfile={onNavigate} data={friendsData} totalFriends={user.userTotalFriends} />
            </div>
            <div className="profileRightContent">
              <CenterPostBox
                navigateToProfile={onNavigate}
                loggedUserId={loggedUserId}
                totalFbUsers={postData}
                // ye photo Dialogue ke liye hai
                handleHomePagePhotoIconBoxOnAndOff={handleUserProfilePagePhotoIconBoxOnAndOff}
                homePagePhotoIconBoxOnAndOff={userProfilePagePhotoIconBoxOnAndOff}
                handleHomePageSelectDialogueImage={handleUserProfilePageSelectDialogueImage}
                homePagePhotoBoxUrl={userProfilePagePhotoBoxUrl}
                handleConfirmAndSendDialogueImage={handleUserProfilePageConfirmAndSendDialogueImage}
                //ye photo post krne k liye hai
                handleCanclePostImage={handleUserProfilePageCanclePostImage}
                postPhotoDialogueOnAndOff={userProfilePagePostPhotoDialogueOnAndOff}
                handleTextAreaValue={handleUserProfilePageTextAreaValue}
                textAreaValue={userProfilePageTextAreaValue}
                handlePostImage={handleUserProfilePagePostImage}
                handleHomePagePhotoIconBoxAgainOnAndOff={handleProfilePagePhotoIconBoxAgainOnAndOff}
                flag={userProfilePageFlag}
                //ye post ko edit krne k liye hai
                handleEditPost={handleUserProfilePostEditPost}



              />

              <PostBox />
              
              <ProfilePosts
                navigateToProfile={onNavigate}
                loggedUserId={loggedUserId}
                data={updatedProfilePageUserPostlist}
                //for like the post;
                handleProfilePostLikeDisLike={handleProfilePostLikeDisLike}
                // for delete the post
                handleDeleteProfilePageUserPost={handleDeleteProfilePageUserPost}
                //ye edit wale k liye hai;
                handleUserProfilePageEditPostDialogue={handleUserProfilePageEditPostDialogue}
              />
            </div>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>User not  found</p>
      )}
    </div>
  );
};

export default UserProfilePage;





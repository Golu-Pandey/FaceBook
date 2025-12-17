import NavBarComp from "../NavBar/NavBarComp";
import CenterPostBox from "./SubComp/CenterPostBox";
import StoryComp from "./SubComp/StoryComp";
import PostComp from "./SubComp/PostComp";
import LeftSideBarComp from "./SubComp/LeftSideBarComp";
import RightSidebarComp from "./SubComp/RightSidebar";  // <-- added
import postData from "../../ConstDataObject/HomePage/PostComp/PostComp.json";
import UserProfilePageData from "../../ConstDataObject/UserProfilePage/UserProfilePage.json";


import "./HomePage.css";

import { useGlobalProfilePageNavigator } from "../../Hooks/useGlobleFun";
import { useEffect, useState } from "react";

export default function HomePage() {

  //ye ek custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
  const { loggedUserId, onNavigate, onNavigateToMessangerProfile } = useGlobalProfilePageNavigator();

  // HomePage se CenterBox ke Photo k icon pe click krne pe true ya false set kr k phtotBoxDialogue ko show ya hide krne k liye state defined kiye hai;  
  const [homePagePhotoIconBoxOnAndOff, setHomePagePhotoIconBoxOnAndOff] = useState(false)
  //HomePage me phtotBoxDialogue ko open krne k baad photo select ya deSeletect kr k final imageUrl store krne k liye ye state defined kiye hai;
  const [homePagePhotoBoxUrl, setHomePagePhotoBoxUrl] = useState('')

  // HomePage se CenterBox ke phtotBoxDialogue pe confirm ya cancle krne pe true ya false set kr k postPhotoDialogueOnAndOff ko show ya hide krne k liye state defined kiye hai;  
  const [postPhotoDialogueOnAndOff, setPostPhotoDialogueOnAndOff] = useState(false);
  //HomePage se CenterBox ke phtotBoxDialogue me input text ki value ko store krne k liye ye state defined kiye hai;
  const [textAreaValue, setTextAreaValue] = useState('');
  //  console.log({textAreaValue});
  //yha flag ka state defined kr rhe hai taki hm pahchaan sake ki post create krna hai ya post ko edit krna hai;
  const [flag, setFlag] = useState('');
  //ye edit k liye state defined ho rha hao jo userId aur picId k basis pe data store krega;
  const [updatedPostDataOfUserIdPicId, setUpdatedPostDataOfUserIdPicId] = useState('');


  // HomePage ke PostData ko Display Karne ke liye ye State Defind kiye hai. aur 
  // updatedPostData state me starting value localStorage k 'updatedPostDataKey' key se nikal kr rakh rha hu;
  // agar localStorage k 'updatedPostDataKey' key pe koi value nhi hai to mai updatedPostData ko empty array se initialise kr de rha hu;
  const [updatedPostData, setUpdatedPostData] = useState(() => {
    const locallyStoredUpdatedPostData = localStorage.getItem('updatedPostDataKey');
    if (!locallyStoredUpdatedPostData)
      return [];

    return JSON.parse(locallyStoredUpdatedPostData);
  });

  //yhaa pe post ko hide krne ka code likhe hai;
  const handleShowHidePost = (PostPicId, PostPicUserId) => {
    //yha se home-page pe changes dikhane k liye code likha gya hai; 
    const newPostData = updatedPostData.map((userPost, index) => {
      if (userPost.picId == PostPicId && userPost.userId == PostPicUserId) {
        return { ...userPost, isHidePost: !userPost.isHidePost };
      }
      else {
        return userPost;
      }
    })
    setUpdatedPostData([...newPostData]);
  }

  //yhaa pe post ko like, dislike krne ka code likhe hai;
  const handlePostLikeDisLike = (PostPicId, PostPicUserId) => {
    //yha se home-page pe changes dikhane k liye code likha gya hai; 
    const newPostData = updatedPostData.map((userPost, index) => {
      if (userPost.picId == PostPicId && userPost.userId == PostPicUserId) {
        const likedCountLocal = !userPost.isLikedByYou ? userPost.likedCount + 1 : userPost.likedCount - 1

        return { ...userPost, isLikedByYou: !userPost.isLikedByYou, likedCount: likedCountLocal };
      }
      else {
        return userPost;
      }
    })

    setUpdatedPostData([...newPostData]);

    //yha se userProfile page pe changes dikhane k liye code likha gya hai; 
    const filteredUsersProfile = UserProfilePageData.userDetails.filter(
      (singleUser) => singleUser.user.profileDetails.userId == PostPicUserId
    );
    const updatedProfilePageUserPostlist = filteredUsersProfile[0]?.user.userPostlist;
    // console.log({updatedProfilePageUserPostlist});

    const locallyUpdatedProfilePageUserPostlist = JSON.parse(localStorage.getItem(PostPicUserId)) ?? updatedProfilePageUserPostlist;
    const newProfilePageUserPostlist = locallyUpdatedProfilePageUserPostlist.map((userPost, index) => {
      if (userPost.picId == PostPicId && userPost.userId == PostPicUserId) {
        const likedCountLocal = !userPost.isLikedByYou ? userPost.likedCount + 1 : userPost.likedCount - 1

        return { ...userPost, isLikedByYou: !userPost.isLikedByYou, likedCount: likedCountLocal };
      }
      else {
        return userPost;
      }
    });

    // console.log({newProfilePageUserPostlist});
    localStorage.setItem(PostPicUserId, JSON.stringify(newProfilePageUserPostlist));
  }


  //yhaa pe post ko delete krne ka code likhe hai;
  const handleDeletePost = (userId, picId, imageUrl) => {

    const confirmationForDeletePost = window.confirm('Are you Sure to delete this post ?');
    if (confirmationForDeletePost) {
      //yha se home-page pe changes dikhane k liye code likha gya hai; 
      const newUpdatedPostData = updatedPostData.filter((curStore) => !(curStore.userId == userId && curStore.picId == picId));
      setUpdatedPostData([...newUpdatedPostData]);

      //yha se user-profile-page pe changes dikhane k liye code likha gya hai; 
      const locallyupdatedPostData = JSON.parse(localStorage.getItem(userId)) ?? [];
      const newUpdatedPostDataProfilePage = locallyupdatedPostData.filter((curStore) =>
        !(curStore.userId == userId && curStore.picId == picId));
      localStorage.setItem(userId, JSON.stringify([...newUpdatedPostDataProfilePage]));

      // yha pr post kiya hua imag jo ki userPhotos me locally store hai uske get kr k store kr rhe hai 
      const locallyupdatedUserPhoto = JSON.parse(localStorage.getItem(`userPhotosUserIdKey=${userId}`)) ?? [];
      const newWUpdatedProfilePageUseruserPhotos = locallyupdatedUserPhoto.filter((curImgUrl) =>
        curImgUrl.image != imageUrl);
      localStorage.setItem(`userPhotosUserIdKey=${userId}`, JSON.stringify([...newWUpdatedProfilePageUseruserPhotos]));


      setPostPhotoDialogueOnAndOff(false);
      setHomePagePhotoIconBoxOnAndOff(false);
      setHomePagePhotoBoxUrl('');
    }
    else {
      console.log('do not delete the post')
    }
  }


  // Post karne wale Photo Icon pe click krne pe ye unction call hoga
  //ye function photo-dialogue ko open ya close krega;
  const handleHomePagePhotoIconBoxOnAndOff = () => {
    setHomePagePhotoIconBoxOnAndOff(!homePagePhotoIconBoxOnAndOff);
    setHomePagePhotoBoxUrl('');
    setPostPhotoDialogueOnAndOff(false);
  }

  //Photo-dialogue ko open hone k baad, kisi bhii photo pe click krne pe ye call hoga;
  const handleHomePageSelectDialogueImage = (imageUrl) => {
    if (homePagePhotoBoxUrl == imageUrl && !postPhotoDialogueOnAndOff) {
      setHomePagePhotoBoxUrl('');
    }
    else {
      setHomePagePhotoBoxUrl(imageUrl);
    }
  }

  //Photo-dialogue ko oepn hone k baad, kisi bhii photo pe click krne ka baad,  
  // jb hm confirm pe click krenge tb ye function call hoga 
  //ye function photo-dialogue ko close kr dega aur post-create krne wale dialogue ko open krega;
  const handleConfirmAndSendDialogueImage = () => {
    setFlag('CREATEPOST');
    setPostPhotoDialogueOnAndOff(true);
    //bs koi bug n aa jaye uske liye false ya empty set kr rhe hai 
    setHomePagePhotoIconBoxOnAndOff(false);
  }

  //jb hme edit krna ho ya phir se new-photo select krna hai tb ye call hoga; aur 
  // photo-dialogue ko open krega, jisse hm new-photo select krenge
  const handleHomePagePhotoIconBoxAgainOnAndOff = () => {
    setHomePagePhotoIconBoxOnAndOff(true);
  }


  //jb post-create krne wale dialogue ko open rahega aur mai cross button pe click krunga,
  //  post discard karne k liye, tb ye function call hoga;
  const handleCanclePostImage = () => {

    const confirmationForCanclePost = window.confirm('Are you sure to discard this Post ?');
    if (confirmationForCanclePost) {
      setPostPhotoDialogueOnAndOff(false);
      setHomePagePhotoIconBoxOnAndOff(false);
      setHomePagePhotoBoxUrl('')
      setUpdatedPostDataOfUserIdPicId('');
      setTextAreaValue('');
      setFlag('');
    }
    else {
      console.log("do not cancle the post.");
    }
  }

  //jb post-create krne wale dialogue ko open rahega aur 
  // mai kuchh type krunga textArea me, tb ye function call hoga;
  const handleTextAreaValue = (val) => {
    setTextAreaValue(val);
  }

  //jb post-create krne wale dialogue ko open rahega, aur mai post pe click krunga tb ye function call hoga;
  const handlePostImage = (discription, postUrl) => {

    const confirmationForCreatePost = window.confirm('Are you Sure to create new post ?');
    if (confirmationForCreatePost) {
      // yhaa updatedPostData ko use nhi kiye hai qki ho sakta hai ki loggedUserId ka user, updatedPostData me exist hi nhi kr rha ho,
      //  lekin loggedUserId ka user postData me exist krega hi krega; qki postData const hai;
      const filterPhotoPost = postData.filter((singalPhotoPostData) => singalPhotoPostData.userId == loggedUserId)?.[0];

      // yha pr hm ek new object bnaa rhe hai, jo upr filter kiya huaa data ko use kr rha hai;
      const newPostedPhoto = {
        "userId": filterPhotoPost.userId,
        "profilePic": filterPhotoPost.profilePic,
        "profileName": filterPhotoPost.profileName,
        "discription": discription, // yha discription props function se aaya hai;
        "post": postUrl, //yha postUrl props function se aaya hai;

        "vipProfile": false,
        "likedBy": "",
        "likedCount": 0,

        "picId": crypto.randomUUID(),
        "postTime": "8 May",
        "isHidePost": false,
        "reaction": [...filterPhotoPost.reaction],
        "isLikedByYou": false,
        "commentedBy": "Lalu Kumar",
        "commentedCount": 2,
        "sharedBy": "Raju Sharma",
        "sharedCount": 4,
      }
      //ye home-page pe new post photo ko post krne k liye hai;
      setUpdatedPostData([newPostedPhoto, ...updatedPostData]);

      //ye new-post ko user-profile-page me post me dikhane k liye kiye hai;
      const locallyUpdatedProfilePageUserPostlist = JSON.parse(localStorage.getItem(filterPhotoPost.userId)) ?? [];
      localStorage.setItem(filterPhotoPost.userId, JSON.stringify([newPostedPhoto, ...locallyUpdatedProfilePageUserPostlist]));

      //ye post kiye photo ko user-profile-page me photos me dikhane k liye kiye hai;
      const locallyUpdatedProfilePageUseruserPhotos = JSON.parse(localStorage.getItem(`userPhotosUserIdKey=${filterPhotoPost.userId}`)) ?? [];
      localStorage.setItem(`userPhotosUserIdKey=${filterPhotoPost.userId}`, JSON.stringify([{ image: postUrl }, ...locallyUpdatedProfilePageUseruserPhotos]));

      setPostPhotoDialogueOnAndOff(false);
      setHomePagePhotoIconBoxOnAndOff(false);
      setUpdatedPostDataOfUserIdPicId('');
      setHomePagePhotoBoxUrl('');
      setTextAreaValue('');
      setFlag('');
    }
    else {
      console.log('do not create the new post.');
    }
  }


  //jb post k menu me dikh rhe "Edit-Post" k option pe click krunga tb ye function call hoga;
  const handleEditPostDialogue = (userId, picId) => {
    //yhaa post ka userId and picId se updatedPostData se jis post ko edit karna hai us post filter kr rha hu
    const filteredUpdatedPostData = updatedPostData.filter((curStore) => (curStore.userId == userId && curStore.picId == picId))?.[0];

    //yha jis post ko edit krna hai, uske post k pahle ka sb details ko store kiya hu;
    setHomePagePhotoBoxUrl(filteredUpdatedPostData.post);
    setTextAreaValue(filteredUpdatedPostData.discription);
    setFlag('EDITPOST');
    setPostPhotoDialogueOnAndOff(true);

    setUpdatedPostDataOfUserIdPicId({ ...filteredUpdatedPostData })
  }

  //jb hm post ko Edit kr k save pe click krenge tb ye function call hoga;
  const handleEditPost = () => {

    const confirmationForEditPost = window.confirm('Are you Sure to edit this post ?');
    if (confirmationForEditPost) {

      const newUpdatedPostData = updatedPostData.map((userPost, index) => {
        if (userPost.picId == updatedPostDataOfUserIdPicId.picId && userPost.userId == updatedPostDataOfUserIdPicId.userId) {
          return { ...userPost, post: homePagePhotoBoxUrl, discription: textAreaValue };
        }
        else {
          return userPost;
        }
      });

      //ye home-page pe edited-post ko dikhane krne k liye likhe hai;
      setUpdatedPostData([...newUpdatedPostData]);

      //ye profile-page pe edited-post ko dikhane k liye likhe hai;
      const locallyUpdatedProfilePageUserPostlist = JSON.parse(localStorage.getItem(updatedPostDataOfUserIdPicId.userId)) ?? [];
      // console.log(`${updatedPostDataOfUserIdPicId.userId}`, { locallyUpdatedProfilePageUserPostlist })
      const newUpdatedProfilePageUserPostlist = locallyUpdatedProfilePageUserPostlist.map((userPost, index) => {
        if (userPost.picId == updatedPostDataOfUserIdPicId.picId && userPost.userId == updatedPostDataOfUserIdPicId.userId) {
          return { ...userPost, post: homePagePhotoBoxUrl, discription: textAreaValue };
        }
        else {
          return userPost;
        }
      });
      localStorage.setItem(updatedPostDataOfUserIdPicId.userId, JSON.stringify([...newUpdatedProfilePageUserPostlist]));


      //ye profile-page k photo wale box me pe edited-post-photo ko dikhane k liye likhe hai;
      const loacllyUpdatedProfilePageUseruserPhotos = JSON.parse(localStorage.getItem(`userPhotosUserIdKey=${updatedPostDataOfUserIdPicId.userId}`)) ?? [];
      // console.log(`userPhotosUserIdKey=${updatedPostDataOfUserIdPicId.userId}`, { loacllyUpdatedProfilePageUseruserPhotos })
      const newUpdatedProfilePageUseruserPhotos = loacllyUpdatedProfilePageUseruserPhotos.map((userPostImageUrl, index) => {
        if (userPostImageUrl.image == updatedPostDataOfUserIdPicId.post) {
          return { image: homePagePhotoBoxUrl };
        }
        else {
          return userPostImageUrl;
        }
      });
      localStorage.setItem(`userPhotosUserIdKey=${updatedPostDataOfUserIdPicId.userId}`, JSON.stringify([...newUpdatedProfilePageUseruserPhotos]));


      setUpdatedPostDataOfUserIdPicId('');
      setHomePagePhotoBoxUrl('');
      setTextAreaValue('');
      setFlag('');
      setPostPhotoDialogueOnAndOff(false);
      setHomePagePhotoIconBoxOnAndOff(false);
    }
    else {
      console.log('do not edit the post')
    }
  }

  //jb updatedPostData me koi bhi change ho ya koi bhi key ki value update ho, tb ye eseEffect call hoga; 
  useEffect(() => {
    if (updatedPostData.length) {
      localStorage.setItem('updatedPostDataKey', JSON.stringify(updatedPostData));
    }
    else {
      setUpdatedPostData(postData);
      localStorage.setItem('updatedPostDataKey', JSON.stringify(postData));
    }

  }, [updatedPostData]);




  return (
    <div>
      <NavBarComp
        navigateToProfile={onNavigate}
        loggedUserId={loggedUserId}
        totalFbUsers={postData} />
      <div className="homepage-container">

        <LeftSideBarComp
          navigateToProfile={onNavigate}
          loggedUserId={loggedUserId}
          totalFbUsers={postData}
        />

        <div className="homepage-content">
           <CenterPostBox
            navigateToProfile={onNavigate}
            loggedUserId={loggedUserId}
            totalFbUsers={postData}
            // ye photo Dialogue ke liye hai
            handleHomePagePhotoIconBoxOnAndOff={handleHomePagePhotoIconBoxOnAndOff}
            homePagePhotoIconBoxOnAndOff={homePagePhotoIconBoxOnAndOff}
            handleHomePageSelectDialogueImage={handleHomePageSelectDialogueImage}
            homePagePhotoBoxUrl={homePagePhotoBoxUrl}
            handleConfirmAndSendDialogueImage={handleConfirmAndSendDialogueImage}
            //ye photo post krne k liye hai
            handleCanclePostImage={handleCanclePostImage}
            postPhotoDialogueOnAndOff={postPhotoDialogueOnAndOff}
            handleTextAreaValue={handleTextAreaValue}
            textAreaValue={textAreaValue}
            handlePostImage={handlePostImage}
            handleHomePagePhotoIconBoxAgainOnAndOff={handleHomePagePhotoIconBoxAgainOnAndOff}
            flag={flag}
            //ye post ko edit krne k liye hai
            handleEditPost={handleEditPost}
          />

          <StoryComp
            loggedUserId={loggedUserId}
            totalFbUsers={postData}
          />

          <PostComp
            navigateToProfile={onNavigate}
            loggedUserId={loggedUserId}
            postData={updatedPostData}
            //for hide the post
            handleShowHidePost={handleShowHidePost}
            //for like the post
            handlePostLikeDisLike={handlePostLikeDisLike}
            //for delete post
            handleDeletePost={handleDeletePost}
            //ye edit wale k liye hai;
            handleEditPostDialogue={handleEditPostDialogue}
          />
        </div>

        <RightSidebarComp navigateToMessangerProfile={onNavigateToMessangerProfile} />   {/* <-- added right sidebar */}
      </div>
    </div>
  );
}


import React, { useEffect, useState } from "react";
import NavBarComp from "../NavBar/NavBarComp";
import ChatListComp from "./SubComp/ChatListComp";
import ChatWindowComp from "./SubComp/ChatWindowComp";
import ChatInfoComp from "./SubComp/ChatInfoComp";
// import "./MessengerPage.css";
import postData from "../../ConstDataObject/HomePage/PostComp/PostComp.json"
import fbMessangerChattingUsers from "../../ConstDataObject/MessengerPage/ChatListComp/ChatListComp.json";


import { useGlobalHideMethod, useGlobalProfilePageNavigator } from "../../Hooks/useGlobleFun";
import { useLocation } from "react-router-dom";

export default function MessengerPage() {

  //***************************************************************************************************************************************************//
  const location = useLocation();
  //ye ek custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
  const { loggedUserId, onNavigate, onNavigateToMessangerProfile } = useGlobalProfilePageNavigator();

  //ye ek custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
  const { hideSearchComp } = useGlobalHideMethod();

  //ye windowchat k current fb user jiske sath chatting ho rhi hai uska messegeDetail me TEXT ko store kr k locally display krne k liye state defined kiye hai;
  const [messengerChatInputBox, setMessengerChatInputBox] = useState('');

  //ye windowchat k current fb user jiske sath chatting ho rhi hai uska messegeDetail me photo ko store kr k locally display krne k liye state defined kiye hai;
  const [messengerChatPhotoBoxUrl, setMessengerChatPhotoBoxUrl] = useState('');

  //ye windowchat k current fb user jiske sath chatting ho rhi hai usko messegeDetail me koi photo ko send/recieve krne k liye ek Box/Dialogue ko open krna hai aur
  //  kb nhi open krna hai ye btane k liye state defined kiye hai;
  const [messengerChatPhotoBoxDialugeOpen, setMessengerChatPhotoBoxDialogueOpen] = useState(false);

  //ye total fb user ka name ko search krne and display krne k liye state defined kiye hai;
  const [searchedUserInput, setSearchedUserInput] = useState('');

  //message send ya recieve kiya gya hai ye confirm karne k liye ye state defined kiya hu, aur ye state ek flag ki tarh act krega;
  const [messageIndicator, setMessageIndicator] = useState(1);

  //fb user ka messenger id k liye ye state defined kiye hai;
  const [messengerUserId, setMessengerUserId] = useState(location.state?.userId ?? loggedUserId);

  // MessangerPage ke MessengerUser aur user k sath chatting details ko Display Karne ke liye ye State Defind kiye hai. aur 
  // updatedFbMessangerChattingUsers state me starting value localStorage k 'updatedFbMessangerChattingUsersKey' key se nikal kr rakh rha hu;
  // agar localStorage k 'updatedFbMessangerChattingUsersKey' key pe koi value nhi hai to mai updatedFbMessangerChattingUsers ko empty array se initialise kr de rha hu;
  const [updatedFbMessangerChattingUsers, setUpdatedFbMessangerChattingUsers] = useState(() => {
    const locallyStoredUpdatedFbMessangerChattingUsers = localStorage.getItem('updatedFbMessangerChattingUsersKey');
    if (!locallyStoredUpdatedFbMessangerChattingUsers)
      return [];

    return JSON.parse(locallyStoredUpdatedFbMessangerChattingUsers);
  }
  );

  //ye current messenger user jiske sath chatting ho rhi hai uske details ko sabhi messengerUser(updatedFbMessangerChattingUsers) se
  // messengerId k basis pe filter kr us current single Messenger User jiske sath chatting ho rhi hai, us messenger user k details ko store kr rha hai ;
  const usersFilteredMessageDetailsFromHomePage = updatedFbMessangerChattingUsers.filter((singleUserMessengerDetails) =>
    singleUserMessengerDetails.user.userDetails.userId == `${location.state?.userId ?? loggedUserId}`)?.[0];

  //ye current messenger user jiske sath chatting ho rhi hai uska messege aur others details ko store kr k locally display krne k liye state defined kiye hai;
  const [filteredUserMessageDetails, setFilteredUserMessageDetails] = useState(usersFilteredMessageDetailsFromHomePage);


  //***************************************************************************************************************************************************//



















  //***************************************************************************************************************************************************//
  // Chatlist pe yhaa kaam suru huaa hai
  //jb hm Chatlist k kisi ek messengerUser pe click krte hai to ye function call hota hai;
  const onChangerMessengerUser = (userMessegedserId) => {

    const usersFilteredMessageDetails = updatedFbMessangerChattingUsers.filter((singleUserMessengerDetails) =>
      singleUserMessengerDetails.user.userDetails.userId == userMessegedserId)?.[0];

    setFilteredUserMessageDetails(usersFilteredMessageDetails);
    setMessengerUserId(userMessegedserId);

    setMessengerChatPhotoBoxDialogueOpen(false);
    setMessengerChatInputBox('');
    setMessengerChatPhotoBoxUrl('')
  }



  // condition-1
  // usersFilteredMessageDetailsFromHomePage agr false hai AND(&&) sath me filteredUserMessageDetails bhi false to mtlb
  // dono jgh se data undefined hai .... isiliye alrt show hoga aur agr

  // condition-2
  // usersFilteredMessageDetailsFromHomePage ya (||) filteredUserMessageDetails se mtlb kahi ek jgh se bhii data mila to program kaam krega.... qki overall true ho jayega 

  // condition-3
  // agr dono jgh usersFilteredMessageDetailsFromHomePage AND(&&) filteredUserMessageDetails se data mil rha hai to aur bdiya hai;
  // kahi nhii code me error show hoga;

  // ye if condition  upr wale btaye gye condition-1,2,3 (tino) ko ek sath handle kr lega;
  if (!usersFilteredMessageDetailsFromHomePage && !filteredUserMessageDetails) {

    // jb koi messengerUser userId k basis pe nhii milega to us userId ka ek nya messengerUser bnaane k liye data filter kr rhe hai;
    const filteredPostData = postData.filter((sinnglePostData) => sinnglePostData.userId == messengerUserId)?.[0];
    // yha pr hm ek json bnaa rhe hai jo upr filter kiya huaa data le rha hai aur niche wale formate new messengerUser bnaa rha hai;
    const newFbMessangerChattingUsers = {
      "user": {
        "userDetails": {
          "userId": filteredPostData.userId,
          "userName": filteredPostData.profileName,
          "userProfilePic": filteredPostData.profilePic,
          "storyActive": true,
          "statusActive": false
        },
        "userChatDetails": []
      }
    }

    // upr me hm ek json bnaa rhe the jo filter kiya huaa data le rha tha aur new messengerUser bnaa ka formate de rha tha
    // aur usi formate me ek nya messengerUser ko hm yhaa add kr rhe hai;
    setUpdatedFbMessangerChattingUsers([newFbMessangerChattingUsers, ...updatedFbMessangerChattingUsers])
    setFilteredUserMessageDetails(newFbMessangerChattingUsers);
    setMessageIndicator(1);

    setMessengerChatPhotoBoxDialogueOpen(false);
    setMessengerChatInputBox('');
    setMessengerChatPhotoBoxUrl('')
  }


  //jb hm Chatlist k kisi ek messengerUser pe hover krenge to 3-dot ka menu show hoga aur
  // us menu pe jb click krte hai to ye function call hota hai aur us messengerUser ko delete krne k liye confirm kraata hai;
  const handleDeleteFbMessangerChattingUser = (currentMessengerUserId, profileName) => {

    //ye confirm krayega ki messengerUser ko delete krna hai ya nhii;
    const deleteCurrentMessengerUser = window.confirm(`Are you sure to delete ${profileName} ?`);
    if (deleteCurrentMessengerUser) { 
      const newMessengerUsers = updatedFbMessangerChattingUsers.filter((singleMessengerUser) =>
        singleMessengerUser.user.userDetails.userId != currentMessengerUserId
      );
      // console.log({ newMessengerUsers })

      //messengerUser delete krne k baad chatList me koi other messengerUser bach hi nhi paya; mtlb List khali ho gya hai;
      if (newMessengerUsers.length == 0) { 
        setUpdatedFbMessangerChattingUsers([]);
        setFilteredUserMessageDetails({});
      }
      else {
        setUpdatedFbMessangerChattingUsers([...newMessengerUsers]);
        setFilteredUserMessageDetails(newMessengerUsers[0]);
        setMessengerUserId(newMessengerUsers[0].user.userDetails.userId);
      }
      setMessageIndicator(1);
    }
    else { // NO → do not Delete the messengerUser;
      console.log(`Please, do not delete the ${profileName}`);
    }

    setMessengerChatInputBox("");
    setMessengerChatPhotoBoxDialogueOpen(false);
    setMessengerChatPhotoBoxUrl('')
  };
  // Chatlist pe yhaa kaam khatm huaa hai
  //***************************************************************************************************************************************************//




















  //***************************************************************************************************************************************************//
  // Chatlist ka windowpage pe yhaa kaam suru huaa hai;



  //**************************************************************************//

  const commonHandleFuncOfMessegeSendOrRecieve = (newMessage, currentChattingUserId) => {
    //yhaa pr new messege ka bnaye huye formate ko hm messengerUser k userChatDetails me add kr rhe hai
    //aur updatedFbMessangerChattingUsers me messengerUser(jiske sath chatting ho rhi hai) uska userChatDetails ko update kr rhe hai
    //  aur baki k messengerUser ka details aise hi return kr de rhe hai
    const newFbMessageChattingDetails = updatedFbMessangerChattingUsers.map((singleFbMessangerChattingUsers) => {
      if (singleFbMessangerChattingUsers.user.userDetails.userId == currentChattingUserId) {
        return {
          ...filteredUserMessageDetails,
          user: {
            ...filteredUserMessageDetails.user,
            userChatDetails: [newMessage, ...filteredUserMessageDetails.user.userChatDetails]
          }
        };
      }
      else {
        return singleFbMessangerChattingUsers;
      }
    });

    // console.log({newFbMessageChattingDetails})
    //yhaa pr final updatedFbMessangerChattingUsers ko set ya update kr rhe hai
    setUpdatedFbMessangerChattingUsers([...newFbMessageChattingDetails]);

    // messengerUser(jiske sath chatting ho rhi hai) uske userChatDetails me new messege add kr rhe hai jo screen pr tutant show ho rha hoga;
    setFilteredUserMessageDetails({
      ...filteredUserMessageDetails,
      user: {
        ...filteredUserMessageDetails.user,
        userChatDetails: [newMessage, ...filteredUserMessageDetails.user.userChatDetails]
      }
    });
    setMessengerUserId(currentChattingUserId);
    setMessageIndicator(1);


    //bs koi bug n aa jaye uske liye false ya empty set kr rhe hai 
    setMessengerChatPhotoBoxDialogueOpen(false);
    setMessengerChatInputBox('');
    setMessengerChatPhotoBoxUrl('')
  }



  // Chatlist ka windowpage Type 'TEXT' pe yhaa kaam suru huaa hai;
  const messengerChatInputBoxChange = (value) => {
    setMessengerChatInputBox(value);
    setMessengerChatPhotoBoxDialogueOpen(false);
    setMessengerChatPhotoBoxUrl('')
  }


  const handleSendRecivedMessage = (currentChattingUserId, userType, userMessegeType) => {
    // console.log({ messengerChatInputBox }, { userType }, { userMessegeType });

    if (messengerChatInputBox.trim()) {
      //yhaa  pr hm new messege ka formate bnaa rhe hai
      const newMessageForTypeTEXT = {
        "userType": userType,
        "userMessegeType": userMessegeType,
        "userMessegeId": crypto.randomUUID(),
        "userMessege": messengerChatInputBox
      };
      commonHandleFuncOfMessegeSendOrRecieve(newMessageForTypeTEXT, currentChattingUserId);
    }
  }
  //**************************************************************************//
  // Chatlist ka windowpage Type 'TEXT' pe yhaa kaam khatm huaa hai;




  //**************************************************************************//
  // Chatlist ka windowpage Type 'IMAGE' pe yhaa kaam suru huaa hai;
  const handleOpenPhotoDialogue = () => {
    setMessengerChatPhotoBoxDialogueOpen(!messengerChatPhotoBoxDialugeOpen);
    setMessengerChatPhotoBoxUrl('');
  }

  //jb kisi image pr ek baar select kr rhe hai to uska url ko messengerChatPhotoBoxUrl me store kr rha hai;
  //aur usi image pr ek baar phir se select kr rhe hai to uska url ko messengerChatPhotoBoxUrl me htaa de rha hai kr rha hai;
  const handleSelectDialogueImage = (imageUrl) => {
    if (messengerChatPhotoBoxUrl == imageUrl) {
      setMessengerChatPhotoBoxUrl('')
    }
    else {
      setMessengerChatPhotoBoxUrl(imageUrl)
    }
  }

  //ye jb hm image ko select kr k finally confirm kr rhe hai tb ye function call ho rha hai;
  const handleConfirmAndSendDialogueImage = () => {
    // console.log({ messengerChatPhotoBoxUrl });
    //ye ek confirm box khul rha hai jo puchh rha hai ki aap sender ho ya nhi;
    const userTypeSender = window.confirm(`Are you 'SENDER ?`);
    let userType = '';
    if (userTypeSender) { //agr ye userTypeSender true hai to aap confirm kr rhe ho ki aapka userType sender hai
      userType = 'SENDER';
    }
    else {//agr ye userTypeSender false hai(mtlb confirm ko cancle kr diya gya hai) to aap confirm kr rhe ho ki aapka userType reciever hai
      userType = 'RECIEVER'
    }

    //yhaa pr hm new messege ka formate bnaa rhe hai
    const newMessageForTypeIMAGE = {
      "userType": userType,
      "userMessegeType": 'IMAGE',
      "userMessegeId": crypto.randomUUID(),
      "userMessege": messengerChatPhotoBoxUrl
    };

    const currentChattingUserId = filteredUserMessageDetails.user.userDetails.userId

    commonHandleFuncOfMessegeSendOrRecieve(newMessageForTypeIMAGE, currentChattingUserId)
  }
  //**************************************************************************//
  // Chatlist ka windowpage Type 'IMAGE' pe yhaa kaam khatm huaa hai;



  // Chatlist ka windowpage Type 'IMAGE' ya 'TEXT' ko delete krne ka kaam yhaa se suru huaa hai;
  const handleDeleteMessege = (userMessegeId,) => {
    // console.log(userMessegeId);

    //ye confirm krayega ki messeg ko delete krna hai ya nhii;
    const deleteCurrentMessengerUser = window.confirm(`Are you sure to delete the messege ?`);
    if (deleteCurrentMessengerUser) { // YES → Delete the messenge;

      // messengerUser(jiske sath chatting ho rhi hai) uske userChatDetails me userMessegeId k messege ko delete kr rhe hai
      const updatedMessegeOfFilteredUserMessageDetails = filteredUserMessageDetails.user.userChatDetails.filter((singleMessege) =>
        singleMessege.userMessegeId != userMessegeId);


      //yhaa pr userMessegeId k messege ko hm messengerUser k userChatDetails se delete k baad updatedFbMessangerChattingUsers me 
      // messengerUser(jiske sath chatting ho rhi hai) uska userChatDetails ko update kr rhe hai
      //  aur baki k messengerUser ka details aise hi return kr de rhe hai
      const currentChattingUserId = filteredUserMessageDetails.user.userDetails.userId;
      const newFbMessageChattingDetails = updatedFbMessangerChattingUsers.map((singleFbMessangerChattingUsers) => {
        if (singleFbMessangerChattingUsers.user.userDetails.userId == currentChattingUserId) {
          return {
            ...filteredUserMessageDetails,
            user: {
              ...filteredUserMessageDetails.user,
              userChatDetails: [...updatedMessegeOfFilteredUserMessageDetails]
            }
          };
        }
        else {
          return singleFbMessangerChattingUsers;
        }
      });

      // console.log({newFbMessageChattingDetails})
      //yhaa pr final updatedFbMessangerChattingUsers ko set ya update kr rhe hai
      setUpdatedFbMessangerChattingUsers([...newFbMessageChattingDetails]);

      //yhaa pr userMessegeId k messege ko hm messengerUser k userChatDetails se delete k baad
      // hm filteredUserMessageDetails ko update kr rhe hai jo screen pr tutant show ho rha hoga;
      setFilteredUserMessageDetails({
        ...filteredUserMessageDetails,
        user: {
          ...filteredUserMessageDetails.user,
          userChatDetails: [...updatedMessegeOfFilteredUserMessageDetails]
        }
      });
      setMessageIndicator(1);
    }
    else {
      console.log('Please do not delete the messege');
    }

    setMessengerChatPhotoBoxDialogueOpen(false);
    setMessengerChatInputBox('');
    setMessengerChatPhotoBoxUrl('')
  }



  // Chatlist ka windowpage pe yhaa kaam khatm huaa hai
  //***************************************************************************************************************************************************//

















  //***************************************************************************************************************************************************//
  // useEffcet hook starting me har code ya page jaha use hua hai.. apne aap call hota hai;
  // inside the useEffect ... 2 chije hoti hai .. pahla arraow function hoga , jiske andar hm ek normal function ki tarh kuchh bhii likhe sakte hai, defined kr sakte, calculation kr sakte hai , set use kr sakte hai aur bhii bahut sari chije aur ... 
  // dusra braket me variable jiske change hone pe useEffect call hota hai ... jitni baar variable change hoga
  useEffect(() => {
    setMessengerUserId(location.state?.userId ?? loggedUserId);
    setFilteredUserMessageDetails(usersFilteredMessageDetailsFromHomePage);
    hideSearchComp();
    setMessengerChatInputBox('');
    setMessengerChatPhotoBoxDialogueOpen(false);
    setMessengerChatPhotoBoxUrl('')

  }, [location.state?.userId]);


  useEffect(() => {
    if (updatedFbMessangerChattingUsers.length) {
      if (messageIndicator) {
        const currectChatingtWithUser = updatedFbMessangerChattingUsers.filter((singleUser) =>
          singleUser.user.userDetails.userId == messengerUserId
        )

        const currectChatingNotWithUsers = updatedFbMessangerChattingUsers.filter((singleUser) =>
          singleUser.user.userDetails.userId != messengerUserId
        )

        setUpdatedFbMessangerChattingUsers([...currectChatingtWithUser, ...currectChatingNotWithUsers]);
        localStorage.setItem('updatedFbMessangerChattingUsersKey', JSON.stringify([...currectChatingtWithUser, ...currectChatingNotWithUsers]));
        onNavigateToMessangerProfile(messengerUserId);

      }

    }
    else {
      setUpdatedFbMessangerChattingUsers(fbMessangerChattingUsers);
      localStorage.setItem('updatedFbMessangerChattingUsersKey', JSON.stringify(fbMessangerChattingUsers));
    }
    setMessageIndicator(0)
    setMessengerChatPhotoBoxDialogueOpen(false);
    setMessengerChatPhotoBoxUrl('')

  }, [updatedFbMessangerChattingUsers]);




  //***************************************************************************************************************************************************//




















  //***************************************************************************************************************************************************//
  // Chatlist ka search pe yhaa kaam suru huaa hai
  const searchedFaceBookMessengerUsers = postData.filter((user) =>
    user.profileName.toLocaleLowerCase().includes(searchedUserInput.toLocaleLowerCase())
  );
  const handleChangeInput = (value) => {
    setSearchedUserInput(value);
    setMessengerChatPhotoBoxDialogueOpen(false);
    setMessengerChatPhotoBoxUrl('')
  }

  const dataNotFound = 'Messenger user not found.'
  // Chatlist ka search pe yhaa kaam khatm huaa hai
  //***************************************************************************************************************************************************//












  return (
    <div className="messenger-page-container">
      {/* Top Navbar */}
      <NavBarComp navigateToProfile={onNavigate}
        loggedUserId={loggedUserId}
        totalFbUsers={postData}
      />

      {/* Messenger Content */}
      <div className="messenger-page-content">
        {/* Left Sidebar - Chat List */}
        <ChatListComp
          dataNotFound={dataNotFound}
          updatedFbMessangerChattingUsers={updatedFbMessangerChattingUsers}
          fbMessangerSearchUsers={searchedFaceBookMessengerUsers}
          handleChangeInput={handleChangeInput}
          searchedUserInput={searchedUserInput}
          onChangerMessengerUser={onChangerMessengerUser}
          data={postData}
          messangerUserId={messengerUserId}
          navigateToMessangerProfile={onNavigateToMessangerProfile}
          handleDeleteFbMessangerChattingUser={handleDeleteFbMessangerChattingUser}
        />

        {/* Main Chat Window */}
        <ChatWindowComp
          userMessageDetails={filteredUserMessageDetails}
          navigateToProfile={onNavigate}
          // For Type=='TEXT'
          messengerChatInputBoxChange={messengerChatInputBoxChange}
          messengerChatInputBox={messengerChatInputBox}
          handleSendRecivedMessage={handleSendRecivedMessage}
          // For Type=='IMAGE'
          handleOpenPhotoDialogue={handleOpenPhotoDialogue}
          messengerChatPhotoBoxDialugeOpen={messengerChatPhotoBoxDialugeOpen}
          handleSelectDialogueImage={handleSelectDialogueImage}
          messengerChatPhotoBoxUrl={messengerChatPhotoBoxUrl}
          handleConfirmAndSendDialogueImage={handleConfirmAndSendDialogueImage}
          //For Delete and Edit one Message of 'IMAGE' ya 'TEXT'
          handleDeleteMessege={handleDeleteMessege}
        />

        {/* Right Sidebar - Chat Info */}
        {/* object restructuring kr k props pass kiye hai; */}
        {/* object restructuring ka mtlb .. hm purane ya koi original object(json) ka use kr k, ek nya object(json) bnate hai ,
         jisme hm attribute ka naam apne mn se rakhte hai aur, 
         us attribute k value ko -hm purane ya original wale kisi attribute k value se assign kr dete hai
         lekin nye aur purane dono attribute ki value ka dataType same hoga*/}
        {filteredUserMessageDetails && Object.keys(filteredUserMessageDetails).length != 0 ?
          <ChatInfoComp
            userMessageDetails={
              {
                messengerRightPageUserName: filteredUserMessageDetails?.user.userDetails.userName,
                messengerRightPageUserProfile: filteredUserMessageDetails?.user.userDetails.userProfilePic,
              }
            }
          />
          :
          <></>
        }
      </div>
    </div>
  );
}


import React, { useEffect, useState } from "react";
import "../Style/ChatListComp.css";
import ChatListUnreadComp from "./ChatListUnreadComp";
import ChatListGroupsComp from "./ChatListGroupsComp";
import ChatListCommunitiesComp from "./ChatListCommunitiesComp";
import { useGlobalHideMethod } from "../../../Hooks/useGlobleFun";
import SearchMethod from "../../GlobalUse/SearchMethod/SearchMethod";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function ChatListComp({ dataNotFound, updatedFbMessangerChattingUsers,
  fbMessangerSearchUsers, handleChangeInput,
  searchedUserInput, messangerUserId,
  onChangerMessengerUser, navigateToMessangerProfile,
  handleDeleteFbMessangerChattingUser }) {

  const { isShowSearchComp, isShowHideSearchComp, searchContainerRef, hideSearchComp } = useGlobalHideMethod();
  const [usersMessegeStatus, setUsersMessegeStatus] = useState("All")

  useEffect(() => {
    hideSearchComp();
  }, [messangerUserId])

  const onTabChange = (value) => {
    setUsersMessegeStatus(value)
  }


  return (
    <div className="messenger-page-left">

      {/* Fixed Header Content */}
      <div className="top-messenger">
        {/* Top Messenger */}
        <div className="top-chat-hading-search">
          <div className="chat-hading">
            <h1>Chats</h1>
          </div>
          <div className="menu_new_message">
            <a href="">
              <MoreHorizIcon
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: '#e2e5e9',
                  color: 'black'
                }}
                className="menu_messanger" />
            </a>
            <a href="">
              <div className="new_message">
                <img className="new_message_icon" src="/Image//MessengerPage//newMessege.png" alt="new-Message" />
              </div>
            </a>
          </div>
        </div>
        {/* Search Box */}

        <div className="search-msg" >

          <a className="Search-Messenger" href="">
            <i className="fa-solid fa-magnifying-glass"></i>
          </a>

          <div ref={searchContainerRef} className="searchBar" >
            <input
              className="search-box-msg"
              type="text"
              placeholder="Search Messenger User"
              onClick={isShowHideSearchComp}
            />
            {isShowSearchComp ? <div className="Search_card_box_in_messenger">
              <SearchMethod
                dataNotFound={dataNotFound}
                data={fbMessangerSearchUsers}
                handleChangeInput={handleChangeInput}
                searchedUserInput={searchedUserInput}
                fun={navigateToMessangerProfile}
                isShowHideSearchComp={isShowHideSearchComp} />
            </div> : <></>}
          </div>

        </div>

        {/* Messages Tabs */}
        <div className="all-navbar-chat">
          {["All", "Unread", "Groups", "Communities"].map((tabName, index) => (
            // yhaa function ChatithChage turant call ho rha hai wki yha prop de rhe hai function,
            //  isiliye onClick k baad hme arrow function call krna pda,
            // agr ChatwithChage me props ki jrurat nhi hoti to hm arrow function call nhi krte aur 
            // direct onClick={ChatiWthChage} likh sakte the
            <div key={index} className={`messageTabHeading ${tabName == usersMessegeStatus ? 'messageTabHeadingActive' : ''}`} onClick={() => onTabChange(tabName)}>
              <span className="chat-navbar">{tabName}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="total-chat-people">
        {
          // yhaa pr nested mtlb loop me ternary operation use kiya gya hai;
          // jo is component se pass krenge us variable ko right side me likhenge props pass krte time aur 
          // jisko as a props , hm child component me use kr rhe hai us variable ko left side me likhenge (equal to pahle likhenge)
          //  jaise ye - chatWithUnreadUser={unreadUser}
          usersMessegeStatus == "Unread" ? usersMessegeStatus
            : usersMessegeStatus == "Groups" ? usersMessegeStatus
              : usersMessegeStatus == "Communities" ? usersMessegeStatus
                :
                <div className="messengerChattingUsersList" >{updatedFbMessangerChattingUsers.map((chattingUser, index) => {
                  // split the full name on space;
                  const userFullName = chattingUser.user.userDetails.userName.split(" ");
                  // take the first name of user
                  const userFirstName = userFullName[0];

                  const chatListLength = chattingUser.user.userChatDetails.length;
                  const lastmsg = chatListLength > 0 ? chattingUser.user.userChatDetails[0] : <></>;
                  return (<>
                    <div className={`messengerChattingUserCardWithMenu 
                      ${chattingUser.user.userDetails.userId == messangerUserId ? "currentMessengerChattingUserCardActive" : ''}`} >

                      <div className="messengerChattingUserCard">
                        <div key={index}
                          className={`messengerChattingUserCardNotActive
                      ${chattingUser.user.userDetails.userId == messangerUserId ? "currentMessengerChattingUserCardActive" : ''}`
                          }
                          onClick={() => onChangerMessengerUser(chattingUser.user.userDetails.userId)}>
                          <a href="" className={chattingUser.user.userDetails.storyActive ? "story-active" : ""} >
                            <img className="messengerChattingUserCardPhoto" src={chattingUser.user.userDetails.userProfilePic} alt="active-img" />
                          </a>
                          <div className="messengerChattingUserCardName_lastmsg">
                            <span className="messengerChattingUserCardName">{chattingUser.user.userDetails.userName}</span>
                            <span className="messengerChattingUserCard_lastmsg">
                              {/* nested ternory operator used here  */}
                              {/* first condition start from here */}
                              {chatListLength > 0 ?
                                // true side part of first condition start from here

                                // second condition start from here
                                (lastmsg.userType == "SENDER" ?
                                  // true side part of second condition start from here

                                  // SENDER part start
                                  (lastmsg.userMessegeType == 'TEXT' ?
                                    `You: ${lastmsg.userMessege.slice(0, 27)}`
                                    :
                                    <>You: sent a photo</>)  //  For image

                                  :
                                  //  false side part of second condition start from here

                                  // RECIEVER part start
                                  (lastmsg.userMessegeType == 'TEXT' ?
                                    <>{(`${userFirstName}: ${lastmsg.userMessege}`).slice(0, 27)}</>
                                    :
                                    <>{(`${userFirstName}: a sent photo`).slice(0, 27)}</>)  //  For image
                                )

                                :
                                //  false side part of first condition start from here
                                <></>}
                            </span>
                          </div>

                        </div>
                        {chattingUser.user.userDetails.statusActive ? <a className="messengerChattingUserCardActive_Symbol" href=""><i className="fa-solid fa-dot"></i></a> : <></>}
                      </div>

                      <div 
                      onClick={()=> handleDeleteFbMessangerChattingUser(chattingUser.user.userDetails.userId, chattingUser.user.userDetails.userName)}
                      ><span className="Menu_Messenger_ChatList"><i class="fa-solid fa-ellipsis-vertical"></i></span></div>
                    </div>
                  </>
                  )
                })
                }</div>

        }

      </div>
    </div >
  );
}

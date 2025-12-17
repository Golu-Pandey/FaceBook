import React, { useState } from "react";
import "../Style/LeftSidebarComp.css";
import { useGlobleFun } from "../../../Hooks/useGlobleFun";

export default function JoinedGroupsProfiles({ data }) {

    const [seeMore, setSeeMore] = useState(true);


    // yaha pr sidebarItem ko Array ki value ki tarah pass kr rhe hai or eventIndex ko index ki value ki tarah pass kr rhe hai 
    const { arrayBeforeIndex, arrayAfterIndex } = useGlobleFun(data?.["total-groups-profile"], 2);


    const isHideShow = () => {
        // !(NOT) ye true ko false kr deta hai ya phir false ko true kr deta hai job hm kisi true ya false wale variable k starting me use krte hai;
        setSeeMore(!seeMore)
    }

    return (
        <div className="total-groups-profile">
            { arrayBeforeIndex.map((item, index) => {
                const profile = item["photo-text"];
                return (
                    <div className="photo-text" key={ index }>
                        <div className="groups-img">
                            <a href="#">
                                <img className="group-logo" src={ profile["group-logo"] } alt={ profile["title"] } />
                            </a>
                        </div>
                        <div className="groups-tittle">
                            <span>{ profile["title"] }</span>
                            <span className="seen-time">{ profile["seen-time"] }</span>
                        </div>
                    </div>
                );
            })

            }



            {
                seeMore ?
                    <a href="#" className="sidebar_item_2" onClick={ isHideShow }>
                        <i className="fa-solid fa-angles-down"></i>
                        <span className="sidebar_item_2">see more</span>
                    </a>
                    : <>


                        { arrayAfterIndex.map((item, index) => {
                const profile = item["photo-text"];
                return (
                    <div className="photo-text" key={ index }>
                        <div className="groups-img">
                            <a href="#">
                                <img className="group-logo" src={ profile["group-logo"] } alt={ profile["title"] } />
                            </a>
                        </div>
                        <div className="groups-tittle">
                            <span>{ profile["title"] }</span>
                            <span className="seen-time">{ profile["seen-time"] }</span>
                        </div>
                    </div>
                );
            }
                        
                        
                        
                        ) }


                        <a href="#" className="sidebar_item_2" onClick={ isHideShow }>
                            <i className="fa-solid fa-angles-up"></i>
                            <span className="sidebar_item_2">see less</span>
                        </a>
                    </>
            }




        </div>






    );
}
import React, { useState } from "react";
import "../Style/LeftSidebarComp.css";
import { useGlobleFun } from "../../../Hooks/useGlobleFun";


export default function LeftSideBarIconTopComp({ dataArray }) {

    //ye ek custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
    const { arrayBeforeIndex, arrayAfterIndex } = useGlobleFun(dataArray, 2);

    //ye state defined isliye kiye hai , qki seeMore k basis pe data ko pura display kr rhe hai ya kuchh hi data display kr rhe hai
    const [seeMore, setSeeMore] = useState(true);
    //ye function defined kiye hai taki SeeMore ya SeeLess pe onClick kr seeMore k value ko update kr rhe hai
    const isHideShow = () => {
        setSeeMore(!seeMore);
    }

    return (
        <>
            {arrayBeforeIndex.map((icon, idx) => (
                <div className="browse" key={idx}>
                    <a href={icon.link}>
                        <img className="market-browser" src={icon.imgSrc} alt={icon.alt} />
                    </a>
                    <span className="icon-name">{icon.name}</span>
                    <a className="arrow" href="#">
                        <i className={icon.arrowClass}></i>
                    </a>
                </div>
            )
            )
            }
            {
                seeMore ?
                    <a href="#" className="sidebar_item_2" onClick={() => isHideShow()}>
                        <i className="fa-solid fa-angles-down"></i>
                        <span className="sidebar_item_2">see more</span>
                    </a>
                    : <>
                        {arrayAfterIndex.map((icon, idx) => (
                            <div className="browse" key={idx}>
                                <a href={icon.link}>
                                    <img className="market-browser" src={icon.imgSrc} alt={icon.alt} />
                                </a>
                                <span className="icon-name">{icon.name}</span>
                                <a className="arrow" href="#">
                                    <i className={icon.arrowClass}></i>
                                </a>
                            </div>
                        ))}
                        <a href="#" className="sidebar_item_2" onClick={() => isHideShow()}>
                            <i className="fa-solid fa-angles-up"></i>
                            <span className="sidebar_item_2">see less</span>
                        </a>
                    </>
            }
        </>
    );
}

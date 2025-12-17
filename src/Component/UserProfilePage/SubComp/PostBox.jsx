import { } from "../Style/PostBox.css";
import React, { useState } from "react";

const PostBox = () => {
  const [activeView, setActiveView] = useState("list");


  return (
    <div className="posts-container">
      <div className="posts-box">
        <div className="posts-header">
          <h3 className="posts-title">Posts</h3>

          <div className="posts-buttons">
            <button className="action-btn">
              <i className="fa-solid fa-sliders"></i>
              <span>Filters</span>
            </button>

            <button className="action-btn">
              <i className="fa-solid fa-gear"></i>
              <span>Manage posts</span>
            </button>
          </div>
        </div>

        <div className="posts-view">
          <div className="view-options">
            <button
              className={`view-btn ${activeView === "list" ? "active" : ""}`}
              onClick={() => setActiveView("list")}
            >
              <i className="fa-solid fa-list"></i>
              <span>List view</span>
            </button>

            <button
              className="view-btn" 
              // onClick={() => setActiveView("grid")}
            >
              <i className="fa-solid fa-table-cells"></i>
              <span>Grid view</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default PostBox;
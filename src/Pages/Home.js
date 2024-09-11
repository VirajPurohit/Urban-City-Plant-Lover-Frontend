import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";

export default function Home({ isMobile }) {
  return (
    <>
      <Header isMobile={isMobile} />
      <div style={{ display: "flex", flexDirection: "row", columnGap: "15px" }}>
        <Sidebar isMobile={isMobile} />
        <Content />
      </div>
    </>
  );
}

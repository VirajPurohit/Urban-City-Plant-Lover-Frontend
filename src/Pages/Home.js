import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ display: "flex", flexDirection: "row", columnGap: "15px" }}>
        <Sidebar />
        <Content />
      </div>
    </>
  );
}

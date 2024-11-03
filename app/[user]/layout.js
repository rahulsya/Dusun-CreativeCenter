import React from "react";

function UserLayout({ children }) {
  return (
    <>
      <div>Root </div>
      <div>{children}</div>
    </>
  );
}

export default UserLayout;

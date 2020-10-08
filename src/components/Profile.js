import React from "react";
function Profile(props) {
  const user = props.userDet;
  return (
    <div className="userscreen">
      <h1>Hello {user.name}</h1>
    </div>
  );
}

export default Profile;

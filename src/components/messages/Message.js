import React from "react";

function Message({ msgInfo }) {
  console.log(msgInfo);
  return (
    <li>
      <h3>{msgInfo.name}</h3>
      <h4>{msgInfo.message}</h4>
    </li>
  );
}

export default Message;

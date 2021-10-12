import React from "react";
import { v4 as uuidv4 } from "uuid";
import partnersChannel from "../../image/MainContentImg/add-external-partners-to-a-channel.IN.jpg";
import brainstormChannel from "../../image/MainContentImg/brainstorm-in-a-channel.IN.jpg";
import createChannel from "../../image/MainContentImg/create-a-channel.IN.jpg";
import pauseNotifications from "../../image/MainContentImg/pause-notifications.IN.jpg";
import whatAreChannels from "../../image/MainContentImg/what-are-channels.IN.jpg";
import video1 from "../../video/img-hp-section-01.mp4";
import video2 from "../../video/img-hp-section-02.mp4";
import video3 from "../../video/img-hp-section-03.mp4";
import ContentItem from "./ConntentItem";

function MainCOntent(props) {
  const main = [
    {
      title: "Move faster by organizing your work life",
      text: "The key to productivity in Slack is organized spaces called channels—a different one for everything you’re working on. With all the people, messages and files related to a topic in one place, you can move a whole lot faster.",
      type: "video",
      img: [whatAreChannels, createChannel],
      imgName: ["whatAreChannels", "createChannel"],
      id: uuidv4(),
      videoLink: ["G1TYS5K7CqM", "OhL2RNgS_cU"],
      video: video1,
    },
    {
      title: "Focus your time, on your own terms",
      text: "Give yourself the flexibility to work when, where and how you work best. Take control of notifications, collaborate live or on your own time, and find answers in conversations from across your company.",
      type: "video",
      img: [pauseNotifications],
      imgName: ["pauseNotifications"],
      videoLink: ["e4z4kvK3n24"],
      id: uuidv4(),
      video: [video2],
    },
    {
      title: "Simplify teamwork for everyone",
      text: "Give everyone you work with—inside and outside your company—a more productive way to stay in sync. Respond faster with emoji, keep conversations focused in channels, and simplify all your communication into one place.",
      type: "video",
      img: [partnersChannel, brainstormChannel],
      imgName: ["partnersChannel", "brainstormChannel"],
      id: uuidv4(),
      videoLink: ["w4KmQRaHPgs", "BK5URhU2S9U"],
      video: [video3],
    },
  ];
  const renderMainContext = (item, index) => (
    <ContentItem index={index} content={item} />
  );
  return <>{main.map((item, index) => renderMainContext(item, index))}</>;
}

export default MainCOntent;

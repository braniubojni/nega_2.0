import React from "react";
import crowdstrike from "./photo/crowdstrike.png";
import dropbox from "./photo/dropbox.png";
import gmail from "./photo/gmail.png";
import googleDrive from "./photo/google-drive.png";
import idc from "./photo/idc.png";
import onedrive from "./photo/onedrive.png";
import outlook from "./photo/outlook.png";
import salesforce from "./photo/salesforce.png";
import serviceNow from "./photo/service-now.png";
import ameritrade from "./photo/td-ameritrade.png";
import zendesk from "./photo/zendesk.png";
import zoom from "./photo/zoom.png";
import fox from "./photo/fox.png";
import { Container } from "@mui/material";
import engagement from "./video/engagement.mp4";
import platform from "./video/platform.mp4";
import scale from "./video/scale.mp4";
import security from "./video/security.mp4";
import slackConnect from "./video/slack-connect.mp4";
import EnterpriseContente from "./EnterpriseContente";

const enterpriseContente = [
  {
    title: "SCALE",
    boltText: "Created to meet the needs of global organizations",
    chekedText: [
      "Get peace of mind with 99.99% uptime SLA",
      "Customize Slack to your business with unlimited workspaces and channels",
      "Govern all your users and teams from a single place",
    ],
    text: "“Slack has been the hammer that has helped us tear down the walls of silos. It has enabled us to position Slack as the operating system of collaboration across 194 countries and 171 offices, pulling us together like nothing else has.”",
    paragrap: [],
    img: fox,
    video: scale,
    chekedColor: "rgba(64,13,64,0.9)",
  },
  {
    title: "SECURITY",
    boltText: "Enterprise-grade data protection",
    chekedText: [
      "Meet compliance needs and regulatory requirements like FINRA, HIPAA and FedRAMP",
      "Rest assured Slack is using industry-accepted best practices and frameworks",
      "Secure your data with innovative features like Slack Enterprise Key Management",
    ],
    text: "“With the introduction of Slack Enterprise Key Management as an added security feature, we immediately saw its value in giving us total control of our data and the assurance that we’re protected in the event of a security threat in our supply chain.”",
    paragrap: [],
    img: crowdstrike,
    video: security,
    chekedColor: "rgba(102,16,14,0.9)",
  },
  {
    title: "ENGAGEMENT",
    boltText: "Engagement, not installations, is how work gets done",
    chekedText: [
      "Work in a way that feels natural to you, supported by a simple, intuitive user experience",
      "Automate away routine tasks with custom workflows, no code needed",
      "Keep projects moving, wherever you are, on desktop or mobile",
    ],
    text: "",
    paragrap: [
      {
        percent: "24%",
        text: "faster to reach full employee productivity¹",
        img: idc,
      },
      {
        percent: "30%",
        text: "less email²",
        img: ameritrade,
      },
    ],
    img: [],
    video: engagement,
    chekedColor: "rgba(42,95,53,0.9)",
  },
  {
    title: "PLATFORM",
    boltText: "Apps that boost productivity and scale with you",
    chekedText: [
      "Ensure third-party apps are compliant",
      "Standardize app permissions across your organization",
      "Drive usage with more than 2,400 apps",
    ],
    text: "",
    paragrap: [],
    imgParagrap: [
      zoom,
      outlook,
      googleDrive,
      salesforce,
      serviceNow,
      onedrive,
      gmail,
      dropbox,
    ],
    video: platform,
    chekedColor: "rgba(49,101,163,0.9)",
  },
  {
    title: "SLACK CONNECT",
    boltText: "Work with external organizations, securely",
    chekedText: [
      "Retain your data security practices while collaborating with trusted organizations",
      "Connect with employees, customers and partners in a single place",
      "Reduce context switching, increase transparency and speed up work",
    ],
    text: "Having all of the information about a specific partner available at once is super-important. We have a direct line of communication to our counterparts at the companies we work with most frequently.",
    paragrap: [],
    img: zendesk,
    video: slackConnect,
    chekedColor: "rgba(204,180,48,0.9)",
  },
];

function Enterprise() {
  return (
    <>
      {enterpriseContente.map((item, index) => (
        <EnterpriseContente key={item.title} content={item} index={index} />
      ))}
    </>
  );
}

export default Enterprise;

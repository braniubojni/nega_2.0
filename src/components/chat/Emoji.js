import React, { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import { styled } from "@mui/system";

const StyledEmoji = styled("div")({
  position: "absolute",
  bottom: "120%",
  left: "-50%",
  transition: "all 0.2s",
});

export default function Emoji({ inputRef, isDisabled, Sent }) {
  const [emoji, setEmoji] = useState(false);

  useEffect(() => {
    if (Sent) {
      setEmoji(false);
    }
  }, [Sent]);

  const onEmojiClick = (event, emojiObject) => {
    event.stopPropagation();
    inputRef.current.value += emojiObject.emoji;
  };
  const handleEmojiBar = () => {
    if (isDisabled) {
      setEmoji((prev) => !prev);
    }
  };
  return (
    <>
      <span role="img" aria-label="emoji" onClick={handleEmojiBar}>
        😄
      </span>
      {emoji && (
        <StyledEmoji>
          <Picker onEmojiClick={onEmojiClick} />
        </StyledEmoji>
      )}
    </>
  );
}

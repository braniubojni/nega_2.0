import React, { memo, useCallback, useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import { styled } from "@mui/system";

const StyledEmoji = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "120%",
  right: "-5vw",
  transition: "all 0.2s",
  [theme.breakpoints.down(465)]: {
    right: "-75%",
  },
}));

function Emoji({ inputRef, isDisabled, Sent }) {
  const [emoji, setEmoji] = useState(false);

  useEffect(() => {
    if (Sent) {
      setEmoji(false);
    }
  }, [Sent]);

  const onEmojiClick = useCallback(
    (event, emojiObject) => {
      event.stopPropagation();
      inputRef.current.value += emojiObject.emoji;
    },
    [inputRef]
  );
  const handleEmojiBar = useCallback(() => {
    if (isDisabled) {
      setEmoji((prev) => !prev);
    }
  }, [isDisabled]);
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

export default memo(Emoji);

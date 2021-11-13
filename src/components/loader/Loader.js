import { CircleSpinner } from "react-spinners-kit";
import { styled } from "@mui/system";
import { MAGENTA } from "../../constants/colors";
import { memo } from "react";

const Spinner = styled("div")({
  position: "absolute",
  left: "50%",
  top: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
});

function Loader() {
  return (
    <Spinner>
      <CircleSpinner size={55} color={MAGENTA} loading={true} />
    </Spinner>
  );
}

export default memo(Loader);

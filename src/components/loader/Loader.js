import { CircleSpinner } from "react-spinners-kit";
import { styled } from "@mui/system";

const Spinner = styled("div")({
  position: "absolute",
  left: "50%",
  top: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
});

export default function Loader() {
  return (
    <Spinner>
      <CircleSpinner size={55} color="#611f69" loading={true} />
    </Spinner>
  );
}

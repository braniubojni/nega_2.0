import { FireworkSpinner } from "react-spinners-kit";
import styled from "styled-components";

const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export default function Loader({ loader }) {
  return (
    <Spinner>
      <FireworkSpinner size={40} color="#000" loading={loader} />
    </Spinner>
  );
}

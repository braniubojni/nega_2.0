import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function MessageLoader() {
  return (
    <Box sx={{ width: 300 }}>
      <Skeleton />
    </Box>
  );
}

export default React.memo(MessageLoader);

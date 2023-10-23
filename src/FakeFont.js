import { Skeleton } from "@mui/material";
import React from "react";

export default function FakeFont() {
  return (
    <div className="fakeFont">
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={30} />
      <Skeleton sx={{ fontSize: "4rem" }} />
      <Skeleton sx={{ fontSize: "2rem" }} height={200} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={30} />
    </div>
  );
}

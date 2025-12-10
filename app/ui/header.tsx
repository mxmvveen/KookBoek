import { Box, Paper } from "@mui/material";
import Image from "next/image";
import "./header.scss";

export default function Header() {
  return (
    <Box
      className="header"
      sx={{
        margin: 0,
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          height: 65,
        },
      }}
    >
      <Paper
        className="paper"
        style={{ margin: 0, borderRadius: 0, position: "relative" }}
      >
        <Box className="container">
          <Image
            src="/KookBoek.png"
            width={107}
            height={15}
            alt="KookBoek, voor al jouw recepten"
            quality={100}
            unoptimized={true}
          />
        </Box>
        <Box height="1px" width="100%" className="divider" />
      </Paper>
    </Box>
  );
}

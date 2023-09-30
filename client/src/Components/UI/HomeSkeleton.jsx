import { Box, Skeleton } from "@mui/material";

const skeletonStyles = {
  filters: {
    textAlign: "end",
    margin: "20px 0px",
  },
  listStyle: {
    marginBottom: "7rem",
  },
};

const HomeSkeleton = () => {
  return (
    <>
      <Skeleton variant="circular" width={"100px"} height={"100px"}></Skeleton>

      <Box sx={{ ...skeletonStyles.filters, display: "flex", justifyContent: "end", gap: "10px" }}>
        <Skeleton variant="circular" width={"30px"} height={"30px"}></Skeleton>
        <Skeleton variant="circular" width={"30px"} height={"30px"}></Skeleton>
        <Skeleton variant="circular" width={"30px"} height={"30px"}></Skeleton>
      </Box>

      <Box>
        <Box sx={skeletonStyles.listStyle}>
          <Skeleton variant="text" height={"32px"} sx={{ marginBottom: 2 }}></Skeleton>
          <Skeleton variant="rounded" height={"92px"} sx={{ marginBottom: "20px" }}></Skeleton>
        </Box>

        <Box sx={skeletonStyles.listStyle}>
          <Skeleton variant="text" height={"32px"} sx={{ marginBottom: 2 }}></Skeleton>
          <Skeleton variant="rounded" height={"92px"} sx={{ marginBottom: "20px" }}></Skeleton>
        </Box>

        <Box sx={skeletonStyles.listStyle}>
          <Skeleton variant="text" height={"32px"} sx={{ marginBottom: 2 }}></Skeleton>
          <Skeleton variant="rounded" height={"92px"} sx={{ marginBottom: "20px" }}></Skeleton>
        </Box>
      </Box>
    </>
  );
};

export default HomeSkeleton
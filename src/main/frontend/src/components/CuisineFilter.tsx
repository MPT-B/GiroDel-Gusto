import React from "react";
import { Grid, Paper, ButtonBase, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CuisineType, CuisineFilterProps } from "../models/cuisine.model";
import { gray } from "../styles/getLPTheme";

const CuisineItem = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: "35%",
  backgroundColor:
    theme.palette.mode === "light" ? theme.palette.common.white : gray[800],
  cursor: "pointer",
  overflow: "hidden",
  width: 60,
  maxWidth: 70,
  fontSize: "0.7em",
  minWidth: 30,
  transition: "background-color 0.3s, box-shadow 0.3s, transform 0.3s",
  "&:hover": {
    boxShadow: theme.shadows[10],
    transform: "translateY(-2px) scale(1.05)",
    "&::after": {
      transform: "scaleY(1)",
      opacity: 1,
    },
  },
  "&.active": {
    fontWeight: "bold",
    background: "#fdb648",
    color: theme.palette.common.white,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "8vw",
  maxWidth: 40,
  marginBottom: theme.spacing(1),
}));

const CuisineFilter: React.FC<CuisineFilterProps> = ({
  cuisineTypes,
  onCuisineClick,
  selectedCuisineId,
}) => {
  return (
    <Grid
      container
      wrap="nowrap"
      sx={{
        overflowX: "auto",
        margin: 2,
        scrollSnapType: "x mandatory",
        justifyContent: "center",
      }}
    >
      {cuisineTypes.map((cuisineType) => (
        <ButtonBase
          component="div"
          key={cuisineType.id}
          onClick={() => onCuisineClick && onCuisineClick(cuisineType.id)}
        >
          <CuisineItem
            elevation={3}
            sx={{ scrollSnapAlign: "start" }}
            className={selectedCuisineId === cuisineType.id ? "active" : ""}
          >
            <StyledAvatar src={cuisineType.icon} alt={cuisineType.type} />
            <Typography variant="caption">{cuisineType.type}</Typography>
          </CuisineItem>
        </ButtonBase>
      ))}
    </Grid>
  );
};

export default CuisineFilter;

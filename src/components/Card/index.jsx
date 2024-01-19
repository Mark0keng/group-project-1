import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import Rating from "../RatingCard";

import classes from "./style.module.scss";

const CardProduct = ({ data }) => {
  const navigate = useNavigate();

  const { id, name, price, img, rating } = data;

  console.log(fetch)
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 400}} onClick={(() => {
      navigate(`../product/${id}`)
    })}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          width="50"
          image={img}
          alt={name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '20px' }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '20px', fontWeight: 'bolder' }}>
            ${price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Rating rating={rating} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardProduct;

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { callApi, callApiCarts } from "../../domain/api";
import { useParams } from "react-router-dom";
import classes from "./style.module.scss";
import { Star } from "@mui/icons-material";
import CardProduct from "../../components/Card";
import Loading from "../../components/Loading";
import Rating from "../../components/RatingCard";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [recommend, setRecommend] = useState(null);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchRecommend();
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const res = await callApi(`/products/${id}`, "GET");
    setData(res);
    setIsLoading(false);
  };

  const fetchRecommend = async () => {
    const res = await callApi(`/products/category/${data?.category}`, "GET");
    const finalRes = res?.reduce((result, item) => {
      if (item?.id !== data?.id) {
        result.push(item);
      }
      return result;
    }, []);
    setRecommend(finalRes);
  };

  const addToCart = async () => {
    try {
      const res = await callApiCarts(`/carts`, "GET");

      const filterRes = res?.filter((item) => {
        return String(item.id) === id;
      });

      if (filterRes.length !== 0) {
        await callApiCarts(`/carts/${id}`, "PATCH", {
          qty: filterRes[0].qty + 1,
        });
      } else {
        await callApiCarts("/carts", "POST", {
          id: String(data.id),
          name: data.title,
          price: data.price,
          qty: 1,
          image: data.image,
        });
      }

      setAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <Navbar />

      {alert && <Alert severity="success">Item succesfully add to cart!</Alert>}

      <div style={{ padding: 50 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img className={classes.img} src={data?.image} alt="" />
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 24 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {data?.title}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {data?.category}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <Rating rating={data?.rating?.rate} />
                    </Typography>
                  </Grid>
                </Grid>

                <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 1.5 }}>
                  $ {data?.price}
                </Typography>
                <Typography variant="body2">{data?.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={addToCart}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid></Grid>
        </Grid>

        <Typography sx={{ fontSize: 18, fontWeight: 700, padding: 5 }}>
          Recommend Items
        </Typography>
        <div
          style={{ display: "flex", overflow: "auto", gap: 10, maxHeight: 200 }}
        >
          {recommend?.map((item, index) => {
            return (
              <CardProduct
                key={index}
                data={{
                  id: item.id,
                  name: item.title,
                  price: item.price,
                  img: item.image,
                  rating: item.rating.rate,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Detail;

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import CardProduct from "../../components/Card";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import classes from "./style.module.scss";
import { callApi } from "../../domain/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchDataProducts();
  }, [category]);

  useEffect(() => {
    search();
  }, [product]);


  const search = async () => {
    const res = await fetchDataProducts();
    
    const finalRes = res?.reduce((result, item) => {
      if (item?.name?.toLowerCase().includes(product.toLowerCase())) {
        result.push(item);
      }
      return result;
    }, []);

    setProducts(finalRes);
  };

  const fetchDataProducts = async () => {
    try {
      let response = "";

      if (category === "") {
        response = await callApi("/products", "GET");
      } else {
        response = await callApi(`/products/category/${category}`, "GET");
      }

      const modifiedData = response?.map((item) => {
        return {
          id: item.id,
          name: item.title,
          price: item.price,
          img: item.image,
          rating: item.rating.rate,
        };
      });

      setProducts(modifiedData);

      return modifiedData;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.searchFilter}>
          <TextField
            id="outlined-basic"
            label="Search for a products..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={product}
            onChange={(e) => {
              setProduct(e.target.value);
            }}
            sx={{ m: 1, width: "100%" }}
          />
          <FormControl sx={{ m: 1, width: "50%" }}>
            <InputLabel id="filter-category">Filter By Categories</InputLabel>
            <Select
              labelId="filter-category"
              id="filter-category"
              value={category}
              label="Filter By category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              <MenuItem value={"electronics"}>Electronics</MenuItem>
              <MenuItem value={"jewelery"}>Jewelery</MenuItem>
              <MenuItem value={"men's clothing"}>Mens clothing</MenuItem>
              <MenuItem value={"women's clothing"}>Womens clothing</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.cardContainer}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <CardProduct key={index} data={product} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};


export default Home;

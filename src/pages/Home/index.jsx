import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';

import classes from './style.module.scss';
import { callApi } from '../../domain/api';

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    console.log(products)

    useEffect(() => {
        fetchDataProducts();
    }, [])

    const fetchDataProducts = async () => {
        try {
            const response = await callApi("/products", "GET");

            const modifiedData = response?.map((item) => {
                return {
                    id: item.id,
                    name: item.title,
                    price: item.price,
                    desc: item.description,
                    category: item.category,
                    img: item.image,
                    rating: item.rating.rate
                }
            })

            setProducts(modifiedData);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <div className={classes.container}>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <Card key={index} data={product} />
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    )
}

export default Home
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import Navbar from '../../components/Navbar'

import { callApiCarts } from '../../domain/api'

import classes from './style.module.scss'
import Loading from '../../components/Loading';

export default function Cart() {

    const [dataCart, setDataCart] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)

    const getDataCart = async () => {
        try {
            const response = await callApiCarts('/carts', 'GET')
            setDataCart(response)

            let totPrice = 0
            response?.forEach((data) => {
                totPrice += data.price * data.qty
            })
            setTotalPrice(totPrice)

            setIsLoading(false)

        } catch (error) {

        }
    }

    const updateQty = async (params) => {
        try {
            if (params.split(',')[2] === '-') {
                if (parseInt(params.split(',')[1]) === 1) {
                    await callApiCarts(`/carts/${params.split(',')[0]}`, 'DELETE')
                } else {
                    await callApiCarts(`/carts/${params.split(',')[0]}`, 'PATCH', { qty: parseInt(params.split(',')[1]) - 1 })
                }
            } else if (params.split(',')[2] === '+') {
                await callApiCarts(`/carts/${params.split(',')[0]}`, 'PATCH', { qty: parseInt(params.split(',')[1]) + 1 })
            }

            getDataCart()
        } catch (error) {

        }
    }

    const deleteProduct = async (id) => {
        try {
            await callApiCarts(`/carts/${id}`, 'DELETE')
            getDataCart()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataCart()
    }, [])

    return (
        <>
            {isLoading && <Loading />}
            <Navbar />
            <div className={classes.container}>
                <table className={classes.tableCart}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataCart ?
                                dataCart?.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className={classes.product}>
                                                <div className={classes.name}>
                                                    <img src={data.image} alt="" />
                                                    <p>
                                                        {data.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className={classes.price}>$ {data.price}</td>
                                            <td className={classes.qty}>
                                                <div className={classes.btnQty}>
                                                    <button value={`${data.id},${data.qty},-`} onClick={(e) => updateQty(e.target.value)}>
                                                        -
                                                    </button>
                                                    {data.qty}
                                                    <button value={`${data.id},${data.qty},+`} onClick={(e) => updateQty(e.target.value)}>
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className={classes.subtotal}>
                                                $ {(data.price * data.qty).toLocaleString()}
                                            </td>
                                            <td className={classes.deleteButton}>
                                                <button onClick={() => deleteProduct(data.id)}>
                                                    <DeleteIcon fontSize='medium' />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td>
                                        Cart Empty
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
                <div className={classes.rightCard}>
                    <div className={classes.rightCardContent}>
                        <h3>
                            Total
                        </h3>
                        <p>
                            $ {totalPrice ? totalPrice.toLocaleString() : 0}
                        </p>
                    </div>
                </div>
            </div >
        </>
    )
}
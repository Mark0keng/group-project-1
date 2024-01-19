import { CircularProgress } from '@mui/material'
import React from 'react'

import classes from './style.module.scss'

export default function Loading() {
    return (
        <div className={classes.container}>
            <CircularProgress />
        </div>
    )
}

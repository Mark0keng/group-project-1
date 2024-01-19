import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import classes from './style.module.scss';

export default function Rating({rating}) {
  return (
    <div className={classes.ratingContainer}>
        {(() => {
            if (rating >= 1 && rating < 2) {
              return (
                <div>
                  <StarIcon />
                  <StarBorderOutlinedIcon />
                  <StarBorderOutlinedIcon />
                  <StarBorderOutlinedIcon />
                  <StarBorderOutlinedIcon />
                </div>
              )
            } else if ( rating >= 2 && rating < 3 ) {
              return (
                <div>
                  <StarIcon />
                  <StarIcon />
                  <StarBorderOutlinedIcon />
                  <StarBorderOutlinedIcon />
                  <StarBorderOutlinedIcon />
                </div>
              )
            } else if ( rating >= 3 && rating < 4 ) {
              return (
                <div>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarBorderOutlinedIcon />
                  <StarBorderOutlinedIcon />
                </div>
              )
            } else if ( rating >= 4 && rating < 5 ) {
              return (
                <div>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarBorderOutlinedIcon />
                </div>
              )
            } else if ( rating >= 5 ) {
              return (
                <div>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              )
            }
        })()}
    </div>
  )
}

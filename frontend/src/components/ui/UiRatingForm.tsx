import * as React from 'react';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function UiRatingForm({ onChange }) {
    const [value, setValue] = React.useState<number | null>(2.5);
    const [hover, setHover] = React.useState(-1);

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                name='starsValue'
                style={{ fontSize: 35 }}
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    if (newValue <= 1) return;
                    onChange(event);
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
            />
            {value !== null && (
                <Box sx={{ ml: 2, mb: 0.2 }} style={{ fontSize: 20 }}>
                    {hover !== -1 ? `(${hover})` : `(${value})`}
                </Box>
            )}
        </Box>
    );
}

import { Box, Rating } from '@mui/material';

import React from 'react';

const UiStars: React.FC<{ starsCount: string }> = ({ starsCount }) => {
    const fixedValue = parseFloat(starsCount).toFixed(1);
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 0.5,
            }}
        >
            <Rating defaultValue={+fixedValue} precision={0.5} readOnly sx={{ fontSize: 12 }} />
            <Box sx={{ ml: 0.5 }} style={{ fontSize: 10 }}>{`(${fixedValue})`}</Box>
        </Box>
    );
};

export default UiStars;

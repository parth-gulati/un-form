import React from 'react';
import { Box } from '@mui/material';

function ImageBox({ imageUrl }) {
  return (
    <Box
      sx={{
        width: 200,
        height: 200,
        border: '2px solid #ccc',
        borderRadius: '8px',
        backgroundColor: imageUrl ? 'transparent' : '#e0e0e0',
        backgroundImage: imageUrl
          ? `url(${imageUrl})`
          : 'url("https://via.placeholder.com/200?text=No+Image")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#aaa',
        fontSize: '18px',
      }}
    >
    </Box>
  );
}

export default ImageBox;

import Typography from '@mui/material/Typography';
import { useState } from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import useTimeout from 'utils/hooks/useTimeout';

import './style.css';

interface ContentLoadingProps {
  delay?: number;
  dynamicHeight?: boolean;
}

function ContentLoading({ delay, dynamicHeight }: ContentLoadingProps) {
  const [showLoading, setShowLoading] = useState(!delay);

  useTimeout(() => {
    setShowLoading(true);
  }, delay);

  return (
    <div
      className={clsx(
        dynamicHeight
          ? 'flex flex-col justify-center items-center h-full min-h-216'
          : 'flex flex-1 flex-col items-center pt-[20vh] h-full',
        !showLoading && 'hidden'
      )}
    >
      <Typography variant="h6" color="text.secondary">
        Loading
      </Typography>
      <Box
        id="spinner"
        sx={{
          '& > div': {
            backgroundColor: 'palette.secondary.main',
          },
        }}
      >
        <div className="bounce1 !bg-gray-400" />
        <div className="bounce2 !bg-gray-400" />
        <div className="bounce3 !bg-gray-400" />
      </Box>
    </div>
  );
}

export default ContentLoading;

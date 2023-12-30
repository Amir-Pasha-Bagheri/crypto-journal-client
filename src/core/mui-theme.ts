import { ThemeOptions } from '@mui/material';

const themeConfig: ThemeOptions = {
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
};

export default themeConfig;

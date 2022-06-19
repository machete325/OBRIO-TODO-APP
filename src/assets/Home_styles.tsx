import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const MainButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: 'rgb(46 193 193)',
  width: 'inherit',
  '&:hover': {
    backgroundColor: 'rgb(18 159 159)',
  },
}));

export const FooterButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: '#d2192ed4',
  width: '400px',
  '&:hover': {
    backgroundColor: '#d2192e',
  },
}));

export const ListIconButton = styled(IconButton)<IconButtonProps>(() => ({
  borderRadius: '4px',
  backgroundColor: 'rgb(46 193 193)',
  '&:hover': {
    backgroundColor: 'rgb(46 193 193)',
  },
}));

export const ListIcon = styled(ListAltIcon)(() => ({
  color: 'rgb(255 255 255)',
}));

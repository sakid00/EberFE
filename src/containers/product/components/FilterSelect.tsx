import {
  Box,
  Checkbox,
  Input,
  InputAdornment,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { styles } from '../style';
import { FilterSelectProps } from '../types';
import { useDeviceType } from '@/hooks/useDeviceType';

const FilterSelect: React.FC<FilterSelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder,
  hasSelection,
  isApplication = false,
}) => {
  const { type } = useDeviceType();
  const selectStyle = isApplication
    ? styles.getApplicationSelectStyle(hasSelection, type)
    : styles.getSelectStyle(hasSelection, type);

  return (
    <Select
      id={id}
      value={value}
      IconComponent={KeyboardArrowDown}
      sx={selectStyle}
      input={
        <Input
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <Typography fontSize={'1em'}>{placeholder}</Typography>
            </InputAdornment>
          }
        />
      }
      multiple
      onChange={onChange}
      renderValue={(selected) => (
        <Box sx={styles.selectedCounter}>
          <Box sx={styles.selectedBadge}>{selected.length}</Box>
          <Typography variant="body2" sx={styles.selectedText}>
            Selected
          </Typography>
        </Box>
      )}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={value.includes(option)} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default FilterSelect;

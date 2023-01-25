import { Box } from '@mui/material';
import React from 'react';

export type TabPanelProps = {
  index: number;
  value: number;
} & JSX.IntrinsicElements['div'];

/**
 * A tab panel to be used with a tab container element.
 * @param props See {@link TabPanelProps}.
 * @returns The component
 * @see https://mui.com/material-ui/react-tabs/
 */
export function TabPanel(props: React.PropsWithChildren<TabPanelProps>) {
  const {
    children,
    value,
    index,
    ...other
  } = props;

  const id = `tabpanel-${index}`;
  const hidden = value !== index;

  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={id}
      aria-labelledby={id}
      {...other}
    >
      {!hidden && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

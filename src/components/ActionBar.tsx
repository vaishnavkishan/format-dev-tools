import type { ReactNode } from "react";
import {
  IconButton,
  Stack,
  Tooltip,
  type SxProps,
  type Theme,
} from "@mui/material";

type ActionButtonConfig = {
  key: string;
  tooltip: string;
  icon: ReactNode;
  onClick: () => void;
  hoverColor?: string;
  sx?: SxProps<Theme>;
};

interface ActionBarProps {
  actions: ActionButtonConfig[];
  spacing?: number;
}

const iconButtonSx: SxProps<Theme> = {
  color: "text.secondary",
  "&:hover": { color: "primary.main" },
  "& .MuiSvgIcon-root": { fontSize: "18px" },
};

const getIconButtonSx = (
  hoverColor?: string,
  customSx?: SxProps<Theme>,
): SxProps<Theme> => {
  const sxArray = [
    iconButtonSx,
    hoverColor ? { "&:hover": { color: hoverColor } } : null,
    customSx,
  ].filter(Boolean) as SxProps<Theme>[];

  return sxArray as SxProps<Theme>;
};

export default function ActionBar({ actions, spacing = 1 }: ActionBarProps) {
  return (
    <Stack direction="row" spacing={spacing}>
      {actions.map(({ key, tooltip, icon, onClick, hoverColor, sx }) => (
        <Tooltip title={tooltip} arrow key={key}>
          <IconButton
            size="small"
            onClick={onClick}
            aria-label={tooltip}
            sx={getIconButtonSx(hoverColor, sx)}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
}

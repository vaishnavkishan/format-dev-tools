import type { SyntheticEvent } from "react";
import { Tab, Tabs, type SxProps, type Theme } from "@mui/material";

export interface SectionTab {
  value: number | string;
  label: string;
  ariaLabel?: string;
}

interface SectionTabsProps {
  tabs: SectionTab[];
  value: number | string;
  onChange?: (event: SyntheticEvent, value: number | string) => void;
  sx?: SxProps<Theme>;
}

export default function SectionTabs({
  tabs,
  value,
  onChange,
  sx,
}: SectionTabsProps) {
  const mergedSx = [
    {
      minHeight: "auto",
      "& .MuiTab-root": {
        minHeight: 32,
        fontSize: "0.75rem",
        px: 1,
      },
    },
    ...(sx ? [sx] : []),
  ] as SxProps<Theme>;

  return (
    <Tabs value={value} onChange={onChange} sx={mergedSx}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          aria-label={tab.ariaLabel}
          sx={{ minHeight: "32px" }}
        />
      ))}
    </Tabs>
  );
}

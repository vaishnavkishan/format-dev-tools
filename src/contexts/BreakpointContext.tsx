/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useContext, useMemo } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

// ✅ Define the context type
interface BreakpointContextType {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  up: (key: "sm" | "md" | "lg" | "xl") => boolean;
  down: (key: "sm" | "md" | "lg" | "xl") => boolean;
}

// ✅ Default fallback (useful for SSR or testing)
const BreakpointContext = createContext<BreakpointContextType>({
  isXs: false,
  isSm: false,
  isMd: false,
  isLg: false,
  isXl: false,
  up: () => false,
  down: () => false,
});

// ✅ Provider component
export const BreakpointProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();

  // MUI media queries
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const up = (key: "sm" | "md" | "lg" | "xl") =>
    useMediaQuery(theme.breakpoints.up(key));

  const down = (key: "sm" | "md" | "lg" | "xl") =>
    useMediaQuery(theme.breakpoints.down(key));

  const value = useMemo(
    () => ({
      isXs,
      isSm,
      isMd,
      isLg,
      isXl,
      up,
      down,
    }),
    [isXs, isSm, isMd, isLg, isXl]
  );

  return (
    <BreakpointContext.Provider value={value}>
      {children}
    </BreakpointContext.Provider>
  );
};

// ✅ Hook for easy usage
// eslint-disable-next-line react-refresh/only-export-components
export const useBreakpoint = () => useContext(BreakpointContext);

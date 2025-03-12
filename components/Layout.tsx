import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import SideNav from "./navs/SideNav";

import Toggle from "../components/Toggle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useRouter } from "next/router";
import NoAuth from "./NoAuth";
import { setThemeColor } from "../state/user";

const Container = styled.div`
  height: 100%;
  min-height: 100%;
  background-color: ${({ theme }) => theme.background};
`;
const NavWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  height: 100%;
  min-height: 100%;
  background-color: ${({ theme }) => theme.background};
  max-width: 100%;
  & > div:last-child {
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    height: 100%;
  }
  & > div {
    height: 100%;
  }
`;
const Layout = ({ children }: { children: JSX.Element }) => {
  const [themes, setTheme] = useState<string>("dark");
  const [token, setToken] = useState<string | null>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const excludedRoutes = ["/join"];
  const setMode = (mode: string) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  useEffect(() => {
    const tokens = window.localStorage.getItem("kanbanToken");
    setToken(tokens);
    if (!tokens) {
      router.push("/signup");
    }
  }, [token]);

  const themeToggler = (e: any) => {
    // et.stopPropagation()
    themes === "light" ? setMode("dark") : setMode("light");
    dispatch(setThemeColor({ theme: themes === "light" ? "dark" : "light" }));
  };

  return (
    <>
      {token ? (
        <Container>
          <NavWrapper>
            {!excludedRoutes.includes(router.pathname) && <SideNav />}

            <div>{children}</div>
          </NavWrapper>
          <Toggle toggleTheme={themeToggler} theme={themes} />
        </Container>
      ) : (
        <NoAuth />
      )}
    </>
  );
};

export default Layout;

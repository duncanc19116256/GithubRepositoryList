import React, { Component } from "react";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  TextField,
} from "@mui/material";
import rStyle from "./repoList.module.css";

function RepoList() {
  const { owner } = useParams();
  const navigate = useNavigate();

  const listRef = useRef<HTMLDivElement>(null);

  const [username, setUsername] = useState(owner);
  const [repoList, setList] = useState<any[]>([]);
  const [listPage, setListPage] = useState(1);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  /*
   *  handleUsernameChange(): This function handles the state change of username
   *    and also dynamically updates the url to match the username field.
   *
   */
  const handleUsernameChange = (name: string) => {
    setUsername(name);
    navigate(`/users/${name}/repos`);
  };

  /*
   *  fetchList(): This function requests a list of repositories from the API,
   *    using the state "username," and stores in the state "repoList" as an
   *    array.
   *
   */
  const fetchList = async () => {
    setLoading(true);
    await fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setLoading(false);
        setList((prev) => [...prev, ...result]);
        if (result.length === 0) {
          setErrorMessage("Repository Not Found");
        } else {
          setErrorMessage("");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const scrollListener = useCallback(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      setTimeout(() => {
        if (Math.round(scrollTop) + clientHeight === scrollHeight && !loading) {
          setReachedBottom(true);
          setListPage((prev) => prev + 1);
        }
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (username && username.length !== 0) {
      if (reachedBottom) {
        /* Does not reset list to empty and list to 1 if user has 
           the reached the bottom */
        fetchList();
        setReachedBottom(false);
      } else {
        setListPage(1);
        setList([]);
        fetchList();
      }
    } else {
      setList([]);
      setListPage(1);
      setErrorMessage("Username cannot be empty!");
    }
  }, [username, listPage]);

  useLayoutEffect(() => {
    const tableRef = listRef.current;
    tableRef?.addEventListener("scroll", scrollListener);

    return () => {
      tableRef?.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  return (
    <div>
      <div className={rStyle.searchContainer}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="username"
            variant="filled"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
          />
        </Box>
      </div>

      <div style={{ color: "red" }}>
        {errorMessage?.length !== 0 ? "**" + errorMessage + "**" : ""}
      </div>

      <TableContainer sx={{ maxHeight: 440 }} ref={listRef}>
        <Table stickyHeader aria-label="Repository List">
          <TableHead>
            <TableRow>
              <TableCell align="center" width="50%">
                Name
              </TableCell>
              <TableCell align="center" width="50%">
                Stargazers_count
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repoList?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Link to={`/users/${username}/repos/${row.name}`}>
                    <Button variant="outlined">{row.name}</Button>
                  </Link>
                  {/* <Button variant="outlined">{row.name}</Button> */}
                </TableCell>
                <TableCell align="center">{row.stargazers_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RepoList;

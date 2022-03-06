import React, { Component } from "react";
import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import rdStyle from "./repoDetail.module.css";

import { Card, CardContent, Button, Typography } from "@mui/material";

function RepoDetails() {
  const [repoDetails, setRepo] = useState<any>({});
  const octokit = new Octokit({
    auth: `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`,
  });
  const { owner, repo } = useParams();

  /*
   *  fetchRepo: This function requests the detail of a respoitory given the
   *    owner and repository name.
   *
   */
  const fetchRepo = async () => {
    await octokit
      .request("GET /repos/{username}/{repository}", {
        username: owner,
        repository: repo,
      })
      .then((response) => {
        setRepo(response.data);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  useEffect(() => {
    fetchRepo();
  }, []);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Repository Fullname
        </Typography>
        <Typography variant="h5" component="div">
          {repoDetails?.full_name}
        </Typography>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Description
        </Typography>
        <Typography variant="body2">{repoDetails?.description}</Typography>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Stargazers count
        </Typography>
        <Typography variant="body2">{repoDetails?.stargazers_count}</Typography>
      </CardContent>
      <div className={rdStyle.buttonContainer}>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          href={repoDetails?.html_url}
          target="_blank"
        >
          Go to Github
        </Button>
        <br />
        <Link to={`/users/${owner}/repos`} style={{ textDecoration: "none" }}>
          <Button variant="outlined">Back to List</Button>
        </Link>
      </div>
    </Card>
  );
}

export default RepoDetails;

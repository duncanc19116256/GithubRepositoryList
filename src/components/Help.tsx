import React, { Component } from "react";
import dStyle from "./Help.module.css";

function Help() {
  return (
    <div className={dStyle.descContainer}>
      <div style={{ fontWeight: "bold" }}>SPECIFICATION</div> <br />
      Use the search field to get a list of public repositories under an
      existing Github user. The list will only display 10 repositories max on
      first load. Once you scroll to the bottom, it will reload the next 10
      repositories, and so on (until there are no more repositories). <br />{" "}
      <br />
      Click on &quot;Name&quot; to get more details about the specific repo.{" "}
      <br /> <br />
      Once you are routed to the page that displays the detail (repo fullname,
      description, and stargazers_count), you also have the option to return to
      the original list, or to open the github page in a new tab.
    </div>
  );
}

export default Help;

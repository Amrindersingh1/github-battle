import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import { fetchPopularRepos } from "../utils/Api";
import LanguageCard from "./LanguageCard";

const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

function BodyGrid({ repos }) {
  return (
    <ul>
      {repos.map((repo, index) => {
        
        return(<LanguageCard key={index} repo={repo} index={index}/>);
      })}
    </ul>
  );
}

function Navbar({ selectedLanguage, updateLanguage }) {
  return (
    <AppBar position="static" color="default">
      <Tabs
        value={selectedLanguage}
        onChange={updateLanguage}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {languages.map(language => (
          <Tab key={language} label={language} />
        ))}
      </Tabs>
    </AppBar>
  );
}

export default class Popular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 0,
      repos: {},
      error: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(event, selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
      repos: {}
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }));
        })
        .catch(error => {
          console.warn("Error fetching repos: ", error);

          this.setState({
            error: `There was an error fetching the repositories.`
          });
        });
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <Navbar
          selectedLanguage={selectedLanguage}
          updateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <LinearProgress color="secondary" />}

        {error && <p>{error}</p>}

        {repos[selectedLanguage] && (
          <pre>
            <BodyGrid repos={repos[selectedLanguage]} />
            )}
          </pre>
        )}
      </React.Fragment>
    );
  }
}

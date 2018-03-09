import { Trie } from "@goodalls/complete-me-master";
import React, { Component } from "react";
import PropTypes from "prop-types";
import cities from "./cities.js";
import "../css/Search.scss";

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      city: "",
      suggestedCities: []
    };

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.trie = new Trie();
    this.trie.populate(cities.data);
  }

  handleCityChange(e) {
    this.setState({
      city: e.target.value,
      suggestedCities: this.suggestCities(e)
    });
  }

  suggestCities(e) {
    let suggestions = [];

    if (e.target.value.length >= 3 && !parseInt(e.target.value)) {
      suggestions = this.trie.suggest(e.target.value.toLowerCase());
      suggestions = suggestions.slice(0, 10);
    }

    if (parseInt(e.target.value)) {
      suggestions.push(e.target.value);
    }

    return suggestions;
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props.getWeatherData(this.state.suggestedCities[0]);
      e.target.value = "";
    }
  }

  render() {
    return (
      <div className="Search">
        <p>Show me the weather in...</p>
        <div className="search-container">
          <div className="search-bar">
            <i className="fa fa-search fa-lg" aria-hidden="true" />
            <form>
              <label htmlFor="seach-box">
                <input
                  id="search-box"
                  list="cities"
                  type="search"
                  onChange={this.handleCityChange}
                  onKeyPress={this.handleKeyPress}
                  placeholder="Enter City & State, Zip Code"
                />
              </label>

              <datalist id="cities">
                {this.state.suggestedCities.map((suggestion, index) => {
                  let capSuggestion = suggestion;

                  if (parseInt(suggestion) === NaN) {
                    capSuggestion = suggestion.split(", ");

                    capSuggestion[1] = capSuggestion[1].toUpperCase();
                    capSuggestion[0] =
                      capSuggestion[0].charAt(0).toUpperCase() +
                      capSuggestion[0].slice(1);
                    capSuggestion = capSuggestion.join(", ");
                  }
                  return <option value={capSuggestion} key={index} />;
                })}
              </datalist>
            </form>
          </div>
          <button
            onClick={() =>
              this.props.getWeatherData(this.state.suggestedCities[0])
            }
            className="button"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  getWeatherData: PropTypes.func
};

import React, { Component } from "react";

export class Spinner extends Component {
  render() {
    return (
      <div
        class="d-flex justify-content-center"
        style={{ alignItems: "center" }}
      >
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Spinner;

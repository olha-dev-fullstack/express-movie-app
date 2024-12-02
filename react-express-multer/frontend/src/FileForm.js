import React, { Component } from "react";
import axios from "axios";

class FileForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Submitted");
    const file = document.getElementById("file-field").files[0];
    const file2 = document.getElementById("file-field2").files[0];

    // let url = "http://localhost:3030/uploadFile";
    let url = "http://localhost:3030/uploadS3";

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("meme", file);
    if (file2) {
      data.append("meme", file2);
      url = "http://localhost:3030/uploadFiles";
    }
    console.log(data);
    axios.post(url, data, config).then((response) => {
      console.log(response.data);
    });
  };

  render() {
    return (
      <div>
        <h1>Sanity Check</h1>
        <form onSubmit={this.handleSubmit}>
          <input id="file-field" type="file" name="meme" />
          <input id="file-field2" type="file" name="meme" />

          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default FileForm;

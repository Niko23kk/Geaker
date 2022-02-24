import React from "react";

export class Publish extends React.Component {
  componentDidMount() {
    fetch("/publisher", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    if (this.state !== null) {
      return (
        <table>
          {this.state.items.map((item) => (
            <tr>
              <td>{item.name}</td>
            </tr>
          ))}
        </table>
      );
    } else {
      return "";
    }
  }
}

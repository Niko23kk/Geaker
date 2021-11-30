import React from "react";
import "./css/catalogItem.css";
class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_open">
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>X</button>
        </div>
      </div>
    );
  }
}
export default Popup;

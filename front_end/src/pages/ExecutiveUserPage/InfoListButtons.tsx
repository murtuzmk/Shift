import React from "react";
class InfoListButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ["Item 1", "Item 2", "Item 3"],
    };
  }

  handleButtonClick = (item) => {
    console.log(`Button clicked for ${item}`);
  };

  render() {
    return (
      <ul>
        {this.state.items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => this.handleButtonClick(item)}>
              Click me
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default InfoListButtons;

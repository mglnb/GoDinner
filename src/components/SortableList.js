import React, { Component } from "react";
import { render } from "react-dom";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import { Icon } from "semantic-ui-react";

class Item extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <li className={"restaurant_menu__modal__list__item"}>
        <Icon name={"content"} style={{ cursor: "row-resize" }} />
        <div className={"option"}>
          <span className={"option_name"}> {this.props.value} </span>
          <span className={"option_desc"}> {this.props.description} </span>
          <span className={"option_desc"}> {this.props.price.toLocaleString('pt-BR', {style : 'currency' ,currency: 'BRL'})} </span>
        </div>
        <input
          type={"radio"}
          onClick={() => this.props.removeIndex(this.props.indexTwo)}
        />
        <Icon name="x" size={"large"} />
      </li>
    );
  }
}

const SortableItem = SortableElement(props => <Item {...props} />);

const SortableList = SortableContainer(
  ({ items, removeIndex, onChangeItem }) => {
    return (
      <ul className={"restaurant_menu__modal__list"}>
        {items.map(({ value, description, price }, index) => (
          <React.Fragment key={`item-${index}`}>
            <SortableItem
              key={`item-${index}`}
              index={index}
              value={value}
              description={description}
              price={price}
              onChangeItem={onChangeItem}
              indexTwo={index}
              removeIndex={removeIndex}
            />
          </React.Fragment>
        ))}
      </ul>
    );
  }
);
export default SortableList;

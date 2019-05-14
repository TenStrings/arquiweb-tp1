import React from 'react';
import {Tag} from 'antd';

const CheckableTag = Tag.CheckableTag;
const tag_colors = ["magenta", "red", "volcano", "orange", "gold", "lime",
                    "green", "cyan", "blue", "geekblue", "purple"]

class CategoryFilter extends React.Component {

    state = {
      selected_categories : []
    }

    componentDidMount(){
      this.setState((state, props) => ({
          selected_categories: new Set(props.categories.map( category => category.title )),
        })
      )
    }

    handleChange(category_name, checked) {
      const { selected_categories } = this.state;
      const nextSelectedTags = checked ? selected_categories.add(category_name) : selected_categories.delete(category_name);
      this.setState({ selected_categories: nextSelectedTags }, this.notifyChange);
    }

    notifyChange = () => {
        this.props.updateMapWith(this.filterPoints)
    }

    filterPoints = points => {
        const {selected_categories} = this.state
        console.log("hello");
        return points.filter(point => {
            return selected_categories.has(point.category_name)
        })
    }
    //
    render() {
        const all_categories = this.props.categories;
        const { selected_categories } = this.state;
        return (
          <div>
          {all_categories.map(category => (
                <CheckableTag
                  key={category.title}
                  checked={ tag => selected_categories.has(tag.key) > -1}
                  onChange={ checked => this.handleChange(category.title, checked)}
                >
                  {category.title}
                </CheckableTag>
              ))}
            </div>
        );
    }
}

export default CategoryFilter;

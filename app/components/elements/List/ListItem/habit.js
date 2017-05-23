import React, { PropTypes, Component } from 'react';
import './list-item.css';

import { Label, Button, Glyphicon } from 'react-bootstrap';

const mapCategoryToStyle = cat => {
    switch (cat) {
        case 'godmode':
            return 'primary';
        case 'really good':
            return 'success';
        case 'good':
            return 'default';
        case 'bad':
            return 'info';
        case 'really bad':
            return 'warning';
        case 'ultimate sin':
            return 'danger';
    }
};

export default class Habit extends Component {
    static propTypes = {
        isMobile: PropTypes.bool.isRequired,
        item: PropTypes.object.isRequired,
        edit: PropTypes.func.isRequired,
        submitEdit: PropTypes.func.isRequired,
    };

    recordHabit = () => {
        const intVal = parseInt(this.props.item.content);
        this.props.submitEdit(
            {
                content: (intVal + 1).toString(),
                tally: true,
            },
            this.props.item,
        );
    };

    render() {
        return (
            <li>
                <span>
                    {this.props.item.title}
                </span>
                <Label bsStyle={mapCategoryToStyle(this.props.item.category)}>
                    {this.props.item.category}
                </Label>
                <Button
                    block={this.props.isMobile}
                    bsSize="xsmall"
                    onClick={this.recordHabit}
                >
                    <Glyphicon glyph="plus" />
                </Button>
                <Button
                    block={this.props.isMobile}
                    bsSize="xsmall"
                    onClick={() => this.props.edit(this.props.item.id)}
                >
                    <Glyphicon glyph="edit" />
                </Button>
            </li>
        );
    }
}

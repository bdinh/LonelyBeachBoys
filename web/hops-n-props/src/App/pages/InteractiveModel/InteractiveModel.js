import React, { Component } from 'react';
import './InteractiveModel.css';

export class InteractiveModel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeholder: '',
        }

        // Bind reminder
        // this.handlePost = this.handlePost.bind(this);
    }

    // handleThing() {
    //     this.setState({
    //         posts: createdPosts
    //     })
    // }

    render() {
        return (
            <div>
                Interactive Model
            </div>
        );
    }
}
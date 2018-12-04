import React, { Component } from 'react';
import './Exploration.css';

export class Exploration extends Component {
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
                Exploration
            </div>
        );
    }
}
import React, { Component } from 'react';
import './Results.css';

export class Results extends Component {
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
                Results
            </div>
        );
    }
}
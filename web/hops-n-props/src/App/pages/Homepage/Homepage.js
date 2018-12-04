import React, { Component } from 'react';
import './Homepage.css';

export class Homepage extends Component {
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
                Homepage
            </div>
        );
    }
}
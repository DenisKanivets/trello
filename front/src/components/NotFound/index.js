import React, {Component} from 'react';
import './notFound.scss'

class NotFound extends Component {
    render() {
        return (
            <div className="notfound">
                <h3>404 error. Page not found.</h3>
                <h3>We are sorry, but the page you requested was not found.</h3>
            </div>
        );
    }
}

export default NotFound;

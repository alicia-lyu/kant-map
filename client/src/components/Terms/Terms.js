import { Net } from "./Net";
import React from "react";

export class Terms extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1 className="text-main">Network of Kantian Terms</h1>
                <Net />
            </div>
        )}
}


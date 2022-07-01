import React from "react";

export default class ErrorBoundary extends React.Component {

    state = {
        errorMessage: '',
        errorStack: '',
        hasError: false
    };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {
            errorMessage: error.message,
            errorStack: error.stack,
            hasError: true
        };
    }

    render() {

        if (this.state.hasError) {
            // Error case action
            return (
                <div className="text-error">
                    <h2>Issue to report</h2>
                    <code>{this.state.errorMessage}</code><br />
                    <h4>Submit below to the support team</h4>
                    <pre>{this.state.errorStack}</pre>
                </div>
            )
        }

        return this.props.children;
    }
}

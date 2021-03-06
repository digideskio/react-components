/* TODO(emily): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");

/* You know when you want to propagate input to a parent...
 * but then that parent does something with the input...
 * then changing the props of the input...
 * on every keystroke...
 * so if some input is invalid or incomplete...
 * the input gets reset or otherwise effed...
 *
 * This is the solution.
 *
 * Enough melodrama. Its an input that only sends changes
 * to its parent on blur.
 */
var BlurInput = React.createClass({
    propTypes: {
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return { value: this.props.value };
    },
    render: function() {
        return <input
            {...this.props}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur} />;
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ value: nextProps.value });
    },
    handleChange: function(e) {
        this.setState({ value: e.target.value });
    },
    handleBlur: function(e) {
        this.props.onChange(e.target.value);
    }
});

module.exports = BlurInput;

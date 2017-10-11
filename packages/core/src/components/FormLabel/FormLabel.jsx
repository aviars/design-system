import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * The FormLabel component provides the label/legend for a field, along with any
 * associated hint text and error messaging.
 */
export class FormLabel extends React.PureComponent {
  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <span
          className='ds-c-field__hint ds-u-color--error'
          id={`${this.props.fieldId}-message`}
          role='alert'
        >
          {this.props.errorMessage}
        </span>
      );
    }
  }

  renderHint(content) {
    if (content) {
      const classes = classNames(
        'ds-c-field__hint',
        {'ds-c-field__hint--inverse': this.props.inversed}
      );
      return <span className={classes}>{content}</span>;
    }
  }

  hint() {
    return this.renderHint(this.props.hint);
  }

  requirementLabel() {
    const { requirementLabel } = this.props;
    return this.renderHint(
      typeof requirementLabel === 'string'
        ? <span className='ds-u-font-weight--bold'>{requirementLabel}</span>
        : requirementLabel
    );
  }

  render() {
    const ComponentType = this.props.component;
    const labelTextClasses = this.props.errorMessage && 'ds-u-font-weight--bold';
    const classes = classNames('ds-c-label', this.props.className);

    return (
      <ComponentType className={classes} htmlFor={this.props.fieldId}>
        <span className={labelTextClasses}>{this.props.children}</span>
        {this.errorMessage()}
        {this.hint()}
        {this.requirementLabel()}
      </ComponentType>
    );
  }
}

FormLabel.defaultProps = { component: 'label' };
FormLabel.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root element.
   */
  className: PropTypes.string,
  /** The root HTML element used to render the label */
  component: PropTypes.oneOf(['label', 'legend']),
  /** Enable the error state by providing an error message. */
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * The ID of the field this label is for. This is used for the label's `for`
   * attribute and any related ARIA attributes, such as for the error message.
   */
  fieldId: function(props, propName, componentName) {
    if (props.errorMessage && props[propName] == null) {
      return new Error(`Prop \`${propName}\` is required when specifying an \`errorMessage\`. None specified for ${componentName}.`);
    }
    else {
      return PropTypes.node.apply(PropTypes.node, arguments);
    }
  },
  /**
   * Additional hint text to display
   */
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See []().
   */
  requirementLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: PropTypes.bool
};

export default FormLabel;

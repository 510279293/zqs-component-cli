// utils
import classNames from 'classnames';
import { createNamespace } from '../utils';
import Icon from '../icon';

// Types
import { getComponentFromProp } from '../utils/props-util';

export function hasPrefixSuffix(instance) {
  return !!(
    getComponentFromProp(instance, 'prefix') ||
    getComponentFromProp(instance, 'suffix') ||
    instance.$props.allowClear
  );
}
export function getInputClassName(prefixCls, size, disabled) {
  return classNames(prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-disabled`]: disabled,
  });
}

const props = {
  prefixCls: String,
  inputType: String,
  value: [String, Number],
  defaultValue: [String, Number],
  allowClear: Boolean,
  element: [Object],
  handleReset: Function,
  disabled: Boolean,
  size: {
      type: String,
      default: 'default'
  },
  suffix: [String, Object, Array],
  prefix: [String, Object, Array],
  addonBefore: [String, Object, Array],
  addonAfter: null,
  className: String,
  readOnly: Boolean
}

const ClearableInputType = ['text', 'input']
const [createComponent, ] = createNamespace('wrapper')


export default createComponent({
  props,
  methods: {
    renderClearIcon(prefixCls) {
      const { allowClear, value, disabled, readOnly, inputType, handleReset } = this.$props;
      if (
        !allowClear ||
        disabled ||
        readOnly ||
        value === undefined ||
        value === null ||
        value === ''
      ) {
        return null;
      }
      const className =
        inputType === ClearableInputType[0]
          ? `${prefixCls}-textarea-clear-icon`
          : `${prefixCls}-clear-icon`;
      return (
        <Icon
          type="close-circle"
          onClick={handleReset}
          class={className}
        />
      );
    },

    renderSuffix(prefixCls) {
      const { suffix, allowClear } = this.$props;
      if (suffix || allowClear) {
        return (
          <span class={`${prefixCls}-suffix`}>
            {this.renderClearIcon(prefixCls)}
            {suffix}
          </span>
        );
      }
      return null;
    },

    renderLabeledIcon(prefixCls, element) {
      const props = this.$props;
      const suffix = this.renderSuffix(prefixCls);
      if (!hasPrefixSuffix(this)) {
        return Object.assign(element, {
          props: { value: props.value },
        });
      }

      const prefix = props.prefix ? (
        <span class={`${prefixCls}-prefix`}>{props.prefix}</span>
      ) : null;
      // console.log('caonima', props.className)
      const affixWrapperCls = classNames(props.className, `${prefixCls}-affix-wrapper`, {
        [`${prefixCls}-affix-wrapper-sm`]: props.size === 'small',
        [`${prefixCls}-affix-wrapper-lg`]: props.size === 'large',
        [`${prefixCls}-affix-wrapper-input-with-clear-btn`]:
          props.suffix && props.allowClear && this.$props.value,
      });

      return (
        <span class={affixWrapperCls} style={props.style}>
          {prefix}
          {Object.assign(element, {
            style: null,
            props: { value: props.value },
            class: getInputClassName(prefixCls, props.size, props.disabled),
          })}
          {suffix}
        </span>
      );
    },

    renderInputWithLabel(prefixCls, labeledElement) {
      const { addonBefore, addonAfter, style, size, className } = this.$props;
      // Not wrap when there is not addons
      if (!addonBefore && !addonAfter) {
        return labeledElement;
      }

      const wrapperClassName = `${prefixCls}-group`;
      const addonClassName = `${wrapperClassName}-addon`;
      const addonBeforeNode = addonBefore ? (
        <span class={addonClassName}>{addonBefore}</span>
      ) : null;
      const addonAfterNode = addonAfter ? <span class={addonClassName}>{addonAfter}</span> : null;

      const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`, {
        [wrapperClassName]: addonBefore || addonAfter,
      });

      const mergedGroupClassName = classNames(className, `${prefixCls}-group-wrapper`, {
        [`${prefixCls}-group-wrapper-sm`]: size === 'small',
        [`${prefixCls}-group-wrapper-lg`]: size === 'large',
      });

      // Need another wrapper for changing display:table to display:inline-block
      // and put style prop in wrapper
      // console.log(mergedGroupClassName, mergedWrapperClassName)
      return (
        <span class={mergedGroupClassName} style={style}>
          <span class={mergedWrapperClassName}>
            {addonBeforeNode}
            {Object.assign(labeledElement, { style: null })}
            {addonAfterNode}
          </span>
        </span>
      );
    },

    renderTextAreaWithClearIcon(prefixCls, element) {
      const { value, allowClear, className, style } = this.$props;
      if (!allowClear) {
        return Object.assign(element, {
          props: { value },
        });
      }
      const affixWrapperCls = classNames(
        className,
        `${prefixCls}-affix-wrapper`,
        `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
      );
      return (
        <span class={affixWrapperCls} style={style}>
          {Object.assign(element, {
            style: null,
            props: { value },
          })}
          {this.renderClearIcon(prefixCls)}
        </span>
      );
    },

    renderClearableLabeledInput() {
      const { prefixCls, inputType, element } = this.$props;
      if (inputType === ClearableInputType[0]) {
        return this.renderTextAreaWithClearIcon(prefixCls, element);
      }
      return this.renderInputWithLabel(prefixCls, this.renderLabeledIcon(prefixCls, element));
    },
  },
  render() {
    return this.renderClearableLabeledInput();
  },
})

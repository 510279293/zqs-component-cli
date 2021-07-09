// utils
import { createNamespace } from '../utils';
import { inherit, emit, getListeners } from '../utils/functional';
import Icon from '../icon';
import Wrapper from './Wrapper.js'
// Types
const [createComponent, bem ] = createNamespace('input')

function noop(){}

export const props = {
    value: [String],
    defaultValue: [String],
    placeholder: [String, Number],
    disabled: Boolean,
    readOnly: Boolean,
    addonBefore: null,
    addonAfter: null,
    prefix: null,
    suffix: null,
    autoFocus: Boolean,
    allowClear: Boolean,
    maxLength: [Number],
    loading: Boolean,
    lazy: {
        type: Boolean,
        default: true
    },
    size: {
        type: String,
        default: 'default'
    },
    type: {
        type: String,
        default: 'text'
    },
    prefixCls: {
        type: String,
        default: bem(),
    },
    className: {
        default: ''
    }
}

export default createComponent({
   props: {
       ...props
   },
   methods: {
      renderInput() {
        const {$attrs, $props } = this
        const { size, disabled, defaultValue, value } = $props
        const inputProps = {
            ref: 'input',
            key: 'z-input',
            attrs: {...$props, ...$attrs},
            domProps: {
                value
            },
            class: bem({
                [size]: size,
                disabled
            }),
            on: {
                ...getListeners(this),
                change: noop,
                input: (event) => {
                    this.$emit('input', event.target.value)
                },
                keydown: (event) => {
                    if (event.keyCode === 13) {
                        this.$emit('pressEnter', event)
                    }
                    this.$emit('keydown', event)
                }
            }
        }
        return (
            <input {...inputProps} />
        )
      },
      handleReset(){

      }
   },
   render(h) {
       const { $props, $slots } = this
       const props = {
           props: {
                ...$props,
                inputType: 'input',
                element: this.renderInput(),
                handleReset: this.handleReset,
                ...$slots
           },
           on: getListeners(this),
       }
       return (
           <Wrapper {...props} />
       )
   }
})

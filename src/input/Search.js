// utils
import classNames from 'classnames';
import { createNamespace } from '../utils';
import { inherit, emit } from '../utils/functional';
import { getOptionProps, getComponentFromProp, getListeners } from '../utils/props-util';
import Icon from '../icon';
import Button from '../button'
import Wrapper from './Wrapper.js'
// Types
import Input, {props, InputProps} from './Input'
function noop(){}

const [createComponent, bem ] = createNamespace('input-search')
const ActionMap = {
    click: 'click',
    hover: 'mouseover'
}

export default createComponent({
   props: {
       ...props,
       enterButton: null,
       prefixCls: {
            type: String,
            default: bem(),
        },
   },
   data() {
       return {
           visible: false
       }
   },
   methods: {
       focus() {
           this.$refs.input.focus()
       },
       blur() {
           this.$refs.input.blur()
       },
       onSearch(e) {

       },
       onChange(e) {

       },
       renderLoading(prefixCls) {
           const {size} = this.$props
           let { enterButton } = this.$props
           enterButton = enterButton || enterButton === ''
           if (enterButton) {
               return (
                   <Button class={`${prefixCls}-button`} type="primary" size={size} key="enterButton">
                       <Icon type="loading" />
                   </Button>
               )
           }
           return <Icon class={`${prefixCls}-icon`} type="loading" key="loadingIcon" />
       },
       renderSuffix(prefixCls) {
           let { loading, suffix, enterButton } = this
           enterButton = enterButton || enterButton === ''
           if (loading && !enterButton) {
               return [suffix, this.renderLoading(prefixCls)]
           }
           if (enterButton) return suffix
           const icon = (
               <Icon class={`${prefixCls}-icon`} type="search" key="searchIcon" onClick={this.onSearch} />
           ) 
           if (suffix) {
               return [suffix, icon]
           }
           return icon
       },
       renderAddonAfter(prefixCls) {
           const { size, disabled, loading, addonAfter } = this
           let enterButton = this.enterButton || this.$slots.enterButton
           const btnClassName = `${prefixCls}-button`;
           enterButton = enterButton || enterButton === '' || enterButton === undefined
           if (loading && enterButton) {
              return [this.renderLoading(prefixCls), addonAfter] 
           }
           if (!enterButton) return addonAfter
           const enterButtonAsElement = Array.isArray(enterButton) ? enterButton[0] : enterButton;
           let button;
           const isZButton = enterButtonAsElement.componentOptions && enterButtonAsElement.componentOptions.Ctor
           if (enterButtonAsElement.tag === 'button' || isZButton) {
               button = Object.assign(enterButtonAsElement, {
                   key: 'enterButton',
                   class: isZButton ? btnClassName : '',
                   props: isZButton ? {size} : {},
                   on: {
                       click: this.onSearch
                   }
               })
           } else {
               button = (
                   <Button
                      class={btnClassName}
                      type="primary"
                      size={size}
                      disabled={disabled}
                      key="enterButton"
                      onClick={this.onSearch}
                   >
                      {enterButton === true || enterButton === '' ? <Icon type="search" /> : enterButton}
                   </Button>
               )
           }
           if (addonAfter) {
               return [button, addonAfter]
           }
           return button
       }
   },
   render(h) {
       const { 
         prefixCls,
         inputPrefixCls, 
         size, 
         loading, 
         ...others } = getOptionProps(this)
         let enterButton = getComponentFromProp(this, 'enterButton');
        const addonBefore = getComponentFromProp(this, 'addonBefore');
        enterButton = enterButton || enterButton === '';
        let inputClassName;
        if (enterButton) {
        inputClassName = classNames(prefixCls, {
            [`${prefixCls}-enter-button`]: !!enterButton,
            [`${prefixCls}-${size}`]: !!size,
        });
        } else {
        inputClassName = prefixCls;
        }

    const on = { ...getListeners(this) };
    delete on.search;
    const inputProps = {
        props: {
          ...others,
          prefixCls: inputPrefixCls,
          size,
          suffix: this.renderSuffix(prefixCls),
          prefix: getComponentFromProp(this, 'prefix'),
          addonAfter: this.renderAddonAfter(prefixCls),
          addonBefore,
          className: inputClassName,
        },
        attrs: this.$attrs,
        ref: 'input',
        on: {
          pressEnter: this.onSearch,
          ...on,
          change: this.onChange,
        },
      };
       return (
           <Input {...inputProps} />
       )
   }
})

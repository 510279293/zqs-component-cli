// utils
import { createNamespace } from '../utils';
import { inherit, emit, getListeners } from '../utils/functional';
import Icon from '../icon';
import Wrapper from './Wrapper.js'
// Types
import Input, {props} from './Input.js'
function noop(){}

const [createComponent, bem ] = createNamespace('input-password')
const ActionMap = {
    click: 'click',
    hover: 'mouseover'
}

export default createComponent({
   props: {
       ...props,
       prefixCls: {
           type: String,
           default: 'z-input-password'
       },
       inputPrefixCls: {
           type: String,
           default: 'z-input'
       },
       action: {
           type: String,
           default: 'click'
       },
       visibilityToggle: Boolean,
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
       onVisibleChange(){
           if (this.disabled) {
               return
           }
           this.visible = !this.visible
       },
       getIcon() {
           const {prefixCls, action} = this.$props
           const iconTrigger = ActionMap[action] || ''
           const iconProps = {
               props: {
                   type: this.visible ? 'eye' : 'eye-close'
               },
               on: {
                   [iconTrigger]: this.onVisibleChange,
                   mousedown: (e ) => {
                       e.preventDefault()
                   }
               },
               class: `${prefixCls}-icon`,
               key: 'passwordIcon'
           }
           return <Icon {...iconProps} />
       }

   },
   render(h) {
       const { 
         prefixCls,
         inputPrefixCls, 
         size, 
         visibilityToggle, 
         ...restProps } = this.$props
         const suffixIcon = this.getIcon()
         const inputClassName = {
             [`${prefixCls}-${size}`]: !!size
         }
       const props = {
           props: {
                ...restProps,
                prefixCls: inputPrefixCls,
                size,
                suffix: suffixIcon,
           },
           attrs: {
               ...this.$attrs,
               type: this.visible ? 'text' : 'password'
           },
           class: inputClassName,
           ref: 'input',
           on: getListeners(this),
       }
       console.log(props)
       return (
           <Input {...props} />
       )
   }
})

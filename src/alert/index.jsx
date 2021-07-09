// utils
import { createNamespace, isValidElement } from '../utils';
import Icon from '../icon';
const [createComponent, bem] = createNamespace('alert')

const props = {
    closable: Boolean,
    closeText: String,
    message: String,
    description: String,
    showIcon: Boolean,
    iconType: String,
    banner: Boolean,
    icon: null,
    tag: {
        type: String,
        default: 'div',
    },
    type: {
        type: String,
        default: 'info'
    },
    afterClose: {
        type: Function,
        default: () => {}
    }
}

export default createComponent({
    props,
    data() {
        return {
            closing: false,
            closed: false,
        }
    },
    methods: {
        handleClose(e) {
            this.closing = true
            this.$emit('close', e)
        }
    },
    render(h) {
        const {
            tag,
            banner,
            closeText,
            description,
            message,
            closing,
            closed,
            icon
        } = this
        let { closable, type, showIcon, iconType } = this
        // banner 模式下默认有 Icon
        showIcon = banner && showIcon === undefined ? true : showIcon;
        // banner 模式下默认警告
        type = banner && type === undefined ? 'warning' : type || 'info';
        let iconTheme = 'filled';
        if (!iconType) {
            switch (type) {
                case 'success' : 
                  iconType = 'success';
                  break;
                case 'info' : 
                  iconType = 'prompt';
                  break;
                case 'error' : 
                  iconType = 'close-circle';
                  break;
                case 'warning' :
                  iconType = 'prompt';
                  break;
                default: 
                  iconType = 'default'             
            }
            description && (iconTheme = 'outlined')
        }
        closeText && (closable = true)
        const prefixCls = bem();
        const classes = bem({
            [type]: true,
            closing,
            'with-description': !!description,
            'no-icon': !showIcon,
            'banner': !!banner,
            closable
        })
        
        const closeIcon = closable ? (
          <a 
           type="button"
           class={`${prefixCls}-close-icon`}
           onClick={this.handleClose}
           tabIndex={0}>
             {closeText ? (
                 <span class={`${prefixCls}-close-text`}>{closeText}</span>
             ):(<Icon type="close" />)}
          </a>
        ) : null;

        const iconNode = (icon && (isValidElement(icon) ? (
            h(icon, {
                class: `${prefixCls}-icon`
            })
        ) : (
            <span class={`${prefixCls}-icon`}>{icon}</span>
        ))) || <Icon class={`${prefixCls}-icon`} type={iconType} theme={iconTheme} />

        return (
            closed ? null : (<transition>
                <tag
                class={classes}
                v-show={!closing}
                data-show={!closing}
                >
                    {showIcon ? iconNode : null}
                    <span class={`${prefixCls}-message`}>{message}</span>
                    <span class={`${prefixCls}-description`}>{description}</span>
                    {closeIcon}
                </tag>
            </transition>)
        )
    }
})

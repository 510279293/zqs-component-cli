import { createNamespace } from '../../utils'

const [createComponent, bem ] = createNamespace('row')

const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export default createComponent({
    props: {
        type: String,
        align: String,
        justify: String,
        tag: {
            type: String,
            default: 'div',
        },
        gutter: {
            type: [Number, String],
            default: 0,
        }
    },
    render () {
        const { align, justify, type } = this;
        const flex = type === 'flex';
        const prefixCls = bem();
        return(
            <this.tag
              class={{
                  [prefixCls]: !flex,
                  [`${prefixCls}-${type}`]: flex,
                  [`${prefixCls}-${type}-${align}`]: flex && align,
                  [`${prefixCls}-${type}-${justify}`]: flex && justify
              }}
            >
                {this.slots()}
            </this.tag>
        )
    }
})
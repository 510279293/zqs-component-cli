// Utils
import { createNamespace, addUnit } from '../../utils';
import { inherit } from '../../utils/functional';

// Components
// import Info from '../info';

// Types
import { CreateElement, RenderContext } from 'vue/types';
import { DefaultSlots } from '../../utils/types';

export type ColProps = {
    span?: string | number;
    tag: string;
    order?: string | number;
    offset?: string | number;
    pull?: string | number;
    push?: string | number;
    xs?: Number | Object;
    sm?: Number | Object;
    md?: Number | Object;
    lg?: Number | Object;
    xl?: Number | Object;
    xxl?: Number | Object;
    prefixCls: string;
}

const [createComponent, bem] = createNamespace('col')

function Col(
  h: CreateElement,
  props: ColProps,
  slots: DefaultSlots,
  ctx: RenderContext<ColProps>
) {
    const {
      span,
      order,
      offset,
      push,
      pull
    } = props;
    let sizeClassObj = {};
    const prefixCls = bem();
    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach((size: string) => {
        let sizeProps: Record<string, number | object>={}
        // @ts-ignore
        const propSize = props[size]
        if (typeof propSize === 'number') {
            sizeProps.span = propSize
        } else if (typeof propSize === 'object') {
            sizeProps = propSize || {}
        }
        sizeClassObj = {
            ...sizeClassObj,
            [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
            [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
            [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
              sizeProps.offset || sizeProps.offset === 0,
            [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
            [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
        }
    })
   return (
       <props.tag
         class={
            {   [`${prefixCls}`]: true,
                [`${prefixCls}-${span}`]: span,
                [`${prefixCls}-order-${order}`]: order,
                [`${prefixCls}-offset-${offset}`]: offset,
                [`${prefixCls}-push-${push}`]: push,
                [`${prefixCls}-pull-${pull}`]: pull,
                ...sizeClassObj
            }
         }
       >
           {slots.default && slots.default()}
       </props.tag>
   )
}

Col.props = {
    span: [Number, String],
    offset: [Number, String],
    order: [Number, String],
    pull: [Number, String],
    push: [Number, String],
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
    xxl: [Number, Object],
    tag: {
        type: String,
        default: 'div'
    },
    prefixCls: {
        type: String,
        default: bem(),
    }
}

export default createComponent<ColProps>(Col)
// Utils
import { createNamespace, addUnit } from '../utils';
import { inherit } from '../utils/functional';

// Components
// import Info from '../info';

// Types
import { CreateElement, RenderContext } from 'vue/types';
import { DefaultSlots } from '../utils/types';

export type IconProps = {
    dot?: boolean;
    tag: string;
    name?: string;
    type?: string;
    size?: string | number;
    info?: string | number;
    badge?: string | number;
    color?: string;
    classPrefix: string;
}

export type IconEvents = {
    onClick?(event: Event): void;
}

const [createComponent, bem] = createNamespace('icon')

function Icon(
  h: CreateElement,
  props: IconProps,
  slots: DefaultSlots,
  ctx: RenderContext<IconProps>
) {
    const {type, color, size, } = props
    const classes = [
        bem([
            type
        ])
    ]
   return (
       <props.tag 
            class={classes}
            style={{
                color,
                fontSize: addUnit(size)
            }}
            {...inherit(ctx, true)}
       >
           {slots.default && slots.default()}
       </props.tag>
   )
}

Icon.props = {
    dot: Boolean,
    info: [Number, String],
    badge: [Number, String],
    name: String,
    color: String,
    tag: {
        type: String,
        default: 'i'
    },
    classPrefix: {
        type: String,
        default: bem(),
    },
    type: {
        type: String,
        default: ''
    },
    size: {
        type: [Number, String],
        default: 14
    }
}

export default createComponent<IconProps, IconEvents>(Icon)
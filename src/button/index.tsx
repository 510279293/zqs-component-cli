// utils
import { createNamespace } from '../utils';
import { filterEmpty } from '../utils/tools'
import { emit, inherit } from '../utils/functional';
import { BORDER_SURROUND, WHITE } from '../utils/constant';
import { routeProps, RouteProps, functionalRoute } from '../utils/router'
// Components
import Icon from '../icon';

// Types
import {CreateElement, RenderContext } from 'vue/types';
import { ScopedSlot, DefaultSlots } from '../utils/types';

export type ButtonType = 'default' | 'primary' | 'dashed' | 'danger' | 'link';
export type ButtonSize = 'large' | 'default' | 'small';
export type ButtonShape = 'circle' | 'circle-outline' | 'round';
export type ButtonLoading = boolean | { delay?: number }
export type ButtonHtmlType = 'button' | 'submit' | 'reset'

export type ButtonProps = {
    tag: string;
    disabled?: boolean;
    ghost?: boolean;
    htmlType?: string;
    icon?: string;
    loading?: ButtonLoading;
    shape: ButtonShape;
    size: ButtonSize;
    type: ButtonType;
    block?: boolean;
    iconPosition: 'left' | 'right';
}

export type ButtonEvents = {
    onClick?(event: Event): void;
}

export type ButtonSlots = DefaultSlots & {
    loading?: ScopedSlot;
}

const [createComponent, bem] = createNamespace('button');
function Button(
    h: CreateElement,
    props: ButtonProps,
    slots: ButtonSlots,
    ctx: RenderContext<ButtonProps>
){
    const style: Record<string, string | number> = {}
    const {
        tag,
        icon,
        type,
        size,
        shape,
        block,
        disabled,
        loading,
        iconPosition,
        htmlType,
    } = props

    function onClick(event: Event) {
        if (!loading && !disabled) {
            emit(ctx, 'click', event);
            functionalRoute(ctx)
        }
    }
    // const children = filterEmpty(slots.default())
    const _slots = slots.default && slots.default()
    const classes = [
        bem({ 
            [type]: type,
            [shape]: shape,
            [size]: size,
            loading,
            disabled,
            block,
            }
        )
    ]
    function renderIcon(){
        if (loading) {
            return slots.loading ? (
                slots.loading()
            ) : (
                <Icon type='loading' style={{fontWeight: 600}} />
            )
        } 
        if (icon) {
            return (
                <Icon type={icon} style={{fontWeight: 600}} />
            )
        }
    }
    function renderContent() {
        const content = [];
        if (iconPosition === 'left') {
            content.push(renderIcon())
        }
        _slots && content.push(<span>{_slots}</span>)
        if (iconPosition === 'right') {
            content.push(renderIcon())
        }
        return content;
    }
    return (
        <tag
          style={style}
          class={classes}
          type={htmlType || 'button'}
          disabled={disabled}
          {...inherit(ctx)}
        >
            {renderContent()}
        </tag>
    )
}

Button.props = {
  icon: String,
  block: Boolean,
  shape: String,
  loading: [Boolean, Object],
  disabled: Boolean,
  tag: {
      type: String,
      default: 'button',
  },
  type: {
      type: String,
      default: 'default'
  },
  size: {
      type: String,
      default: 'normal',
  },
  iconPosition: {
      type: String,
      default: 'left'
  }
}

export default createComponent<ButtonProps, ButtonEvents, ButtonSlots>(Button)

// utils
import { createNamespace } from '../utils';
// Types
import {CreateElement, RenderContext } from 'vue/types';
import { DefaultSlots } from '../utils/types';
const [createComponent, bem] = createNamespace('button-group');

export type ButtonGroupSlots = DefaultSlots

function ButtonGroup(
    h: CreateElement,
    props: any,
    slots: ButtonGroupSlots,
    ctx: RenderContext,
){
    const classes = [
        bem()
    ]
  return (
      <section
        class={classes} 
      >
        { slots.default && slots.default() }
      </section>
  )
}
ButtonGroup.props = {
   
}

export default createComponent<ButtonGroupSlots>(ButtonGroup)

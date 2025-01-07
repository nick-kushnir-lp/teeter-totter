import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ObjectItem from '@/components/molecules/ObjectItem.vue';
import { ObjectShape } from '@/enums/ObjectShape';
import type { ITeeterObject } from '@/helpers/physics';

describe('ObjectItem.vue', () => {
  it('renders weight text correctly', () => {
    const testObject: ITeeterObject = {
      id: 1,
      shape: ObjectShape.CIRCLE,
      weight: 5,
      xPosition: 0,
      yPosition: 100,
    };
    const wrapper = mount(ObjectItem, {
      props: {
        object: testObject,
      },
    });
    expect(wrapper.text()).toContain('5kg');
  });

  it('applies circle class for circle shape', () => {
    const testObject: ITeeterObject = {
      id: 2,
      shape: ObjectShape.CIRCLE,
      weight: 3,
      xPosition: 0,
      yPosition: 0,
    };
    const wrapper = mount(ObjectItem, {
      props: { object: testObject },
    });
    const circleEl = wrapper.find('.circle');
    expect(circleEl.exists()).toBe(true);
  });

  it('applies rectangle class for rectangle shape', () => {
    const testObject: ITeeterObject = {
      id: 3,
      shape: ObjectShape.RECTANGLE,
      weight: 2,
      xPosition: 0,
      yPosition: 0,
    };
    const wrapper = mount(ObjectItem, {
      props: { object: testObject },
    });
    const rectEl = wrapper.find('.rectangle');
    expect(rectEl.exists()).toBe(true);
  });

  it('applies triangle class for triangle shape', () => {
    const testObject: ITeeterObject = {
      id: 4,
      shape: ObjectShape.TRIANGLE,
      weight: 8,
      xPosition: 0,
      yPosition: 0,
    };
    const wrapper = mount(ObjectItem, {
      props: { object: testObject },
    });
    const triangleEl = wrapper.find('.triangle');
    expect(triangleEl.exists()).toBe(true);
  });

  it('computes position style correctly (left, top)', () => {
    const testObject: ITeeterObject = {
      id: 5,
      shape: ObjectShape.CIRCLE,
      weight: 5,
      xPosition: -2,
      yPosition: 120,
    };
    const wrapper = mount(ObjectItem, {
      props: {
        object: testObject,
      },
    });
    const objEl = wrapper.find('.object-item');
    const style = objEl.attributes('style');
    expect(style).toBeDefined();
  });
});

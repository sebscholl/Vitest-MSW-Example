import { mount, flushPromises } from '@vue/test-utils'

export const mountAndFlush = async (component) => {
    const wrapper = mount(component);

    await flushPromises();

    return wrapper;
}
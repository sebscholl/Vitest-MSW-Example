import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from "vitest";

import { mock } from "@test/mocks";
import UsersList from "@src/views/UsersList.vue";

const renderComponent = async () => {
    const wrapper = mount(UsersList);

    await flushPromises();

    return wrapper;
}

describe("UsersList component", () => {
    describe("when the users list is empty", () => {
        let wrapper;

        beforeEach(async () => {
            mock('get', '@randomuser/api', 200, { results: [] })

            wrapper = await renderComponent();
        })

        it("renders an empty users message", async () => {
            expect(wrapper.text()).toContain("You have no users.");
        });
    })

    describe("when the the users list has users", () => {
        let wrapper;

        beforeEach(async () => {
            mock('get', '@randomuser/api', 200)

            wrapper = await renderComponent();
        })

        it("renders a list of users", async () => {
            expect(wrapper.text()).toContain("Tejas");
        });
    })

    describe("when the API has an internal server error (500)", () => {
        let wrapper;

        beforeEach(async () => {
            mock('get', '@randomuser/api', 500)

            wrapper = await renderComponent();
        })

        it("renders an error message", async () => {
            expect(wrapper.text()).toContain("Sorry! There was an error.");
        });
    })
});
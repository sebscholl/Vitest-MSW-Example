import UsersList from "@src/views/UsersList.vue";

describe("UsersList component", () => {
    describe("when the users list is empty", () => {
        let wrapper;

        beforeEach(async () => {
            mock('get', '@randomuser/api', 200, { results: [] })

            wrapper = await mountAndFlush(UsersList);
        })

        it("renders an empty users message", async () => {
            expect(wrapper.text()).toContain("You have no users.");
        });
    })

    describe("when the the users list has users", () => {
        let wrapper;

        beforeEach(async () => {
            mock('get', '@randomuser/api', 200)

            wrapper = await mountAndFlush(UsersList);
        })

        it("renders a list of users", async () => {
            expect(wrapper.text()).toContain("Tejas");
        });
    })

    describe("when the API has an internal server error (500)", () => {
        let wrapper;

        beforeEach(async () => {
            mock('get', '@randomuser/api', 500)

            wrapper = await mountAndFlush(UsersList);
        })

        it("renders an error message", async () => {
            expect(wrapper.text()).toContain("Sorry! There was an error.");
        });
    })
});
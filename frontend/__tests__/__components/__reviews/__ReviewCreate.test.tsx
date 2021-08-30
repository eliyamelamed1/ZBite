import '@testing-library/jest-dom/extend-expect';

describe('ReviewCreate', () => {
    test.todo('should render without crashing');
    describe('test toggling between creating/editing a review ', () => {
        test.todo('should display "Create a review" button if user doesnt have a review');
        test.todo('should display "Edit a review" button user have a review');
    });

    describe('recipe input', () => {});
    describe('stars input', () => {});
    describe('comment input', () => {});
    describe('image input', () => {});

    describe('submit button', () => {
        test.todo('should render submit button');
        test.todo('success in create/editing a review should dispatch reviewCreateAction');
        test.todo('failure in create/editing a review should not dispatch reviewCreateAction');
    });
});

import '@testing-library/jest-dom/extend-expect';

describe('ReviewCreate', () => {
    describe('authenticated Users', () => {
        test('should render without crashing', () => {});
        describe('test toggling between creating/editing a review ', () => {
            test('should display "Create a review" button if user doesnt have a review', () => {});
            test('should display "Edit a review" button user have a review', () => {});
        });

        describe('recipe input', () => {});
        describe('stars input', () => {});
        describe('comment input', () => {});
        describe('image input', () => {});

        describe('submit button', () => {
            test('should render submit button  ', () => {});
            test('success in create/editing a review should dispatch reviewCreateAction  ', () => {});
            test('failure in create/editing a review should not dispatch reviewCreateAction  ', () => {});
        });
    });

    describe('guest Users', () => {
        test('should render without crashing', () => {});
        test('should redirect to login page', () => {});
    });
});

import '@testing-library/jest-dom/extend-expect';

describe('ReviewDelete', () => {
    describe('authenticated as the review author ', () => {
        test('should render without crashing', () => {});
        test('should display "Delete a review" button', () => {});
        test('success in deleting a review should dispatch reviewDeleteAction  ', () => {});
        test('failure in deleting a review should not dispatch reviewDeleteAction  ', () => {});
    });

    describe('authenticated Users', () => {
        test('should render without crashing', () => {});
        test('should not display "Delete a review" button', () => {});
    });

    describe('guest Users', () => {
        test('should render without crashing', () => {});
        test('should not display "Delete a review" button', () => {});
    });
});

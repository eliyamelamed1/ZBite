// TODO - test layout wrap components (components inside the layout)
// TODO - RecipeList, RecipeDetails, RecipePage tests throw error

import React from 'react';
import App from './App';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

describe('App - home page url should match component', () => {
    beforeEach(() => {
        const renderWithRouter = (ui, { route = '/' } = {}) => {
            window.history.pushState({}, 'Test page', route);

            return render(ui, { wrapper: Router });
        };
        renderWithRouter(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render layout', () => {
        const layout = screen.getByTestId('layout');
        expect(layout).toBeInTheDocument();
    });
    test('should render home page', () => {
        const homePage = screen.getByTestId('homePage');
        expect(homePage).toBeInTheDocument();
    });
});

describe('App - login page url should match component ', () => {
    beforeEach(() => {
        const renderWithRouter = (ui, { route = '/login' } = {}) => {
            window.history.pushState({}, 'Test page', route);

            return render(ui, { Router });
        };
        renderWithRouter(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render home page', () => {
        const loginPage = screen.getByTestId('loginPage');
        expect(loginPage).toBeInTheDocument();
    });
});

describe('App - signup page url should match component ', () => {
    beforeEach(() => {
        const renderWithRouter = (ui, { route = '/signup' } = {}) => {
            window.history.pushState({}, 'Test page', route);

            return render(ui, { Router });
        };
        renderWithRouter(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render home page', () => {
        const signupPage = screen.getByTestId('signupPage');
        expect(signupPage).toBeInTheDocument();
    });
});

describe('App - recipe create page url should match component ', () => {
    beforeEach(() => {
        const renderWithRouter = (ui, { route = '/recipes/create' } = {}) => {
            window.history.pushState({}, 'Test page', route);

            return render(ui, { Router });
        };
        renderWithRouter(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render recipe create page', () => {
        const recipeCreatePage = screen.getByTestId('recipeCreatePage');
        expect(recipeCreatePage).toBeInTheDocument();
    });
});

describe('App - recipes page url should match component ', () => {
    beforeEach(() => {
        const renderWithRouter = (ui, { route = '/recipes' } = {}) => {
            window.history.pushState({}, 'Test page', route);

            return render(ui, { Router });
        };
        renderWithRouter(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render recipes page', () => {
        const recipesPage = screen.getByTestId('recipesPage');
        expect(recipesPage).toBeInTheDocument();
    });
});

describe('App - recipes detail page url should match component ', () => {
    beforeEach(() => {
        const renderWithRouter = (ui, { route = '/recipes/:id' } = {}) => {
            window.history.pushState({}, 'Test page', route);

            return render(ui, { Router });
        };
        renderWithRouter(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render recipe detail page', () => {
        const recipeDetailPage = screen.getByTestId('recipeDetailPage');
        expect(recipeDetailPage).toBeInTheDocument();
    });
});

describe('App - reset password page url should match component ', () => {
    beforeEach(() => {
        const renderWithRouter = (ui, { route = '/reset_password' } = {}) => {
            window.history.pushState({}, 'Test page', route);

            return render(ui, { Router });
        };
        renderWithRouter(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render reset password page', () => {
        const resetPasswordPage = screen.getByTestId('resetPasswordPage');
        expect(resetPasswordPage).toBeInTheDocument();
    });
});

describe('App - reset password confirm page url should match component ', () => {
    beforeEach(() => {
        const renderWithRouter = (ui, { route = '/password/reset/confirm/:uid/:token' } = {}) => {
            window.history.pushState({}, 'Test page', route);

            return render(ui, { Router });
        };
        renderWithRouter(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render reset password confirm page', () => {
        const resetPasswordConfirmPage = screen.getByTestId('resetPasswordConfirmPage');
        expect(resetPasswordConfirmPage).toBeInTheDocument();
    });
});

describe('App - activate page url should match component ', () => {
    beforeEach(() => {
        const renderWithRouter = (ui, { route = '/activate/:uid/:token' } = {}) => {
            window.history.pushState({}, 'Test page', route);

            return render(ui, { Router });
        };
        renderWithRouter(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render activate page', () => {
        const activatePage = screen.getByTestId('activatePage');
        expect(activatePage).toBeInTheDocument();
    });
});

describe('App - not found page url should match component ', () => {
    beforeEach(() => {
        const renderWithRouter = (ui, { route = '/random/route' } = {}) => {
            window.history.pushState({}, 'Test page', route);

            return render(ui, { Router });
        };
        renderWithRouter(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render not found page', () => {
        const notFound = screen.getByTestId('notFound');
        expect(notFound).toBeInTheDocument();
    });
});

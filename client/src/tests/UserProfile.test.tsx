import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {Provider} from "react-redux";
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store'
import '@testing-library/jest-dom'
import thunk from "redux-thunk";
import UserService from "../api/internalAPI/userApi";
import UserProfile from "../Pages/UserProfile";
import {BrowserRouter} from "react-router-dom";
import clearAllMocks = jest.clearAllMocks;

const mockStore = configureMockStore([thunk]);

// DO NOT DELETE! Workaround for FC not running when rendering UsersList
window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () {
        },
        removeListener: function () {
        }
    };
};

describe("Test user Profile functionality", () => {
    beforeEach(clearAllMocks);
    UserService.updateProfile = jest.fn(() => Promise.resolve({result: "Success"}));
    test('Mock user profile first time access', async () => {
        const store = mockStore({
            auth: { user: {
                    email: 'update@email.com',
                    firstName: 'ab',
                    lastName: 'abc',
                    type: 'ab',
                    phone: '12',
                    address: 'ab'
                } },
            user: {
                selected:"Dashboard"
            }
        });
        render(<Provider store={store}><BrowserRouter><UserProfile/></BrowserRouter></Provider>);

        await act(async () => {
            expect(screen.getByTestId('fname')).toBeInTheDocument();
            expect(screen.getByTestId('lname')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('update@email.com')).toBeInTheDocument()
        });


    });
    test('Mock user profile update functionality', async () => {
        const store = mockStore({
            auth: { user: {
                    email: 'update@email.com',
                    firstName: 'ab',
                    lastName: 'abc',
                    type: 'ab',
                    phone: '12',
                    address: 'ab'
                } },
            user: {
                selected:"Dashboard"
            }
        });
        render(<Provider store={store}><BrowserRouter><UserProfile/></BrowserRouter></Provider>);

        await act(async () => {
            const Fname = screen.getByTestId('fname')
            const Lname = screen.getByTestId('lname')
            const Ebutton = await screen.findByTestId('edit')
            const Ubutton = await screen.findByTestId('update')
            let Uform = await screen.findByTestId('updateFormItem')

            expect(Ebutton).toBeInTheDocument();
            expect(Ubutton).toBeInTheDocument();
            expect(Uform).toHaveClass('ant-form-item-hidden')

            userEvent.click(Ebutton)
            Uform = await screen.findByTestId('updateFormItem')
            expect(Uform).not.toHaveClass('ant-form-item-hidden')
            userEvent.paste(Fname, 'Mock Test');
            userEvent.paste(Lname, 'Last Name test');
            userEvent.click(Ubutton)
            userEvent.click(Ebutton)
            expect(await screen.findByDisplayValue('Mock Test')).toBeInTheDocument();
            expect(await screen.findByDisplayValue('Last Name test')).toBeInTheDocument();
        });
    });

})


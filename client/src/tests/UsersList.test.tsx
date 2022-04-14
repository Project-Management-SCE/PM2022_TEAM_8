import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import UserService from "../api/internalAPI/userApi";
import {UsersList} from "../admin/UsersList";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
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

describe("Test Users List page user deletion", () => {
    beforeEach(clearAllMocks);

    UserService.getUsers = jest.fn(() => Promise.resolve({
        users: [{
            email: 'update@email.com',
            firstName: 'a',
            lastName: 'a',
            type: 'a',
            phone: '1',
            address: 'a'
        },
            {
                email: 'update2@email.com',
                firstName: 'ab',
                lastName: 'ab',
                type: 'ab',
                phone: '12',
                address: 'ab'
            }
        ]
    }))
    UserService.deleteUser = jest.fn(() => Promise.resolve({result: 'Success'}));
    test('Mocks user deletion functionality with real user', async () => {
        const store = mockStore({
            admin: {users:[{
                email: 'update@email.com',
                firstName: 'a',
                lastName: 'a',
                type: 'a',
                phone: '1',
                address: 'a',
            }
            ]}
        });
        await act(async () => {
            render(<Provider store={store}><BrowserRouter><UsersList/></BrowserRouter></Provider>);
        });
        expect(UserService.getUsers).toHaveBeenCalledTimes(1);
        const user = await screen.findByText(/update@email.com/);
        expect(user).toBeInTheDocument()
        const button = await screen.findByTestId('update@email.com');
        expect(button).toBeInTheDocument()
    })

});


// loginTest.test.js
import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import Login from '../Pages/Login';
import AuthService from '../api/internalAPI/authApi';
import {Provider} from "react-redux";
import Store from "../redux/Store";
import {BrowserRouter} from "react-router-dom";


test('Mocks login functionality', async () => {
    AuthService.login = jest.fn(() => Promise.resolve({accessToken:"1234519210391"}));
    const {
        getByPlaceholderText, findByDisplayValue
    } = render(<Provider store={Store}><BrowserRouter><Login/></BrowserRouter></Provider>);

    await act(async () => {
        const inputEmail = getByPlaceholderText(/Email/);
        fireEvent.change(inputEmail, { target: { value: 'admin@email.com' }});
        const inputPassword = getByPlaceholderText(/Password/);
        fireEvent.change(inputPassword, { target: { value: 'admin' }});
        await findByDisplayValue(/admin@email.com/);
        const button = await findByDisplayValue(/Connect/);
        fireEvent.click(button);
    });
    expect(AuthService.login).toHaveBeenCalledWith("admin@email.com","admin" );
});


import React from 'react';
import {act, render, screen} from '@testing-library/react';
import Login from '../Pages/Login';
import AuthService from '../api/internalAPI/authApi';
import {Provider} from "react-redux";
import Store from "../redux/Store";
import {BrowserRouter} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

describe("Test Login", () => {
    AuthService.login = jest.fn(() => Promise.resolve({accessToken: "1234519210391"}));
    test('Mocks login functionality with empty input', async () => {
        render(<Provider store={Store}><BrowserRouter><Login/></BrowserRouter></Provider>);

        await act(async () => {
            const button = await screen.findByDisplayValue(/Connect/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(AuthService.login).toHaveBeenCalledTimes(0);


    });


    test('Mocks login functionality without password', async () => {
        render(<Provider store={Store}><BrowserRouter><Login/></BrowserRouter></Provider>);
        await act(async () => {
            const inputEmail = screen.getByPlaceholderText(/Email/);
            userEvent.paste(inputEmail, 'admin@email.com');
            const email = await screen.findByDisplayValue(/admin@email.com/);
            expect(email).toBeInTheDocument();
            const button = await screen.findByDisplayValue(/Connect/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(AuthService.login).toHaveBeenCalledTimes(0);


    });


    test('Mocks login functionality with real input', async () => {
        render(<Provider store={Store}><BrowserRouter><Login/></BrowserRouter></Provider>);
        await act(async () => {
            const inputEmail = screen.getByPlaceholderText(/Email/);
            userEvent.paste(inputEmail, 'admin@email.com');
            const inputPassword = screen.getByPlaceholderText(/Password/);
            userEvent.paste(inputPassword, 'admin');
            const email = await screen.findByDisplayValue(/admin@email.com/);
            expect(email).toBeInTheDocument();
            const button = await screen.findByDisplayValue(/Connect/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(AuthService.login).toHaveBeenCalledWith("admin@email.com", "admin");
        expect(AuthService.login).toHaveBeenCalledTimes(1);


    });

})


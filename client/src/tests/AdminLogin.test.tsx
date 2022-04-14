import React from 'react';
import {act, render, screen} from '@testing-library/react';
import AuthService from '../api/internalAPI/authApi';
import {Provider} from "react-redux";
import Store from "../redux/Store";
import userEvent from '@testing-library/user-event';
import AdminLogin from '../admin/AdminLogin';
import '@testing-library/jest-dom'

describe("Test Admin Login", () => {
    AuthService.loginAdmin = jest.fn(() => Promise.resolve({accessToken: "1234519210391"}));
    test('Mocks login functionality with empty input', async () => {
        render(<Provider store={Store}><AdminLogin/></Provider>);

        await act(async () => {
            const button = await screen.findByDisplayValue(/Connect/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(AuthService.loginAdmin).toHaveBeenCalledTimes(0);


    });


    test('Mocks login functionality without password', async () => {
        render(<Provider store={Store}><AdminLogin/></Provider>);
        await act(async () => {
            const inputEmail = screen.getByTestId('email');
            userEvent.paste(inputEmail, 'admin@email.com');
            expect(await screen.findByDisplayValue(/admin@email.com/)).toBeInTheDocument();
            const button = await screen.findByDisplayValue(/Connect/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(AuthService.loginAdmin).toHaveBeenCalledTimes(0);


    });


    test('Mocks login functionality with real input', async () => {
        render(<Provider store={Store}><AdminLogin/></Provider>);
        await act(async () => {
            const inputEmail = screen.getByPlaceholderText(/Admin Email/);
            userEvent.paste(inputEmail, 'admin@email.com');
            const inputPassword = screen.getByPlaceholderText(/Password/);
            userEvent.paste(inputPassword, 'admin');
            expect(await screen.findByDisplayValue(/admin@email.com/)).toBeInTheDocument();
            const button = await screen.findByDisplayValue(/Connect/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(AuthService.loginAdmin).toHaveBeenCalledWith("admin@email.com", "admin");
        expect(AuthService.loginAdmin).toHaveBeenCalledTimes(1);


    });

})


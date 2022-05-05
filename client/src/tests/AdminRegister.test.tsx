import React from 'react';
import {act, render, screen} from '@testing-library/react';
import AuthService from '../api/internalAPI/authApi';
import {Provider} from "react-redux";
import Store from "../redux/Store";
import {BrowserRouter} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import clearAllMocks = jest.clearAllMocks;
import RegisterAdmin from "../admin/RegisterAdmin";

describe("Test Admin Registration", () => {
    AuthService.registerAdmin = jest.fn(() => Promise.resolve({result:"Success"}));
    beforeEach(clearAllMocks);
    test('Mocks registration functionality with real input', async () => {
        render(<Provider store={Store}><BrowserRouter><RegisterAdmin/></BrowserRouter></Provider>);

        await act(async () => {

            const inputEmail = screen.getByTestId('email');
            userEvent.paste(inputEmail, 'tester@email.com');
            expect(await screen.findByDisplayValue('tester@email.com')).toBeInTheDocument();

            const inputPassword = screen.getByTestId('password');
            userEvent.paste(inputPassword, 'test123');

            const button = await screen.findByDisplayValue(/Create Admin Account/);
            expect(button).toBeInTheDocument();

            userEvent.click(button);
        });
        expect(AuthService.registerAdmin).toHaveBeenCalledWith("tester@email.com", "test123");
        expect(AuthService.registerAdmin).toHaveBeenCalledTimes(1);


    });


    test('Mocks admin registration functionality without password', async () => {
        render(<Provider store={Store}><BrowserRouter><RegisterAdmin/></BrowserRouter></Provider>);
        await act(async () => {

            const inputEmail = screen.getByTestId('email');
            userEvent.paste(inputEmail, 'tester@email.com');
            expect(await screen.findByDisplayValue('tester@email.com')).toBeInTheDocument();

            const button = await screen.findByDisplayValue(/Create Admin Account/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(AuthService.registerAdmin).toHaveBeenCalledTimes(0);


    });

    test('Mocks admin registration functionality with empty input', async () => {
        render(<Provider store={Store}><BrowserRouter><RegisterAdmin/></BrowserRouter></Provider>);

        await act(async () => {
            const button = await screen.findByDisplayValue(/Create Admin Account/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(AuthService.registerAdmin).toHaveBeenCalledTimes(0);


    });
})


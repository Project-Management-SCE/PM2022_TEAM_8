import React from 'react';
import {act, render, screen} from '@testing-library/react';
import Register from '../Pages/Register';
import AuthService from '../api/internalAPI/authApi';
import {Provider} from "react-redux";
import Store from "../redux/Store";
import {BrowserRouter} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import clearAllMocks = jest.clearAllMocks;

describe("Test Registration", () => {
    AuthService.register = jest.fn(() => Promise.resolve({accessToken: "1234519210391"}));
    AuthService.me = jest.fn(() => Promise.resolve({user: {
            email: 'aaa@a.a',
            firstName: 'aaa',
            lastName: 'aaaa',
            type: 'Admin',
            phone: '1234',
            address: 'aaa',
        }}));
    beforeEach(clearAllMocks);
    test('Mocks registration functionality with real input', async () => {
        render(<Provider store={Store}><BrowserRouter><Register/></BrowserRouter></Provider>);

        await act(async () => {

            const inputFName = screen.getByTestId('fname');
            userEvent.paste(inputFName, 'Test');
            expect(await screen.findByDisplayValue('Test')).toBeInTheDocument();

            const inputLName = screen.getByTestId('lname');
            userEvent.paste(inputLName, 'Tester');
            expect(await screen.findByDisplayValue('Tester')).toBeInTheDocument();

            const inputPhone = screen.getByTestId('phone');
            userEvent.paste(inputPhone, '052555555');

            const inputAddress = screen.getByTestId('addr');
            userEvent.paste(inputAddress, 'South 123 Lane');

            const inputEmail = screen.getByTestId('email');
            userEvent.paste(inputEmail, 'tester@email.com');
            expect(await screen.findByDisplayValue('tester@email.com')).toBeInTheDocument();

            const inputPassword = screen.getByTestId('password');
            userEvent.paste(inputPassword, 'test123');

            const button = await screen.findByDisplayValue(/Create Account/);
            expect(button).toBeInTheDocument();

            userEvent.click(button);
        });
            expect(AuthService.register).toHaveBeenCalledWith("tester@email.com", "test123","Test","Tester","052555555","South 123 Lane");
            expect(AuthService.register).toHaveBeenCalledTimes(1);


    });


    test('Mocks registration functionality without password', async () => {
        render(<Provider store={Store}><BrowserRouter><Register/></BrowserRouter></Provider>);
        await act(async () => {
            const inputFName = screen.getByTestId('fname');
            userEvent.paste(inputFName, 'Test');
            expect(await screen.findByDisplayValue('Test')).toBeInTheDocument();

            const inputLName = screen.getByTestId('lname');
            userEvent.paste(inputLName, 'Tester');
            expect(await screen.findByDisplayValue('Tester')).toBeInTheDocument();

            const inputPhone = screen.getByTestId('phone');
            userEvent.paste(inputPhone, '052555555');

            const inputAddress = screen.getByTestId('addr');
            userEvent.paste(inputAddress, 'South 123 Lane');

            const inputEmail = screen.getByTestId('email');
            userEvent.paste(inputEmail, 'tester@email.com');
            expect(await screen.findByDisplayValue('tester@email.com')).toBeInTheDocument();

            const button = await screen.findByDisplayValue(/Create Account/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(AuthService.register).toHaveBeenCalledTimes(0);


    });

    test('Mocks registration functionality with empty input', async () => {
        render(<Provider store={Store}><BrowserRouter><Register/></BrowserRouter></Provider>);

        await act(async () => {
            const button = await screen.findByDisplayValue(/Create Account/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(AuthService.register).toHaveBeenCalledTimes(0);


    });
})


import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {Provider} from "react-redux";
import Store from "../redux/Store";
import {BrowserRouter} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import ContactUs from "../components/ContactUs";
import MessageService from "../api/internalAPI/messageApi";
import clearAllMocks = jest.clearAllMocks;

// DO NOT DELETE! Workaround for FC not running when rendering
window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () {
        },
        removeListener: function () {
        }
    };
};

describe("Test Contact Us functionality", () => {
    MessageService.sendMessage = jest.fn(() => Promise.resolve({result: "Success"}));
    beforeEach(clearAllMocks);
    test('Mocks Contact Us functionality without email', async () => {
        render(<Provider store={Store}><BrowserRouter><ContactUs/></BrowserRouter></Provider>);

        await act(async () => {
            const inputSubject = screen.getByTestId('subject');
            userEvent.paste(inputSubject, 'test form');
            expect(await screen.findByDisplayValue('test form')).toBeInTheDocument();

            const inputText = screen.getByTestId('text');
            userEvent.paste(inputText, 'text test');
            expect(await screen.findByDisplayValue('text test')).toBeInTheDocument();

            const button = await screen.findByDisplayValue(/Send/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(MessageService.sendMessage).toHaveBeenCalledTimes(0);


    });


    test('Mocks contact us functionality without subject', async () => {
        render(<Provider store={Store}><BrowserRouter><ContactUs/></BrowserRouter></Provider>);
        await act(async () => {
            const inputEmail = screen.getByTestId('email');
            userEvent.paste(inputEmail, 'email@test.com');
            expect(await screen.findByDisplayValue('email@test.com')).toBeInTheDocument();

            const inputText = screen.getByTestId('text');
            userEvent.paste(inputText, 'text test');
            expect(await screen.findByDisplayValue('text test')).toBeInTheDocument();

            const button = await screen.findByDisplayValue(/Send/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(MessageService.sendMessage).toHaveBeenCalledTimes(0);


    });

    test('Mocks contact us functionality without text', async () => {
        render(<Provider store={Store}><BrowserRouter><ContactUs/></BrowserRouter></Provider>);
        await act(async () => {
            const inputEmail = screen.getByTestId('email');
            userEvent.paste(inputEmail, 'email@test.com');
            expect(await screen.findByDisplayValue('email@test.com')).toBeInTheDocument();

            const inputSubject = screen.getByTestId('subject');
            userEvent.paste(inputSubject, 'test form');
            expect(await screen.findByDisplayValue('test form')).toBeInTheDocument();

            const button = await screen.findByDisplayValue(/Send/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(MessageService.sendMessage).toHaveBeenCalledTimes(0);


    });

    test('Mocks contact us functionality with real input', async () => {
        render(<Provider store={Store}><BrowserRouter><ContactUs/></BrowserRouter></Provider>);
        await act(async () => {
            const inputEmail = screen.getByTestId('email');
            userEvent.paste(inputEmail, 'email2@test.com');
            expect(await screen.findByDisplayValue('email2@test.com')).toBeInTheDocument();


            const inputText = screen.getByTestId('text');
            userEvent.paste(inputText, 'text test');
            expect(await screen.findByDisplayValue('text test')).toBeInTheDocument();

            const inputSubject = screen.getByTestId('subject');
            userEvent.paste(inputSubject, 'test form');
            expect(await screen.findByDisplayValue('test form')).toBeInTheDocument();


            const button = await screen.findByDisplayValue(/Send/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(MessageService.sendMessage).toHaveBeenCalledWith("email2@test.com", "test form","text test");
        expect(MessageService.sendMessage).toHaveBeenCalledTimes(1);


    });

})


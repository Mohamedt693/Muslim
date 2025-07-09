import React from "react";
import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import MainPage from "../components/mainPage/mainContent";
import { BrowserRouter } from "react-router-dom";
import { beforeAll} from "vitest";


// Mocking Axios Fetching api
vi.mock("axios");

describe("BasicGrid", () => {

    // mocking Navigator && Geolocation
    beforeAll(() => {
        vi.stubGlobal('navigator', {
            geolocation: {
                getCurrentPosition: (success) => {
                    success({
                        coords: {
                            latitude: 30.0444,
                            longitude: 31.2357,
                        },
                    });
                },
            },
        });
    });

    it("shows loading indicator while fetching data", () => {
        axios.get.mockImplementation(() => new Promise(() => {})); 

        render(
            <BrowserRouter>
                <MainPage />
            </BrowserRouter>
        );

        const loadingElements = screen.getAllByText(/جارى التحميل/i);
        expect(loadingElements.length).toBe(3);
    });


    it("renders prayer times fetched from API", async () => {
        // Mocking the response
        const mockResponse = {
            data: {
                data: {
                    timings: {
                        Fajr: "04:00",
                        Dhuhr: "12:00",
                        Asr: "15:30",
                        Maghrib: "18:45",
                        Isha: "20:15",
                    },
                    meta: {
                        timezone: "Africa/Cairo",
                    },
                },
            },
        };

        axios.get.mockResolvedValue(mockResponse);

        render(
            <BrowserRouter>
                <MainPage />
            </BrowserRouter>
        );

    await waitFor(() => {
        expect(screen.getByText("الفجر")).toBeInTheDocument();
        expect(screen.getByText("04:00")).toBeInTheDocument();
        expect(screen.getByText("الظهر")).toBeInTheDocument();
        expect(screen.getByText("12:00")).toBeInTheDocument();
        expect(screen.getByText("العصر")).toBeInTheDocument();
        expect(screen.getByText("15:30")).toBeInTheDocument();
        expect(screen.getByText("المغرب")).toBeInTheDocument();
        expect(screen.getByText("18:45")).toBeInTheDocument();
        expect(screen.getByText("العشاء")).toBeInTheDocument();
        expect(screen.getByText("20:15")).toBeInTheDocument();
    });


});
});

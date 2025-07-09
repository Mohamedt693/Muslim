import React from "react";
import { render, screen, act } from '@testing-library/react';
import Timer from "../components/mainPage/PrayerTimeSection/Timer";
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

const fakePrayerTimes = {
    Fajr: '04:30',
    Dhuhr: '12:00',
    Asr: '15:30',
    Maghrib: '19:00',
    Isha: '20:30',
};
const fakeTimezone = 'Africa/Cairo';

describe('Timer', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    test('should show loading text when loading is true', () => {
        render(<Timer loading={true} prayerTime={fakePrayerTimes} TimeZone={fakeTimezone}/>)
        const loadingElements = screen.getAllByText(/جارى التحميل/i);
        expect(loadingElements.length).toBe(2);
    });
    test('should show loading text when loading is true', () => {
        render(<Timer loading={false} prayerTime={fakePrayerTimes} TimeZone={fakeTimezone}/>)
        expect(screen.queryByText(/متبقي حتى صلاة/)).toBeTruthy();
    });

    test('should update countdown timer every second', () => {
        render(<Timer loading={false} prayerTime={fakePrayerTimes} TimeZone={fakeTimezone}/>);

        const initialTime = screen.getByRole('heading', { level: 2 }).textContent;
        act(() => {
            vi.advanceTimersByTime(1000); // ← زود ثانية
        });
        const updatedTime = screen.getByRole('heading', { level: 2 }).textContent;

        expect(updatedTime).not.toEqual(initialTime);
    });

    test("should show correct next prayer name", () => {
        // الوقت حاليا بعد الظهر والصلاة القادمة العصر
        vi.setSystemTime(new Date("2025-07-09T12:30:00+02:00"));

        render(<Timer loading={false} prayerTime={fakePrayerTimes} TimeZone={fakeTimezone}/>);

        expect(screen.getByText(/متبقي حتى صلاة العصر/)).toBeTruthy();
    });

    afterEach(() => {
        vi.useRealTimers();
    });
})


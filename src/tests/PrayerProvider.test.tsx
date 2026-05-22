import { describe, test, expect, vi } from 'vitest';
import axios from 'axios';
import { PrayerProvider, usePrayer } from '../contexts/PrayerContext';
import { renderHook, waitFor } from '@testing-library/react';

vi.mock('axios');

describe('PrayerProvider Logic', () => {
    test('should fetch and set prayer times', async () => {
        const mockedGet = vi.mocked(axios.get);

        const mockResponse = {
            data: {
                data: {
                    timings: { Fajr: '04:30', Dhuhr: '12:00', Asr: '15:30', Maghrib: '19:00', Isha: '20:30' },
                    meta: { timezone: 'Africa/Cairo' }
                }
            }
        };

        mockedGet.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => usePrayer(), {
            wrapper: PrayerProvider,
        });

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(mockedGet).toHaveBeenCalled();
        expect(result.current.prayerTime?.Fajr).toBe('04:30');
    });
});


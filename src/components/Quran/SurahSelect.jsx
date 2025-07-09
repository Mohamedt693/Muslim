import * as React from 'react';
// Material ui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// Zustand
import { useStore } from '../../Zustand/store';
// React hooks
import { useState, useEffect } from 'react';
// Custom audio player component
import CustomAudioPlayer from './CustomAudioPlayer';




export default function SurahSelect() {
  const {surah, fetchSurah} = useStore();
  const [shekh, setShekh] = useState();
  const [num, setNum] = useState(null)

  useEffect(()=>{
    fetchSurah()
  },[fetchSurah])
  

  const handleChange = (event) => {
    setNum(event.target.value);
  }

  const handleShekhChange = (event) => {
    setShekh(event.target.value)
  }

  return (
    <>
    <Box sx={{maxHeight : 30, marginBottom: 20}}>
      <FormControl fullWidth style={{marginTop: "20px"}}>
        <InputLabel id="demo-simple-select-label" style={{backgroundColor: "#fff", paddingInline: "5px"}}>اختار السورة</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="surah"
          value={num || ''}
          onChange={handleChange}
        >
          {surah.map((s, index)=>{
            return (
              <MenuItem key={index}  value={s.number}>{s.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth style={{marginTop: "20px"}}>
        <InputLabel id="demo-simple-select-label" style={{backgroundColor: "#fff", paddingInline: "5px"}}>اختار الشيخ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="surah"
          value={shekh || ""}
          onChange={handleShekhChange}
        >
          <MenuItem value={1}>العفاسى</MenuItem>
          <MenuItem value={2}>ابو بكر الشاطرى</MenuItem>
          <MenuItem value={3}>القطامى</MenuItem>
          <MenuItem value={4}>ياسر الدوسرى</MenuItem>
          <MenuItem value={5}>هانى الرفاعى</MenuItem>
        </Select>
      </FormControl>
      <CustomAudioPlayer  src={`https://github.com/The-Quran-Project/Quran-Audio-Chapters/raw/refs/heads/main/Data/${shekh}/${num}.mp3`}/>
    </Box>

      </>
  );
}

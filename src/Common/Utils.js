import { useNavigate } from "react-router-dom";

export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    
    // Get the hours, minutes, and determine AM or PM
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    // Get the day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // e.g., March
    const year = date.getFullYear();
    
    // Return the formatted string
    return `${hours}:${minutes} ${ampm} @ ${day} ${month} ${year}`;
}

export function isMobileDevice() {
    return window.innerWidth <= 450;
}

export function getRandomBackgroundColor() {
    const colors = [
      'linear-gradient(145deg, #ffdad5, #ffe5b4)',
      'linear-gradient(145deg, #fad0c4, #ffd1ff)',
      'linear-gradient(145deg, #8ee3f5, #b3f6d8)',
      'linear-gradient(145deg, #dfe9f3, #f6f7d7)',
      'linear-gradient(145deg, #fffbf0, #f9e0d4)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export function getSpecialTextColorClass() {
  return {
    'background-image': 'linear-gradient(145deg, #ff416c, #8b5cf6)',
    'color': 'transparent',
    'background-clip': 'text',
  }
}
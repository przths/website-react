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
  
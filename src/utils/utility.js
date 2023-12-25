export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
};

export const longToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = monthShortNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}

export const daysDifference = (timestamp) => {
    const currentDate = new Date();
    const givenDate = new Date(timestamp * 1000);

    const timeDifference = currentDate - givenDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

export const monthShortNames = [
    'Jan', 'Feb', 'March', 'April', 'May', 'June',
    'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];
export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const base64toBlob = (base64) => {
    const contentType = "application/pdf";
    const bytes = atob(base64);
    let length = bytes.length;
    const out = new Uint8Array(length);
    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }
    const f = new Blob([out], { type: contentType });
    return URL.createObjectURL(f);
  };
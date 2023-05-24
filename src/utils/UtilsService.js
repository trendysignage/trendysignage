export const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
}

export const formattedDateString = (d) => {
    d = new Date(d);
    const yyyy = d.getFullYear();
    const mm = dateDigits(d.getMonth() + 1);
    const dd = dateDigits(d.getDate());
    return yyyy + "-" + mm + "-" + dd;
};

export const humanReadableFormattedDateString = (date) => {
    date = new Date(date);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let day = dateDigits(date.getDate());
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    return day + ' ' + month + ', ' + year;
}

export const formattedTimeString = (d) => {
    d = new Date(d);
    return dateDigits(d.getHours()) + ":" + dateDigits(d.getMinutes()) + ":00";
};

export const getHOrMFromLocalTimeString = (localTimeString, hOrM = 'h') => {
    const localTimeArr = localTimeString.split(':');
    if (localTimeArr.length > 1) {
        if (hOrM === 'h') {
            return +localTimeString.split(':')[0];
        } else {
            return +localTimeString.split(':')[1];
        }
    } else {
        return 0;
    }
};

export const dateDigits = (v, digits = 2) => {
    let str = "";
    for (let i = digits; i > 1; i--) {
        str += "0";
    }

    return (str + v).slice(-digits);
};

export const currencyFormat = (num, toFixed = 2) => {
    num = num ? +num : 0;
    return '$' + num.toFixed(toFixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const numberThFormat = (num) => {
    switch(num) {
        case 1: 
            return num + 'st';
        break;
        case 2: 
            return num + 'nd';
        break;
        case 3: 
            return num + 'rd';
        break;
        default: 
            return num + 'th';
        break;
    }
}

export const priceValue = (formattedPrice = "$0.00") => {
    formattedPrice = formattedPrice ? formattedPrice + "" : "$0.00";
    return +formattedPrice.split(",").join("").split(" ").join("").split("$").join("")
};

export const isMobile = () => {
    return window.innerWidth < 768;
};

export const randomStr = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const defaultPeriods = [
    {
        dayOfWeek: "SUN",
        startLocalTime: "7:00:00",
        endLocalTime: "20:00:00",
        closed: false
    },
    {
        dayOfWeek: "MON",
        startLocalTime: "7:00:00",
        endLocalTime: "20:00:00",
        closed: false
    },
    {
        dayOfWeek: "TUE",
        startLocalTime: "7:00:00",
        endLocalTime: "20:00:00",
        closed: false
    },
    {
        dayOfWeek: "WED",
        startLocalTime: "7:00:00",
        endLocalTime: "20:00:00",
        closed: false
    },
    {
        dayOfWeek: "THU",
        startLocalTime: "7:00:00",
        endLocalTime: "20:00:00",
        closed: false
    },
    {
        dayOfWeek: "FRI",
        startLocalTime: "7:00:00",
        endLocalTime: "20:00:00",
        closed: false
    },
    {
        dayOfWeek: "SAT",
        startLocalTime: "7:00:00",
        endLocalTime: "20:00:00",
        closed: false
    }
];

export const getDatetimeIn12Hours = (datetimeString) =>{
    const date = new Date(datetimeString);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return  date.toLocaleTimeString('en-US', options);
}
export const isBlobUrl = (url)=> {
    return url.startsWith('blob:');
  }
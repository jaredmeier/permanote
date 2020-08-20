import moment from 'moment';

export const getDate = (date) => {
    const d = new Date(date);
    return (
        "".concat(d.toLocaleString('default', { month: 'short' }), " ",
            d.getDate(), ",", " ", d.getFullYear())
    );
};

export const getDateRelative = (date) => {
    const d = new Date(date);
    const n = new Date(Date.now());
    
    if (n.getFullYear() === d.getFullYear()) {
        if (n.getMonth() === d.getMonth()) {
            if (n.getDate() === d.getDate()) {
                const timeSince = moment(date).fromNow();
                return timeSince.charAt(0).toUpperCase() + timeSince.slice(1);
            } else if (n.getDate() === d.getDate() + 1) {
                return "Yesterday";
            } else if (n.getDate() < d.getDate() + 5) {
                return moment(date).format('dddd');
            } else {
                return ("".concat(d.toLocaleString('default', { month: 'short' }), " ",
                    d.getDate()));
            } 
        } else {
            return ("".concat(d.toLocaleString('default', { month: 'short' }), " ",
                d.getDate()));
        }
    } else {
        return (
            "".concat(d.toLocaleString('default', { month: 'short' }), " ",
                d.getDate(), ",", " ", d.getFullYear())
        );
    }
}
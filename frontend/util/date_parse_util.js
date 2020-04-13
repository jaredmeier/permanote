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
                const hours = n.getHours() - d.getHours();
                const minutes = n.getMinutes() - d.getMinutes();
                if (hours >= 1) { 
                    return `${hours} hours ago`
                } else if (minutes >= 5) {
                    return "Less than an hour ago"
                } else if (minutes >= 1) {
                    return "A few minutes ago"
                } else {
                    return "Less than a minute ago"
                }
            } else if (n.getDate()) {
                return "Yesterday"
            } else {
                return ("".concat(d.toLocaleString('default', { month: 'short' }), " ",
                    d.getDate()))
            } 
        } else {
            return ("".concat(d.toLocaleString('default', { month: 'short' }), " ",
                d.getDate()))
        }
    } else {
        return (
            "".concat(d.toLocaleString('default', { month: 'short' }), " ",
                d.getDate(), ",", " ", d.getFullYear())
        );
    }
}
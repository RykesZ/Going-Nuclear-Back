exports.convertDate = (date) => {
    return (
        date.constructor === Date ? date :
        date.constructor === Array ? new Date(date[0],date[1],date[2]) :
        date.constructor === Number ? new Date(date) :
        date.constructor === String ? new Date(date) :
        typeof date === "object" ? new Date(date.year, date.month, date.date) :
        NaN
    );
};

exports.compareDate = (date1, date2) => {
    return (
        isFinite(date1=this.convertDate(date1).valueOf()) &&
        isFinite(date2=this.convertDate(date2).valueOf()) ?
        (date1>date2) - (date1<date2) :
        NaN
    );                
};
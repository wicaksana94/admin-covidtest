exports.convertToRupiah = (number) => {
    if(number === "undefined" || number === null) {
        return 0
    }

    if (number) {
        let rupiah = "";
        let numberrev = number.toString().split("").reverse().join("");
        for (var i = 0; i < numberrev.length; i++) if (i % 3 === 0) rupiah += numberrev.substr(i, 3) + ".";
        return ("Rp " + rupiah.split("", rupiah.length - 1).reverse().join(""));
    } else {
        return number;
    }
}

exports.convertToSlashDateFormat = (mysql_date) => {
    let splittedDate = mysql_date.split("-");
    let date = splittedDate[2]
    let month = splittedDate[1]
    let year = splittedDate[0]
    let formattedDate = date+"/"+month+"/"+year;
    return formattedDate
}
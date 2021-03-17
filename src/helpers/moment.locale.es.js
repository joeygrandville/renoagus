import moment from "moment";

const monthsShortDot = "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_"),
  monthsShort = "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),
  monthsParse = [/^Ene/i, /^Feb/i, /^Mar/i, /^Abr/i, /^May/i, /^Jun/i, /^Jul/i, /^Ago/i, /^Sep/i, /^Oct/i, /^Nov/i, /^Dic/i],
  monthsRegex = /^(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Ene\.?|Feb\.?|Mar\.?|Abr\.?|May\.?|Jun\.?|Jul\.?|Ago\.?|Sep\.?|Oct\.?|Nov\.?|Dic\.?)/i;

const es = moment.defineLocale("es", {
  months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
  monthsShort: function (m, format) {
    if (!m) return monthsShortDot;
    if (/-MMM-/.test(format)) return monthsShort[m.month()];
    return monthsShortDot[m.month()];
  },
  monthsRegex: monthsRegex,
  monthsShortRegex: monthsRegex,
  monthsStrictRegex: /^(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre)/i,
  monthsShortStrictRegex: /^(Ene\.?|Feb\.?|Mar\.?|Abr\.?|May\.?|Jun\.?|Jul\.?|Ago\.?|Sep\.?|Oct\.?|Nov\.?|Dic\.?)/i,
  monthsParse: monthsParse,
  longMonthsParse: monthsParse,
  shortMonthsParse: monthsParse,
  weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
  weekdaysShort: "Dom._Lun._Mar._Mié._Jue._Vie._Sáb.".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY H:mm",
    LLLL: "dddd, D [de] MMMM [de] YYYY H:mm",
  },
  calendar: {
    sameDay: () => "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT",
    nextDay: () => "[mañana a la" + (this.hours() !== 1 ? "s" : "") + "] LT",
    nextWeek: () => "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT",
    lastDay: () => "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT",
    lastWeek: () => "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    ss: "%d segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    w: "una semana",
    ww: "%d semanas",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años",
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº",
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
  invalidDate: "Fecha inválida",
});

export default es;

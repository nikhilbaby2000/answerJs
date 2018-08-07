/**
 * @author Nikhil Baby <nikhilbaby2000@gmail.com> on 13-12-2016.
 */

/**
 * This class automatically binds a data suggester for a given input element, provided with the min required parameters.
 *
 * Eg: <input id="id_is_must" data-supporter="answers" data-language="en" data-location="in" data-suggester="google-suggester" >
 *
 * */

var definedAnswers = {
    main_attribute_name: 'data-supporter',
    main_attribute_value: 'answers',
    data_wrapper_container_class: 'data-list-wrapper',
    data_value_attribute_name: 'data-option',
    allowed_data_length: 5,

    data_suggester_attribute_name: 'data-suggester',
    google_suggester_attribute_value: 'google-suggester',
    amazon_suggester_attribute_value: 'amazon-suggester',
    bing_suggester_attribute_value: 'bing-suggester',
    youtube_suggester_attribute_value: 'youtube-suggester',

    data_item_input_id_attribute_name: 'data-input-element-id',
    data_item_chosen_attribute_name: 'answer-selected',
    data_item_chosen_attribute_value: '1',

    answer_data_list_prefix: 'answer_data_list',
    debug: false
};

var definedDefaults = {
    font_family: 'Source Sans Pro,sans-serif',
    font_weight: '300',
    default_remover_width: 1,
    default_wrapper_remover_width: 3,
    default_extra_top: -2,
    input_to_data_height_ratio: 0.8
};

var definedSupporters = {
    google_auto_suggest_msg_timeout: 5000, //milli seconds
    google_auto_suggest_msg_show: true, //milli seconds
    last_used_url_loc: 'us',
    google_engine_url: {us: "www.google.com", uk: "www.google.co.uk"},
    used_engines: [],
    all_engines: ["uk", "us", "af", "al", "dz", "as", "ad", "ao", "ag", "ar", "am", "au", "at", "az", "bh", "bd", "by", "be", "bz", "bj", "bo", "ba", "bw", "br", "bn", "bg", "bf", "bi", "kh", "cm", "ca", "cv", "cf", "td", "cl", "hk", "cc", "co", "cg", "ck", "cr", "ci", "hr", "cz", "cd", "dk", "dj", "dm", "do", "tl", "ec", "eg", "sv", "et", "fj", "fi", "fr", "ga", "ge", "de", "gh", "gr", "gt", "gy", "ht", "hn", "hu", "is", "in", "id", "iq", "ie", "il", "it", "jm", "jp", "jo", "kz", "ke", "ki", "kw", "la", "lv", "lb", "ls", "ly", "li", "lt", "lu", "mk", "mg", "mw", "my", "mv", "ml", "mt", "mu", "mx", "fm", "md", "mn", "ma", "mz", "na", "nr", "np", "nl", "nz", "ni", "ne", "ng", "nu", "nf", "no", "om", "pk", "pa", "py", "pe", "ph", "pn", "pl", "pt", "qa", "ro", "ru", "rw", "sh", "vc", "ws", "sm", "st", "sa", "sn", "rs", "sc", "sl", "sg", "sk", "si", "sb", "so", "za", "kr", "es", "lk", "se", "ch", "tj", "tz", "th", "bs", "gm", "tg", "tk", "to", "tt", "tn", "tr", "tm", "ug", "ua", "ae", "uy", "uz", "vu", "ve", "vn", "zm", "zw"]
};

var definedAjaxPointers = {
    google: true,
    amazon: true
};

var definedEngineData = JSON.parse('{ "af": { "google": { "engine_domain": "www.google.com.af", "abbr": "af" } }, "al": { "google": { "engine_domain": "www.google.al", "abbr": "al" } }, "dz": { "google": { "engine_domain": "www.google.dz", "abbr": "dz" } }, "as": { "google": { "engine_domain": "www.google.as", "abbr": "as" } }, "ad": { "google": { "engine_domain": "www.google.ad", "abbr": "ad" } }, "ao": { "google": { "engine_domain": "www.google.it.ao", "abbr": "ao" } }, "ag": { "google": { "engine_domain": "www.google.com.ag", "abbr": "ag" } }, "ar": { "google": { "engine_domain": "www.google.com.ar", "abbr": "ar" }, "bing": { "engine_domain": "www.bing.com", "abbr": "ar" }, "yahoo": { "engine_domain": "ar.search.yahoo.com", "abbr": "ar" } }, "am": { "google": { "engine_domain": "www.google.am", "abbr": "am" } }, "au": { "yahoo": { "engine_domain": "search.yahoo.com", "abbr": "au" }, "google": { "engine_domain": "www.google.com.au", "abbr": "au" }, "bing": { "engine_domain": "www.bing.com", "abbr": "au" } }, "at": { "yahoo": { "engine_domain": "at.search.yahoo.com", "abbr": "at" }, "google": { "engine_domain": "www.google.at", "abbr": "at" }, "bing": { "engine_domain": "www.bing.com", "abbr": "at" } }, "az": { "google": { "engine_domain": "www.google.az", "abbr": "az" } }, "bh": { "google": { "engine_domain": "www.google.com.bh", "abbr": "bh" } }, "bd": { "google": { "engine_domain": "www.google.com.bd", "abbr": "bd" } }, "by": { "google": { "engine_domain": "www.google.com.by", "abbr": "by" } }, "be": { "google": { "engine_domain": "www.google.be", "abbr": "be" }, "bing": { "engine_domain": "www.bing.com", "abbr": "be" }, "yahoo": { "engine_domain": "be.search.yahoo.com", "abbr": "be" } }, "bz": { "google": { "engine_domain": "www.google.com.bz", "abbr": "bz" } }, "bj": { "google": { "engine_domain": "www.google.bj", "abbr": "bj" } }, "bo": { "google": { "engine_domain": "www.google.com.bo", "abbr": "bo" } }, "ba": { "google": { "engine_domain": "www.google.ba", "abbr": "ba" } }, "bw": { "google": { "engine_domain": "www.google.co.bw", "abbr": "bw" } }, "br": { "google": { "engine_domain": "www.google.com.br", "abbr": "br" }, "yahoo": { "engine_domain": "br.search.yahoo.com", "abbr": "br" }, "bing": { "engine_domain": "www.bing.com", "abbr": "br" } }, "bn": { "google": { "engine_domain": "www.google.com.bn", "abbr": "bn" } }, "bg": { "google": { "engine_domain": "www.google.bg", "abbr": "bg" }, "bing": { "engine_domain": "www.bing.com", "abbr": "bg" } }, "bf": { "google": { "engine_domain": "www.google.bf", "abbr": "bf" } }, "bi": { "google": { "engine_domain": "www.google.bi", "abbr": "bi" } }, "kh": { "google": { "engine_domain": "www.google.com.kh", "abbr": "kh" } }, "cm": { "google": { "engine_domain": "www.google.cm", "abbr": "cm" } }, "ca": { "bing": { "engine_domain": "www.bing.com", "abbr": "ca" }, "yahoo": { "engine_domain": "ca.search.yahoo.com", "abbr": "ca" }, "google": { "engine_domain": "www.google.ca", "abbr": "ca" } }, "cv": { "google": { "engine_domain": "www.google.cv", "abbr": "cv" } }, "cf": { "google": { "engine_domain": "www.google.cf", "abbr": "cf" } }, "td": { "google": { "engine_domain": "www.google.td", "abbr": "td" } }, "cl": { "yahoo": { "engine_domain": "cl.search.yahoo.com", "abbr": "cl" }, "bing": { "engine_domain": "www.bing.com", "abbr": "cl" }, "google": { "engine_domain": "www.google.cl", "abbr": "cl" } }, "hk": { "bing": { "engine_domain": "www.bing.com", "abbr": "hk" }, "google": { "engine_domain": "www.google.com.hk", "abbr": "hk" }, "yahoo": { "engine_domain": "hk.search.yahoo.com", "abbr": "hk" } }, "cc": { "google": { "engine_domain": "www.google.cc", "abbr": "cc" } }, "co": { "google": { "engine_domain": "www.google.com.co", "abbr": "co" }, "yahoo": { "engine_domain": "co.search.yahoo.com", "abbr": "co" } }, "cg": { "google": { "engine_domain": "www.google.cg", "abbr": "cg" } }, "ck": { "google": { "engine_domain": "www.google.co.ck", "abbr": "ck" } }, "cr": { "google": { "engine_domain": "www.google.co.cr", "abbr": "cr" } }, "ci": { "google": { "engine_domain": "www.google.ci", "abbr": "ci" } }, "hr": { "bing": { "engine_domain": "www.bing.com", "abbr": "hr" }, "google": { "engine_domain": "www.google.hr", "abbr": "hr" } }, "cz": { "google": { "engine_domain": "www.google.cz", "abbr": "cz" }, "bing": { "engine_domain": "www.bing.com", "abbr": "cz" } }, "cd": { "google": { "engine_domain": "www.google.cd", "abbr": "cd" } }, "dk": { "google": { "engine_domain": "www.google.dk", "abbr": "dk" }, "yahoo": { "engine_domain": "dk.search.yahoo.com", "abbr": "dk" } }, "dj": { "google": { "engine_domain": "www.google.dj", "abbr": "dj" } }, "dm": { "google": { "engine_domain": "www.google.dm", "abbr": "dm" } }, "do": { "google": { "engine_domain": "www.google.com.do", "abbr": "do" } }, "tl": { "google": { "engine_domain": "www.google.tl", "abbr": "tl" } }, "ec": { "google": { "engine_domain": "www.google.com.ec", "abbr": "ec" } }, "eg": { "google": { "engine_domain": "www.google.com.eg", "abbr": "eg" } }, "sv": { "google": { "engine_domain": "www.google.com.sv", "abbr": "sv" } }, "et": { "google": { "engine_domain": "www.google.com.et", "abbr": "et" } }, "fj": { "google": { "engine_domain": "www.google.com.fj", "abbr": "fj" } }, "fi": { "bing": { "engine_domain": "www.bing.com", "abbr": "fi" }, "google": { "engine_domain": "www.google.fi", "abbr": "fi" }, "yahoo": { "engine_domain": "fi.search.yahoo.com", "abbr": "fi" } }, "fr": { "bing": { "engine_domain": "www.bing.com", "abbr": "fr" }, "google": { "engine_domain": "www.google.fr", "abbr": "fr" }, "yahoo": { "engine_domain": "fr.search.yahoo.com", "abbr": "fr" } }, "ga": { "google": { "engine_domain": "www.google.ga", "abbr": "ga" } }, "ge": { "google": { "engine_domain": "www.google.ge", "abbr": "ge" } }, "de": { "google": { "engine_domain": "www.google.de", "abbr": "de" }, "yahoo": { "engine_domain": "de.search.yahoo.com", "abbr": "de" }, "bing": { "engine_domain": "www.bing.com", "abbr": "de" } }, "gh": { "google": { "engine_domain": "www.google.com.gh", "abbr": "gh" } }, "gr": { "yahoo": { "engine_domain": "gr.search.yahoo.com", "abbr": "gr" }, "bing": { "engine_domain": "www.bing.com", "abbr": "gr" }, "google": { "engine_domain": "www.google.gr", "abbr": "gr" } }, "gt": { "google": { "engine_domain": "www.google.com.gt", "abbr": "gt" } }, "gy": { "google": { "engine_domain": "www.google.gy", "abbr": "gy" } }, "ht": { "google": { "engine_domain": "www.google.ht", "abbr": "ht" } }, "hn": { "google": { "engine_domain": "www.google.hn", "abbr": "hn" } }, "hu": { "bing": { "engine_domain": "www.bing.com", "abbr": "hu" }, "google": { "engine_domain": "www.google.hu", "abbr": "hu" } }, "is": { "google": { "engine_domain": "www.google.is", "abbr": "is" } }, "in": { "bing": { "engine_domain": "www.bing.com", "abbr": "in" }, "yahoo": { "engine_domain": "in.search.yahoo.com", "abbr": "in" }, "google": { "engine_domain": "www.google.co.in", "abbr": "in" } }, "id": { "bing": { "engine_domain": "www.bing.com", "abbr": "id" }, "yahoo": { "engine_domain": "id.search.yahoo.com", "abbr": "id" }, "google": { "engine_domain": "www.google.co.id", "abbr": "id" } }, "iq": { "google": { "engine_domain": "www.google.iq", "abbr": "iq" } }, "ie": { "google": { "engine_domain": "www.google.ie", "abbr": "ie" }, "bing": { "engine_domain": "www.bing.com", "abbr": "ie" }, "yahoo": { "engine_domain": "ie.search.yahoo.com", "abbr": "ie" } }, "il": { "google": { "engine_domain": "www.google.co.il", "abbr": "il" }, "bing": { "engine_domain": "www.bing.com", "abbr": "il" }, "yahoo": { "engine_domain": "maktoob.search.yahoo.com", "abbr": "il" } }, "it": { "bing": { "engine_domain": "www.bing.com", "abbr": "it" }, "yahoo": { "engine_domain": "it.search.yahoo.com", "abbr": "it" }, "google": { "engine_domain": "www.google.it", "abbr": "it" } }, "jm": { "google": { "engine_domain": "www.google.com.jm", "abbr": "jm" } }, "jp": { "yahoo": { "engine_domain": "search.yahoo.co.jp", "abbr": "jp" }, "google": { "engine_domain": "www.google.co.jp", "abbr": "jp" }, "bing": { "engine_domain": "www.bing.com", "abbr": "jp" } }, "jo": { "google": { "engine_domain": "www.google.jo", "abbr": "jo" } }, "kz": { "google": { "engine_domain": "www.google.kz", "abbr": "kz" } }, "ke": { "google": { "engine_domain": "www.google.co.ke", "abbr": "ke" } }, "ki": { "google": { "engine_domain": "www.google.ki", "abbr": "ki" } }, "kw": { "google": { "engine_domain": "www.google.com.kw", "abbr": "kw" } }, "la": { "google": { "engine_domain": "www.google.la", "abbr": "la" } }, "lv": { "google": { "engine_domain": "www.google.lv", "abbr": "lv" } }, "lb": { "google": { "engine_domain": "www.google.com.lb", "abbr": "lb" } }, "ls": { "google": { "engine_domain": "www.google.co.ls", "abbr": "ls" } }, "ly": { "google": { "engine_domain": "www.google.com.ly", "abbr": "ly" } }, "li": { "google": { "engine_domain": "www.google.li", "abbr": "li" } }, "lt": { "google": { "engine_domain": "www.google.lt", "abbr": "lt" }, "bing": { "engine_domain": "www.bing.com", "abbr": "lt" } }, "lu": { "google": { "engine_domain": "www.google.lu", "abbr": "lu" } }, "mk": { "google": { "engine_domain": "www.google.mk", "abbr": "mk" } }, "mg": { "google": { "engine_domain": "www.google.mg", "abbr": "mg" } }, "mw": { "google": { "engine_domain": "www.google.mw", "abbr": "mw" } }, "my": { "bing": { "engine_domain": "www.bing.com", "abbr": "my" }, "yahoo": { "engine_domain": "malaysia.search.yahoo.com", "abbr": "my" }, "google": { "engine_domain": "www.google.com.my", "abbr": "my" } }, "mv": { "google": { "engine_domain": "www.google.mv", "abbr": "mv" } }, "ml": { "google": { "engine_domain": "www.google.ml", "abbr": "ml" } }, "mt": { "google": { "engine_domain": "www.google.com.mt", "abbr": "mt" } }, "mu": { "google": { "engine_domain": "www.google.mu", "abbr": "mu" } }, "mx": { "yahoo": { "engine_domain": "mx.search.yahoo.com", "abbr": "mx" }, "bing": { "engine_domain": "www.bing.com", "abbr": "mx" }, "google": { "engine_domain": "www.google.com.mx", "abbr": "mx" } }, "fm": { "google": { "engine_domain": "www.google.fm", "abbr": "fm" } }, "md": { "google": { "engine_domain": "www.google.md", "abbr": "md" } }, "mn": { "google": { "engine_domain": "www.google.mn", "abbr": "mn" } }, "ma": { "google": { "engine_domain": "www.google.co.ma", "abbr": "ma" } }, "mz": { "google": { "engine_domain": "www.google.mz", "abbr": "mz" } }, "na": { "google": { "engine_domain": "www.google.com.na", "abbr": "na" } }, "nr": { "google": { "engine_domain": "www.google.nr", "abbr": "nr" } }, "np": { "google": { "engine_domain": "www.google.com.np", "abbr": "np" } }, "nl": { "yahoo": { "engine_domain": "nl.search.yahoo.com", "abbr": "nl" }, "bing": { "engine_domain": "www.bing.com", "abbr": "nl" }, "google": { "engine_domain": "www.google.nl", "abbr": "nl" } }, "nz": { "google": { "engine_domain": "www.google.co.nz", "abbr": "nz" }, "bing": { "engine_domain": "www.bing.com", "abbr": "nz" }, "yahoo": { "engine_domain": "search.yahoo.com", "abbr": "nz" } }, "ni": { "google": { "engine_domain": "www.google.com.ni", "abbr": "ni" } }, "ne": { "google": { "engine_domain": "www.google.ne", "abbr": "ne" } }, "ng": { "google": { "engine_domain": "www.google.com.ng", "abbr": "ng" } }, "nu": { "google": { "engine_domain": "www.google.nu", "abbr": "nu" } }, "nf": { "google": { "engine_domain": "www.google.com.nf", "abbr": "nf" } }, "no": { "google": { "engine_domain": "www.google.no", "abbr": "no" }, "yahoo": { "engine_domain": "no.search.yahoo.com", "abbr": "no" } }, "om": { "google": { "engine_domain": "www.google.com.om", "abbr": "om" } }, "pk": { "google": { "engine_domain": "www.google.com.pk", "abbr": "pk" } }, "pa": { "google": { "engine_domain": "www.google.com.pa", "abbr": "pa" } }, "py": { "google": { "engine_domain": "www.google.com.py", "abbr": "py" } }, "pe": { "google": { "engine_domain": "www.google.com.pe", "abbr": "pe" }, "yahoo": { "engine_domain": "pe.search.yahoo.com", "abbr": "pe" } }, "ph": { "yahoo": { "engine_domain": "ph.search.yahoo.com", "abbr": "ph" }, "google": { "engine_domain": "www.google.com.ph", "abbr": "ph" }, "bing": { "engine_domain": "www.bing.com", "abbr": "ph" } }, "pn": { "google": { "engine_domain": "www.google.pn", "abbr": "pn" } }, "pl": { "google": { "engine_domain": "www.google.pl", "abbr": "pl" }, "yahoo": { "engine_domain": "pl.yahoo.com", "abbr": "pl" }, "bing": { "engine_domain": "www.bing.com", "abbr": "pl" } }, "pt": { "bing": { "engine_domain": "www.bing.com", "abbr": "pt" }, "google": { "engine_domain": "www.google.pt", "abbr": "pt" } }, "qa": { "google": { "engine_domain": "www.google.com.qa", "abbr": "qa" } }, "ro": { "google": { "engine_domain": "www.google.ro", "abbr": "ro" }, "yahoo": { "engine_domain": "ro.search.yahoo.com", "abbr": "ro" }, "bing": { "engine_domain": "www.bing.com", "abbr": "ro" } }, "ru": { "bing": { "engine_domain": "www.bing.com", "abbr": "ru" }, "yahoo": { "engine_domain": "ru.search.yahoo.com", "abbr": "ru" }, "google": { "engine_domain": "www.google.ru", "abbr": "ru" } }, "rw": { "google": { "engine_domain": "www.google.rw", "abbr": "rw" } }, "sh": { "google": { "engine_domain": "www.google.sh", "abbr": "sh" } }, "vc": { "google": { "engine_domain": "www.google.com.vc", "abbr": "vc" } }, "ws": { "google": { "engine_domain": "www.google.com.vn", "abbr": "ws" } }, "sm": { "google": { "engine_domain": "www.google.sm", "abbr": "sm" } }, "st": { "google": { "engine_domain": "www.google.st", "abbr": "st" } }, "sa": { "google": { "engine_domain": "www.google.com.sa", "abbr": "sa" } }, "sn": { "google": { "engine_domain": "www.google.sn", "abbr": "sn" } }, "rs": { "google": { "engine_domain": "www.google.rs", "abbr": "rs" } }, "sc": { "google": { "engine_domain": "www.google.sc", "abbr": "sc" } }, "sl": { "google": { "engine_domain": "www.google.com.sl", "abbr": "sl" } }, "sg": { "google": { "engine_domain": "www.google.com.sg", "abbr": "sg" }, "bing": { "engine_domain": "www.bing.com", "abbr": "sg" }, "yahoo": { "engine_domain": "sg.search.yahoo.com", "abbr": "sg" } }, "sk": { "google": { "engine_domain": "www.google.sk", "abbr": "sk" }, "bing": { "engine_domain": "www.bing.com", "abbr": "sk" } }, "si": { "google": { "engine_domain": "www.google.si", "abbr": "si" } }, "sb": { "google": { "engine_domain": "www.google.com.sb", "abbr": "sb" } }, "so": { "google": { "engine_domain": "www.google.so", "abbr": "so" } }, "za": { "google": { "engine_domain": "www.google.co.za", "abbr": "za" }, "yahoo": { "engine_domain": "za.yahoo.com", "abbr": "za" }, "bing": { "engine_domain": "www.bing.com", "abbr": "za" } }, "kr": { "yahoo": { "engine_domain": "kr.search.yahoo.com", "abbr": "kr" }, "google": { "engine_domain": "www.google.co.kr", "abbr": "kr" }, "bing": { "engine_domain": "www.bing.com", "abbr": "kr" } }, "es": { "google": { "engine_domain": "www.google.es", "abbr": "es" }, "yahoo": { "engine_domain": "es.search.yahoo.com", "abbr": "es" }, "bing": { "engine_domain": "www.bing.com", "abbr": "es" } }, "lk": { "google": { "engine_domain": "www.google.lk", "abbr": "lk" } }, "se": { "yahoo": { "engine_domain": "se.search.yahoo.com", "abbr": "se" }, "google": { "engine_domain": "www.google.se", "abbr": "se" }, "bing": { "engine_domain": "www.bing.com", "abbr": "se" } }, "ch": { "bing": { "engine_domain": "www.bing.com", "abbr": "ch" }, "yahoo": { "engine_domain": "ch.search.yahoo.com", "abbr": "ch" }, "google": { "engine_domain": "www.google.ch", "abbr": "ch" } }, "tj": { "google": { "engine_domain": "www.google.com.tj", "abbr": "tj" } }, "tz": { "google": { "engine_domain": "www.google.co.tz", "abbr": "tz" } }, "th": { "bing": { "engine_domain": "www.bing.com", "abbr": "th" }, "yahoo": { "engine_domain": "th.search.yahoo.com", "abbr": "th" }, "google": { "engine_domain": "www.google.co.th", "abbr": "th" } }, "bs": { "google": { "engine_domain": "www.google.bs", "abbr": "bs" } }, "gm": { "google": { "engine_domain": "www.google.gm", "abbr": "gm" } }, "tg": { "google": { "engine_domain": "www.google.tg", "abbr": "tg" } }, "tk": { "google": { "engine_domain": "www.google.tk", "abbr": "tk" } }, "to": { "google": { "engine_domain": "www.google.to", "abbr": "to" } }, "tt": { "google": { "engine_domain": "www.google.tt", "abbr": "tt" } }, "tn": { "google": { "engine_domain": "www.google.tn", "abbr": "tn" } }, "tr": { "google": { "engine_domain": "www.google.com.tr", "abbr": "tr" }, "bing": { "engine_domain": "www.bing.com", "abbr": "tr" }, "yahoo": { "engine_domain": "tr.search.yahoo.com", "abbr": "tr" } }, "tm": { "google": { "engine_domain": "www.google.tm", "abbr": "tm" } }, "ug": { "google": { "engine_domain": "www.google.co.ug", "abbr": "ug" } }, "ua": { "google": { "engine_domain": "www.google.com.ua", "abbr": "ua" }, "bing": { "engine_domain": "www.bing.com", "abbr": "ua" } }, "ae": { "google": { "engine_domain": "www.google.ae", "abbr": "ae" } }, "uk": { "google": { "engine_domain": "www.google.co.uk", "abbr": "uk" }, "yahoo": { "engine_domain": "uk.search.yahoo.com", "abbr": "uk" } }, "us": { "yahoo": { "engine_domain": "search.yahoo.com", "abbr": "us" }, "bing": { "engine_domain": "www.bing.com", "abbr": "us" }, "google": { "engine_domain": "www.google.com", "abbr": "us" } }, "uy": { "google": { "engine_domain": "www.google.com.uy", "abbr": "uy" } }, "uz": { "google": { "engine_domain": "www.google.co.uz", "abbr": "uz" } }, "vu": { "google": { "engine_domain": "www.google.vu", "abbr": "vu" } }, "ve": { "google": { "engine_domain": "www.google.co.ve", "abbr": "ve" }, "yahoo": { "engine_domain": "ve.search.yahoo.com", "abbr": "ve" } }, "vn": { "google": { "engine_domain": "www.google.com.vn", "abbr": "vn" }, "yahoo": { "engine_domain": "vn.search.yahoo.com", "abbr": "vn" } }, "zm": { "google": { "engine_domain": "www.google.co.zm", "abbr": "zm" } }, "zw": { "google": { "engine_domain": "www.google.co.zw", "abbr": "zw" } } }');

defindeMessges = {
    google_error_message: 'Google Auto Suggest is not available right now!',
    google_error_solved_message: 'Google Auto Suggest is back online.'
};

var Answers = {

    bind: function bind(input_element_id) {
        //Bind on whole document
        if (typeof input_element_id == 'undefined') {
            var all_answer_elements = Answers.getAllAnswerInputElements();
            $.each(all_answer_elements, function (index, element) {
                Answers.putDefaultDataList(element);
            });
        }
        else {
            Answers.putDefaultDataList($('input#' + input_element_id));
        }
    },
    replaceUnits: function (string_value) {

        if (typeof string_value == 'undefined' || string_value == '')
            return 0;

        return parseInt(string_value.replace(/[^-\d\.]/g, ''));
    },
    getAllAnswerInputElements: function () {
        return $('input[' + definedAnswers.main_attribute_name + '="' + definedAnswers.main_attribute_value + '"]')
    },
    getDataListContainer: function (input_element_id) {
        return $('#' + definedAnswers.answer_data_list_prefix + '_' + input_element_id);
    },
    getDataListWrapper: function (input_element_id) {
        return $('#' + definedAnswers.answer_data_list_prefix + '_' + input_element_id).find('.' + definedAnswers.data_wrapper_container_class);
    },
    getDataListHtmlDataArray: function (input_element_id) {
        return $('#' + definedAnswers.answer_data_list_prefix + '_' + input_element_id).find('.' + definedAnswers.data_wrapper_container_class).children();
    },
    loadData: function (input_element_id, data) {

        Answers.logger(data);
        if (typeof data == 'undefined')
            return 'Empty Data';

        var input_element = $('#' + input_element_id);
        var data_list_container = Answers.getDataListContainer(input_element_id);
        var element_height = input_element.css('height');
        var element_font_size = input_element.css('font-size');
        var data_element_height = this.replaceUnits(element_height) * definedDefaults.input_to_data_height_ratio;
        $(data_list_container).find('.' + definedAnswers.data_wrapper_container_class).html('');

        $.each(data, function (index, data_item_object) {

            var instant_un_available_error_background = '';
            if (typeof data_item_object.unavailable != 'undefined') {
                instant_un_available_error_background = ' background: #fff1a8 !important; ';
            }

            var option_html =
                '<div style="' + instant_un_available_error_background + 'height: ' + data_element_height + '; font-size: ' + element_font_size + '; font-weight: ' + definedDefaults.font_weight + ';" ' + definedAnswers.data_value_attribute_name + '="' + data_item_object.option + '" ' + definedAnswers.data_item_input_id_attribute_name + '="' + input_element_id + '">' +
                data_item_object.text +
                '</div>';

            $(data_list_container).find('.' + definedAnswers.data_wrapper_container_class).append(option_html);
        });

        DataSuggestBinder.Events.onOptionItemMouseClick(input_element_id);
        DataSuggestBinder.Handlers.dataListShow(input_element_id);

    },
    putDefaultDataList: function (element) {

        var element_id = $(element).attr('id');
        var element_font_size = $(element).css('font-size');
        var element_width = $(element).css('width');
        var element_height = $(element).css('height');
        var element_border_width = $(element).css('border-width');
        var element_position_top = $(element).offset().top;
        var element_position_left = $(element).offset().left;
        var element_z_index = 9999;//$(element).css('z-index');
        var element_text_indent = $(element).css('text-indent');
        var element_padding = $(element).css('padding');
        var element_padding_left = $(element).css('padding-left');
        var element_padding_right = $(element).css('padding-right');
        element_z_index = element_z_index == 'auto' ? 10 : parseInt(element_z_index) + 10;

        element_width = Math.abs(this.replaceUnits(element_width) - this.replaceUnits(element_border_width) - (this.replaceUnits(element_padding_left) + this.replaceUnits(element_padding_right)) - definedDefaults.default_remover_width);
        element_position_top = element_position_top + this.replaceUnits(element_height) + this.replaceUnits(element_border_width) + definedDefaults.default_extra_top;

        element_text_indent = this.replaceUnits(element_text_indent) + this.replaceUnits(element_padding_left) + 'px';

        $('[id=' + definedAnswers.answer_data_list_prefix + '_' + element_id + ']').remove();

        var empty_data_list =
            '<div id="' + definedAnswers.answer_data_list_prefix + '_' + element_id + '" style="background: #fff; z-index: ' + element_z_index + '; width: ' + element_width + '; font-family: ' + definedDefaults.font_family + '; font-weight: ' + definedDefaults.font_weight + '; font-size: ' + element_font_size + ' !important; border: solid 1px #ccc; box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08); display: none; cursor: default; position: absolute; top: ' + element_position_top + '; left: ' + element_position_left + ';">' +
            '<div style="text-align: left; overflow: auto; text-indent: ' + element_text_indent + '; width: inherit;" class="' + definedAnswers.data_wrapper_container_class + '">' +
            '</div>' +
            '</div>';

        $('body').append(empty_data_list);
        Answers.rePositionDataList(element);

    },
    rePositionAllDataLists: function () {
        var all_answer_elements = Answers.getAllAnswerInputElements();
        $.each(all_answer_elements, function (index, element) {
            Answers.rePositionDataList(element);
        });
    },
    rePositionDataList: function (element) {
        var element_id = $(element).attr('id');
        var element_font_size = $(element).css('font-size');
        var element_width = $(element).css('width');
        var element_height = $(element).css('height');
        var element_border_width = $(element).css('border-width');
        var element_position_top = $(element).offset().top;
        var element_position_left = $(element).offset().left;
        var element_z_index = 9999;//$(element).css('z-index');
        element_z_index = element_z_index == 'auto' ? 10 : parseInt(element_z_index) + 10;
        var element_text_indent = $(element).css('text-indent');
        var data_padding_top = $(element).css('padding-top');
        var data_padding_bottom = $(element).css('padding-bottom');

        data_padding_top = (parseInt(this.replaceUnits(data_padding_top)) - parseInt(3)) + 'px';

        var listWidth = !(this.replaceUnits(element_border_width) > this.replaceUnits(element_width))
            ? Math.abs(this.replaceUnits(element_width) - this.replaceUnits(element_border_width) - definedDefaults.default_remover_width)
            : Math.abs(this.replaceUnits(element_width) - definedDefaults.default_remover_width);

        var re_position_values = {
            width: listWidth,
            top: element_position_top + this.replaceUnits(element_height) + definedDefaults.default_extra_top,
            left: element_position_left,
            'z-index': element_z_index,
            'font-size': element_font_size
        };

        var data_attributes = {
            width: listWidth,
            height: this.replaceUnits(element_height) * definedDefaults.input_to_data_height_ratio,
            'font-size': element_font_size,
            'padding-top': data_padding_top,
            'padding-bottom': data_padding_bottom
        };

        Answers.getDataListContainer(element_id);

        Answers.getDataListContainer(element_id).css(re_position_values);
        Answers.getDataListContainer(element_id).children().children().css(data_attributes)
    },
    getChosenAnswer: function (input_element_id) {
        return $('#' + definedAnswers.answer_data_list_prefix + '_' + input_element_id).find('.' + definedAnswers.data_wrapper_container_class).find('[' + definedAnswers.data_item_chosen_attribute_name + '="' + definedAnswers.data_item_chosen_attribute_value + '"]');
    },
    setSelectedOption: function (input_element_id, selected_option_element) {
        var selected_option_value = $(selected_option_element).attr(definedAnswers.data_value_attribute_name);

        //Clear all selected state options
        Answers.clearAllSelectedOptions(input_element_id);

        //Setting the chosen option
        $(selected_option_element).attr(definedAnswers.data_item_chosen_attribute_name, definedAnswers.data_item_chosen_attribute_value);
        $('#' + input_element_id).val(selected_option_value);
    },
    clearAllSelectedOptions: function (input_element_id) {
        Answers.getChosenAnswer(input_element_id).removeAttr(definedAnswers.data_item_chosen_attribute_name);
    },
    getEngineDomainUrl: function (selected_location_abbr) {

        var result = {google: 'www.google.com', bing: '', 'yahoo': '', amazon: 'completion.amazon.co.uk'};

        if (typeof definedEngineData[selected_location_abbr] != 'undefined') {
            var selected_location_engine_data = definedEngineData[selected_location_abbr];

            result.google = typeof selected_location_engine_data.google != 'undefined' ? selected_location_engine_data.google.engine_domain : result.google;
            result.amazon = typeof selected_location_engine_data.amazon != 'undefined' ? selected_location_engine_data.amazon.engine_domain : result.amazon;
        }

        return result;
    },
    push_to_used_engines: function (engine) {

        var current_length = definedSupporters.used_engines.length;
        definedSupporters.used_engines.push(engine);
        definedSupporters.used_engines = $.unique(definedSupporters.used_engines).reverse();

        if (current_length == definedSupporters.used_engines.length) {
            return;
        }

        window.setTimeout(function () {
            Answers.logger('Suggest Used Engines Emptied:');

            if (definedSupporters.used_engines.length > 2) {
                definedSupporters.used_engines = [];
                return;
            }

            definedSupporters.used_engines.pop();

        }, 5 * 60 * 1000);

    },
    array_diff: function (array_1, array_2) {

        //Array 1 - Array 2
        var array_diffed = [];
        $.each(array_1, function (key, value) {
            if (-1 === array_2.indexOf(value)) {
                array_diffed.push(value);
            }
        });

        return array_diffed;
    },
    suggest_engine_url: function () {

        var engine_url;
        var best_choice_engine = this.array_diff(definedSupporters.all_engines, definedSupporters.used_engines)[0];

        engine_url = this.getEngineDomainUrl(best_choice_engine).google;
        Answers.logger('Suggest Helper Engine Url changed to ' + best_choice_engine + ' ' + engine_url);
        definedSupporters.last_used_url_loc = best_choice_engine;

        Answers.logger('Given url:' + engine_url);

        definedSupporters.google_engine_url[best_choice_engine] = engine_url;

        if (engine_url == 'undefined') {
            return this.getEngineDomainUrl('us').google;
        }

        return engine_url;
    },
    logger: function () {
        definedAnswers.debug ? console.log(arguments[0]) : '';
    }
};

var Suggesters = {

    google_ajax_call_var: $.ajax(),
    amazon_ajax_call_var: $.ajax(),

    google: function (query, language_code, location_code, input_element_id) {

        var current_used_engines_length = definedSupporters.used_engines.length;
        var queryParts = Suggesters.queryPrePrepare(query, input_element_id);

        if (definedAjaxPointers.google != true && current_used_engines_length > 20) {
            Answers.logger('Google Core Block: Suggest Unavailable: Currently used engines exceeded the limit');
            Answers.logger('Suggest Used Engines: ', definedSupporters.used_engines);

            var data_list = [];
            var msg = 'Google Instant is unavailable. Press Enter to search.';
            data_list.push({
                option: query,
                text: '<span style="font-weight: 400; !important; background: #fff1a8;">' + msg + '</span>',
                unavailable: 1
            });
            Answers.loadData(input_element_id, data_list);

            return;
        }

        var engine_url = definedSupporters.google_engine_url[definedSupporters.last_used_url_loc];
        Answers.getDataListWrapper(input_element_id).html('');
        DataSuggestBinder.Handlers.dataListHide(input_element_id);

        if (definedAjaxPointers.google != true && definedSupporters.google_auto_suggest_msg_show) {
            engine_url = Answers.suggest_engine_url();
            Answers.push_to_used_engines(definedSupporters.last_used_url_loc);
            Answers.logger('Received url:' + engine_url);
            definedAjaxPointers.google = true;
            definedSupporters.google_auto_suggest_msg_show = true;
        }
        else {
            Answers.push_to_used_engines(definedSupporters.last_used_url_loc);
        }
        Answers.logger('E u:' + engine_url);

        if (query == '' || engine_url == 'undefined') {
            return;
        }

        //Suggesters.google_ajax_call_var.abort();
        var input = {
            timeout: 500,
            url: 'https://' + engine_url + '/complete/search',
            dataType: "jsonp",
            data: {
                output: 'search',
                q: queryParts.query,
                client: "chrome",
                hl: language_code,//'en',
                gl: location_code //'in'
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log('Timeout', jqXHR)
                if (textStatus == 'timeout' && typeof jqXHR.responseJSON != undefined) {
                    Suggesters.successDataHandler(jqXHR.responseJSON, query, input_element_id)
                } else {
                    Answers.logger(jqXHR, textStatus, errorThrown);
                    //Turn Off Temp. Next Search will pick another url.
                    DataSuggestBinder.Handlers.dataListHide(input_element_id);
                    definedAjaxPointers.google = false;
                }
            },
            success: function (response) {
                Suggesters.successDataHandler(response, query, input_element_id)
            },
            type: 'GET',
            overwrite_container: false
        };

        $.ajax(input);

    },
    amazon: function (query, language_code, location_code, input_element_id) {

        Answers.getDataListWrapper(input_element_id).html('');
        DataSuggestBinder.Handlers.dataListHide(input_element_id);

        if (query == '') {
            return;
        }

        Suggesters.amazon_ajax_call_var.abort();

        var input = {
            url: 'https://completion.amazon.co.uk/search/complete',
            jsonp: 'callback',
            dataType: "jsonp",
            ajax_retry: 0,
            data: {
                method: 'completion',
                q: query,
                mkt: "44571",
                client: 'amazon-search-ui',
                'search-alias': 'aps',
                qs: '',
                cf: 1,
                fb: 1,
                sc: 1,
                callback: ''
            },
            statusCode: {
                403: function () {
                    Answers.logger('Amazon error out!');
                    amazon_flag = false;
                    window.setTimeout(function () {
                        amazon_flag = true;
                    }, 30000); //30 sec do not send
                }
            },
            success: function (response) {
                Suggesters.successDataHandler(response, query, input_element_id)
            },
            type: 'GET',
            overwrite_container: false
        };
        Suggesters.amazon_ajax_call_var = $.ajax(input);
    },
    successDataHandler: function (response, query, input_element_id) {
        var best_suggestions = response[1];
        var data_list = [];
        var count = 1;
        var queryParts = Suggesters.queryPrePrepare(query, input_element_id);
        query = queryParts.query;

        $.each(best_suggestions, function (index, phrase) {

            if (phrase.indexOf(query) == 0) {
                count++;
            }
            else {
                return true;
            }

            phrase = phrase.substr(query.length);
            data_list.push({
                option: queryParts.preQuery + query + phrase,
                text: (queryParts.preQuery != '' ? '... ' : queryParts.preQuery) + query + '<span style="font-weight: 500; !important;">' + phrase + '</span>'
            });

            if (count > definedAnswers.allowed_data_length) {
                return false;
            }

        });

        Answers.loadData(input_element_id, data_list);
        Answers.rePositionDataList($('#' + input_element_id));
    },
    queryPrePrepare: function (query, input_element_id) {
        var queryParts = query.split(' ');
        var wordLength = $('#' + input_element_id).attr('data-word-length');

        var searchQuery = typeof wordLength != undefined
            ? (wordLength > queryParts.length ? query : queryParts.splice(queryParts.length - wordLength).join(' '))
            : query;

        return {
            query: searchQuery,
            preQuery: (searchQuery != query ? query.substr(0, query.indexOf(searchQuery)) : '')
        }
    }
};

var DataSuggestBinder = {
    DataSources: {
        googleSuggesterDataSource: function googleSuggesterDataSource(element_id) {

            var check_for_existing_data_list = Answers.getDataListContainer(element_id)[0];
            if (typeof check_for_existing_data_list == 'undefined') {
                Answers.putDefaultDataList(this);
            }

            var element = $('#' + element_id);
            var query = $(element).val();
            var language_code = $(element).data('language');
            var location_code = $(element).data('location');

            Suggesters.google(query, language_code, location_code, element_id);

            return this;
        },
        amazonSuggesterDataSource: function amazonSuggesterDataSource(element_id) {

            var check_for_existing_data_list = Answers.getDataListContainer(element_id)[0];
            if (typeof check_for_existing_data_list == 'undefined') {
                Answers.putDefaultDataList(this);
            }

            var element = $('#' + element_id);
            var query = $(element).val();
            var language_code = $(element).data('language');
            var location_code = $(element).data('location');

            Suggesters.amazon(query, language_code, location_code, element_id);

            return this;
        }
    },
    DataBinders: {
        bindDataSuggester: function bindDataSuggester(element_id, data_suggester_name) {
            Answers.bind(element_id);

            if (typeof data_suggester_name == 'undefined') {
                return 'Unknown Data Suggester';
            }

            switch (data_suggester_name) {
                case definedAnswers.google_suggester_attribute_value :
                    DataSuggestBinder.DataBinders.bindGoogleDataSuggester(element_id);
                    break;

                case definedAnswers.amazon_suggester_attribute_value :
                    DataSuggestBinder.DataBinders.bindAmazonDataSuggester(element_id);
                    break;
            }

            DataSuggestBinder.EventBinders.displayEvents(element_id);

            return this;

        },
        bindGoogleDataSuggester: function bindGoogleDataSuggester(element_id) {

            //Binding On Input Event
            DataSuggestBinder.Events.onSearchInput(element_id);

            return this;
        },
        bindAmazonDataSuggester: function bindAmazonDataSuggester(element_id) {

            //Binding On Input Event
            DataSuggestBinder.Events.onSearchInput(element_id);

            return this;
        }
    },
    EventBinders: {
        displayEvents: function displayEvents(element_id) {
            DataSuggestBinder.Events.onInputFocusIn(element_id);
            DataSuggestBinder.Events.onInputFocusOut(element_id);
        }
    },
    Handlers: {
        dataListHide: function dataListHide(element_id) {
            Answers.getDataListContainer(element_id).fadeOut(50);
        },
        dataListShow: function dataListHide(element_id) {
            Answers.rePositionDataList($('#' + element_id));

            var data_list_items = Answers.getDataListHtmlDataArray(element_id);
            if (data_list_items.length > 0) {
                Answers.getDataListContainer(element_id).fadeIn(50);
            }
        },
        provideSuggestions: function provideSuggestions(element_id, suggester_source_name) {

            //Routing to proper Source Binding for Suggestions
            switch (suggester_source_name) {
                case definedAnswers.google_suggester_attribute_value:
                    DataSuggestBinder.DataSources.googleSuggesterDataSource(element_id);
                    break;
                case definedAnswers.amazon_suggester_attribute_value:
                    DataSuggestBinder.DataSources.amazonSuggesterDataSource(element_id);
                    break;
            }

        },
        dataListKeyDown: function dataListKeyDown(element_id) {

            var all_data_list_items = Answers.getDataListHtmlDataArray(element_id);
            if (all_data_list_items.length == 0) {
                return;
            }
            DataSuggestBinder.Handlers.dataListShow(element_id);

            var current_chosen_option = Answers.getChosenAnswer(element_id)[0];

            //No option is chosen. So Choose the first one by default. 2nd Condition to check if some one has manipulated it or not.
            if (typeof current_chosen_option == 'undefined') {
                Answers.setSelectedOption(element_id, all_data_list_items[0]);
            }
            else {
                //Choose next item
                Answers.setSelectedOption(element_id, $(current_chosen_option).next());
            }

        },
        dataListKeyUp: function dataListKeyUp(element_id) {

            var all_data_list_items = Answers.getDataListHtmlDataArray(element_id);
            if (all_data_list_items.length == 0) {
                return;
            }
            DataSuggestBinder.Handlers.dataListShow(element_id);

            var current_chosen_option = Answers.getChosenAnswer(element_id)[0];

            //No option is chosen. So Choose the Last one by default. 2nd Condition to check if some one has manipulated it or not.
            if (typeof current_chosen_option == 'undefined' || current_chosen_option.length > 1) {
                Answers.setSelectedOption(element_id, all_data_list_items[all_data_list_items.length - 1]);
            }
            else {
                //Choose Previous item
                Answers.setSelectedOption(element_id, $(current_chosen_option).prev());
            }

        },
        dataListEnterKey: function dataListEnterKey(element_id) {
            DataSuggestBinder.Handlers.dataListHide(element_id);
        }
    },
    Events: {
        onInputFocusIn: function onInputFocusIn(element_id) {

            $('#' + element_id).focusin(function () {

                DataSuggestBinder.Handlers.dataListHide(element_id);
                var suggester_source_name = $(this).attr(definedAnswers.data_suggester_attribute_name);
                Answers.getDataListWrapper(element_id).html('');
                DataSuggestBinder.Handlers.provideSuggestions(element_id, suggester_source_name);
                var data_length = Answers.getDataListHtmlDataArray(element_id).length;
                if (data_length == 0) {
                    return;
                }

                DataSuggestBinder.Handlers.dataListShow(element_id);
            });

        },
        onInputFocusOut: function onInputFocusOut(element_id) {

            $('#' + element_id).focusout(function () {
                DataSuggestBinder.Handlers.dataListHide(element_id);
            });

        },
        onSearchInput: function onSearchInput(element_id) {
            $('#' + element_id).on('input', function () {
                var suggester_source_name = $(this).attr(definedAnswers.data_suggester_attribute_name);
                DataSuggestBinder.Handlers.provideSuggestions(element_id, suggester_source_name);
            });
        },
        keyDownOnInputElement: function keyDownOnInputElement(element_id) {
            $('#' + element_id).keydown(function (event) {

                //ArrowDown - 40
                if (event.keyCode == 40) {
                    DataSuggestBinder.Handlers.dataListKeyDown(element_id);
                }
                //ArrowUp - 38
                else if (event.keyCode == 38) {
                    DataSuggestBinder.Handlers.dataListKeyUp(element_id);
                }
                //Enter - 13
                else if (event.keyCode == 13) {
                    DataSuggestBinder.Handlers.dataListEnterKey(element_id);
                }

            });
        },
        onOptionItemMouseClick: function onOptionItemMouseHover(element_id) {

            $('[' + definedAnswers.data_item_input_id_attribute_name + '="' + element_id + '"]').mousedown(function () {
                Answers.setSelectedOption(element_id, $(this));
            });


        }
    },
    Defaults: {
        setDefaultBindings: function setDefaultBindings() {

            var all_google_binders = DataSuggestBinder.Defaults.getAllGoogleSuggesters();
            var all_amazon_binders = DataSuggestBinder.Defaults.getAllAmazonSuggesters();

            $.each(all_google_binders, function (index, element) {
                var element_id = $(element).attr('id');
                DataSuggestBinder.DataBinders.bindDataSuggester(element_id, definedAnswers.google_suggester_attribute_value);
                DataSuggestBinder.Events.keyDownOnInputElement(element_id);
            });

            $.each(all_amazon_binders, function (index, element) {
                var element_id = $(element).attr('id');
                DataSuggestBinder.DataBinders.bindDataSuggester(element_id, definedAnswers.amazon_suggester_attribute_value);
                DataSuggestBinder.Events.keyDownOnInputElement(element_id);
            });
        },
        getAllGoogleSuggesters: function getAllGoogleSuggesters() {
            return $('[' + definedAnswers.data_suggester_attribute_name + '="' + definedAnswers.google_suggester_attribute_value + '"]');
        },
        getAllAmazonSuggesters: function getAllAmazonSuggesters() {
            return $('[' + definedAnswers.data_suggester_attribute_name + '="' + definedAnswers.amazon_suggester_attribute_value + '"]');
        }
    }

};

function _suggest() {

    /** Default Suggest Binder : Binds all existing elements with appropriate rules.
     * Do not apply to Dynamically added Input Elements.
     * For Dynamically added Elements, you may use:  DataSuggestBinder.DataBinders.bindDataSuggester(element_id, data_suggester_name);
     *
     * Eg: DataSuggestBinder.DataBinders.bindDataSuggester('keyword_id', 'google-suggester');
     *     DataSuggestBinder.DataBinders.bindDataSuggester('keyword_id', 'amazon-suggester');
     *
     * */
    $(document).ready(function () {
        DataSuggestBinder.Defaults.setDefaultBindings();
    });

    //Re position all DataLists on window re-sizing
    $(window).resize(function () {
        Answers.rePositionAllDataLists();
    });
}

_suggest();

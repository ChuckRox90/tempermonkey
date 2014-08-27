var signal = document.createElement('audio');
signal.src = "http://mss.linkpc.net/sortList/signal.mp3";
$(signal).on('ended', function() {
    clearTimeout(timeout);
    setTimeout(function() {
        signal.play()
    }, 1000)
});

function ucFirst(a) {
    return a.substring(0, 1).toUpperCase() + a.substring(1)
}
$(document).ready(function() {
    $('head').append('<style>html,body{padding:0px;margin:0px;}.hidden{display:none}input{width:calc(100% - 8px)}body{padding:10px;}.new{background-color:rgba(255,0,0,0.2) !important}.modul{background-color:rgba(50,50,50,0.1)}.note1{color:green !important}.note2{color:orange !important}table{margin-bottom:10px;box-shadow:0px 0px 5px rgba(0,0,0,0.5)}.note3{color:red !important}.highlight{background-color:rgba(51,153,255,0.25)}.tabelleheader{border:1px solid gray;background-color:#3399FF;}.qis_records{color:rgb(60,60,60);}table{border-collapse:collapse;font-family:sans-serif;}table,th,td{border:1px solid gray;}th{background-size:auto 100%;background-repeat:no-repeat;background-position:right;cursor:pointer;background-color:rgba(150,150,150,1);color:rgb(240,240,240);}th.sortUp{}th.sortDown{}tr:hover{cursor:pointer;background-color:rgba(51,153,255,0.5);color:rgb(240,240,240);}</style>');

    function filter(a, b) {
        b = b.replace(' | ', '|');
        b = b.replace(' |', '|');
        b = b.replace('| ', '|');
        b = b.replace(' ,', '|');
        b = b.replace(' , ', '|');
        b = b.replace(', ', '|');
        b = b.replace(',', '|');
        if (b.indexOf('|') > -1) {
            b = b.split('|')
        }
        var c = $('table');
        for (var i = 1; i < $(c).children().children().length; i++) {
            var d = $(c).children().children()[i];
            d.classList.add('hidden');
            if (typeof(b) == 'object') {
                for (var k = 0; k < b.length; k++) {
                    if ($(d).children()[a].innerHTML.indexOf(b[k]) > -1) {
                        d.classList.remove('hidden')
                    }
                }
            } else {
                if ($(d).children()[a].innerHTML.indexOf(b) > -1) {
                    d.classList.remove('hidden')
                }
            }
        }
    }

    function createTable() {
        $('th>p').click(function(e) {
            var c = $('th>p');
            var d = $('tr');
            var f = new Array();
            var g = e.currentTarget.parentNode.parentNode;
            var h = e.currentTarget;
            for (var j = 1; j < $('tr').length; j++) {
                var l = d[j];
                var m = $(l).children();
                var n = new Array();
                for (var k = 0; k < m.length; k++) {
                    n.push([m[k].innerHTML, m[k].className])
                }
                n.className = $('tr')[j].className;
                f.push(n)
            }
            for (var i = 0; i < c.length; i++) {
                if (c[i] == e.currentTarget) {
                    localStorage.setItem('lastIndex', i);
                    for (var j = 0; j < c.length; j++) {
                        if (j != i) {
                            c[j].classList.remove('sortUp');
                            c[j].classList.remove('sortDown')
                        }
                    }
                    if ($(h).hasClass('sortDown')) {
                        localStorage.setItem('direction', 'up');
                        f.sort(function(b, a) {
                            if (a[i][0] > b[i][0]) return 1;
                            if (a[i][0] < b[i][0]) return -1;
                            return 0
                        });
                        h.classList.remove('sortDown');
                        h.classList.add('sortUp')
                    } else {
                        localStorage.setItem('direction', 'down');
                        f.sort(function(a, b) {
                            if (a[i][0] > b[i][0]) return 1;
                            if (a[i][0] < b[i][0]) return -1;
                            return 0
                        });
                        h.classList.remove('sortUp');
                        h.classList.add('sortDown')
                    }
                    for (var j = 0; j < f.length; j++) {
                        g = g.nextElementSibling;
                        for (var k = 0; k < f[j].length; k++) {
                            g.children[k].innerHTML = f[j][k][0];
                            g.children[k].className = f[j][k][1]
                        }
                        g.className = f[j].className
                    }
                }
            }
        })
    }
    var o = $('table')[5];
    $('body').text('');
    $(o).children().children()[0].remove();
    if (localStorage.getItem('highlight') != undefined) {
        var p = localStorage.getItem('highlight').split(',')
    } else {
        var p = new Array()
    } if (localStorage.getItem('oldlist') != undefined) {
        var q = localStorage.getItem('oldlist').split(',')
    } else {
        var q = new Array()
    }
    var r = new Array();
    for (var i = 0; i < $(o).children().children().length; i++) {
        var s = $(o).children().children()[i];
        if ($(s).children().length == 0) {} else {
            for (var j = 0; j < $(s).children().length; j++) {
                content = ucFirst($(s).children()[j].innerHTML.replace(/<(?:.|\n)*?>/gm, '').replace('&nbsp;', '').replace(/[^0-9a-zaüöAÜÖ. A-Z,]/g, '').replace(/^[ ]+[.]*/g, '').replace(',', '.'));
                if (i == 0) {
                    content = '<p>' + content + '</p>' + '<input id="filter_' + j + '" type="text" placeholder="' + content + '"/>'
                }
                if (j == 0 && i != 0) {
                    if (content[4] == " ") {
                        content = "0" + content;
                        content = content.substring(0, 5)
                    }
                }
                if (i != 0 && j == 5) {
                    if (content.length == 3) {
                        content = "0" + content
                    }
                    if (content.length == 4) {
                        content = "0" + content
                    }
                }
                if (i != 0 && j == 3 && content != "") {
                    var u = $(s).children()[j];
                    if (content < 2.7) {
                        u.classList.add('note1')
                    } else if (content > 2.6) {
                        u.classList.add('note2')
                    } else if (content > 4.0) {
                        u.classList.add('note3')
                    }
                }
                if (i != 0 && j == 4) {
                    var u = $(s).children()[j];
                    if (content == "Bestanden") {
                        u.classList.add('note1')
                    } else if (content == "Prüfung vorhanden") {
                        u.classList.add('note2')
                    } else {
                        u.classList.add('note3')
                    }
                }
                if (i != 0 && j == 2) {
                    content = content.replace('WS ', '');
                    content = content.replace('SS ', '');
                    if (content.length == 4) {
                        content = content.substr(0, 2) + ".5"
                    } else {
                        content = content.substr(0, 2) + ".0"
                    }
                }
                if (j != 1 && i != 0) {
                    var u = $(s).children()[j];
                    $(u).attr('align', 'center')
                }
                if (j == 1 && i != 0) {
                    var u = $(s).children()[j - 1];
                    if (p.indexOf(u.innerHTML) > -1) {
                        s.classList.add('highlight')
                    }
                    if (q.indexOf(u.innerHTML) == -1) {
                        s.classList.add('new')
                    }
                    r.push(u.innerHTML)
                }
                $(s).children()[j].innerHTML = content
            }
        }
    }
    $(o).children().children().each(function(a, b) {
        var c = b;
        if ($(c).children().length == 0) {
            $(c).remove()
        }
    });
    $('body').append(o);
    $('input').bind('change', function(e) {
        var a = e.currentTarget.id;
        var b = a.split('_')[1];
        var c = e.currentTarget;
        c = $(c).val();
        localStorage.setItem('filter', b + '_' + c);
        filter(b, c)
    });
    var v = localStorage.getItem('direction');
    var w = localStorage.getItem('lastIndex');
    $('tr:not(:eq(0))').click(function(e) {
        var t = e.currentTarget;
        var a = $(t).children()[0].innerHTML;
        if (t.classList.contains('highlight')) {
            t.classList.remove('highlight')
        } else {
            t.classList.add('highlight')
        } if (localStorage.getItem('highlight') != undefined) {
            var b = localStorage.getItem('highlight').split(',')
        } else {
            var b = new Array()
        } if (b.indexOf(a) < 0) {
            b.push(a)
        } else {
            b.splice(b.indexOf(a), 1)
        }
        localStorage.setItem('highlight', b.toString())
    });
    createTable();
    if (v != undefined && w != undefined) {
        if (v == "up") {
            $('th')[w].classList.remove('sortUp');
            $('th')[w].classList.add('sortDown')
        } else {
            $('th')[w].classList.add('sortUp');
            $('th')[w].classList.remove('sortDown')
        }
        $('th>p')[w].click()
    }
    var x = localStorage.getItem('filter');
    $('#filter_' + x.split('_')[0]).val(x.split('_')[1]);
    filter(x.split('_')[0], x.split('_')[1]);
    timeout = setTimeout(function() {
        location.reload()
    }, 60000);
    localStorage.setItem('oldlist', r.toString());
    if (q.length != r.length) {
        signal.play()
    }
});

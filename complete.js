var signal = document.createElement('audio');
signal.src = "http://mss.linkpc.net/sortList/signal.mp3";

$(signal).on('ended',function(){
    clearTimeout(timeout);
    setTimeout(function(){signal.play()},1000);
});

function ucFirst(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
}


$(document).ready(function(){
    $('head').append('<style>html,body{padding:0px;margin:0px;}.hidden{display:none}input{width:calc(100% - 8px)}body{padding:10px;}.new{background-color:rgba(255,0,0,0.2) !important}.modul{background-color:rgba(50,50,50,0.1)}.note1{color:green !important}.note2{color:orange !important}table{margin-bottom:10px;box-shadow:0px 0px 5px rgba(0,0,0,0.5)}.note3{color:red !important}.highlight{background-color:rgba(51,153,255,0.25)}.tabelleheader{border:1px solid gray;background-color:#3399FF;}.qis_records{color:rgb(60,60,60);}table{border-collapse:collapse;font-family:sans-serif;}table,th,td{border:1px solid gray;}th{background-size:auto 100%;background-repeat:no-repeat;background-position:right;cursor:pointer;background-color:rgba(150,150,150,1);color:rgb(240,240,240);}th.sortUp{}th.sortDown{}tr:hover{cursor:pointer;background-color:rgba(51,153,255,0.5);color:rgb(240,240,240);}</style>');
    
    function filter(index, val){
        val = val.replace(' | ', '|');
        val = val.replace(' |', '|');
        val = val.replace('| ', '|');
        val = val.replace(' ,', '|');
        val = val.replace(' , ', '|');
        val = val.replace(', ', '|');
        val = val.replace(',', '|');
        if( val.indexOf('|') > -1 ){
            val = val.split('|');
        }
        var table = $('table');
        for( var i = 1; i < $(table).children().children().length; i++ ){
            
            var elem = $(table).children().children()[i];
            elem.classList.add('hidden');
            if( typeof( val ) == 'object' ){
                for( var k = 0; k < val.length; k++ ){
                    if( $(elem).children()[index].innerHTML.indexOf( val[k] ) > -1 ){
                        elem.classList.remove('hidden');
                    }
                }
            } else {
                if( $(elem).children()[index].innerHTML.indexOf( val ) > -1 ){
                    elem.classList.remove('hidden');
                }
            }
        }
    }
    
    function createTable() {
        
        $('th>p').click(function(e) {
            
            var hlist = $('th>p');
            var ilist = $('tr');
            var list = new Array();
            var tbody = e.currentTarget.parentNode.parentNode;
            var thead = e.currentTarget;
            
            for (var j = 1; j < $('tr').length; j++) {
                var element = ilist[j];
                var items = $(element).children();
                var inlist = new Array();
                for (var k = 0; k < items.length; k++) {
                    inlist.push([items[k].innerHTML, items[k].className]);
                }
                inlist.className = $('tr')[j].className;
                list.push(inlist);
            }
            
            for (var i = 0; i < hlist.length; i++) {
                if (hlist[i] == e.currentTarget) {
                    
                    localStorage.setItem('lastIndex', i);
                    
                    for (var j = 0; j < hlist.length; j++) {
                        if (j != i) {
                            hlist[j].classList.remove('sortUp');
                            hlist[j].classList.remove('sortDown');
                        }
                    }
                    
                    if ($(thead).hasClass('sortDown')) {
                        localStorage.setItem('direction', 'up');
                        list.sort(function(b, a) {
                            if (a[i][0] > b[i][0])
                                return 1;
                            if (a[i][0] < b[i][0])
                                return -1;
                            return 0;
                        });
                        thead.classList.remove('sortDown');
                        thead.classList.add('sortUp');
                    } else {
                        localStorage.setItem('direction', 'down');
                        list.sort(function(a, b) {
                            if (a[i][0] > b[i][0])
                                return 1;
                            if (a[i][0] < b[i][0])
                                return -1;
                            return 0;
                        });
                        thead.classList.remove('sortUp');
                        thead.classList.add('sortDown');
                    }
                    
                    for (var j = 0; j < list.length; j++) {
                        tbody = tbody.nextElementSibling;
                        for (var k = 0; k < list[j].length; k++) {
                            tbody.children[k].innerHTML = list[j][k][0];
                            tbody.children[k].className = list[j][k][1];
                        }
                        tbody.className = list[j].className;
                    }
                }
            }
        });
    }
    
    var table = $('table')[5];
    $('body').text('');
    $(table).children().children()[0].remove();
    
    if( localStorage.getItem('highlight') != undefined ){
        var highlight = localStorage.getItem('highlight').split(',');
    } else {
        var highlight = new Array();
    }
    if( localStorage.getItem('oldlist') != undefined ){
        var oldlist = localStorage.getItem('oldlist').split(',');
    } else {
        var oldlist = new Array();
    }
    var newlist = new Array();
    
    for( var i = 0; i < $(table).children().children().length; i++ ){
        var elem = $(table).children().children()[i];
        if($(elem).children().length == 0){
        } else {
            for( var j = 0; j < $(elem).children().length; j++ ){
                
                content = ucFirst($(elem).children()[j].innerHTML.replace(/<(?:.|\n)*?>/gm, '').replace('&nbsp;','').replace(/[^0-9a-zaüöAÜÖ. A-Z,]/g,'').replace(/^[ ]+[.]*/g,'').replace(',', '.'));
                
                if( i == 0 ){
                    content = '<p>' + content + '</p>' + '<input id="filter_' + j + '" type="text" placeholder="' + content + '"/>';
                }
                
                if( j == 0 && i != 0 ){
                    if(content[4] == " "){
                        content = "0" + content;
                        content = content.substring(0,5);
                    }
                }
                if( i != 0 && j == 5 ){
                    if(content.length == 3){
                        content = "0" + content;
                    }
                    if(content.length == 4){
                        content = "0" + content;
                    }
                }
                if( i != 0 && j == 3 && content != "" ){
                    var child = $(elem).children()[j];
                    if( content < 2.7 ){
                        child.classList.add('note1');
                    } else if( content > 2.6 ){
                        child.classList.add('note2');
                    } else if( content > 4.0 ){
                        child.classList.add('note3');
                    }
                        }
                if( i != 0 && j == 4 ){
                    var child = $(elem).children()[j];
                    if( content == "Bestanden" ){
                        child.classList.add('note1');
                    } else if( content == "Prüfung vorhanden" ){
                        child.classList.add('note2');
                    } else {
                        child.classList.add('note3');
                    }
                }
                
                if( i != 0 && j == 2  ){
                    content = content.replace('WS ', '');
                    content = content.replace('SS ', '');
                    if( content.length == 4 ){
                        content = content.substr(0,2) + ".5";
                    } else {
                        content = content.substr(0,2) + ".0";
                    }
                }
                
                if( j != 1 && i != 0 ){
                    var child = $(elem).children()[j];
                    $(child).attr('align', 'center');
                }
                
                if( j == 1 && i != 0 ){
                    var child = $(elem).children()[j-1];
                    if( highlight.indexOf( child.innerHTML ) > -1 ){
                        elem.classList.add('highlight');
                    }
                    if( oldlist.indexOf( child.innerHTML ) == -1 ){
                        elem.classList.add('new');
                    }
                    
                    newlist.push(child.innerHTML);
                }
                
                $(elem).children()[j].innerHTML = content;
                
            }
        }
    }
    
    $(table).children().children().each(function(index, val){
        var elem = val;
        if($(elem).children().length == 0){
            $(elem).remove();
        }
    });
    
    
    
    $('body').append(table);
    
    $('input').bind('change', function( e ){
        
        var input = e.currentTarget.id;
        var index = input.split('_')[1];
        var val = e.currentTarget;
        val = $(val).val();
        
        localStorage.setItem('filter', index + '_' + val);
        
        filter(index, val);
        
    });
    
    var dir = localStorage.getItem('direction');
    var index = localStorage.getItem('lastIndex');
    
    $('tr:not(:eq(0))').click(function(e){
        var t = e.currentTarget;
        var target = $(t).children()[0].innerHTML;
        
        if( t.classList.contains('highlight') ){
            t.classList.remove('highlight');
        } else {
            t.classList.add('highlight');
        }
        
        if( localStorage.getItem('highlight') != undefined ){
            var highlight = localStorage.getItem('highlight').split(',');
        } else {
            var highlight = new Array();
        }
        if( highlight.indexOf(target) < 0 ){
            highlight.push( target );
        } else {
            highlight.splice( highlight.indexOf(target), 1 );
        }
        localStorage.setItem('highlight', highlight.toString());
    });
    
    createTable();
    
    if( dir != undefined && index != undefined ){
        if( dir == "up" ){
            $('th')[index].classList.remove('sortUp');
            $('th')[index].classList.add('sortDown');
        } else {
            $('th')[index].classList.add('sortUp');
            $('th')[index].classList.remove('sortDown');
        }
        $('th>p')[index].click();
    }
    
    var last_filter = localStorage.getItem('filter');
    $('#filter_' + last_filter.split('_')[0]).val(last_filter.split('_')[1]);
    filter(last_filter.split('_')[0], last_filter.split('_')[1]); 
    
    timeout = setTimeout(function(){location.reload();},60000);
    
    localStorage.setItem('oldlist', newlist.toString());
    
    if( oldlist.length != newlist.length ){
        signal.play();
    }
    
});

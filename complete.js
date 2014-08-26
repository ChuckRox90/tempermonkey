// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://qis.hs-albsig.de/qisserver/rds?state=notenspiegelStudent&next=list.vm&nextdir=qispos/notenspiegel/student&createInfos=Y&struct=auswahlBaum&nodeID=auswahlBaum%7Cabschluss*
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function ucFirst(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
}

$(document).ready(function(){
    $('head').append('<script>function createTable(){$(\'th\').click(function(e){var c=$(\'th\');var d=$(\'tr\');var f=new Array();var g=e.currentTarget.parentNode;var h=e.currentTarget;for(var j=1;j<$(\'tr\').length;j++){var l=d[j];var m=$(l).children();var n=new Array();for(var k=0;k<m.length;k++){n.push(m[k].innerHTML)}f.push(n)}for(var i=0;i<c.length;i++){if(c[i]==e.currentTarget){localStorage.setItem(\'lastIndex\',i);for(var j=0;j<c.length;j++){if(j!=i){c[j].classList.remove(\'sortUp\');c[j].classList.remove(\'sortDown\')}}if($(h).hasClass(\'sortDown\')){localStorage.setItem(\'direction\',\'up\');f.sort(function(b,a){if(a[i]>b[i])return 1;if(a[i]<b[i])return-1;return 0});h.classList.remove(\'sortDown\');h.classList.add(\'sortUp\')}else{localStorage.setItem(\'direction\',\'down\');f.sort(function(a,b){if(a[i]>b[i])return 1;if(a[i]<b[i])return-1;return 0});h.classList.remove(\'sortUp\');h.classList.add(\'sortDown\')}for(var j=0;j<f.length;j++){g=g.nextElementSibling;for(var k=0;k<f[j].length;k++){g.children[k].innerHTML=f[j][k]}}}}})}</script>');
    $('head').append('<style>html,body{padding:0px;margin:0px;}body{padding:10px;}.tabelleheader{border:1px solid gray;background-color:#3399FF;}.qis_records{color:rgb(60,60,60);}table{border-collapse:collapse;font-family:sans-serif;}table,th,td{border:1px solid gray;}th{background-size:auto 100%;background-repeat:no-repeat;background-position:right;cursor:pointer;background-color:rgba(150,150,150,1);color:rgb(240,240,240);}th.sortUp{}th.sortDown{}tr:hover{background-color:rgba(51,153,255,0.5);color:rgb(240,240,240);}</style>');
    var table = $('table')[5];
    $('body').text('');
    $(table).children().children()[0].remove();
    
    for( var i = 0; i < $(table).children().children().length; i++ ){
        var elem = $(table).children().children()[i];
        if($(elem).children().length == 0){
        } else {
            for( var j = 0; j < $(elem).children().length; j++ ){
                
                content = ucFirst($(elem).children()[j].innerHTML.replace(/<(?:.|\n)*?>/gm, '').replace('&nbsp;','').replace(/[^0-9a-zA-Z.,]/g,'').replace(',', '.'));
                
                if( j == 0 ){
                    if(content.length == 4){
                        content = "0" + content;
                    }
                }
                if( j == 5 ){
                    if(content.length == 3){
                        content = "0" + content;
                    }
                    if(content.length == 4){
                        content = "0" + content;
                    }
                }
                if( j == 2 ){
                    content = content.replace('Ws', '');
                    content = content.replace('Ss', '');
                    if( content.length == 4 ){
                        content = content.substr(0,2) + ".5";
                    } else {
                        content = content.substr(0,2) + ".0";
                    }
                }
                if( j != 1 ){
                    var child = $(elem).children()[j];
                    $(child).attr('align', 'center');
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
    
    if( localStorage.getItem('list_elements') != $(table).children().children().length ){
        alert( "Noten online" );
        localStorage.setItem('list_elements', $(table).children().children().length);
    }
    
    $('body').append(table);
    createTable();
    
    var dir = localStorage.getItem('direction');
    var index = localStorage.getItem('lastIndex');
    
    if( dir != undefined && index != undefined ){
        if( dir == "down" ){
            $('th')[index].classList.remove('sortUp');
            $('th')[index].classList.add('sortDown');
        } else {
            $('th')[index].classList.add('sortUp');
            $('th')[index].classList.remove('sortDown');
        }
        $('th')[index].click();
    }
    
    setTimeout(function(){location.reload();},60000);
    
});

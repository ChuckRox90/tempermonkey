function createTable() {

	$('th').click(function(e) {
	
		var hlist = $('th');
		var ilist = $('tr');
		var list = new Array();
		var tbody = e.currentTarget.parentNode;
		var thead = e.currentTarget;

		for (var j = 1; j < $('tr').length; j++) {
			var element = ilist[j];
			var items = $(element).children();
			var inlist = new Array();
			for (var k = 0; k < items.length; k++) {
				inlist.push(items[k].innerHTML);
			}
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
				        if (a[i] > b[i])
				            return 1;
				        if (a[i] < b[i])
				            return -1;
				        return 0;
				    });
				    thead.classList.remove('sortDown');
				    thead.classList.add('sortUp');
				} else {
					localStorage.setItem('direction', 'down');
				    list.sort(function(a, b) {
				        if (a[i] > b[i])
				            return 1;
				        if (a[i] < b[i])
				            return -1;
				        return 0;
				    });
				    thead.classList.remove('sortUp');
				    thead.classList.add('sortDown');
				}

				for (var j = 0; j < list.length; j++) {
				    tbody = tbody.nextElementSibling;
				    for (var k = 0; k < list[j].length; k++) {
				        tbody.children[k].innerHTML = list[j][k];
				    }
				}
			}
		}
	});
}

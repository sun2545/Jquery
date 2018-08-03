/*  myscript for book.xml 
		Name: Sunhye Kwon
		Student Number: 991 382 543
	*/
var rowID;
var xmlData;
$(document).on("pagecreate", "#home", function() {
	$.ajax({
		type:"POST", url:"dataFiles/book.xml", dataType: "xml",
		success: function(xml) {
			buildmenu(xml);
		},
		error: function(e) {
			alert(e.status + "-" + e.statusText);
		}
	}); // end of ajax
	
	
}); // end of document.on

function buildmenu(xml) {
			
	console.log("in buildmenu"); 
	xmlData = xml;
	
	$("#chd").html($(xml).find("title").text() + " - click");
	$("#phd").html("<p> Name : " + $(xml).find("loginName").attr("studentName")   + "<br>" +
	" Login Name : " + $(xml).find("loginName").text()   + "<br>" +
	" Student Number : " + $(xml).find("studentProg").attr("studentNumber")   + "<br>" +
	" Program : " + $(xml).find("studentProg").text() + "</p>" );
	 

	
	// start my #navhome nav bar
	$("#navhome").html(
		"<ul id='listhome'>" +
			"<li>" +
				"<a href='#home' class='ui-btn ui-icon-home ui-btn-icon-top'>" +
					"HOME" +
				"</a>" +
			"</li>" +
		"</ul>"
	);
	// start my #navind nav bar
	$("#navind").html(
		"<ul id='listind'>" +
			"<li>" +
				"<a href='#home' class='ui-btn ui-icon-home ui-btn-icon-top'>" +
					"HOME" +
				"</a>" +
			"</li>" +
		"</ul>"
	);	
	
	$("ul#booklist").html("");
	
	
	$(xml).find("book").each(function(n) {
		$("ul#booklist").append(
			"<li li-id='" + n + "'>" +
				"<a href='#individual' class='ui-btn ui-btn-icon-right ui-icon-book"+ n +"'>" + 
					$(this).find("booktitle").text() +
				"</a>" +
			"</li>"
		);
			
	}); 
	
	
	$(xml).find("bookstore").each(function(n) {
		
		$("ul#listhome").append(
			"<li li-id='" + n + "'>" +
				"<a href='" + $(this).find('url').text() + "' target='_blank' class='ui-btn-icon-bottom ui-icon-" + $(this).attr("name")+" '>" + 
					$(this).attr("name") + 
				"</a>" +
			"</li>"
		);		

		$("ul#listind").append(
			"<li li-id='" + n + "'>" +
				"<a href='" + $(this).find('url').text() + "' target='_blank' class='ui-btn-icon-bottom ui-icon-" + $(this).attr("name")+" '>" +
					$(this).attr("name") +
				"</a>" +
			"</li>"
		);	
		
	});
	
	
	
	
	 // end of campus loop
	 $("ui-title").collapsible("refresh");
	$("ul#booklist").listview("refresh");
	$("#navhome").navbar("destroy");
	$("#navhome").navbar();
	
} // end of buildmenu



// select from listview
$(document).on("click", "ul#booklist >li", function() {
	rowID = $(this).closest("li").attr("li-id");
	
});

// select from navhome/listhome
$(document).on("click", "ul#listhome >li", function() {
	rowID = $(this).closest("li").attr("li-id");
});



$(document).on("pagebeforeshow", "#individual", function() {
	parseXML(xmlData, rowID);
});

function parseXML(xml, choice) {
	$("#ind-data").html(
			"<h2>" + 
			     
				$(xml).find("booktitle:nth(" + choice + ")").text() + 
				
			"</h2>");
			
	$("#ind-data").append(				
			"<img src='images/" +
					$(xml).find("booktitle:nth(" + choice + ")").text()+'.jpg' +
					
					"' width='150'>");

			// add city from xml
	$("#ind-data").append(
			"<h3>Price: " + 
				$(xml).find("price:nth(" + choice + ")").text() +
			"</h3>");
			
	$("#ind-data").append(
			"<h3>Category: " + 
				$(xml).find("category:nth(" + choice + ")").text() +
			"</h3>");
			
	$("#ind-data").append(
			"<h3>InventoryID: " + 
				$(xml).find("invenId:nth(" + choice + ")").text() +
			"</h3>");
			
			// add description from xml
	$("#ind-data").append(
			"<h3>Description: " + 
				$(xml).find("description:nth(" + choice + ")").text() +
			"</h3>");
};

$(document).on("pagecreate", "#individual", function() {
	$("#navind").navbar("destroy");
	$("#navind").navbar();
});






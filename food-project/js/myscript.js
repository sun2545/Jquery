
$(document).on("pagebeforeshow","#mainPage",function () {
     

     $.getJSON("json1.json", function (data){

        createDialog(data);                                   
        createNav(data);                                        
     });

});


$(document).on("pagebeforeshow","#usda", function() { 
        
     $.getJSON("json1.json", function (data){

        createDialog(data);                               
        createNav(data);                                        
     });

    $.getJSON("ProjectData-09.json", function (data){
                                            
        createUSDA(data);                
     });
   
});



$(document).on("pagebeforeshow", "#grains", function() {
	
	$.ajax({
		type:"GET", url:"group.xml", dataType: "xml",
		success: function(xml){
               getGrains(xml);
        },
		error: function(e) {
			alert(e.status + "-" + e.statusText);
		}
	});
    
    $.getJSON("json1.json", function (data){

        createDialog(data);                               
        createNav(data);                                        
     });
}); 



function getGrains (info) {

	$("#grainssHeader").html("");
    $("#grainsTitle").html("");
	$("#grainsA").html("");
	$("#grainsB").html("");
	$("#panel0").html("");
	$("#panel1").html("");
	$("#panel2").html("");
	$("#panel3").html("");
	
	$("#grainssHeader").append("Grains and definitions");
	
    $("#grainsTitle").append("<a href='" + $(info).find("groupUrl").text() + "'>Grains</a>");
    
	$("#grainsA").append("<a href='#panel0' class='ui-btn'>Oatmeal</a><br><a href='#panel1' class='ui-btn'>Tortilla</a>");
	$("#grainsB").append("<a href='#panel2' class='ui-btn'>White Rice</a><br><a href='#panel3' class='ui-btn'>Bread</a>");

     counter=0;
	$(info).find("food").each(function () {
		
			$("#panel"+counter).append(
				"<h4>"+$(this).attr("name")+"</h4><br>"+
				
				"<div><img src='images/" + $(this).attr("name") + ".jpg'></div>" +
				"<table>"+
					"<tr><th>Calories:</th>" +
						"<td>" + $(this).find("calories").text() + " </td>"+				
					"</tr>"+
					"<tr><th>Price:</th>" +
						"<td>" + $(this).find("price").text() + " </td>"+				
					"</tr>"+
					"<tr><th>Total Fat:</th>" +
						"<td>"+$(this).find("fat").text()+"</td>"+				
					"</tr>"+
					"<tr><th>Sodium:</th>" +
						"<td>"+$(this).find("sodium").text()+"</td>"+				
					"</tr>"+
					"<tr><th>Protein:</th>" +
						"<td>"+$(this).find("protein").text()+"</td>"+				
					"</tr>"+
				"</table>"
			);
		 counter++;
			
	});
}

function createDialog(data) {
    member = data.group.students;
    var name = [];
    for(x=0; x < member.length; x++) {
        name = member[x].studentName.split(" ");       
        $("#dialog"+x).find("h2").html(name[0]); 
        $("#dialog"+x).find(".ui-block-a").html(
            "<img src='images/" + member[x].sPicture + "'>"
        ); 
        $("#dialog"+x).find(".ui-block-b").html(
            "<p><strong>Name:</strong> " + member[x].studentName + "</p>" +
            "<p><strong>Student ID:</strong> " + member[x].sLogin + "</p>"  +
            "<p><strong>Student Number:</strong> " + member[x].sNumber + "</p>"
        ); 
        $("#dialog"+x).find("div[data-role='footer']").html(      
        
        ); 
        
    }
}

function createNav(data) { // gernerates dynimec navbar on footer
    member = data.group.students;
    var name = [];
    var list = "";
    for(x=0; x < member.length; x++) {
            name = member[x].studentName.split(" ");
            list += "<li><a href='#dialog" + x +  "' role='button' class='ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-" + member[x].sLogin  + "' data-transition='pop' data-rel='dialog'>" + name[0] + "</a></li>";         
    }  
   
    $(".footerNav").html(
        "<div data-role='navbar'>" +
            "<ul>" + list + "</ul>" +
        "</div>"  
    );   
    
    $("div[data-role='navbar']").navbar(); //!important for dynimic navbar    
}



function createUSDA (data) {
    
    $("#usdaHeader").html("");
	$("#usdaHeader").append(data.type);
      
       $("#usdaListView").html("");
  
	start = data.blockset;
	
	for (x = 0; x < start.length; x++) {
         
			 $("#usdaListView").append(
				"<section data-role='collapsible' data-collapsed='true'>" +
					"<h4 class='ui-btn ui-icon-" + start[x].contactPoint.icon.split('-').join('') + " ui-btn-icon-right'>" +				
					start[x].classid +"</h4>" +
					"<div class='ui-grid-solo'>" +
						"<div class='ui-block-a'>" +
							"<table><tr><td>Description : " + start[x].description + "</td></tr>" +
														
								"<tr><td>Contact Name : " + start[x].contactPoint.fn + "</td></tr>" +
                                "<tr><td>Contact Email : " + start[x].contactPoint.hasEmail + "</td></tr>" +
                                "<tr><td>Media Type : " + start[x].distribution[0].mediaType + "</td></tr>" +
                                "<tr><td>Download URL : " + start[x].distribution[0].downloadURL + "</td></tr>" +
								"<tr><td>Modified Date : " + start[x].modified + "</td></tr>" +						
								"<tr><td>Access Level : " + start[x].accessLevel + "</td></tr>" +
                                "<tr><td>Publisher Name : " + start[x].publisher.name + "</td></tr>" +
							"</table>" +
						"</div>" +
						
					"</div>" +
				"</section>"
			);	 
          
	}
          $("#usdaListView").collapsibleset();

 
}


    
   


  




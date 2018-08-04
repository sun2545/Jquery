   
    var weatherList = new Array();

    $(document).on("pagebeforeshow", "#firstPage", function () {


        $.getJSON("a3_torontoWeather.json", function (data) {

            header(data.query.myData.studName,  data.query.results.channel.lastBuildDate);
			console.log(data.query.myData.weatherImg);
			console.log(data.query.myData.aboutIcon);
            section(data);
            panels(data);
            collapsible(data);
            footer(data);
			
			$("#secondPage").find("header").html(

                "<h2>" + data.query.myData.studName + "</h2>"				
            );
            
            $("#secondPage").find("header").css("text-align", "center");

            $("#secondPage").find("section").html(
                "<div class='ui-grid-a'>" +
                    "<div class='ui-block-a'>" +
                        "<img src='images/" + data.query.myData.myPic + "'>" +
                    "</div>" +
                    "<div class='ui-block-b'>" +
                        "<h4>Name: " + data.query.myData.studName + "</h4>" +
                        "<h4>Number: " + data.query.myData.studNumb + "</h4>" +
                        "<h4>Program: " + data.query.myData.studProg + "</h4>" +
                    "</div>" +
                "</div>"
            );
            $("#secondPage").find("img").css({
                "width": "50%",
                "height": "50%"
            });
			
			$("#submit").click(function(){
                email = $("#email").val();
                category = $("input[name='category']:checked").attr("value");
				console.log(category);
                comment = $("#textarea").val();
                localStorage.setItem("email", email);
                localStorage.setItem("category", category);
                localStorage.setItem("comment", comment);
			   
                alert( data.query.myData.studName + " submit was successful");
            });
            
            $("#retrieve").click(function(){
                $("#popup").empty().append(
                    "email: " + localStorage.getItem("email") +"<br>" +
                    "category: " + localStorage.getItem("category") +"<br>" +
                    "comment: " + localStorage.getItem("comment") +"<br>"                     
                );
            });
        });        
    });                  
   
    function section(data) {
		
        $("#firstPage").find("section").find(".ui-block-b").html(
	    	"<div><img src='images/" + data.query.myData.weatherImg + "'></div>" +
            "<div><h4>City: " + data.query.results.channel.location.city + "</h4></div>" +
            "<h4>Country: " + data.query.results.channel.location.country + "</h4>" +
            "<h4>Region: " + data.query.results.channel.location.region + "</h4>"  +
			"<h4>lat: " + data.query.results.channel.item.lat + "</h4>"  +
			"<h4>long: " + data.query.results.channel.item.long + "</h4>"  
		
        );
    }

    function footer(data) {

        $("#firstPage").find("footer").find(".ui-grid-b").html(
            "<div class='ui-block-a'>" +
                "<a href='#secondPage' data-rel='page' data-transition='pop' class='ui-shadow ui-btn ui-corner-all ui-icon-" + data.query.myData.aboutIcon + " ui-btn-icon-bottom ui-btn-inline'>about me" + 
            "</div>" +
            "<div class='ui-block-b'>" + 
                "<a href='https://www.chapters.indigo.ca/en-ca/?link-usage=Header%3A%20https%3A%2F%2Fwww.chapters.indigo.ca%2Fen-ca%2F' target='_blank' class='ui-shadow ui-btn ui-corner-all ui-icon-" + data.query.myData.otherIcon + " ui-btn-icon-notext ui-btn-inline'>Button</a>" + 
            "</div>" +
            "<div class='ui-block-c'>" + 
                "<a href='https://www.w3schools.com' target='_blank' class='ui-shadow ui-btn ui-corner-all ui-icon-w3 ui-btn-icon-notext ui-btn-inline'>Button</a>" +
            "</div>"
        );
		
        $("#firstPage").find("footer").find("div").css("text-align", "center");
    }

    function header(name,date) {
        $("#firstPage").find("header").html(
            "<div class='ui-grid-b'>" +
                "<div class='ui-block-a'></div>" +            
                "<div class='ui-block-b'>" +
                    "<h4>" + name + "<h4>" +
					"<h4>" + date + "<h4>" +
                "</div>" +
                "<div class='ui-block-c'>" +
                   "<a href='#thirdPage' class='ui-btn ui-corner-all ui-icon-edit ui-btn-icon-left' id='new'>Ask/Comment</a>" +
                "</div>" +
            "</div>"
        );

        $("#firstPage").find("header").find("img").css("width", "120px");
        $("#firstPage").find("header").find(".ui-block-a").css("text-align", "center");
    }

    function panels(data) {

        $("#windPanel").find("p").html(
            "Chill :" + data.query.results.channel.wind.chill + "<br> " +
            "Direction :" + data.query.results.channel.wind.direction + "<br> " +
            "Speed :" + data.query.results.channel.wind.speed
        );

        $("#atmospherePanel").find("p").html(
            "Humidity :" + data.query.results.channel.atmosphere.humidity + "<br> " +
            "Pressure :" + data.query.results.channel.atmosphere.pressure + " <br> " +
            "Rising :" + data.query.results.channel.atmosphere.rising + " <br> " +
            "Visibility :" + data.query.results.channel.atmosphere.visibility
        );

        $("#astronomyPanel").find("p").html(
            "Sunrise :" + data.query.results.channel.astronomy.sunrise + "<br> " +
            "Sunset :" + data.query.results.channel.astronomy.sunset
        );
    }

    function collapsible(data) {
            
        var state = "";    
          
        cast=data.query.results.channel.item.forecast;
        
        for(x=0; x < cast.length; x++) {  
           state+="<div data-role='collapsible'>" +
                    "<h4>" + cast[x].date + " " + cast[x].day + "</h4>" + 
                    "<ul data-role='listview'>"+					  
                        "<li>High: " + cast[x].high + "</li>" + 
                        "<li>Low: " + cast[x].low + "</li>" + 
                        "<li>" + cast[x].text + "</li>" + 
                    "</ul>" +
                  "</div>"
        }  
        $("#forecast").empty().append(state).collapsibleset();
    }

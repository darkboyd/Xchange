$(function(){
    var main = $("main"),
        sID,
        bID,
        amount,
        currency,
        location,
        lat,
        lng,
        sName,
        sRank,
        bName,
        bRank,
        status,
        cells = 0,
        body = $("body"),
        detail = $(".details");
    function createRow(name,imageUrl,rankUrl){
        main.append("<section class='row'>"+
                "<section  class='cell'></section>" +
                "<section class='cell'><p>"+name+"</p></section>" +
                "<section  class='cell'></section>" +
                "<section class='cell'><p>"+location+"</p></section>" +
                "<section class='cell'><p>"+status+"</p></section>" +
                "<section  class='cell tumbD'></section>" +
                "<section  class='cell tumbU'></section>" +
                "<section  class='cell details'></section>" +
            "</section>"
        );
        function dealsInfo() {

        }
        var cell = $(".cell");
        cell.eq(cells).parent().data({sID:sID,bID:bID,amount:amount,currency:currency,location:location,
            lat:lat,lng:lng,sName:sName,sRank:sRank,bName:bName,bRank:bRank,status:status});
        cell.eq(cells).css('background-image', 'url('+"../../images/users/"+imageUrl+".png"+')');
        cells+=2;
        cell.eq(cells).css('background-image', 'url('+"../../images/ranks/rank"+rankUrl+".png"+')');
        cells+=6;
        detail = $(".details");
        detail.click(function () {
            sID = $(this).parent().data('sID');
            bID = $(this).parent().data('bID');
            amount = $(this).parent().data('amount');
            currency = $(this).parent().data('currency');
            location = $(this).parent().data('location');
            lat = $(this).parent().data('lat');
            lng = $(this).parent().data('lng');
            sName = $(this).parent().data('sName');
            sRank = $(this).parent().data('sRank');
            bName = $(this).parent().data('bName');
            bRank = $(this).parent().data('bRank');
            status = $(this).parent().data('status');

            body.append("<div id='coverBlack'></div>");
            body.append("<div id='userMessege'><div id='exit'></div></div>");
            dealsInfo();
            $("#exit").click(function () {
                $("#userMessege").remove();
                $("#coverBlack").remove();
            });
            $("#coverBlack").click(function () {
                $("#userMessege").remove();
                $("#coverBlack").remove();
            });
        });
    }
    function checkID() {
        $.ajax({
            type: "GET",
            url: "../../includes/session.php?",
            data:{
                action: "getUserId"
            },
            dataType: 'json',
            success: function (data) {
                id = data.id;
                id = id.user_id;
                if(id == sID){
                    createRow(bName,bID,bRank);
                }else if(id == bID){
                    createRow(sName,sID,sRank);
                }
            }
        });
    }
    function loadMeetings() {
        $.ajax({
            type: "GET",
            url: "../../includes/action.php?",
            data:{
                action: "getMeetings"
            },
            dataType: 'json',
            success: function (data) {
                $.each(data, function(index, element) {
                    sID = element.deals_seller_id;
                    bID = element.deals_buyer_id;
                    amount = element.deals_amount;
                    currency = element.deals_currency;
                    location = element.deals_location;
                    lat = element.deals_lat;
                    lng = element.deals_lng;
                    sName = element.sell_um;
                    sRank = element.sell_ur;
                    bName = element.buy_un;
                    bRank = element.buy_ur;
                    status = element.deals_status;
                    if(status == 1){
                        status = "פעילה";
                    }else if(status == 2){
                        status = "בוצעה";
                    }

                    checkID();
                });
            },
            error: function (data) {
                console.log("something went wrong");
            }
        });
    }
    loadMeetings();
});


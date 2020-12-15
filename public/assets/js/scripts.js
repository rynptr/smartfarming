

  

  function GetTodayDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
    

 }

 function FormatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
 }

 function FormatDateYMD(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
 }
 
 
 
 function GetTime(){
   var today = new Date();
   var h = today.getHours();
   var m = today.getMinutes();
   var s = today.getSeconds();
   if(s<10){
     s = "0"+s;
   }
   var time= h+""+m+""+s;
   return time;
   //$("#jam").text(h+" : "+m+" : "+s);
   //setTimeout(function(){getdate()}, 500);
 }

 function cek_data(nip){
    
    $.ajax({
        type: "GET",
        url: "https://sikadir.k-7.monster/cekabsen/"+nip,
        dataType: "json",
        success: function (data) {
            var cek_data = data[0].cek_data;
            get_nama(nip,cek_data); 
	           
        }
    }); 
 }

 
 function get_nama(nip,cek_data){
//alert('get_nama');
	
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://simpeg.k-7.monster/asn?nip="+nip,
        dataType: "json",
        success: function (data) {
            var nama = data[0].nama; 
            if(cek_data =='0'){
                //alert('post');
                post_data_absen(nip,nama)    
            }else{
                //alert('update');
                update_data_absen(nip,nama)        
            }
            
        }
    }); 
 }
 
 
function post_data_absen(nip,nama){
    var lat = $("#latitude").val();
    var long = $("#longitude").val(); 
        
    var now = new Date(Date.now());
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    var tanggal = GetTodayDate();

    var formData = {
        nip:nip,
        nama:nama,
        keterangan:"WFH",
        tanggal:tanggal,
        waktu_masuk:time,
        waktu_pulang:time,
        lat:lat,
        lon:long,
        image:"image",
    }; 
    
    $.ajax({
        url : "https://sikadir.k-7.monster/absen",
        type: "POST",
        dataType: "json",
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
            notif('success-message',nip,nama,tanggal,time)
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log(jqXHR);
            alert('fail' + textStatus.code);
        }
    });
 }

 function update_data_absen(nip,nama){
    var lat = $("#latitude").val();
    var long = $("#longitude").val(); 

    var now = new Date(Date.now());
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    var tanggal = GetTodayDate();

    var formData = {
        nip:nip,
        waktu_pulang:time,
        tanggal:tanggal
    }; 
    
    $.ajax({
        url : "https://sikadir.k-7.monster/absen",
        type: "PUT",
        dataType: "json",
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
            notif('success-message',nip,nama,tanggal,time)
            
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log(jqXHR);
            alert('fail' + textStatus.code);
        }
    });
 }



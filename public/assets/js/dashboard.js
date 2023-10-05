


sd_id = 'ac67b4ff92b055f8d32a6';

ph_ss_id = '1a66f37bc5320dfa72410';
sa_ss_id = '96ddeb0b525cff541f0c9';
su_ss_id = '0736763d44c12c1c9374f';
kp_ss_id = 'f883a4704543a07c34249';
ic_ss_id = '4376d0babf29a5626f97b';
kv_ss_id = '61ac796f821d76a40ae25';
sm_ss_id = '1c963c2c1ffd70f17fbb5';
st_ss_id = '46fd08e1c78455d55491e';
kt_ss_id = 'a7380118d8ea06b977fe6';

ss_data_url = 'http://devel.bpi.lipi.go.id/iot_api/sensordata?ss_id=';

var sa_data = $.getJSON(ss_data_url + sa_ss_id), // $.getJSON returns a Deferred
    su_data = $.getJSON(ss_data_url + su_ss_id),
    ph_data = $.getJSON(ss_data_url + ph_ss_id), 
    kp_data = $.getJSON(ss_data_url + kp_ss_id), 
    ic_data = $.getJSON(ss_data_url + ic_ss_id), 
    kv_data = $.getJSON(ss_data_url + kv_ss_id), 
    sm_data = $.getJSON(ss_data_url + sm_ss_id), 
    st_data = $.getJSON(ss_data_url + st_ss_id), 
    kt_data = $.getJSON(ss_data_url + kt_ss_id),
    all   = $.when(sa_data, su_data, ph_data, kp_data, ic_data, kv_data, sm_data, st_data, kt_data);    // and $.when groups several Deferreds

// example usage - you can do the same for the individual files
all.done(function () {
  // something to call when all files have been successfully loaded
  define_units();
  plot1();
  plot2();
  plot3();
  plot4();  
  plot5();
  // plot6();
  // plot7();
  // plot8();
  overview();
  console.log("done");
});

all.fail(function () {
  // something to call in case one or more files fail
  console.log("fail");
});

all.always(function () {
  // something to always call (like, say, hiding a "loading" indicator)
  console.log("always");
});


shChart = document.getElementById('shChart');
surface3DChart1 = document.getElementById('chartPreferences');
phChart = document.getElementById('phChart');
kpChart = document.getElementById('kpChart');
icChart = document.getElementById('icChart');
kvChart = document.getElementById('kvChart');
// chartMap = document.getElementById('chartMap');
smChart = document.getElementById('smChart');
stChart = document.getElementById('stChart');
kpChart = document.getElementById('kpChart');

function overview(){
  $('#last-sa').text(parseFloat(sa_data.responseJSON.data_terakhir.nilai).toFixed(1));
  $('#last-su').text(parseFloat(su_data.responseJSON.data_terakhir.nilai).toFixed(1));
  $('#last-ph').text(parseFloat(ph_data.responseJSON.data_terakhir.nilai).toFixed(1));
  $('#last-kp').text(parseFloat(kp_data.responseJSON.data_terakhir.nilai).toFixed(1));
  $('#last-kv').text(parseFloat(kv_data.responseJSON.data_terakhir.nilai).toFixed(1));
  $('#last-ic').text(parseFloat(ic_data.responseJSON.data_terakhir.nilai).toFixed(1));
  $('#last-sm').text(parseFloat(sm_data.responseJSON.data_terakhir.nilai).toFixed(1));
  $('#last-st').text(parseFloat(st_data.responseJSON.data_terakhir.nilai).toFixed(1));
  $('#last-kt').text(parseFloat(kt_data.responseJSON.data_terakhir.nilai).toFixed(1));

  $('#sa-unit').text(sa_data.responseJSON.unit);
  $('#su-unit').text(su_data.responseJSON.unit);
  $('#ph-unit').text(ph_data.responseJSON.unit);
  $('#kp-unit').text(kp_data.responseJSON.unit);
  $('#kv-unit').text(kv_data.responseJSON.unit);
  $('#ic-unit').text(ic_data.responseJSON.unit);
  $('#sm-unit').text(sm_data.responseJSON.unit);
  $('#st-unit').text(st_data.responseJSON.unit);
  $('#kt-unit').text(kt_data.responseJSON.unit);
  

  $('#last-update').text(ic_data.responseJSON.data_terakhir.datetime);
}


var globalColors = ['#F87E7C', '#8D57D9', '#06BBCB', '#5CA9E1', '#F076B1', '#27C7A7', '#EEC544'];

var style1 = {
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  font: {
    size: 12, 
    color: '#96A1BD',
  },
  showlegend: true,
  margin: {
    t: 0
  },
  yaxis: {
    // rangemode: 'tozero',
    title: 'y axis',
    gridcolor: 'rgba(150,161,189, .25)',
  },
  xaxis: {
    // rangemode: 'tozero',
    linecolor: 'rgba(150,161,189, .35)',
    gridcolor: 'rgba(150,161,189, .25)',
  },
}


var style2 = {
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  font: {
    size: 12, 
    color: '#96A1BD',
  },
  showlegend: true,
  margin: {
    t: 0
  },
  yaxis: {
    // rangemode: 'tozero',
    title: 'y axis',
    gridcolor: 'rgba(150,161,189, .25)',
  },
  xaxis: {
    // rangemode: 'tozero',
    linecolor: 'rgba(150,161,189, .35)',
    gridcolor: 'rgba(150,161,189, .25)',
  },
}


var style3 = {
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  font: {
    size: 12, 
    color: '#96A1BD',
  },
  showlegend: true,
  margin: {
    t: 0
  },
  yaxis: {
    // rangemode: 'tozero',
    title: 'y axis',
    gridcolor: 'rgba(150,161,189, .25)',
  },
  xaxis: {
    // rangemode: 'tozero',
    linecolor: 'rgba(150,161,189, .35)',
    gridcolor: 'rgba(150,161,189, .25)',
  },
}


var style4 = {
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  font: {
    size: 12, 
    color: '#96A1BD',
  },
  showlegend: true,
  margin: {
    t: 0
  },
  yaxis: {
    // rangemode: 'tozero',
    title: 'y axis',
    gridcolor: 'rgba(150,161,189, .25)',
  },
  xaxis: {
    // rangemode: 'tozero',
    linecolor: 'rgba(150,161,189, .35)',
    gridcolor: 'rgba(150,161,189, .25)',
  },
}


var style5 = {
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  font: {
    size: 12, 
    color: '#96A1BD',
  },
  showlegend: true,
  margin: {
    t: 0
  },
  yaxis: {
    // rangemode: 'tozero',
    title: 'y axis',
    gridcolor: 'rgba(150,161,189, .25)',
  },
  xaxis: {
    // rangemode: 'tozero',
    linecolor: 'rgba(150,161,189, .35)',
    gridcolor: 'rgba(150,161,189, .25)',
  },
}


var style6 = {
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  font: {
    size: 12, 
    color: '#96A1BD',
  },
  showlegend: true,
  margin: {
    t: 0
  },
  yaxis: {
    // rangemode: 'tozero',
    title: 'y axis',
    gridcolor: 'rgba(150,161,189, .25)',
  },
  xaxis: {
    // rangemode: 'tozero',
    linecolor: 'rgba(150,161,189, .35)',
    gridcolor: 'rgba(150,161,189, .25)',
  },
}


var style7 = {
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  font: {
    size: 12, 
    color: '#96A1BD',
  },
  showlegend: true,
  margin: {
    t: 0
  },
  yaxis: {
    // rangemode: 'tozero',
    title: 'y axis',
    gridcolor: 'rgba(150,161,189, .25)',
  },
  xaxis: {
    // rangemode: 'tozero',
    linecolor: 'rgba(150,161,189, .35)',
    gridcolor: 'rgba(150,161,189, .25)',
  },
}


var style8 = {
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  font: {
    size: 12, 
    color: '#96A1BD',
  },
  showlegend: true,
  margin: {
    t: 0
  },
  yaxis: {
    // rangemode: 'tozero',
    title: 'y axis',
    gridcolor: 'rgba(150,161,189, .25)',
  },
  xaxis: {
    // rangemode: 'tozero',
    linecolor: 'rgba(150,161,189, .35)',
    gridcolor: 'rgba(150,161,189, .25)',
  },
}


function define_units(){
  style1.yaxis.title = sa_data.responseJSON.name + " (" + sa_data.responseJSON.unit + ")"; 
  style2.yaxis.title = ph_data.responseJSON.name + " (" + ph_data.responseJSON.unit + ")";  
  style3.yaxis.title = kp_data.responseJSON.name + " (" + kp_data.responseJSON.unit + ")";
  style4.yaxis.title = ic_data.responseJSON.name + " (" + ic_data.responseJSON.unit + ")";
  style5.yaxis.title = kv_data.responseJSON.name + " (" + kv_data.responseJSON.unit + ")";
  style6.yaxis.title = sm_data.responseJSON.name + " (" + sm_data.responseJSON.unit + ")";
  style7.yaxis.title = st_data.responseJSON.name + " (" + st_data.responseJSON.unit + ")";
  style8.yaxis.title = kt_data.responseJSON.name + " (" + kt_data.responseJSON.unit + ")";

  console.log("1: " + style1.yaxis.title);
  console.log("2: " + style2.yaxis.title);
  console.log("3: " + style3.yaxis.title);
  console.log("4: " + style4.yaxis.title);
  console.log("5: " + style5.yaxis.title);
  console.log("6: " + style6.yaxis.title);
  console.log("7: " + style7.yaxis.title);
  console.log("8: " + style8.yaxis.title);
}

function plot1() {
  var trace2 = {
    x: sa_data.responseJSON.category,
    y: sa_data.responseJSON.data,
    name: sa_data.responseJSON.name,
    line: {
      color: '#F076B1',
      shape: 'spline',
    }
  };
  
  var trace3 = {
    x: su_data.responseJSON.category,
    y: su_data.responseJSON.data,
    name: su_data.responseJSON.name,
    line: {
      color: '#5CA9E1',
      shape: 'spline',
    }
  };
  
  var data1 = [trace2, trace3];
  Plotly.plot(shChart, data1, style1);
  console.log("sh"); //Plotly.BUILD);
}


function plot2() {
  var trace1 = {
    x: ph_data.responseJSON.category,
    y: ph_data.responseJSON.data,
    name: ph_data.responseJSON.name,
    line: {
      color: globalColors[0], 
      shape: 'spline',
    }
  };
  
  var data1 = [trace1];
  Plotly.plot(phChart, data1, style2);
  console.log("ph"); //Plotly.BUILD);
}


function plot3() {
  var trace1 = {
    x: kp_data.responseJSON.category,
    y: kp_data.responseJSON.data,
    name: kp_data.responseJSON.name,
    line: {
      color: globalColors[1], 
      shape: 'spline',
    }
  };
  
  var data1 = [trace1];
  Plotly.plot(kpChart, data1, style3);
  console.log("kp"); //Plotly.BUILD);
}


function plot4() {
  var trace1 = {
    x: ic_data.responseJSON.category,
    y: ic_data.responseJSON.data,
    name: ic_data.responseJSON.name,
    line: {
      color: globalColors[2], 
      shape: 'spline',
    }
  };
  
  var data1 = [trace1];
  Plotly.plot(icChart, data1, style4);
  console.log("ic"); //Plotly.BUILD);
}

function plot5() {
  var trace1 = {
    x: kv_data.responseJSON.category,
    y: kv_data.responseJSON.data,
    name: kv_data.responseJSON.name,
    line: {
      color: globalColors[3], 
      shape: 'spline',
    }
  };
  
  var data1 = [trace1];
  Plotly.plot(kvChart, data1, style5);
  console.log("kv"); //Plotly.BUILD);
}


function plot6() {
  var trace1 = {
    x: sm_data.responseJSON.category,
    y: sm_data.responseJSON.data,
    name: sm_data.responseJSON.name,
    line: {
      color: globalColors[3], 
      shape: 'spline',
    }
  };
  
  var data1 = [trace1];
  Plotly.plot(smChart, data1, style6);
  console.log("sm"); //Plotly.BUILD);
}


function plot7() {
  var trace1 = {
    x: st_data.responseJSON.category,
    y: st_data.responseJSON.data,
    name: st_data.responseJSON.name,
    line: {
      color: globalColors[3], 
      shape: 'spline',
    }
  };
  
  var data1 = [trace1];
  Plotly.plot(stChart, data1, style7);
  console.log("st"); //Plotly.BUILD);
}


function plot8() {
  var trace1 = {
    x: kt_data.responseJSON.category,
    y: kt_data.responseJSON.data,
    name: kt_data.responseJSON.name,
    line: {
      color: globalColors[3], 
      shape: 'spline',
    }
  };
  
  var data1 = [trace1];
  Plotly.plot(ktChart, data1, style8);
  console.log("kt"); //Plotly.BUILD);
}

var greenhouse_first_active = false;

$('#greenhousetab a').on('click', function (e) {
  console.log("greenhouse plot");
  e.preventDefault();

  
  if (greenhouse_first_active == false){
    
    greenhouse_first_active = true;
    
    setTimeout(function(){
      plot6();
      plot7();
      plot8();
    }, 500); 
      
  }
})






// z1 = {
//   z:[
//     [8.83,8.89,8.81,8.87,8.9,8.87],
//     [8.89,8.94,8.85,8.94,8.96,8.92],
//     [8.84,8.9,8.82,8.92,8.93,8.91],
//     [8.79,8.85,8.79,8.9,8.94,8.92],
//     [8.79,8.88,8.81,8.9,8.95,8.92],
//     [8.8,8.82,8.78,8.91,8.94,8.92],
//     [8.75,8.78,8.77,8.91,8.95,8.92],
//     [8.8,8.8,8.77,8.91,8.95,8.94],
//     [8.74,8.81,8.76,8.93,8.98,8.99],
//     [8.89,8.99,8.92,9.1,9.13,9.11],
//     [8.97,8.97,8.91,9.09,9.11,9.11],
//     [9.04,9.08,9.05,9.25,9.28,9.27],
//     [9,9.01,9,9.2,9.23,9.2],
//     [8.99,8.99,8.98,9.18,9.2,9.19],
//     [8.93,8.97,8.97,9.18,9.2,9.18]
//   ],
//   type: 'surface',
//   colorscale: [[0, 'rgb(248,126,124)'], [1, 'rgb(141,87,217)']],
// };

// var data2 = [z1];

// Plotly.plot(surface3DChart1, data2, style);


// var data5 = [
//   {
//     type:'scattermapbox',
//     lat:['-7.151546'],
//     lon:['107.850460'],
//     mode:'markers',
//     marker: {
//       size:20,
//       color: globalColors[3],
//     },
//     text:['Gunung Guntur']
//   },

//   {
//     type:'scattermapbox',
//     lat:['-7.145546'],
//     lon:['107.827460'],
//     mode:'markers',
//     marker: {
//       size:20,
//       color: globalColors[1],
//     },
//     text:['Leuweung Guntur']
//   },


// ]

// var layoutMap = {
//   plot_bgcolor: 'transparent',
//   paper_bgcolor: 'transparent',
//   font: {
//     size: 12, 
//     color: '#96A1BD',
//   },
//   // showlegend: true,
//   margin: {
//     t: 0
//   },
//   autosize: true,
//   hovermode:'closest',
//   mapbox: {
//     bearing:0,
//     center: {
//       lat: -7.2953232,
//       lon: 107.8318007,
//     },
//     pitch:0,
//     zoom:18,
//     style: 'mapbox://styles/mapbox/satellite-v9',
//   },
// }

// Plotly.setPlotConfig({
//   mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
// })

// Plotly.plot(chartMap, data5, layoutMap);
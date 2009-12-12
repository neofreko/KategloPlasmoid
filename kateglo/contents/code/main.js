layout = new LinearLayout(plasmoid);
layout.setOrientation(2);
 
label = new Label();
layout.addItem(label);
label.text='KATEGLO';
//label.image = '../kateglo40.png';

// request box
request_box = new LinearLayout(layout);
request_box.setOrientation(1);

layout.addItem(request_box);

var edit = new LineEdit();
request_box.addItem(edit);
edit.isClearButtonShown = true;
edit.text='bahtera';

var search = new PushButton();
request_box.addItem(search);
search.text='Cari';
search.clicked.connect(doSearch);

result_box = new LinearLayout(layout);
result_box.setOrientation(2);
layout.addItem(result_box);

var wv = new WebView();
result_box.addItem(wv);
var css = "<style>* {font-size: small; text-decoration: none} a:hover {text-decoration: underline} li {list-style-type: none}</style>";
wv.html = css;

var busy; // global var

plasmoid.dataUpdate = function(source,data) {
  wv.html = css ;
  
  if (data['status']=='0') {
    wv.html+='<em>Tidak ada data yang ditemukan</em>';// clean up
    return;
  }
    
  //result_box.removeItem(buzy);
  //wv.html = css+"<img src='http://bahtera.org/kateglo/images/kateglo40.png'/><h3>Kateglo</h3>";  
  
  wv.html += '<strong>'+data['phrase'] + (data.lex_class?' ['+data.lex_class+'] ':'')+ '</strong>' + '<ul>';
  i=1;
  for (var elm in data['definition']) {  
    /*for (var dbg in data['definition'])
      wv.html += 'debug:' + dbg;*/
      item=data['definition'][elm];
    wv.html += '<li><strong>'+ (item['lex_class']?item['lex_class']+' ':'')+ i++ + ': </strong>' + item['def_text']+'</li>';
  }
    
  wv.html += '</ul>';  
}

//plasmoid.dataEngine("kateglo-engine").connectSource("onemanga", plasmoid, 500);

function doSearch() {
  //busy = new BusyWidget();
  //result_box.addItem(busy);
  plasmoid.dataEngine("kateglo-engine").connectSource(edit.text, plasmoid, 0);
}
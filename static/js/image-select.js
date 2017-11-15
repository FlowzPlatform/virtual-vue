if (typeof String.prototype.start_with != 'function') {
  String.prototype.start_with = function (str){
    return this.slice(0, str.length) == str;
  };
}
function inspect(e, options) {
  if(options==null){
    options = {};
  }
  var onlykey = options['onlykey']==null ? false : options['onlykey']
  var prefix = options['prefix']==null ? '' : options['prefix']
  var msg = new Array();
  for (prop in e) {
    if(prop.start_with(prefix)){
      if(onlykey==true){
        msg.push(prop);
      }else{
        msg.push(prop + ": " + e[prop]);
      }
    }

  };

  if(onlykey==true){
    $("#cl").html(msg.join(', '));
  }else{
    $("#cl").html(msg.join('\n'));
  }

}
var set_position = function(width, height){
  $('.ui-resizable-n').css('left', (width/2-4)+'px');
  $('.ui-resizable-e').css('top', (height/2-4)+'px');
  $('.ui-resizable-s').css('left', (width/2-4)+'px');
  $('.ui-resizable-w').css('top', (height/2-4)+'px');

  // call api
};
$(document).ready(function(){
  $( ".box" ).resizable({
    handles: {
      'n':'.ui-resizable-n',
      'e':'.ui-resizable-e',
      's':'.ui-resizable-s',
      'w':'.ui-resizable-w',
      'ne': '.ui-resizable-ne',
      'se': '.ui-resizable-se',
      'sw': '.ui-resizable-sw',
      'nw': '.ui-resizable-nw'
    },
    grid: [ 1, 1 ],
    //helper: "ui-resizable-helper",
    create: function( event, ui ) {
      //alert(ui.element);
      //inspect(event.target, {'onlykey':true});

      var width = $(event.target).width();
      var height = $(event.target).height();
      set_position(width, height);
    },
    resize: function(event, ui){
      var width = $(event.target).width();
      var height = $(event.target).height();
      set_position(width, height);
    },
    alsoResize: "#rect1"
  });

  $( ".box" ).draggable({
    grid: [ 1, 1 ]
  });
});

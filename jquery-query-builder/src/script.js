
// Fix for Bootstrap Datepicker
$('#builder').on('afterUpdateRuleValue.queryBuilder', function(e, rule) {
  if (rule.filter.plugin === 'datepicker') {
    rule.$el.find('.rule-value-container input').datepicker('update');
  }
});

var rules_widgets = {
	condition: 'AND',
	rules: [{
		"id": "''price''",
		"operator": 'less',
		"value": 10.25
	},{
    "id": "''date''",
    "operator": 'equal',
  }, 
          {
		"condition": 'OR',
		"rules": [{
			"id": "''category''",
			"operator": 'equal',
			"value": 2
		}]
	}]
};

	$('#builder').queryBuilder({
	plugins: ['bt-tooltip-errors'],
	
	filters: [
    {
		"id": "name",
		"label": "Name",
		"type": "string"
	}, 
   {
    "id": "''date''",
    "label": "Datepicker",
    "type": 'date',
    "validation": {
      "format": 'YYYY/MM/DD'
    },
    "plugin": 'datepicker',
    "plugin_config": {
      "format": 'yyyy/mm/dd',
      "todayBtn": 'linked',
      "todayHighlight": true,
      "autoclose": true
    }
  },
      {
		"id": "''category''",
		"label": "Category",
		"type": "integer",
		"input": "select",
		"values": {
			"1": "Books",
			"2": "Movies",
			"3": "Music",
			"4": "Tools",
			"5": "Goodies",
			"6": "Clothes"
		},
		"operators": ["equal", "not_equal", "in", "not_in", "is_null", "is_not_null"]
	}, {
		"id": "''in_stock''",
		"label": "In stock",
		"type": "integer",
		"input": "radio",
		"values": {
			"1": "Yes",
			"0": "No"
		},
		"operators": ["equal","in"]
	}, {
		"id": "''price''",
		"label": "Price",
		"type": "double",
		"validation": {
			"min": 0,
			"step": 0.01
		}
	}, {
		"id": "''id''",
		"label": "identifier",
		"type": "string",
		"placeholder": "____-____-____",
		"operators": ["equal", "not_equal"],
		"validation": {
		"format": "/^.{4}-.{4}-.{4}$/}"}
    }
],
	rules: rules_widgets
});



$( '<div id=selectDiv"><p>SELECT</p><input id="rowsselect" type="text" name="LastName" placeholder="Number of rows (Max 50 mln)"></div><br>' ).insertBefore( $( ".rules-group-header" ).first())



	/****************************************************************
							Triggers and Changers QueryBuilder
*****************************************************************/

$('#btn-get').on('click', function() {
	var result = $('#builder').queryBuilder('getRules');
	if (!$.isEmptyObject(result)) {
		alert(JSON.stringify(result, null, 2));
	}
	else{
		console.log("invalid object :");
	}
	console.log(result);
});

$('#btn-reset').on('click', function() {
	$('#builder').queryBuilder('reset');
});

$('#btn-set').on('click', function() {
	//$('#builder').queryBuilder('setRules', rules_basic);
	var result = $('#builder').queryBuilder('getRules');
	if (!$.isEmptyObject(result)) {
		rules_widgets = result;
	}
});

//When rules changed :
$('#builder').on('getRules.queryBuilder.filter', function(e) {
	//$log.info(e.value);
});


$('#btn-get-sql').on('click', function() {

var result = $('#builder').queryBuilder('getSQL',false);
  
console.log(result)

   if (result.sql.length) {
          
      
      if( isNaN($( "#rowsselect" ).val())==false && Number.isInteger(Number($( "#rowsselect" ).val())) && Number($( "#rowsselect" ).val())>0 && Number($( "#rowsselect" ).val())<=50000000){
        
        $("#rowsselect").css({"background-color": "white"});
        $('#rowsselect').attr('placeholder','Number of rows (Max 50 mln)');
        $('#query').html('SELECT * FROM TABLENAME' + '<br>' +'WHERE ' + result.sql + '<br>' + ' LIMIT ' + $( "#rowsselect" ).val());  
        
      }
     
      else if( isNaN($( "#rowsselect" ).val())==false && Number.isInteger(Number($( "#rowsselect" ).val())) && Number($( "#rowsselect" ).val())>50000000 ){
        
        $("#rowsselect").val();
        $('#rowsselect').attr('placeholder','PLEASE INSERT A NUMBER LESS THAN 50 Mln');
        $("#rowsselect").css({"background-color": "#FFDDDC"});
        
      }     
     
      else{
        $("#rowsselect").val();
        $('#rowsselect').attr('placeholder','PLEASE INSERT A VALID INTEGER NUMBER');
        $("#rowsselect").css({"background-color": "#FFDDDC"});
         //$('#query').html('SELECT * from TABLENAME' + '<br>' + 'WHERE ' + result.sql);      
      }
    }

    });





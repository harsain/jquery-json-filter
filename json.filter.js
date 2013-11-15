(function($){
	//$.extend($.fn, {
    $.filterJSON = function(_config, json) {

            console.log("JSON Received: " + JSON.stringify(json));

            /*****************************/
            /*      All Parameters       */
            /*****************************/

			// defaults
			var config = {
			 property: null,
			 value: ""
			};
			var ret = {result: [], err: ""};




            /*****************************/
            /*      Inner Functions      */
            /*****************************/

            var level = 1;
            var topLevelObject = {};

			jsonFilterMain = function(config, json){

                console.log("in jsonFilterMain");
                console.log( "type of json " + $.type(json) );
                if($.type(json) === "array"){
                    $.each(json, function(index, value){
                       console.log("index: "+index+" -- value: "+value);
                        if($.type(value) === "object"){
                            topLevelObject = value;
                            if(filterJsonByProperty(value) == 1) {
                                console.log("property matched in: " + JSON.stringify(value));
                                ret.result.push(value);
                            }
                        }

                    });
                }
//                $.each(json, function(key, val){
//                    console.log(JSON.stringify(json[key]) );
//
//                });
			}

            filterJsonByProperty = function(obj){
                var response = 0;
                console.log("Number of keys in obj: " + Object.keys(obj).length);
                var noOfPropertiesInObj = Object.keys(obj).length;

                if(noOfPropertiesInObj > 0 ){

                    if(obj.hasOwnProperty(config.property)){

                        if(config.value == "" && config.value.length <= 0){
                            response = 1;
                            //return false;
                        } else {
                            var propValue = obj[config.property];
                            console.log("prop value: " + propValue);
                            if(propValue === config.value && $.type(propValue) != "object"){
                                console.log("Matched");
                                response = 1;
                                //return false;
                            } else if($.type(propValue) === "object"){
                                console.log("Matched");
                                response = 1;
                            }
                        }

                    } else{
                        $.each(obj, function(key, value){
                            console.log("key: "+key+" -- value type: "+ $.type(value));
                            var terminate = 0;
                            if($.type(value) === "object"){
                                response = 0;
                                console.log("type object found: " + JSON.stringify(value));
                                if(filterJsonByProperty(value) == 1){
                                    response = 1;
                                    return false;
                                }
//                                if(config.property === key){
//                                    console.log("key: "+key+" -- matched property: "+ config.property+ " --  for: " + JSON.stringify(obj));
//                                    return false;
//                                }
                            }
                        });
                    }
                }
                return response;
            }

            checkConfigs = function(){
                var response = -1;

                if( $.type(config.property) == "string" ){

                    if($.trim(config.property).length > 0 ){

                        // cleaning the property in config
                        var property = config.property;
                        property     = property.replace(/\s+/g, '');
                        property     = property.split(',');

                        console.log("After clean the properties are: " + property + " --- " + $.type(property) );
                        response = 1;
                    } else {
                        response = 0;
                    }
                } else {
                    response = -1;
                }
                return response;
            }


            /*****************************/
            /* Just calling of functions */
            /*****************************/

			// extends default config with users config
            $.extend(config, _config);

            console.log("BEFORE TESTING THE CONFIGS: " + $.type(config.property) );

			// check if a valid property is provided
//			if($.type(config.property) == "string" && $.trim(config.property).length > 0){
//
//				var prop 		= config.property;
//				config.property = prop.split(",");
//
//                console.log(config.property);
//			} else {
//                ret.result = json;
//				return $(ret);
//			}

            var configCheckResult = checkConfigs();

            if(configCheckResult === 1) {
			    resultObject =  jsonFilterMain(config, json);
            } else if (configCheckResult === 0) {
                ret.result  = json;
                ret.err     = "";
            }else {
                ret.result  = {};
                ret.err     = "ERROR: Incorrect Configurations > check your property";
            }

            console.log("just before return : " + ret.result);
			return ret.result;
		}
	//});
})(jQuery);
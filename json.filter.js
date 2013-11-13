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

			jsonFilterMain = function(config, json){

                console.log("in jsonFilterMain");
                console.log( "type of json " + $.type(json) );
                $.each(json, function(key, val){
                    console.log(JSON.stringify(json[key]) );

                });


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

            validateJSON = function(){
                if(json && $.type(json) === "array"){
                    console.log("json is an array");
                    json = $.parseJSON(json);
                }
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
                validateJSON();
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
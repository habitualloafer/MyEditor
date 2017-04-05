jQuery(document).ready(function($){
								
								
$('.section-accordion').click(function(){
 var accordion_item = $(this).find('.heading span').data('accordion');
 $('.'+accordion_item).slideToggle();
 if( $(this).hasClass('close')){
	 $(this).removeClass('close').addClass('open');
	 $(this).find('.heading span.fa').removeClass('fa-plus').addClass('fa-minus');
	 }else{
		$(this).removeClass('open').addClass('close'); 
		$(this).find('.heading span.fa').removeClass('fa-minus').addClass('fa-plus');
		 }
	   
	 })	;

 $('.of-css-editor').each(function() {
        var editor = ace.edit($(this).attr('id'));
        var this_textarea = $('#' + $(this).data('textarea'));
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setMode("ace/mode/css");
        editor.setShowPrintMargin( false );
    
        editor.getSession().setValue(this_textarea.val());
        editor.getSession().on('change', function(){
        this_textarea.val(editor.getSession().getValue());
		this_textarea.text(editor.getSession().getValue());
		  
        });
        this_textarea.on('change', function(){
											
          editor.getSession().setValue(this_textarea.val());
        });
      });


				
				//
 $('.metropoly_shortcodes,.metropoly_shortcodes_textarea').click(function(){
  var popup = 'shortcode-generator';

        if(typeof params != 'undefined' && params.identifier) {
            popup = params.identifier;
        }

        // load thickbox
        tb_show("Shortcodes", ajaxurl + "?action=magee_shortcodes_popup&popup=" + popup + "&width=" + 800);

        $('#TB_window').hide();
						})




 $('.metropoly_shortcodes_textarea').on("click",function(){
			var id = $(this).next().find("textarea").attr("id");
			$('#metropoly-shortcode-textarea').val(id);
		});																	   

$('.metropoly_shortcodes_list li a.metropoly_shortcode_item').on("click",function(){
													  
  var obj       = $(this);
  var shortcode = obj.data("shortcode");
  var form      = obj.parents("div#metropoly_shortcodes_container form");
 
   jQuery.ajax({
		type: "POST",
		url: metropoly_params.ajaxurl,
		dataType: "html",
		data: { shortcode: shortcode, action: "metropoly_shortcode_form" },
		success:function(data){
	
		   form.find(".metropoly_shortcodes_list").hide();
		   form.find("#metropoly-shortcodes-settings").show();
		   form.find("#metropoly-shortcodes-settings .current_shortcode").text(shortcode);
		   form.find("#metropoly-shortcodes-settings-inner").html(data);
		}
		});
	
});

jQuery(".metropoly-shortcodes-home").bind("click",function(){
            jQuery("#metropoly-shortcodes-settings").hide();
		    jQuery("#metropoly-shortcodes-settings-innter").html("");
		    jQuery(".metropoly_shortcodes_list").show();
		   
		});
		
// insert shortcode into editor
jQuery(".metropoly-shortcode-insert").bind("click",function(e){

    var obj       = jQuery(this);
	var form      = obj.parents("div#metropoly_shortcodes_container form");
	var shortcode = form.find("input#metropoly-curr-shortcode").val();

	jQuery.ajax({
		type: "POST",
		url: metropoly_params.ajaxurl,
		dataType: "html",
		data: { shortcode: shortcode, action: "metropoly_get_shortcode",attr:form.serializeArray()},
		
		success:function(data){
		
		jQuery.magnificPopup.close();
		form.find("#metropoly-shortcodes-settings").hide();
		form.find("#metropoly-shortcodes-settings-innter").html("");
		form.find(".metropoly_shortcodes_list").show();
        form.find(".metropoly-shortcode").val(data);
		if(jQuery('#metropoly-shortcode-textarea').val() !="" ){
			var textarea = jQuery('#metropoly-shortcode-textarea').val();
			if(textarea !== "undefined"){
		    var position = jQuery("#"+textarea).getCursorPosition();
			var content = jQuery("#"+textarea).val();
            var newContent = content.substr(0, position) + data + content.substr(position);
            jQuery("#"+textarea).val(newContent);
			
			}
			}else{
		window.metropoly_wpActiveEditor = window.wpActiveEditor;
		// Insert shortcode
		window.wp.media.editor.insert(data);
		// Restore previous editor
		window.wpActiveEditor = window.metropoly_wpActiveEditor;
		}
		},
		error:function(){
			jQuery.magnificPopup.close();
		// return false;
		}
		});
		// return false;
   });

 //preview shortcode

 $(".metropoly-shortcode-preview").bind("click",function(e){

    var obj       = jQuery(this);
	var form      = obj.parents("div#metropoly_shortcodes_container form");
	var shortcode = form.find("input#metropoly-curr-shortcode").val();

	jQuery.ajax({
		type: "POST",
		url: metropoly_params.ajaxurl,
		dataType: "html",
		data: { shortcode: shortcode, action: "metropoly_get_shortcode",attr:form.serializeArray()},
		
		success:function(data){
      
		jQuery.ajax({type: "POST",url: metropoly_params.ajaxurl,dataType: "html",data: { shortcode: data, action: "metropoly_shortcode_preview"},	
		success:function(content){
			$("#metropoly-shortcode-preview").html(content);
	        tb_show(shortcode + " preview","#TB_inline?width=600&amp;inlineId=metropoly-shortcode-preview",null);
			}
		});
	
		},
		error:function(){
			
		// return false;
		}
		});
		// return false;
   });

/////

 
 });
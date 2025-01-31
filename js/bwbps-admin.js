/* -------- ADMIN Copy/Move/Resize Image Functions ------------ */
function bwbpsPrepareImageSelection(psAction) {
	
	if (psAction == 'copymoveimages') {
		if (jQuery('#resizeimages').is(':visible')) {
			bwbpsUnPrepareImageSelection();
			jQuery("#resizeimages").hide();
		}
	} else {
		if (jQuery('#copymoveimages').is(':visible')) {
			bwbpsUnPrepareImageSelection();
			jQuery("#copymoveimages").hide();
		}
	}
	
	if( !jQuery('#' + psAction).is(':visible')){
	
		jQuery('.ps_clickmsg').show();
		
		jQuery('.ps_copy').click(function(){
			var tid = this.id;
			var t = $j(this);
						
			if(jQuery(this).hasClass('bwbps-sel')){			
				jQuery(this).removeClass('bwbps-sel');			
			} else {
				jQuery(this).addClass('bwbps-sel');
			}
			
			return false;
			}
		);
	
	} else {
		bwbpsUnPrepareImageSelection();	
	}

	
	
	return false;
}

function bwbpsUnPrepareImageSelection(){
	jQuery('.ps_clickmsg').hide();
	jQuery('.bwbps-sel').removeClass('bwbps-sel');
	jQuery('.ps_copy').unbind('click');
	
	return false;
}

function bwbpsCopyMoveSelect(sel){
	jQuery('.ps_copy').removeClass('bwbps-sel');
	if(sel){
		jQuery('.ps_copy').addClass('bwbps-sel');
	}	
}

function bwbpsCopyToGallery(copytogal){

	var i = 0;
	var _data = {};
	
	var imgids = "";
	var ind="";
	
	jQuery('.bwbps-sel').each(function(index){
		
		ind = this.id;
		imgids += ind.replace("psimg_","") + ",";
				
	});
	
	if(imgids == ""){ alert("No images selected...click on images to select for copy/move."); return; }
	
	_data['image_ids[]'] = imgids.split(",");
	
	if(copytogal){
		_data['action'] = 'copyimagestogal';
	} else {
		_data['action'] = 'moveimagestogal';
	}
	
	_data['newgallery'] = jQuery("#copygalbwbpsGalleryDDL").val();
		
	
	if(copytogal){
		if(!confirm('Do you want to COPY image(s) to new gallery? (note...does not create new file, just references existing image files.')){ return false;}
	} else {
		if(!confirm('Do you want to move image(s) to new gallery?')){ return false;}
	}
	
	
	
	var _moderate_nonce = jQuery("#_moderate_nonce").val();
	
	_data['_ajax_nonce'] = _moderate_nonce;
		
	try{
		$j('#ps_savemsg').show();
	}catch(err){}
	
	$j.ajax({
		type: 'POST',
		url: bwbpsAjaxURL,
		data : _data,
		dataType: 'json',
		success: function(data) {
			bwbpsCopyMoveSuccess(data);
		}
	});
	return false;

}


function bwbpsCopyMoveSuccess(data){
	$j("#ps_savemsg").hide();
	if(data == -1){
			alert('Failed due to security: invalid nonce');
			return false;
	 	}
	 	
		if( data.message){
			alert(data.message + " --- updated: " + data.updated);
				
			$j('.ps_copy').removeClass('bwbps-sel');
			
			
		}
	return false;
}

/* -------- ADMIN Get Video File URL ------------ */
function bwbpsGetMediaGalURL(){

	var i = 0;
	var _data = {};
		
	_data['recs'] = jQuery("#bwbps_fileurlrecs").val();
	_data['start'] = jQuery("#bwbps_fileurlstart").val();
	_data['search_term'] = jQuery("#bwbps_fileurlsearch").val();
	_data['filetype'] = jQuery("#bwbps_filetype").val();
	_data['action'] = 'getmedia';
	
	jQuery("#bwbps_fileurl_table").html('<tr align="center" valign="middle"><td style="padding-top: 45px; height: 110px; text-align: center !important; width: 100%;"><img src="' + bwbpsPhotoSmashURL + 'images/ajax-loader.gif" /></td></tr>');
	
	$j.ajax({
		type: 'POST',
		url: bwbpsAjaxMediaURL,
		data : _data,
		dataType: 'html',
		success: function(data) {
			bwbpsGetMediaGalURLSuccess(data);
		}
	});
	return false;

}


function bwbpsGetMediaGalURLSuccess(data){
	
	jQuery("#bwbps_fileurl_table").html(data);

}


/* -------- ADMIN Image Importer Functions ------------ */
function bwbpsActivateImageImports(){

	jQuery('.bwbps-imagesforsel').val('');

	jQuery('.bwbps-notsel').click(function(){
			var tid = this.id;
			var t = $j(this);
			
			if(bwbpsAllImport){
			
				if(bwbpsAllImport == 1){
					$j("#" + tid + "sel" ).val('');
				} else {
					$j("#" + tid + "sel" ).val('1');
				}
			
			}
			
			var tpar = t.parent().parent();
			
			if(!$j("#" + tid + "sel" ).val() ){
							
				tpar.addClass('bwbps-sel');
				$j("#" + tid + "sel" ).val(tid);
							
			} else {
				
				tpar.removeClass('bwbps-sel');
				
				$j("#" + tid + "sel" ).val('');
							
			}
			
			return false;
		}
	);

}

function bwbpsToggleImportImg(img){

}

function bwbpsToggleAllImportImages(tog){

	if(tog){
		bwbpsAllImport = 1;	//Turn on all images
	} else {
		bwbpsAllImport = 2;	//Turn off all images
	}
	
	$j('.bwbps-notsel').click();
	bwbpsAllImport = 0;
}



function bwbpsToggleFileURL(){

	jQuery(".ps-fileurl").toggle();
	
	if( jQuery(".ps-fileurl").is(":visible")){
		bwbpsSaveAdminOptions('togglefileurl', 'adminoption', 1);
	} else {
		bwbpsSaveAdminOptions('togglefileurl', 'adminoption', 0);
	}

}

function bwbpsToggleCustomData(){

	jQuery(".bwbps-custfields").toggle();
	
	if( jQuery(".bwbps-custfields").is(":visible")){
		bwbpsSaveAdminOptions('togglecustomdata', 'adminoption', 1);
	} else {
		bwbpsSaveAdminOptions('togglecustomdata', 'adminoption', 0);
	}

}

function bwbpsTogglePhotoMgrFields(){
	jQuery(".bwbps-fields-container").toggle(); 
	jQuery("#bwbps-fieldtoglinks").toggle();
	
	if( jQuery("#bwbps-fieldtoglinks").is(":visible")){
		bwbpsSaveAdminOptions('toggleshowfields', 'adminoption', 1);
	} else {
		bwbpsSaveAdminOptions('toggleshowfields', 'adminoption', 0);
	}
}

//Admin Save Admin Options
function bwbpsSaveAdminOptions(action, optname, optval){

	var i = 0;
	var _data = {};
	
	_data[optname] = optval;
	_data['action'] = action;
	
	var _moderate_nonce = jQuery("#_moderate_nonce").val();
	
	_data['_ajax_nonce'] = _moderate_nonce;
	
	/*	
	try{
		$j('#ps_savemsg').show();
	}catch(err){}
	*/
	
	$j.ajax({
		type: 'POST',
		url: bwbpsAjaxURL,
		data : _data,
		dataType: 'json',
		success: function() {
			//$j('#ps_savemsg').hide();
		}
	});
	return false;

}

//Admin Save Custom Fields
function bwbpsSaveCustFldsAdmin(image_id, save_all){

	var i = 0;
	var _data = {};
	for ( var fld in bwbpsCustomFields ){
		_data['bwbps_' + fld] = jQuery( "#img" + image_id + "_bwbps_" + bwbpsCustomFieldNames[i] ).val();
		i++;
	}
	
	_data['image_id'] = image_id;
	_data['action'] = 'savecustfields';
	
	if(!confirm('Do you want to save changes for image ' + image_id + '?')){ return false;}
	
	jQuery('.bwbps_save_flds_' + image_id).attr('src',bwbpsPhotoSmashURL + 'images/wait.gif');
	
	var _moderate_nonce = jQuery("#_moderate_nonce").val();
	
	_data['_ajax_nonce'] = _moderate_nonce;
		
	try{
		$j('#ps_savemsg').show();
	}catch(err){}
	
	$j.ajax({
		type: 'POST',
		url: bwbpsAjaxURL,
		data : _data,
		dataType: 'json',
		success: function(data) {
			bwbpsSaveCustSuccess(data, image_id, save_all);
		}
	});
	return false;
}


function bwbpsSaveCustSuccess(data, image_id, save_all){

	if(image_id && save_all){
		bwbpsModerateImage("saveall", image_id);
		return;
	}
	
	jQuery('.bwbps_save_flds_' + image_id).attr('src',bwbpsPhotoSmashURL + 'images/disk.png');
	
	$j('#ps_savemsg').hide();
	
	if(data == -1){
				alert('Failed due to security: invalid nonce');
			//The nonce	 check failed
			$j('#psmodmsg_' + imgid).html("fail: security"); 
			return false;
	 	}
	 	
		if( data.status == 'false' || data.status == 0){
			//Failed for some reason
			if(data.message){ alert(data.message); }
			if(data.msg){ alert(data.msg); }
			$j('#psmodmsg_' + imgid).html("update: fail"); 
			return false;
		} else {
	
			$j('#bwbps-img-' + image_id).bwbpsFade({start:'#ffff99',
				speed : 1000
				});
		}

}

// Resize Multiple Images...
function bwbpsResizeSelectedImages(){

	var imgids = "";
	bwbpsStopResizing = false;
	
	jQuery('.bwbps-sel').each(function(index){
		
		ind = this.id;
		imgids += ind.replace("psimg_","") + ",";
				
	});
	
	if(imgids == ""){ alert("No images selected...click on images to select for resizing."); return; }
		
	bwbpsSelectedImages = imgids.split(",");
	
	if(jQuery.isArray(bwbpsSelectedImages) ){
		bwbpsSelectedImages.pop();
	}
	
	jQuery("#bwbpsStopResizing").show();
	bwbpsGetNextImageToResize();
	
}

function bwbpsGetNextImageToResize(data){

	if(data){
		jQuery("#resizeresultmsg").val(data.message + "\n" + jQuery("#resizeresultmsg").val());
	}
	
	if(jQuery.isArray(bwbpsSelectedImages) && !bwbpsStopResizing && bwbpsSelectedImages.length > 0){
				
		var image_id = bwbpsSelectedImages.shift();
				
		jQuery("#resizestatusmsg").html("Resizing: " + image_id + " Remaining: " + bwbpsSelectedImages.length );
		bwbpsResizeImage(image_id, false, true);
		return;
	}
	
	jQuery("#resizestatusmsg").html("Resize complete...see log for results");
	$j('#ps_savemsg').hide();
	jQuery("#bwbpsStopResizing").hide();
	jQuery('.bwbps-sel').removeClass('bwbps-sel');
	
}

// Resize Image by Ajax
function bwbpsResizeImage(image_id, my_confirm, multiimages){
	
	//Get the Form Prefix...this is needed due to multiple forms being possible
	
	var _data = {};
	_data['image_id'] = image_id;
	_data['action'] = 'resizeimage';

	
		
	if(my_confirm)
	{
		if(!confirm('Do you want to regenerate image sizes per gallery settings?'))
		{ 
			return false;
		}
	}
		
	var _moderate_nonce = jQuery("#_moderate_nonce").val();
	
	_data['_ajax_nonce'] = _moderate_nonce;
		
	try{
		$j('#ps_savemsg').show();
	}catch(err){}
	
	jQuery.ajax({
		type: 'POST',
		url: bwbpsAjaxURL,
		data : _data,
		dataType: 'json',
		success: function(data) {
			bwbpsResizeSuccess(data, image_id, multiimages);
		}
	});
	return false;

}

function bwbpsResizeSuccess(data, image_id, multiimages){

	if(multiimages){
		bwbpsGetNextImageToResize(data);
		return;
	}
	
	$j('#ps_savemsg').hide();
	
	if(data == -1){
			alert('Failed due to security: invalid nonce');
			//The nonce	 check failed
			$j('#psmod_' + image_id).html("fail: security"); 
			return false;
	}
	 	
	if( data.status == 'false' || data.status == 0){
		//Failed for some reason
		$j('#psmod_' + image_id).html("update: fail"); 
		return false;
	} else {
		alert("Succeed");
		$j('#ps-customflds-' + image_id).bwbpsFade({start:'#ffff99',
			speed : 1000
			});
	}

}


function bwbpsConfirmResetDefaults(){
	return confirm('Do you want to Reset all PhotoSmash Settings back to Default?');
}

function bwbpsConfirmDeleteGallery(){
	var fieldname = jQuery("#bwbpsGalleryDDL option:selected").text();
	return confirm('Do you want to delete Gallery & Images for: ' + fieldname + '?');
}

function bwbpsConfirmDeleteMultipleGalleries(){
	return confirm('Warning!!! This deletes galleries and images for ALL SELECTED GALLERIES.  Do you want to do that?');
}

function bwbpsConfirmCustomForm(){
	var fieldname = jQuery("#bwbpsCFDDL option:selected").text();
	return confirm('Do you want to DELETE Custom Form: ' + fieldname + '?');
}

function bwbpsConfirmGenerateCustomTable(){
	return confirm('Do you want to generate the Table with your Custom Fields?');
}

function bwbpsConfirmDeleteField(completeDelete){
	var fieldname = jQuery("#supple_fieldDropDown option:selected").text();
	if(completeDelete){
		return confirm('Delete field and Drop from Custom Data table?\n\nComplete Delete will delete the field and remove it from the Custom Data Table.  Do you want to completely delete field: ' + fieldname + '?');
	}else{
		return confirm('Delete field (does not drop from table)?\n\nThis removes the field from your list of custom fields.  It does not remove from the Custom Data Table if you have generated the table already.  Do you want to delete field: ' + fieldname + '?');
	}
}


//Fetch Meta Data from Attachment
function bwbpsFetchMeta(image_id, attach_id){

	var imgid = parseInt('' + image_id);
	
	jQuery('#bwbps_fetch_img_' + imgid).attr('src',bwbpsPhotoSmashURL + 'images/wait.gif');
	
	var myaction = "fetchmeta";
	
	var _moderate_nonce = $j("#_moderate_nonce").val();
	
	try{
		$j('#ps_savemsg').show();
	}catch(err){}
	
	$j.ajax({
		type: 'POST',
		url: bwbpsAjaxURL,
		data: { 'action': myaction,
       'image_id': imgid,
       '_ajax_nonce' : _moderate_nonce,
       'attach_id' : attach_id
       },
		dataType: 'json',
		success: function(data) {
			bwbpsFetchMetaSuccess(data, imgid);
		}
	});
	return false;

}

function bwbpsFetchMetaSuccess(data, imgid){
	
	jQuery('#bwbps_fetch_img_' + imgid).attr('src',bwbpsPhotoSmashURL + 'images/camera_add.png');

	try{
			$j('#ps_savemsg').hide();
		}catch(err){}
		if(data == -1){
				alert('Failed due to security: invalid nonce');
			//The nonce	 check failed
			$j('#psmod_' + imgid).html("fail: security"); 
			return false;
	 	}
	 	
		if( data.status == 'false' || data.status == 0){
			//Failed for some reason
			$j('#psmod_' + imgid).html("No meta data found..."); 
			return false;
		} else {
							
			jQuery("#imgmeta_" + imgid).val(data.meta);
		
		}

}


//Set a new Gallery from within Photo Manager
function bwbpsSetNewGallery(image_id){
	var imgid = parseInt('' + image_id);
	var myaction = false;
	
	myaction = "setgalleryid";
	
	if(!confirm('Do you want to set a new Gallery for this image (id: ' + imgid + ')?')){ return false;}
	
	var _moderate_nonce = $j("#_moderate_nonce").val();
	
	var gal_id = $j("#g" + imgid + "bwbpsGalleryDDL").val();
	
	gal_id = parseInt('' + gal_id);
	
	try{
		$j('#ps_savemsg').show();
	}catch(err){}
	
	$j.ajax({
		type: 'POST',
		url: bwbpsAjaxURL,
		data: { 'action': myaction,
       'image_id': imgid,
       '_ajax_nonce' : _moderate_nonce,
       'gallery_id' : gal_id
       },
		dataType: 'json',
		success: function(data) {
			bwbpsSetGallerySuccess(data, imgid);
		}
	});
	return false;
}

function bwbpsSetGallerySuccess(data, imgid){
		try{
			$j('#ps_savemsg').hide();
		}catch(err){}
		if(data == -1){
				alert('Failed due to security: invalid nonce');
			//The nonce	 check failed
			$j('#psmod_' + imgid).html("fail: security"); 
			alert("Update failed due to security");
			return false;
	 	}
	 	
		if( data.status == 'false' || data.status == 0){
			//Failed for some reason
			alert("Failed..." + data.message);
			$j('#psmod_' + imgid).html("update: fail"); 
			return false;
		} else {
			//this one passed
			alert("Gallery set. " + data.message);
			return false;
		}

}


// mass updating of galleries
function bwbpsAddPSSettingsMassUpdateActions() {
    $j('.psmass_update').click(function() {
        bwbpsMassUpdateGalleries(this.id);
    });
}

function bwbpsMassUpdateGalleries(id){
	var eleid = id.substring(5, id.length);
	//var val = $j('#' + eleid).val();
	
	var ele = $j("[name=" + eleid + "]");
	
	var tagname = ele.tagName();
	var val = "";
	
	if(tagname = 'input'){
		var attr = ele.attr('type');
		
		switch (attr){
			case "radio" :
				val = $j("input:radio[name=" + eleid + "]:checked").val();
				break;
		
			case "checkbox" :
				val = $j("input[name='" + eleid + "']").attr('checked');
				switch (eleid){
					case 'ps_mini_aspect' :
						if(val){
							val = 0;
						} else {
							val = 1;
						}
					default :
						if(val){
							val = 1;
						} else {
							val = 0;
						}
						break;
				}
				
				break;
		
			default :
				val = ele.val();
				break;		
		}

	} else {
		 val = ele.val();
	
	}
	
	
	if(!confirm('Do you want to update ALL GALLERIES ' + ele.attr('name') + ' to: ' + val + '?')){ return false;}
	
	var _moderate_nonce = $j("#_moderate_nonce").val();
	
	var myaction = 'mass_updategalleries';
		
	try{
		$j('#ps_savemsg').show();
	}catch(err){}
	
	$j.ajax({
		type: 'POST',
		url: bwbpsAjaxURL,
		data: { 'action': myaction,
       'field_name': eleid,
       '_ajax_nonce' : _moderate_nonce,
       'field_value' : val
       },
		dataType: 'json',
		success: function(data) {
			bwbpsMassUpdateGalleriesSuccess(data);
		}
	});
	return false;
	
}




function bwbpsMassUpdateGalleriesSuccess(data){
	try{
		$j('#ps_savemsg').hide();
	}catch(err){}
	
	alert(data.message);

}



// PHOTOSMASH CLASS

function photosmashClass() {

	this.activeRecord = 0;
	
	this.verifyCreateGallery = function(){
	
		if( jQuery('#bwbps_gallery_id').val() == 0 && jQuery('#gal_gallery_name').val() == ''){
			return( confirm('You are creating a new Gallery...but no Gallery name specified.  Continue?') );
		}
	
	}
	
	// Google Maps Interactions
	this.showMapEdit = function(image_id, d_position){
	
		jQuery("#bwbmap_image").html(jQuery("#psimage_" + image_id).html());
				
		jQuery("#psimage-tbody").hide();
		jQuery("#bwbmap_lat").val(jQuery("#geolat_" + image_id).val());
		jQuery("#bwbmap_lng").val(jQuery("#geolong_" + image_id).val());
		jQuery("#bwbmap_image_id").val(image_id);
		jQuery("#bwbmap_image_id_disp").html(image_id);
		
		jQuery("#bwbmap_address").val('');
		
		if(typeof(bwb_marker) == "object"){ bwb_marker.setMap(null); }
		
		if( jQuery("#bwbmap_lat").val() && jQuery("#bwbmap_lng").val() ){
		
			if( !isNaN(jQuery("#bwbmap_lat").val()) && jQuery("#bwbmap_lat").val() > 0 ){
			
			bwb_marker = bwb_gmap.simpleMarker( bwbmap_post_map, jQuery("#bwbmap_lat").val(), jQuery("#bwbmap_lng").val());
			bwbmap_post_map.setZoom(11);
			
			bwbmap_post_map.setCenter(bwb_marker.getPosition());
			} else {
				bwbmap_post_map.setZoom(3);
			}
		}
		
		jQuery(document).scrollTop(330);
		this.imagePosition = d_position;
	}
	
	var imagePosition = 100;
	
	this.mapEditDone = function(image_id){
		jQuery("#psimage-tbody").show();
		if( this.imagePosition > 50 ){ this.imagePosition = this.imagePosition - 50; }
		jQuery(document).scrollTop(this.imagePosition);
	}
	
	this.setLatLngEdit = function(latlng){
		jQuery("#bwbmap_lat").val(latlng.lat());
		jQuery("#bwbmap_lng").val(latlng.lng());
	}
	
}

var photosmash = new photosmashClass();

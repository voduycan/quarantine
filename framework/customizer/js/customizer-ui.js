/*
***************************************************************
* #Preloader (Customizer)
***************************************************************
*/

	(function($){
		"use strict";

		// Generate HTML
		$('body').append('\
			<div class="royal-star5">\
				<p><i class="star5"></i><i class="star5"></i><i class="star5"></i><i class="star5"></i><i class="star5"></i></p>\
			</div>\
			<div class="royal-preloader">\
				<p>\
					<span>Hyper-X Theme</span>\
					<br>\
					<span>Loading Customizer Panel</span>\
				</p>\
			</div>\
		');

	}(jQuery));


/*
***************************************************************
* #Theme Customizer UI
***************************************************************
*/

jQuery(document).ready(function( $ ) {
    "use strict";


/*
***************************************************************
* Functions below will take care of Theme Customizer UI.
* Please Don't Edit/Delete Something. THEY ARE VITAL.

***************************************************************
* #Slider
***************************************************************
*/

	// active - value is used in css
	function royalSlider( db, id, min, max, step, px, general ) {

		var slider 	 = $( '#royal_sl_'+ db +'_'+ id ),
			range 	 = $( '#royal_rg_'+ db +'_'+ id ),
			value 	 = isNaN( range.val() ) ? min : range.val(),
			valuePX  = range.prev().find('strong'),
			siblings = slider.closest('li').siblings(':not(":last-child")');

		if ( max === 1 ) {
			max += 0.01;
		}

		// on change
		slider.slider({
			range: "min",
			value: value,
			min: min,
			max: max,
			step: step,
			slide: function( event, ui ) {
				$( range ).val( ui.value ).keyup();
				valuePX.text( ui.value + px );
			}
		});

		if ( general === true ) {
			// update all sliders in realtime
			$('#customize-control-royal_'+ db +'-'+ id).find('input').keyup(function(){
				siblings.find('.rf-slider-wrap input').val( $(this).val() ).keyup();
				siblings.find('.rf-slider-wrap strong').text( $(this).val() + px );
				siblings.find('.rf-slider-wrap .rf-slider').slider({ value: $(this).val() });
			});
		}

		// on load
		range.val( slider.slider( "value" ) );
		valuePX.text( slider.slider( "value" ) + px );

	}

	function royalAdvancedBTN( db, id, border ) {

		var button 	 = $( '#'+ prfx( db, id ) ),
			checkbox = button.find('input');

		// ui
		button.addClass('rf-advanced-btn');
		button.find('label').prepend('<i class="fa fa-angle-down"></i>');

		// on change
		$('#'+ prfx( db, id ) +' input').change( function() {
			if ( $(this).is(':checked') ) {
				button.siblings(':not(li[id$=_gen])').slideDown();
				button.siblings('li[id$=_gen]').slideUp();
				button.addClass('rf-advanced-btn-active');
			} else {
				button.siblings(':not(li[id$=_gen])').slideUp();
				button.siblings('li[id$=_gen]').slideDown();
				button.removeClass('rf-advanced-btn-active');
			}
		});

		// on load
		if ( checkbox.is(':checked') ) {

			button.siblings(':first-child').hide();
			button.addClass('rf-advanced-btn-active');

			if ( border === true ) {
				button.siblings('li[id$=_gen]').hide();
			}

		} else {

			button.siblings(':not(":first-child")').hide();
			button.removeClass('rf-advanced-btn-active');

			if ( border === true ) {
				button.siblings('li[id$=_gen]').show();
			}

		}

	}


/*
***************************************************************
* #General Colors
***************************************************************
*/

	// colorpickers - change all colorpickers when general is changed
	function royalGeneralColors ( id, value ) {
		$( '#customize-control-royal_' + id ).find('input.wp-color-picker').val( value.slice( value.indexOf('[') + 1, value.indexOf(']') ) ).keyup();
	}


/*
***************************************************************
* #Borders - general border control
***************************************************************
*/

	// border types -  change all border types when general is changed
	function royalBorderStyleGeneral( db, id ) {

		// define variables
		var select 	 = $( '#'+ prfx( db, id ) ).find('select'),
			siblings = $( '#'+ prfx( db, id ) ).siblings('.customize-control-select').find('select');

		// on change
		wp.customize( 'royal_'+ db +'['+ id +']', function( value ) {
			value.bind( function( nValue ) {
				if ( select.css('display') !== 'none' && !$( id ).siblings(':last-child').find('input:checkbox').is(':checked') ) {
					siblings.val( nValue ).trigger('change');
				}
			} );
		} );

	}


	// colorpickers - change all colorpickers when general is changed
	function royalBorderColorGeneral( db, id ) {

		// define variables
		var siblings = $( '#'+ prfx( db, id ) ).siblings('.customize-control-color').find('input.wp-color-picker');

		// on change
		wp.customize( 'royal_'+ db +'['+ id +']', function( value ) {
			value.bind( function( nValue ) {
				if ( ! $( '#'+ prfx( db, id ) ).siblings('[id$=bd_ad]').find('input[type=checkbox]').is(':checked') ) {
					siblings.val( nValue ).keyup();
				}
			} );
		} );

	}


/*
***************************************************************
* #Prefixer - prefixes selectors with #customize-control-royal
***************************************************************
*/

	function prfx( db, selectors ) {

		if ( selectors.length > 0 ) {

			// if parameter is string convert to array
			if ( typeof(selectors) !== 'string' ) {
				var prefixed = [];

				// prefix values
				for ( var i = 0; i < selectors.length; i++ ) {
					prefixed[i] = '#customize-control-royal_'+ db +'-'+ selectors[i];
				}

				// return prefixed array
				return prefixed.join(',');

			} else {

				// return prefixed string
				return 'customize-control-royal_'+ db +'-'+ selectors;

			}

		}

	}


/*
***************************************************************
* #Select - show/hides several controls on change
***************************************************************
*/

	function royalSelect( db, id, wrap, children ) {

		var idFull 	= '#'+ prfx( db, id ),
			select 	= $( idFull ).find('select');

		// wrap select & children
		$( idFull +','+ prfx( db, children ) ).wrapAll('<div id="'+ prfx( db, wrap ) +'"></div>');

		// on change
		select.change(function() {
			$( idFull ).siblings().slideUp();
			$( idFull ).siblings('[id*='+ $(this).val() +']').slideDown();
		});

		// on load
		$( idFull ).siblings().hide();
		$( idFull ).siblings('[id*='+ select.val() +']').show();

	}


/*
***************************************************************
* #Controls Wrap - group related controls
***************************************************************
*/

	function royalControlsWrap( db, id, children ) {

		// prefix selectors
		var idFull 	 = prfx( db, id );
			children = $( prfx( db, children ) );

		// wrap
		children.wrapAll('<div class="rf-controls-wrap" id="'+ idFull +'"></div>');

	}


/*
***************************************************************
* #Tabs - divide controls by tab sections
***************************************************************
*/

	// tabs label
	function royalCustomLabel( db, id, children, check ) {

		// define variables
		var label 	 = $( '#'+ prfx( db, id ) ),
			checkbox = label.find('input'),
			childrenObj = $( children );

		// add class for styling
		label.addClass('rf-tabs-label');

		if ( check === true ) {

			// on change
			checkbox.change(function() {
				if ( $(this).is(':checked') ) {
					childrenObj.slideDown();
					label.addClass('rf-tabs-label-active');
				} else {
					childrenObj.slideUp();
					label.removeClass('rf-tabs-label-active');
				}
			});

			// on load
			if ( checkbox.is(':checked') ) {
				childrenObj.show();
				label.addClass('rf-tabs-label-active');
			} else {
				childrenObj.hide();
				label.removeClass('rf-tabs-label-active');
			}

		} else {
			label.addClass('rf-tabs-label-active');
			label.find('label').css('cursor','default');
		}

	}



	// tabs wrap
	function royalTabs( db, general, spaces, styles, fonts, help ) {

		// prefix selectors
		var generalSel = general !== '' ? prfx( db, general ) : '',
			spacesSel 	= spaces !== '' ? prfx( db, spaces ) : '',
			stylesSel 	= styles !== '' ? prfx( db, styles ) : '',
			fontsSel 	= fonts !== '' ? prfx( db, fonts ) : '';

		// wrap controls
		$( generalSel ).addClass( db +'-tab-child' );
		$( spacesSel ).addClass( db +'-tab-child' );
		$( stylesSel ).addClass( db +'-tab-child' );
		$( fontsSel ).addClass( db +'-tab-child' );
		$( '.'+ db +'-tab-child' ).wrapAll('<div id="control_tabs_'+ db +'"></div>');

		// create tabs
		var generalTab 	= general !== '' ? '<li><a href="#rf_general_'+ db +'"><i class="fa fa-cog"></i></a></li>' : '',
			spacesTab 	= spaces !== '' ? '<li><a href="#rf_spaces_'+ db +'"><i class="fa fa-tasks"></i></a></li>' : '',
			stylesTab 	= styles !== '' ? '<li><a href="#rf_styles_'+ db +'"><i class="fa fa-spinner"></i></a></li>' : '',
			fontsTab 	= fonts !== '' ? '<li><a href="#rf_fonts_'+ db +'"><i class="fa fa-font"></i></a></li>' : '',
			helpTab 	= help !== '' ? '<li><a href="#rf_help_'+ db +'"><i class="fa fa-info"></i></a></li>' : '';
		

		$( '#control_tabs_'+ db ).prepend('<ul>'+ generalTab + spacesTab + stylesTab + fontsTab + helpTab +'</ul>');

		// place controls in tabs
		if ( general !== '' ) {
			$( generalSel ).wrapAll('<div id="rf_general_'+ db +'"></div>');
			$( '#rf_general_'+ db ).prepend('<h4>General Options</h4>');
		}

		if ( spaces !== '' ) {
			$( spacesSel ).wrapAll('<div id="rf_spaces_'+ db +'"></div>');
			$( '#rf_spaces_'+ db ).prepend('<h4>Spacing Options</h4>');
		}
		
		if ( styles !== '' ) {
			$( stylesSel ).wrapAll('<div id="rf_styles_'+ db +'"></div>');
			$( '#rf_styles_'+ db ).prepend('<h4>Styling Options</h4>');
		}

		if ( fonts !== '' ) {
			$( fontsSel ).wrapAll('<div id="rf_fonts_'+ db +'"></div>');
			$( '#rf_fonts_'+ db ).prepend('<h4>Font Options</h4>');
		}

		if ( help !== '' ) {
			$( '#control_tabs_'+ db ).append( '<div id="rf_help_'+ db +'"><p class="rf-help-tab">'+ help +'</p></div>' );
		}

		// tabs init
		$( '#control_tabs_'+ db ).tabs();

	}


/*
***************************************************************
* #Live Preview
***************************************************************
*/

	// theme customizer live preview
	function royalLivePreview( db, name, changeFunc ) {

		// wp.customize object - works only on 'transport' => 'postMessage'
		wp.customize( 'royal_'+ db +'['+ name +']', function( value ) {

			value.bind( function( nValue ) {
				// callback function
				changeFunc( nValue );
			} );

		} );

	}

	// Fake refresh - define/hide
	var fakeRefresh = $( '#customize-control-royal_fake_refresh-refresh' ).find('select');
		fakeRefresh.hide();

	function royalRefreshValue() {
		if ( fakeRefresh.val() === 'on' ) {
			fakeRefresh.val('off').trigger('change');
		} else {
			fakeRefresh.val('on').trigger('change');
		}
	}

	// convert hex color to rgb
	function royalHex2Rgba( hex, opacity ) {
	    var rst  = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex ),
	    	rgba = 'rgba( '+ parseInt( rst[1], 16 ) +', '+ parseInt( rst[2], 16 ) +', '+ parseInt( rst[3], 16 ) +', '+ opacity +')';

	    // return converted RGBA
	    return rgba;
	}

	// submit button for refreshable fields
	function royalSubmitButton( id ) {

		// add submit button after field
		$( '#customize-control-royal_' + id ).append('<div class="royal-submit-btn">Submit</div>');

		// submit field value
		$( '#customize-control-royal_' + id ).find('.royal-submit-btn').on('click', function() {

			// define variables
			var field 	 	= $(this).prev().find('textarea, input'),
				fieldValue 	= field.val();

			field.val( fieldValue + '___' ).trigger('keyup');

			setTimeout(function() {
				field.val( fieldValue ).trigger('keyup');
			}, 50 );

			setTimeout(function() {
				royalRefreshValue();
			}, 100 );
			
		});

	}


/*
***************************************************************
* #Light Options
***************************************************************
*/
	
	// checkbox
	function royalLightCheckbox(db, id) {
		var full_id = db +'-'+ id,
			db_input = $('#customize-control-royal_'+ db +'-db_input').find('textarea');

		$('#customize-control-royal_'+ full_id).find('input').change(function(){
			var db_input_val = db_input.val();

			if ( $(this).is(':checked') ) {
				db_input.val(db_input_val.replace(full_id +'[false]', full_id +'[true]')).keyup();
			} else {
				db_input.val(db_input_val.replace(full_id +'[true]', full_id +'[false]')).keyup();
			}
		});
	}

	// select
	function royalLightSelect(db, id) {
		var full_id = db +'-'+ id,
			db_input = $('#customize-control-royal_'+ db +'-db_input').find('textarea');

		$('#customize-control-royal_'+ full_id).find('select').change(function(){
			var db_input_val = db_input.val(),
				optionsArray = db_input_val.split('___');

			for ( var i = 0; i < optionsArray.length; i++ ) {
				if ( optionsArray[i].indexOf(full_id +'[') === 0 ) {
					db_input_val = db_input_val.replace(optionsArray[i], full_id +'['+ $(this).val() +']')
				}
			}

			db_input.val(db_input_val).keyup();
		});			
	}

	// text input
	function royalLightSlider(db, id) {
		var full_id = db +'-'+ id,
			db_input = $('#customize-control-royal_'+ db +'-db_input').find('textarea');

		$('#customize-control-royal_'+ full_id).find('input').keyup(function(){
			var db_input_val = db_input.val(),
				optionsArray = db_input_val.split('___');

			for ( var i = 0; i < optionsArray.length; i++ ) {
				if ( optionsArray[i].indexOf(full_id +'[') === 0 ) {
					db_input_val = db_input_val.replace(optionsArray[i], full_id +'['+ $(this).val() +']')
				}
			}

			db_input.val(db_input_val).keyup();	
		});				
	}

	// colorpicker
	function royalLightColorPicker(db, id) {
		var full_id = db +'-'+ id,
			db_input = $('#customize-control-royal_'+ db +'-db_input').find('textarea');

		if ( $('#customize-control-royal_'+ full_id).length === 0 ) {
			return;
		}

		$('#customize-control-royal_'+ full_id).find('input').wpColorPicker({
			change: function(event, ui) {

				var db_input_val = db_input.val(),
					optionsArray = db_input_val.split('___');

				for ( var i = 0; i < optionsArray.length; i++ ) {
					if ( optionsArray[i].indexOf(full_id +'[') === 0 ) {
						db_input_val = db_input_val.replace(optionsArray[i], full_id +'['+ ui.color.toString() +']');
					}
				}

				db_input.val(db_input_val).keyup();

				if ( full_id === 'preloader-anim_color' || full_id === 'preloader-bg_color' ) {
					setTimeout(function(){
						royalRefreshValue();
					}, 300);
				}

			}
		});		
	}


// ------------------------------------------------------------


// Prevent Priority re-arrange sincse 4.1
	$(window).on('load',function(){
		var api = wp.customize;
		setTimeout(function(){
			$( [ api.panel, api.section, api.control ] ).each( function ( i, values ) {
				values.unbind( 'add', api.reflowPaneContents );
				values.unbind( 'change', api.reflowPaneContents );
				values.unbind( 'remove', api.reflowPaneContents );
			} );		
		},3000);
	});

// Remove Menu Section
	$('#accordion-panel-nav_menus').remove();


/*
***************************************************************
* #Colors
***************************************************************
*/

// Run Sidebar Colors Tab Functions
	royalLightColorPicker('sidebar_colors', 'background');
	royalLightColorPicker('sidebar_colors', 'text');
	royalLightColorPicker('sidebar_colors', 'link');
	royalLightColorPicker('sidebar_colors', 'link_hover');
	royalLightColorPicker('sidebar_colors', 'border');
	royalLightColorPicker('sidebar_colors', 'button');
	royalLightColorPicker('sidebar_colors', 'button_text');
	royalLightColorPicker('sidebar_colors', 'button_hover');
	royalLightColorPicker('sidebar_colors', 'button_text_hover');

// Run Content Colors Tab Functions
	royalLightColorPicker('content_colors', 'background');
	royalLightColorPicker('content_colors', 'text');
	royalLightColorPicker('content_colors', 'link');
	royalLightColorPicker('content_colors', 'link_hover');
	royalLightColorPicker('content_colors', 'border');
	royalLightColorPicker('content_colors', 'button');
	royalLightColorPicker('content_colors', 'button_hover');
	royalLightColorPicker('content_colors', 'button_text');
	royalLightColorPicker('content_colors', 'button_text_hover');

// Run Footer Colors Tab Functions
	royalLightColorPicker('footer_colors', 'background');
	royalLightColorPicker('footer_colors', 'text');
	royalLightColorPicker('footer_colors', 'link');
	royalLightColorPicker('footer_colors', 'link_hover');
	royalLightColorPicker('footer_colors', 'border');
	royalLightColorPicker('footer_colors', 'button');
	royalLightColorPicker('footer_colors', 'button_hover');
	royalLightColorPicker('footer_colors', 'button_text');
	royalLightColorPicker('footer_colors', 'button_text_hover');

$('#accordion-section-colors').on('click', function() {

	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');

/* ----------------- Sidebar Colors Styling Options ----------------- */

	// Colors Animation tabs -------------------------------
	royalTabs( 
		'sidebar_colors',
		'',
		'',
		[
		 'background',
		 'text',
		 'link',
		 'link_hover',
		 'border',
		 'button',
		 'button_hover',
		 'button_text',
		 'button_text_hover',
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'sidebar_colors', 'label', '#control_tabs_sidebar_colors', false );


	// on change
	wp.customize( 'royal_sidebar_colors[db_input]', function( value ) {
		value.bind( function( nValue ) {
			nValue = nValue.split('___');

			// background
			royalGeneralColors( 'sidebar-bg_color', nValue[0] );
			royalGeneralColors( 'sidebar_top-bg_color', nValue[0] );
			royalGeneralColors( 'sidebar_top-scale_bg_color', nValue[0] );
			royalGeneralColors( 'menu_mobile-bg_color', nValue[0] );
			royalGeneralColors( 'menu_fold_wrap-color', nValue[0] );

			// text
			royalGeneralColors( 'menu_title-color', nValue[1] );
			royalGeneralColors( 'menu_items-mob_txt_col', nValue[1] );
			royalGeneralColors( 'filters_title-color', nValue[1] );
			royalGeneralColors( 'sWidgets_title-color', nValue[1] );
			royalGeneralColors( 'sWidgets_content-txt_col', nValue[1] );

			// link
			royalGeneralColors( 'menu_items-txt_col', nValue[2] );
			royalGeneralColors( 'menu_sub-txt_col', nValue[2] );
			royalGeneralColors( 'menu_mobile-text_color', nValue[2] );
			royalGeneralColors( 'filter_items-txt_col', nValue[2] );
			royalGeneralColors( 'sWidgets_content-link_col', nValue[2] );

			// link hover
			royalGeneralColors( 'menu_items-txt_hcol', nValue[3] );
			royalGeneralColors( 'menu_items-mob_txt_hcol', nValue[3] );
			royalGeneralColors( 'menu_sub-txt_hcol', nValue[3] );
			royalGeneralColors( 'filter_items-txt_hcol', nValue[3] );
			royalGeneralColors( 'sWidgets_content-link_hcol', nValue[3] );

			// border
			royalGeneralColors( 'sidebar-bd_col_gen', nValue[4] );
			royalGeneralColors( 'sidebar-shad_col', nValue[4] );
			royalGeneralColors( 'sidebar_top-bd_col_bt', nValue[4] );
			royalGeneralColors( 'sidebar_top-shad_col', nValue[4] );
			royalGeneralColors( 'menu_title-bd_col_bt', nValue[4] );
			royalGeneralColors( 'menu_items-bd_hcol', nValue[4] );
			royalGeneralColors( 'items-bd_col_gen', nValue[4] );
			royalGeneralColors( 'menu_items-shad_col', nValue[4] );
			royalGeneralColors( 'menu_fold-shad_col', nValue[4] );
			royalGeneralColors( 'menu_fold_wrap-shad_col', nValue[4] );
			royalGeneralColors( 'menu_sub-bd_col_bt', nValue[4] );
			royalGeneralColors( 'menu_sub-bd_col_tp', nValue[4] );
			royalGeneralColors( 'menu_sub-shad_col', nValue[4] );
			royalGeneralColors( 'filters_title-bd_col_bt', nValue[4] );
			royalGeneralColors( 'filter_items-bd_hcol', nValue[4] );
			royalGeneralColors( 'filter_items-bd_col_gen', nValue[4] );
			royalGeneralColors( 'filter_items-shad_col', nValue[4] );

			// button
			royalGeneralColors( 'sidebar_fold_btn-color', nValue[5] );
			royalGeneralColors( 'sidebar_scroll-color', nValue[5] );
			royalGeneralColors( 'menu_items-bg_col', nValue[5] );
			royalGeneralColors( 'menu_sub-bg_col', nValue[5] );
			royalGeneralColors( 'filter_items-bg_col', nValue[5] );
			royalGeneralColors( 'menu_fold-color', nValue[5] );

			// button text
			royalGeneralColors( 'sidebar_fold_btn-txt_col', nValue[6] );
			royalGeneralColors( 'menu_fold-txt_color', nValue[6] );

			// button hover
			royalGeneralColors( 'sidebar_fold_btn-hcol', nValue[7] );
			royalGeneralColors( 'sidebar_scroll-hcol', nValue[7] );
			royalGeneralColors( 'menu_items-bg_hcol', nValue[7] );
			royalGeneralColors( 'menu_sub-bg_hcol', nValue[7] );
			royalGeneralColors( 'filter_items-bg_hcol', nValue[7] );
			royalGeneralColors( 'menu_fold-hover_color', nValue[7] );

			// button text hover
			royalGeneralColors( 'sidebar_fold_btn-txt_hcol', nValue[8] );
			royalGeneralColors( 'menu_fold-hover_txt_color', nValue[8] );

		} );
	} );


/* ----------------- Content Colors Styling Options ----------------- */

	// Colors Animation tabs -------------------------------
	royalTabs( 
		'content_colors',
		'',
		'',
		[
		 'background',
		 'text',
		 'link',
		 'link_hover',
		 'border',
		 'button',
		 'button_hover',
		 'button_text',
		 'button_text_hover',
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'content_colors', 'label', '#control_tabs_content_colors', false );


	// on change
	wp.customize( 'royal_content_colors[db_input]', function( value ) {
		value.bind( function( nValue ) {
			nValue = nValue.split('___');

			// background
			royalGeneralColors( 'body-bg_color', nValue[0] );
			royalGeneralColors( 'content-bg_color', nValue[0] );
			royalGeneralColors( 'inner_content-bg_color', nValue[0] );
			royalGeneralColors( 'pPage_general-bg_col', nValue[0] );
			royalGeneralColors( 'pPage_post-bg_col', nValue[0] );
			royalGeneralColors( 'pPage_post-even_bg_col', nValue[0] );
			royalGeneralColors( 'pPost_media-bg_color', nValue[0] );
			royalGeneralColors( 'pPost_formats-bg_col', nValue[0] );
			royalGeneralColors( 'bPage_general-bg_col', nValue[0] );
			royalGeneralColors( 'bPage_post-bg_col', nValue[0] );
			royalGeneralColors( 'bPage_post-even_bg_col', nValue[0] );
			royalGeneralColors( 'bPost_overlay-bg_hcol', nValue[0] );
			royalGeneralColors( 'bPost_formats-bg_col', nValue[0] );
			royalGeneralColors( 'slideshow_caption-bg_color', nValue[0] );
			royalGeneralColors( 'similars_overlay-bg_hcol', nValue[0] );
			royalGeneralColors( 'similars_overlay-txt_bg_hcol', nValue[0] );
			royalGeneralColors( 'comments_content-bg_color', nValue[0] );
			royalGeneralColors( 'comments_content-author_bg_color', nValue[0] );
			royalGeneralColors( 'pagination-bg_color', nValue[0] );
			royalGeneralColors( 'pPost_effects-color', nValue[0] );
			royalGeneralColors( 'pPost_effects-hcol', nValue[0] );
			royalGeneralColors( 'gallery_lightbox-bg_hcol', nValue[0] );
			royalGeneralColors( 'inputs_general-bg_col', nValue[0] );
			royalGeneralColors( 'inputs_general-bg_fcol', nValue[0] );
			royalGeneralColors( 'preloader-anim_color', nValue[0] );

			// text
			royalGeneralColors( 'content-head_color', nValue[1] );
			royalGeneralColors( 'content-text_color', nValue[1] );
			royalGeneralColors( 'content-meta_color', nValue[1] );
			royalGeneralColors( 'pPage_post-text_color', nValue[1] );
			royalGeneralColors( 'pPage_post-meta_color', nValue[1] );
			royalGeneralColors( 'pPost_title-color', nValue[1] );
			royalGeneralColors( 'pPost_formats-txt_col', nValue[1] );
			royalGeneralColors( 'pPost_effects-txt_hcol', nValue[1] );
			royalGeneralColors( 'bPost_title-color', nValue[1] );
			royalGeneralColors( 'bPost_overlay-txt_hcol', nValue[1] );
			royalGeneralColors( 'bPost_formats-txt_col', nValue[1] );
			royalGeneralColors( 'bPage_post-text_color', nValue[1] );
			royalGeneralColors( 'bPage_post-meta_color', nValue[1] );
			royalGeneralColors( 'slideshow_caption-text_color', nValue[1] );
			royalGeneralColors( 'gallery_lightbox-txt_hcol', nValue[1] );
			royalGeneralColors( 'similars_overlay-txt_hcol', nValue[1] );
			royalGeneralColors( 'inputs_general-txt_col', nValue[1] );
			royalGeneralColors( 'inputs_general-txt_fcol', nValue[1] );
			royalGeneralColors( 'preloader-bg_color', nValue[1] );

			// link
			royalGeneralColors( 'content-link_color', nValue[2] );
			royalGeneralColors( 'pPage_post-link_color', nValue[2] );
			royalGeneralColors( 'bPage_post-link_color', nValue[2] );
			royalGeneralColors( 'pPost_title-hcolor', nValue[2] );
			royalGeneralColors( 'bPost_title-hcolor', nValue[2] );

			// link hover
			royalGeneralColors( 'content-link_hcolor', nValue[3] );
			royalGeneralColors( 'bPage_post-link_hcolor', nValue[3] );
			royalGeneralColors( 'pPage_post-link_hcolor', nValue[3] );

			// border
			royalGeneralColors( 'body-bd_col_gen', nValue[4] );
			royalGeneralColors( 'body-bd_col_tp', nValue[4] );
			royalGeneralColors( 'body-bd_col_rt', nValue[4] );
			royalGeneralColors( 'body-bd_col_bt', nValue[4] );
			royalGeneralColors( 'body-bd_col_lt', nValue[4] );
			royalGeneralColors( 'royal_body-shad_col', nValue[4] );
			royalGeneralColors( 'inner_content-bd_col_gen', nValue[4] );
			royalGeneralColors( 'inner_content-bd_col_tp', nValue[4] );
			royalGeneralColors( 'inner_content-bd_col_rt', nValue[4] );
			royalGeneralColors( 'inner_content-bd_col_bt', nValue[4] );
			royalGeneralColors( 'inner_content-bd_col_lt', nValue[4] );
			royalGeneralColors( 'content-shad_col', nValue[4] );
			royalGeneralColors( 'pPage_general-bd_col_gen', nValue[4] );
			royalGeneralColors( 'pPage_general-bd_col_tp', nValue[4] );
			royalGeneralColors( 'pPage_general-bd_col_rt', nValue[4] );
			royalGeneralColors( 'pPage_general-bd_col_bt', nValue[4] );
			royalGeneralColors( 'pPage_general-bd_col_lt', nValue[4] );
			royalGeneralColors( 'pPost_media-bd_col_gen', nValue[4] );
			royalGeneralColors( 'pPost_media-bd_col_tp', nValue[4] );
			royalGeneralColors( 'pPost_media-bd_col_rt', nValue[4] );
			royalGeneralColors( 'pPost_media-bd_col_bt', nValue[4] );
			royalGeneralColors( 'pPost_media-bd_col_lt', nValue[4] );
			royalGeneralColors( 'pPost_more-bd_col_gen', nValue[4] );
			royalGeneralColors( 'pPost_more-bd_col_tp', nValue[4] );
			royalGeneralColors( 'pPost_more-bd_col_rt', nValue[4] );
			royalGeneralColors( 'pPost_more-bd_col_bt', nValue[4] );
			royalGeneralColors( 'pPost_more-bd_col_lt', nValue[4] );
			royalGeneralColors( 'pSingle_project-bd_col_gen', nValue[4] );
			royalGeneralColors( 'pSingle_project-bd_col_tp', nValue[4] );
			royalGeneralColors( 'pSingle_project-bd_col_rt', nValue[4] );
			royalGeneralColors( 'pSingle_project-bd_col_bt', nValue[4] );
			royalGeneralColors( 'pSingle_project-bd_col_lt', nValue[4] );
			royalGeneralColors( 'bPage_general-bd_col_gen', nValue[4] );
			royalGeneralColors( 'bPage_general-bd_col_tp', nValue[4] );
			royalGeneralColors( 'bPage_general-bd_col_rt', nValue[4] );
			royalGeneralColors( 'bPage_general-bd_col_bt', nValue[4] );
			royalGeneralColors( 'bPage_general-bd_col_lt', nValue[4] );
			royalGeneralColors( 'pPage_post-bd_col_gen', nValue[4] );
			royalGeneralColors( 'pPage_post-bd_col_tp', nValue[4] );
			royalGeneralColors( 'pPage_post-bd_col_rt', nValue[4] );
			royalGeneralColors( 'pPage_post-bd_col_bt', nValue[4] );
			royalGeneralColors( 'pPage_post-bd_col_lt', nValue[4] );
			royalGeneralColors( 'bPage_post-bd_col_gen', nValue[4] );
			royalGeneralColors( 'bPage_post-bd_col_tp', nValue[4] );
			royalGeneralColors( 'bPage_post-bd_col_rt', nValue[4] );
			royalGeneralColors( 'bPage_post-bd_col_bt', nValue[4] );
			royalGeneralColors( 'bPage_post-bd_col_lt', nValue[4] );
			royalGeneralColors( 'bPost_more-bd_col_gen', nValue[4] );
			royalGeneralColors( 'bPost_more-bd_col_tp', nValue[4] );
			royalGeneralColors( 'bPost_more-bd_col_rt', nValue[4] );
			royalGeneralColors( 'bPost_more-bd_col_bt', nValue[4] );
			royalGeneralColors( 'bPost_more-bd_col_lt', nValue[4] );
			royalGeneralColors( 'comments_content-bd_col_gen', nValue[4] );
			royalGeneralColors( 'comments_content-bd_col_tp', nValue[4] );
			royalGeneralColors( 'comments_content-bd_col_rt', nValue[4] );
			royalGeneralColors( 'comments_content-bd_col_bt', nValue[4] );
			royalGeneralColors( 'comments_content-bd_col_lt', nValue[4] );
			royalGeneralColors( 'inputs_general-bd_col_gen', nValue[4] );
			royalGeneralColors( 'inputs_general-bd_col_tp', nValue[4] );
			royalGeneralColors( 'inputs_general-bd_col_rt', nValue[4] );
			royalGeneralColors( 'inputs_general-bd_col_bt', nValue[4] );
			royalGeneralColors( 'inputs_general-bd_col_lt', nValue[4] );
			royalGeneralColors( 'inputs_submit-bd_col_gen', nValue[4] );
			royalGeneralColors( 'inputs_submit-bd_col_tp', nValue[4] );
			royalGeneralColors( 'inputs_submit-bd_col_rt', nValue[4] );
			royalGeneralColors( 'inputs_submit-bd_col_bt', nValue[4] );
			royalGeneralColors( 'inputs_submit-bd_col_lt', nValue[4] );
			royalGeneralColors( 'inputs_search-bd_col_gen', nValue[4] );
			royalGeneralColors( 'inputs_search-bd_col_tp', nValue[4] );
			royalGeneralColors( 'inputs_search-bd_col_rt', nValue[4] );
			royalGeneralColors( 'inputs_search-bd_col_bt', nValue[4] );
			royalGeneralColors( 'inputs_search-bd_col_lt', nValue[4] );
			royalGeneralColors( 'pagination-bd_col_gen', nValue[4] );
			royalGeneralColors( 'pagination-bd_col_tp', nValue[4] );
			royalGeneralColors( 'pagination-bd_col_rt', nValue[4] );
			royalGeneralColors( 'pagination-bd_col_bt', nValue[4] );
			royalGeneralColors( 'pagination-bd_col_lt', nValue[4] );
			royalGeneralColors( 'pPage_general-shad_col', nValue[4] );
			royalGeneralColors( 'pPage_post-shad_col', nValue[4] );
			royalGeneralColors( 'pPost_title-bd_col_bt', nValue[4] );
			royalGeneralColors( 'pPost_cats-bd_col_bt', nValue[4] );
			royalGeneralColors( 'pPost_meta-bd_col_bt', nValue[4] );
			royalGeneralColors( 'pPost_desc-bd_col_bt', nValue[4] );
			royalGeneralColors( 'pPost_more-bd_hcol', nValue[4] );
			royalGeneralColors( 'pPost_more-shad_col', nValue[4] );
			royalGeneralColors( 'pPost_formats-shad_col', nValue[4] );
			royalGeneralColors( 'pSingle_nav-bd_hcol', nValue[4] );
			royalGeneralColors( 'pSingle_nav-border_color', nValue[4] );
			royalGeneralColors( 'pSingle_nav-shad_col', nValue[4] );
			royalGeneralColors( 'bPost_title-bd_col_bt', nValue[4] );
			royalGeneralColors( 'bPost_cats-bd_col_bt', nValue[4] );
			royalGeneralColors( 'bPost_meta-bd_col_bt', nValue[4] );
			royalGeneralColors( 'bPost_desc-bd_col_bt', nValue[4] );
			royalGeneralColors( 'bPage_general-shad_col', nValue[4] );
			royalGeneralColors( 'bPage_post-shad_col', nValue[4] );
			royalGeneralColors( 'pPost_media-shad_col', nValue[4] );
			royalGeneralColors( 'pPost_test-bd_col_tp', nValue[4] );
			royalGeneralColors( 'bPost_more-bd_hcol', nValue[4] );
			royalGeneralColors( 'bPost_more-shad_col', nValue[4] );
			royalGeneralColors( 'bSingle_nav-bd_hcol', nValue[4] );
			royalGeneralColors( 'bSingle_nav-border_color', nValue[4] );
			royalGeneralColors( 'bSingle_nav-shad_col', nValue[4] );
			royalGeneralColors( 'similars_arrows-bd_hcol', nValue[4] );
			royalGeneralColors( 'similars_arrows-bd_col_gen', nValue[4] );
			royalGeneralColors( 'similars_arrows-shad_col', nValue[4] );
			royalGeneralColors( 'comments_image-shad_col', nValue[4] );
			royalGeneralColors( 'comments_content-shad_col', nValue[4] );
			royalGeneralColors( 'inputs_general-bd_fcol', nValue[4] );
			royalGeneralColors( 'inputs_general-shad_col', nValue[4] );
			royalGeneralColors( 'inputs_general-error_col', nValue[4] );
			royalGeneralColors( 'inputs_submit-bd_hcol', nValue[4] );
			royalGeneralColors( 'inputs_submit-shad_col', nValue[4] );
			royalGeneralColors( 'inputs_search-bd_fcol', nValue[4] );
			royalGeneralColors( 'inputs_search-shad_col', nValue[4] );
			royalGeneralColors( 'pagination-shad_col', nValue[4] );
			royalGeneralColors( 'pagination_nav-bd_hcol', nValue[4] );
			royalGeneralColors( 'pagination_nav-border_color', nValue[4] );
			royalGeneralColors( 'pagination_nav-shad_col', nValue[4] );
			royalGeneralColors( 'gallery_default-shad_col', nValue[4] );
			royalGeneralColors( 'similars_general-border_color', nValue[4] );

			// button
			royalGeneralColors( 'pPost_more-bg_col', nValue[5] );
			royalGeneralColors( 'pSingle_nav-bg_col', nValue[5] );
			royalGeneralColors( 'bPost_more-bg_col', nValue[5] );
			royalGeneralColors( 'bSingle_nav-bg_col', nValue[5] );
			royalGeneralColors( 'gallery_nav-bg_color', nValue[5] );
			royalGeneralColors( 'similars_arrows-bg_col', nValue[5] );
			royalGeneralColors( 'inputs_submit-bg_col', nValue[5] );
			royalGeneralColors( 'inputs_search-bg_col', nValue[5] );
			royalGeneralColors( 'pagination_nav-bg_col', nValue[5] );
			royalGeneralColors( 'gallery_arrows-color', nValue[5] );
			royalGeneralColors( 'gallery_nav-color', nValue[5] );

			// button text
			royalGeneralColors( 'gallery_arrows-icon_color', nValue[6] );
			royalGeneralColors( 'gallery_nav-hover_color', nValue[6] );
			royalGeneralColors( 'pPost_more-txt_col', nValue[6] );
			royalGeneralColors( 'pSingle_nav-txt_col', nValue[6] );
			royalGeneralColors( 'bPost_more-txt_col', nValue[6] );
			royalGeneralColors( 'bSingle_nav-txt_col', nValue[6] );
			royalGeneralColors( 'similars_arrows-txt_col', nValue[6] );
			royalGeneralColors( 'inputs_submit-txt_col', nValue[6] );
			royalGeneralColors( 'inputs_search-txt_col', nValue[6] );
			royalGeneralColors( 'pagination_nav-txt_col', nValue[6] );

			// button hover
			royalGeneralColors( 'pPost_more-bg_hcol', nValue[7] );
			royalGeneralColors( 'pSingle_nav-bg_hcol', nValue[7] );
			royalGeneralColors( 'bPost_more-bg_hcol', nValue[7] );
			royalGeneralColors( 'bSingle_nav-bg_hcol', nValue[7] );
			royalGeneralColors( 'similars_arrows-bg_hcol', nValue[7] );
			royalGeneralColors( 'inputs_submit-bg_hcol', nValue[7] );
			royalGeneralColors( 'pagination_nav-bg_hcol', nValue[7] );
			royalGeneralColors( 'inputs_search-txt_fcol', nValue[7] );

			// button text hover
			royalGeneralColors( 'pPost_more-txt_hcol', nValue[8] );
			royalGeneralColors( 'pSingle_nav-txt_hcol', nValue[8] );
			royalGeneralColors( 'bPost_more-txt_hcol', nValue[8] );
			royalGeneralColors( 'bSingle_nav-txt_hcol', nValue[8] );
			royalGeneralColors( 'similars_arrows-txt_hcol', nValue[8] );
			royalGeneralColors( 'inputs_submit-txt_hcol', nValue[8] );
			royalGeneralColors( 'inputs_search-bg_fcol', nValue[8] );
			royalGeneralColors( 'pagination_nav-txt_hcol', nValue[8] );

		} );
	} );


/* ----------------- Footer Colors Styling Options ----------------- */

	// Colors Animation tabs -------------------------------
	royalTabs( 
		'footer_colors',
		'',
		'',
		[
		 'background',
		 'text',
		 'link',
		 'link_hover',
		 'border',
		 'button',
		 'button_hover',
		 'button_text',
		 'button_text_hover',
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'footer_colors', 'label', '#control_tabs_footer_colors', false );


	// on change
	wp.customize( 'royal_footer_colors[db_input]', function( value ) {
		value.bind( function( nValue ) {
			nValue = nValue.split('___');

			// background
			royalGeneralColors( 'copy_soc_general-color', nValue[0] );
			royalGeneralColors( 'fWidgets_general-bg_color', nValue[0] );
			royalGeneralColors( 'fWidgets_content-bg_col', nValue[0] );

			// text
			royalGeneralColors( 'copyright-txt_col', nValue[1] );
			royalGeneralColors( 'fWidgets_content-txt_col', nValue[1] );
			royalGeneralColors( 'fWidgets_title-color', nValue[1] );

			// link
			royalGeneralColors( 'copyright-link_col', nValue[2] );
			royalGeneralColors( 'fWidgets_content-link_col', nValue[2] );

			// link hover
			royalGeneralColors( 'copyright-link_hcol', nValue[3] );
			royalGeneralColors( 'fWidgets_content-link_hcol', nValue[3] );

			// border
			royalGeneralColors( 'socials-bd_hcol', nValue[4] );
			royalGeneralColors( 'socials-bd_col_gen', nValue[4] );
			royalGeneralColors( 'socials-bd_col_tp', nValue[4] );
			royalGeneralColors( 'socials-bd_col_rt', nValue[4] );
			royalGeneralColors( 'socials-bd_col_bt', nValue[4] );
			royalGeneralColors( 'socials-bd_col_lt', nValue[4] );
			royalGeneralColors( 'socials-shad_col', nValue[4] );
			royalGeneralColors( 'socials-wrap_bd_col_bt', nValue[4] );
			royalGeneralColors( 'copy_soc_general-shad_col', nValue[4] );
			royalGeneralColors( 'fWidgets_general-bd_col_gen', nValue[4] );
			royalGeneralColors( 'fWidgets_general-bd_col_tp', nValue[4] );
			royalGeneralColors( 'fWidgets_general-bd_col_rt', nValue[4] );
			royalGeneralColors( 'fWidgets_general-bd_col_bt', nValue[4] );
			royalGeneralColors( 'fWidgets_general-bd_col_lt', nValue[4] );
			royalGeneralColors( 'fWidgets_general-shad_col', nValue[4] );
			royalGeneralColors( 'fWidgets_content-shad_col', nValue[4] );
			royalGeneralColors( 'back_btn-shad_col', nValue[4] );
			royalGeneralColors( 'fWidgets_title-bd_col_bt', nValue[4] );

			// button
			royalGeneralColors( 'copy_soc_general-fold_btn_color', nValue[5] );
			royalGeneralColors( 'socials-bg_col', nValue[5] );
			royalGeneralColors( 'back_btn-color', nValue[5] );

			// button text
			royalGeneralColors( 'copy_soc_general-fold_btn_icon_color', nValue[6] );
			royalGeneralColors( 'socials-txt_col', nValue[6] );
			royalGeneralColors( 'back_btn-txt_col', nValue[6] );

			// button hover
			royalGeneralColors( 'socials-bg_hcol', nValue[7] );
			royalGeneralColors( 'back_btn-hcol', nValue[7] );

			// button text hover
			royalGeneralColors( 'socials-txt_hcol', nValue[8] );
			royalGeneralColors( 'back_btn-txt_hcol', nValue[8] );

		} );
	} );

	} // end colors if()

}); // end colors click()



/*
***************************************************************
* #Preloader
***************************************************************
*/

// Run Preloader Tab Functions
	royalLightCheckbox('preloader', 'label');
	royalLightSelect('preloader', 'bg_trans');
	royalLightSelect('preloader', 'anim');
	royalLightSelect('preloader', 'anim_size');
	royalLightSelect('preloader', 'fx');
	royalLightSelect('preloader', 'fx_speed');
	royalLightColorPicker('preloader', 'anim_color');
	royalLightColorPicker('preloader', 'bg_color');
	royalLightSlider('preloader', 'bg_color_tr');

$('#accordion-section-preloaders').on('click', function() {

	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');

/* ----------------- Preloader Styling Options ----------------- */

	// transparency slider
	royalSlider( 'preloader', 'bg_color_tr', 0, 1, 0.1, '', false );

	royalControlsWrap( 'preloader', 'anim-color-wrap', [
		'anim_color'
	] );

	royalControlsWrap( 'preloader', 'bg-color-wrap', [
		'bg_color',
		'bg_color_tr'
	] );

	// Preloader Animation tabs -------------------------------
	royalTabs( 
		'preloader',
		[
		 'bg_trans',
		 'anim',
		 'anim_size',
		 'fx',
		 'fx_speed'
		],
		'',
		[
		 'anim-color-wrap',
		 'bg-color-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'preloader', 'label', '#control_tabs_preloader', true );


	} // end preloader if()

}); // end preloader click()



/*
***************************************************************
* #Body
***************************************************************
*/

$('#accordion-section-body').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');

/* ----------------- Body General Options ----------------- */

    // layout controls wrap
    royalControlsWrap( 'body', 'layout-limited', [
        'max_width',
        'align'
    ] );

    // max width slider
    royalSlider( 'body', 'max_width', 800, 2000, 10, 'px', false );

    // layout mode select
    royalSelect( 'body', 'layout', 'layout-select', ['layout-limited'] );


/* ----------------- Body Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'body', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'body', 'padding_gen', 0, 150, 10, 'px', true );
	royalSlider( 'body', 'padding_tp', 0, 150, 10, 'px', false );
	royalSlider( 'body', 'padding_rt', 0, 150, 10, 'px', false );
	royalSlider( 'body', 'padding_bt', 0, 150, 10, 'px', false );
	royalSlider( 'body', 'padding_lt', 0, 150, 10, 'px', false );
	royalAdvancedBTN( 'body', 'padding_ad', false );


/* ----------------- Body Styling Options ----------------- */

	// background color controls wrap
	royalControlsWrap( 'body', 'bg-color-wrap', [ 'bg_color' ] );

	// background gradient controls wrap
	royalControlsWrap( 'body', 'bg-gradient-wrap', [
		'bg_grad_angle',
		'bg_grad_col_1',
		'bg_grad_col_1_tr',
		'bg_grad_col_1_ps',
		'bg_grad_col_2',
		'bg_grad_col_2_tr',
		'bg_grad_col_2_ps',
	] );

	// background image controls wrap
	royalControlsWrap( 'body', 'bg-image-wrap', [
		'bg_img',
		'bg_img_sz',
		'bg_img_att'
	] );

	// background gradient sliders
	royalSlider( 'body', 'bg_grad_angle', 0, 360, 1,' deg', false );
	royalSlider( 'body', 'bg_grad_col_1_tr', 0, 1, 0.1, '', false );
	royalSlider( 'body', 'bg_grad_col_1_ps', 0, 100, 1, '%', false );
	royalSlider( 'body', 'bg_grad_col_2_tr', 0, 1, 0.1, '', false );
	royalSlider( 'body', 'bg_grad_col_2_ps', 0, 100, 1, '%', false );

	// background type select
	royalSelect( 'body', 'background', 'background-select', [ 'bg-color-wrap', 'bg-gradient-wrap', 'bg-image-wrap' ] );


	// border controls wrap
	royalControlsWrap( 'body', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'body', 'border_label', '#customize-control-royal_body-border-wrap', true );


	// border size sliders
	royalSlider( 'body', 'bd_size_gen', 0, 30, 1, 'px', true );
	royalSlider( 'body', 'bd_size_tp', 0, 30, 1, 'px', false );
	royalSlider( 'body', 'bd_size_rt', 0, 30, 1, 'px', false );
	royalSlider( 'body', 'bd_size_bt', 0, 30, 1, 'px', false );
	royalSlider( 'body', 'bd_size_lt', 0, 30, 1, 'px', false );
	royalAdvancedBTN( 'body', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'body', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'body', 'bd_col_gen' );

	// shadow controls wrap
	royalControlsWrap( 'body', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr'
	] );

	// shadow controls on/off
	royalCustomLabel( 'body', 'shadow_label', '#customize-control-royal_body-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'body', 'shad_h', -50, 50, 1, 'px', false );
	royalSlider( 'body', 'shad_v', -50, 50, 1, 'px', false );
	royalSlider( 'body', 'shad_bl', 0, 50, 1, 'px', false );
	royalSlider( 'body', 'shad_sp', -50, 50, 1, 'px', false );
	royalSlider( 'body', 'shad_col_tr', 0, 1, 0.1, '', false );


	var bodyGeneralHelp = '\
		Top & Bottom <strong>Paddings</strong>,\
		<br>Top & Bottom <strong>Borders</strong> - will not apply if in <a href="#accordion-section-sidebar">Section Sidebar</a>:\
		<br><strong>General</strong> tabs &gt; <strong>General Options</strong> window &gt; <strong>Attachment</strong> is set to - "Fixed".\
		<br><br><strong>"OnePage Future"</strong> may not work properly in the Theme Customizer mode. To try it in action please go to Standard Mode of the website.\
	';

	// body general tabs -------------------------------
	royalTabs(
		'body',
		[
		 'onepage',
		 'smoothscroll',
		 'layout-select'
		], [
		 'padding-wrap'
		], [
		 'background-select',
		 'border_label',
		 'border-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		bodyGeneralHelp
	);
	// label
	royalCustomLabel( 'body', 'general_label', '', false );



/* ----------------- Content Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'content', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'content', 'padding_gen', 0, 150, 1,'px', true );
	royalSlider( 'content', 'padding_tp', 0, 150, 1,'px', false );
	royalSlider( 'content', 'padding_rt', 0, 150, 1,'px', false );
	royalSlider( 'content', 'padding_bt', 0, 150, 1,'px', false );
	royalSlider( 'content', 'padding_lt', 0, 150, 1,'px', false );
	royalAdvancedBTN( 'content', 'padding_ad', false );

	// section space control wrap
	royalControlsWrap( 'content', 'section-space-wrap', [ 'section_space' ] );

	// section space sliders
	royalSlider( 'content', 'section_space', 0, 100, 1,'px', true );


/* ----------------- Content Styling Options ----------------- */

	// background color controls wrap
	royalControlsWrap( 'content', 'bg-color-wrap', [
		'bg_color',
		'bg_color_tr'
	] );

	// background color transparency slider
	royalSlider( 'content', 'bg_color_tr', 0, 1, 0.1, '', false );

	// background gradient controls wrap
	royalControlsWrap( 'content', 'bg-gradient-wrap', [
		'bg_grad_angle',
		'bg_grad_col_1',
		'bg_grad_col_1_tr',
		'bg_grad_col_1_ps',
		'bg_grad_col_2',
		'bg_grad_col_2_tr',
		'bg_grad_col_2_ps',
	] );

	// background image controls wrap
	royalControlsWrap( 'content', 'bg-image-wrap', [
		'bg_img',
		'bg_img_sz',
		'bg_img_att'
	] );

	// background gradient sliders
	royalSlider( 'content', 'bg_grad_angle', 0, 360, 1,' deg', false );
	royalSlider( 'content', 'bg_grad_col_1_tr', 0, 1, 0.1, '', false );
	royalSlider( 'content', 'bg_grad_col_1_ps', 0, 100, 1, '%', false );
	royalSlider( 'content', 'bg_grad_col_2_tr', 0, 1, 0.1, '', false );
	royalSlider( 'content', 'bg_grad_col_2_ps', 0, 100, 1, '%', false );

	// background type select
	royalSelect( 'content', 'background', 'background-select', [ 'bg-color-wrap', 'bg-gradient-wrap', 'bg-image-wrap' ] );


	var contentHelp = '\
		This options will aply on <strong>Page\'s Main Content</strong>(not on Sidebar).\
		<br><br><strong>Space Between Sections</strong> will apply on:\
		<br>Blog &amp; Portfolio Posts containers, Posts Pagination block, Blog &amp; Portfolio Posts single contents, Similar Posts container, Contact page info and etc.\
	';

	// content tabs -------------------------------
	royalTabs(
		'content',
		'',
		[ 'padding-wrap', 'section-space-wrap' ],
		[ 'background-select' ],
		'',
		contentHelp
	);
	// label
	royalCustomLabel( 'content', 'label', '', false );



/* ----------------- Inner Content General Options ----------------- */

	// max-width slider
	royalSlider( 'inner_content', 'max_width', 600, 2000, 10, 'px', false );


/* ----------------- Inner Content Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'inner_content', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'inner_content', 'padding_gen', 0, 100, 1, 'px', true );
	royalSlider( 'inner_content', 'padding_tp', 0, 100, 1, 'px', false );
	royalSlider( 'inner_content', 'padding_rt', 0, 100, 1, 'px', false );
	royalSlider( 'inner_content', 'padding_bt', 0, 100, 1, 'px', false );
	royalSlider( 'inner_content', 'padding_lt', 0, 100, 1, 'px', false );
	royalAdvancedBTN( 'inner_content', 'padding_ad', false );


/* ----------------- Inner Content Styling Options ----------------- */

	// background color controls wrap
	royalControlsWrap( 'inner_content', 'bg-color-wrap', [
		'bg_color',
		'bg_color_tr'
	] );

	// background transparency slide
	royalSlider( 'inner_content', 'bg_color_tr', 0, 1, 0.1, '', false );

	// background color controls wrap
	royalControlsWrap( 'inner_content', 'color-wrap', [
		'head_color',
		'text_color',
		'meta_color',
		'link_color',
		'link_hcolor',
		'border_color'
	] );

	// border radius controls wrap
	royalControlsWrap( 'inner_content', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'inner_content', 'radius_label', '#customize-control-royal_inner_content-radius-wrap', true );

	// border radius slider
	royalSlider( 'inner_content', 'radius', 0, 30, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'inner_content', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'inner_content', 'shadow_label', '#customize-control-royal_inner_content-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'inner_content', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'inner_content', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'inner_content', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'inner_content', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'inner_content', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Inner Content Font Options ----------------- */

	var innerContentHelp = '\
		Inner Content includes:\
		<br>Blog & Portfolio single page headers, single post content, comments,\
		<br>Portfolio single project info,\
		<br>Contact page info, Default page templates and etc.\
		<br><br>To adjust Inner Content\'s typography options, please visit <a href="#accordion-section-typography">Typography Section.</a>\
	';

	// Inner Content tabs -------------------------------
	royalTabs(
		'inner_content',
		[
		 'max_width'
		],
		[
		 'padding-wrap'
		],
		[
		 'bg-color-wrap',
		 'color-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		[
		 'underline'
		],
		innerContentHelp
	);
	// label
	royalCustomLabel( 'inner_content', 'label', '', false );

	} // end body if()

}); // end body click()



/*
***************************************************************
* #Sidebar
***************************************************************
*/

$('#accordion-section-sidebar').on('click', function() {

	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');

		$('#accordion-section-menu').trigger('click');

/* ----------------- General Options ----------------- */

	// equal height controls wrap
	royalControlsWrap( 'sidebar', 'position-static', [
		'equal'
	] );

	// position select
	royalSelect( 'sidebar', 'position', 'position-select', ['position-static'] );


/* ----------------- Spacing Options ----------------- */

	// width controls wrap
	royalControlsWrap( 'sidebar', 'width-wrap', [
		'width'
	] );

	royalSlider( 'sidebar', 'width', 150, 350, 1,'px', false );

	// padding controls wrap
	royalControlsWrap( 'sidebar', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'sidebar', 'padding_gen', 0, 150, 1, 'px', true );
	royalSlider( 'sidebar', 'padding_tp', 0, 150, 1, 'px', false );
	royalSlider( 'sidebar', 'padding_rt', 0, 150, 1, 'px', false );
	royalSlider( 'sidebar', 'padding_bt', 0, 150, 1, 'px', false );
	royalSlider( 'sidebar', 'padding_lt', 0, 150, 1, 'px', false );
	royalAdvancedBTN( 'sidebar', 'padding_ad', false );

	// setion margin controls wrap
	royalControlsWrap( 'sidebar', 'section-margin-wrap', [
		'section_marg'
	] );

	// section margin slider
	royalSlider( 'sidebar', 'section_marg', 0, 100, 1, 'px', false );


/* ----------------- Styling Options ----------------- */

	// background color controls wrap
	royalControlsWrap( 'sidebar', 'bg-color-wrap', [ 'bg_color', 'bg_color_tr' ] );

	// background gradient controls wrap
	royalControlsWrap( 'sidebar', 'bg-gradient-wrap', [
		'bg_grad_angle',
		'bg_grad_col_1',
		'bg_grad_col_1_tr',
		'bg_grad_col_1_ps',
		'bg_grad_col_2',
		'bg_grad_col_2_tr',
		'bg_grad_col_2_ps',
	] );

	// background image controls wrap
	royalControlsWrap( 'sidebar', 'bg-image-wrap', [
		'bg_img',
		'bg_img_sz',
		'bg_img_att'
	] );

	// background color transparency slider
	royalSlider( 'sidebar', 'bg_color_tr', 0, 1, 0.1, '', false );

	// background gradient sliders
	royalSlider( 'sidebar', 'bg_grad_angle', 0, 360, 1,' deg', false );
	royalSlider( 'sidebar', 'bg_grad_col_1_tr', 0, 1, 0.1, '', false );
	royalSlider( 'sidebar', 'bg_grad_col_1_ps', 0, 100, 1, '%', false );
	royalSlider( 'sidebar', 'bg_grad_col_2_tr', 0, 1, 0.1, '', false );
	royalSlider( 'sidebar', 'bg_grad_col_2_ps', 0, 100, 1, '%', false );

	// background type select
	royalSelect( 'sidebar', 'background', 'background-select', [ 'bg-color-wrap', 'bg-gradient-wrap', 'bg-image-wrap' ] );

	// border controls wrap
	royalControlsWrap( 
		'sidebar', 'border-wrap',
		[
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'sidebar', 'border_label', '#customize-control-royal_sidebar-border-wrap', true );

	// border size sliders
	royalSlider( 'sidebar', 'bd_size_gen', 0, 30, 1, 'px', true );
	royalSlider( 'sidebar', 'bd_size_tp', 0, 30, 1, 'px', false );
	royalSlider( 'sidebar', 'bd_size_rt', 0, 30, 1, 'px', false );
	royalSlider( 'sidebar', 'bd_size_bt', 0, 30, 1, 'px', false );
	royalSlider( 'sidebar', 'bd_size_lt', 0, 30, 1, 'px', false );
	royalAdvancedBTN( 'sidebar', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'sidebar', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'sidebar', 'bd_col_gen' );

	// shadow controls wrap
	royalControlsWrap( 'sidebar', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'sidebar', 'shadow_label', '#customize-control-royal_sidebar-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'sidebar', 'shad_h', -50, 50, 1, 'px', false );
	royalSlider( 'sidebar', 'shad_v', -50, 50, 1, 'px', false );
	royalSlider( 'sidebar', 'shad_bl', 0, 50, 1, 'px', false );
	royalSlider( 'sidebar', 'shad_sp', -50, 50, 1, 'px', false );
	royalSlider( 'sidebar', 'shad_col_tr', 0, 1, 0.1, '', false );


	var sidebarLeftGeneralHelp = '\
		If <strong>Attachment</strong> is set to "Fixed", Sidebar becomes <strong>stiky</strong> and it won\'t scroll with page.\
		<br><br>If <strong>Default</strong> is set to "Hide", Sidebar will be hidden when page loads, but you can still show/hide it with Fold Button.\
		<br><br><strong>Paddings</strong> won\'t apply on Logo & Tagline, They have their own.\
		<br><br><strong>Space Between Sections</strong> will apply on Menu, Filters and Widgets.\
	';

	// Sidebar general tabs -------------------------------
	royalTabs(
		'sidebar',
		[
		 'position-select',
		 'on_load'
		],
		[
		 'width-wrap',
		 'padding-wrap',
		 'section-margin-wrap'
		],
		[
		 'background-select',
		 'border_label',
		 'border-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		sidebarLeftGeneralHelp
	);
	// label
	royalCustomLabel( 'sidebar', 'general_label', '', false );



/* ----------------- Fold Button Spacing Options ----------------- */

	// width & height controls wrap
	royalControlsWrap( 'sidebar_fold_btn', 'width-height-wrap', [ 
		'width',
		'height'
	] );

	// width & height sliders
	royalSlider( 'sidebar_fold_btn', 'width', 10, 100, 1, 'px', false );
	royalSlider( 'sidebar_fold_btn', 'height', 10, 100, 1, 'px', false );

	// position controls wrap
	royalControlsWrap( 'sidebar_fold_btn', 'position-wrap', [ 
		'pos_tp',
		'pos_lt',
		'fpos_lt'
	] );

	// position sliders
	royalSlider( 'sidebar_fold_btn', 'pos_tp', 0, 200, 1, 'px', false );
	royalSlider( 'sidebar_fold_btn', 'pos_lt', 0, 400, 1, 'px', false );
	royalSlider( 'sidebar_fold_btn', 'fpos_lt', -50, 50, 1, 'px', false );


/* ----------------- Fold Button Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'sidebar_fold_btn', 'static-colors-wrap', [ 
		'color',
		'col_tr',
		'txt_col'
	] );

	// hover color controls wrap
	royalControlsWrap( 'sidebar_fold_btn', 'hover-colors-wrap', [ 
		'hcol',
		'hcol_tr',
		'txt_hcol'
	] );

	// transparency slider
	royalSlider( 'sidebar_fold_btn', 'col_tr', 0, 1, 0.1, '', false );

	// hover transparency slider
	royalSlider( 'sidebar_fold_btn', 'hcol_tr', 0, 1, 0.1, '', false );

	// border radius controls wrap
	royalControlsWrap( 'sidebar_fold_btn', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'sidebar_fold_btn', 'radius_label', '#customize-control-royal_sidebar_fold_btn-radius-wrap', true );

	// border radius slider
	royalSlider( 'sidebar_fold_btn', 'radius', 0, 50, 1, '%', false );

	// shadow controls wrap
	royalControlsWrap( 'sidebar_fold_btn', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'sidebar_fold_btn', 'shadow_label', '#customize-control-royal_sidebar_fold_btn-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'sidebar_fold_btn', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'sidebar_fold_btn', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'sidebar_fold_btn', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'sidebar_fold_btn', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'sidebar_fold_btn', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Fold Button Font Options ----------------- */

	// text size slider
	royalSlider( 'sidebar_fold_btn', 'txt_sz', 10, 50, 1, 'px', false );


	var sidebarFoldBtnHelp = '\
		Fold Button show/hides Sidebar.\
		<br><br><strong>Note:</strong> If Sidebar\'s <strong>Default</strong> is set to "Hide" and Fold Button Label is <strong>unchecked</strong>, you can\'t show up Sidebar, until you change value to one of them.\
	';

	// sidebar fold button tabs -------------------------------
	royalTabs( 
		'sidebar_fold_btn',
		[
		 'icon',
		 'position'
		], [ 
		 'width-height-wrap',
		 'position-wrap'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'shadow_label',
		 'shadow-wrap',
		 'radius_label',
		 'radius-wrap'
		],
		[
		 'txt_sz'
		],
		sidebarFoldBtnHelp
	);
	// label
	royalCustomLabel( 'sidebar_fold_btn', 'label', '#control_tabs_sidebar_fold_btn', true );



/* ----------------- Scrollbar Spacing Options ----------------- */

	// width slider
	royalSlider( 'sidebar_scroll', 'width', 0, 30, 1, 'px', false );


/* ----------------- Scrollbar Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'sidebar_scroll', 'colors-wrap', [ 
		'color',
		'col_tr',
		'hcol'
	] );

	// transparency slider
	royalSlider( 'sidebar_scroll', 'col_tr', 0, 1, 0.1, '', false );

	// border radius controls wrap
	royalControlsWrap( 'sidebar_scroll', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'sidebar_scroll', 'radius_label', '#customize-control-royal_sidebar_scroll-radius-wrap', true );

	// border radius slider
	royalSlider( 'sidebar_scroll', 'radius', 0, 15, 1, 'px', false );


	var sidebarScrollbarHelp = '\
		The Scrollbar will be shown, only when Sidebar\'s <strong>Attachment</strong> is set to "Fixed" and the content overflows the Sidebar container.\
	';

	// sidebar scrollbar tabs -------------------------------
	royalTabs( 
		'sidebar_scroll', 
		'',
		[ 
		 'width'
		], [ 
		 'colors-wrap',
		 'radius_label',
		 'radius-wrap'
		],
		'',
		sidebarScrollbarHelp
	);
	// label
	royalCustomLabel( 'sidebar_scroll', 'label', '#control_tabs_sidebar_scroll', true );



/*
***************************************************************
* #Sidebar Top
***************************************************************
*/

/* ----------------- General Options ----------------- */

	// scale controls wrap
	royalControlsWrap( 'sidebar_top', 'scale-wrap', [
		'scale_height'
	] );

	// scale height slider
	royalSlider( 'sidebar_top', 'scale_height', 10, 100, 1, 'px', false );

	// scale label
	royalCustomLabel( 'sidebar_top', 'scale', '#customize-control-royal_sidebar_top-scale-wrap', true );

	// fullwidth controls wrap
	royalControlsWrap( 'sidebar_top', 'sidebar-fixed', [
		'fullwidth',
		'scale',
		'scale-wrap'
	] );

	// position select
	royalSelect( 'sidebar_top', 'position', 'position-select', [ 'sidebar-fixed' ] );


/* ----------------- Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'sidebar_top', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'sidebar_top', 'padding_gen', 0, 200, 1, 'px', true );
	royalSlider( 'sidebar_top', 'padding_tp', 0, 200, 1, 'px', false );
	royalSlider( 'sidebar_top', 'padding_rt', 0, 200, 1, 'px', false );
	royalSlider( 'sidebar_top', 'padding_bt', 0, 200, 1, 'px', false );
	royalSlider( 'sidebar_top', 'padding_lt', 0, 200, 1, 'px', false );
	royalAdvancedBTN( 'sidebar_top', 'padding_ad', false );

	// setion margin controls wrap
	royalControlsWrap( 'sidebar_top', 'margin-wrap', [
		'margin_bt'
	] );

	// margin bottom slider
	royalSlider( 'sidebar_top', 'margin_bt', 0, 100, 1, 'px', false );

	// fixed height controls wrap
	royalControlsWrap( 'sidebar_top', 'fixed-height-wrap', [
		'alt_height'
	] );

	// margin bottom slider
	royalSlider( 'sidebar_top', 'alt_height', 10, 300, 1, 'px', false );


/* ----------------- Styling Options ----------------- */

	// background color controls wrap
	royalControlsWrap( 'sidebar_top', 'colors-wrap', [ 
		'bg_color',
		'bg_color_tr'
	] );

	// transparency slider
	royalSlider( 'sidebar_top', 'bg_color_tr', 0, 1, 0.1, '', false );

	// scale background color controls wrap
	royalControlsWrap( 'sidebar_top', 'scale-colors-wrap', [ 
		'scale_bg_color',
		'scale_bg_color_tr'
	] );

	// transparency slider
	royalSlider( 'sidebar_top', 'scale_bg_color_tr', 0, 1, 0.1, '', false );

	// border bottom controls wrap
	royalControlsWrap( 'sidebar_top', 'border-wrap', [
		'scale_border_label',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'sidebar_top', 'border_label', '#customize-control-royal_sidebar_top-border-wrap', true );

	// border bottom size slider
	royalSlider( 'sidebar_top', 'bd_size_bt', 0, 10, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'sidebar_top', 'shadow-wrap', [
		'scale_shadow_label',
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr'
	] );

	// shadow controls on/off
	royalCustomLabel( 'sidebar_top', 'shadow_label', '#customize-control-royal_sidebar_top-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'sidebar_top', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'sidebar_top', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'sidebar_top', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'sidebar_top', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'sidebar_top', 'shad_col_tr', 0, 1, 0.1, '', false );


	var sidebarTopGeneralHelp = '\
		If <strong>Attachment</strong> is set to "Fixed", Sidebar becomes <strong>stiky</strong> and it won\'t scroll with page.\
		<br><br><strong>Paddings</strong> won\'t apply on Logo & Tagline, They have their own.\
		<br><br><strong>Scale</strong> options won\'t work with <strong>Sidebar Arrangment</strong> - "Vertical Logo / Menu" and <strong>Logo Type</strong> "Text".\
	';

	// Sidebar Top General tabs -------------------------------
	royalTabs(
		'sidebar_top',
		[
		 'arrange',
		 'position-select'
		],
		[
		 'padding-wrap',
		 'margin-wrap',
		 'fixed-height-wrap'
		],
		[
		 'colors-wrap',
		 'scale-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		sidebarTopGeneralHelp
	);
	// label
	royalCustomLabel( 'sidebar_top', 'label', '', false );

	var royalFoldMenuHidden = $('#customize-control-royal_menu_fold-label, #control_tabs_menu_fold, #customize-control-royal_menu_fold_wrap-label, #control_tabs_menu_fold_wrap');

	// show/hide menu fold wrap controls
	if ( $('#customize-control-royal_sidebar_top-arrange select').val() === 'vertical_2' ) {
		royalFoldMenuHidden.addClass('hide-customizer-control');
	} else {
		royalFoldMenuHidden.removeClass('hide-customizer-control');
	}

	$('#customize-control-royal_sidebar_top-arrange select').change(function(){
		if ( $(this).val() === 'vertical_2' ) {
			royalFoldMenuHidden.addClass('hide-customizer-control');
		} else {
			royalFoldMenuHidden.removeClass('hide-customizer-control');
		}
	});


/* ----------------- Sidebar General Position Select ----------------- */

	// wait until menu section is loaded
	setTimeout(function() {

	var prefix = '#customize-control-royal_';

	// left sidebar controls
	var sidebarLeft = [
		prefix +'sidebar-general_label',
		'#control_tabs_sidebar',
		prefix +'sidebar_fold_btn-label',
		'#control_tabs_sidebar_fold_btn',
		prefix +'sidebar_scroll-label',
		'#control_tabs_sidebar_scroll',
		prefix +'menu_title-label',
		'#control_tabs_menu_title',
		prefix +'menu_items-sub_bg_col',
		prefix +'menu_items-width',
		prefix +'menu_items-sub',
		prefix +'menu_items-align',
		prefix +'filters_title-label',
		'#control_tabs_filters_title',
		prefix +'filter_items-width',
		'#accordion-section-sidebar_widgets'
	];
	sidebarLeft = sidebarLeft.join(',');


	// top sidebar controls
	var sidebarTop = [
		prefix +'sidebar_top-label',
		'#control_tabs_sidebar_top',
		prefix +'menu_fold-label',
		'#control_tabs_menu_fold',
		prefix +'menu_fold_wrap-label',
		'#control_tabs_menu_fold_wrap',
		prefix +'menu_sub-label',
		prefix +'menu_items-top_align',
		prefix +'menu_items-list_style',
		'#control_tabs_menu_sub',
		prefix +'filter_items-wrapper_colors_label',
		prefix +'filter_items-wrapper-colors-wrap'
	];
	sidebarTop = sidebarTop.join(',');

	var sidebarPosSelect = $(prefix +'sidebar-general_position select');

	// on load
	if ( sidebarPosSelect.val() === 'top' ) {
		$( sidebarLeft ).addClass('hide-customizer-control');
	} else {
		$( sidebarTop ).addClass('hide-customizer-control');
	}

	// on change
	sidebarPosSelect.change(function() {

		setTimeout(function() {
			$( sidebarLeft +','+ sidebarTop ).removeClass('hide-customizer-control');

			if ( sidebarPosSelect.val() === 'top' ) {
				$( sidebarLeft ).addClass('hide-customizer-control');
			} else {
				$( sidebarTop ).addClass('hide-customizer-control');
			}

			// show/hide menu fold wrap controls
			var menuFoldLabel = $('#customize-control-royal_menu_fold-label').find('input'),
				menuFoldWrapTabs = $('#control_tabs_menu_fold_wrap');

			if ( menuFoldLabel.is(':checked') && sidebarPosSelect.val() === 'top' ) {
				menuFoldWrapTabs.slideDown();
				$('li[aria-controls="rf_general_menu_items"]').addClass('hide-customizer-control');
				$('li[aria-controls="rf_general_menu_items"]').next().find('a').trigger('click');

			} else {
				menuFoldWrapTabs.slideUp();
				$('li[aria-controls="rf_general_menu_items"]').removeClass('hide-customizer-control');
				$('li[aria-controls="rf_general_menu_items"]').find('a').trigger('click');
			}

		}, 10000 );

	});

	}, 1000 ); // end setTimeout()


	} // end sidebar if()

}); // end sidebar click()



/*
***************************************************************
* #Logo
***************************************************************
*/

$('#accordion-section-logo').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- Generel Options ----------------- */

	// logo image controls wrap
	royalControlsWrap( 'logo', 'type-image', [ 
		'image',
		'image_retina'
	] );

	// logo text controls wrap
	$('#customize-control-blogname').wrap('<div class="rf-controls-wrap" id="customize-control-royal_logo-type-text"></div>');

	// logo type select
	royalSelect( 'logo','type', 'type-select', [ 'type-image', 'type-text' ] );


/* ----------------- Spacing Options ----------------- */

	// width controls wrap
	royalControlsWrap( 'logo', 'width-wrap', [ 
		'width'
	] );


	// width slider
	royalSlider( 'logo', 'width', 10, 350, 1,'px', false );

	// padding controls wrap
	royalControlsWrap( 'logo', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'logo', 'padding_gen', 0, 150, 1, 'px', true );
	royalSlider( 'logo', 'padding_tp', 0, 150, 1, 'px', false );
	royalSlider( 'logo', 'padding_rt', 0, 150, 1, 'px', false );
	royalSlider( 'logo', 'padding_bt', 0, 150, 1, 'px', false );
	royalSlider( 'logo', 'padding_lt', 0, 150, 1, 'px', false );
	royalAdvancedBTN( 'logo', 'padding_ad', false );


/* ----------------- Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'logo', 'colors-wrap', [ 
		'bg_col',
		'bg_col_tr',
		'txt_col',
		'txt_hcol'
	] );

	// background color transparency sliders
	royalSlider( 'logo', 'bg_col_tr', 0, 1, 0.1, '', true );

	// border controls wrap
	royalControlsWrap( 'logo', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'logo', 'border_label', '#customize-control-royal_logo-border-wrap', true );

	// border size sliders
	royalSlider( 'logo', 'bd_size_gen', 0, 30, 1, 'px', true );
	royalSlider( 'logo', 'bd_size_tp', 0, 30, 1, 'px', false );
	royalSlider( 'logo', 'bd_size_rt', 0, 30, 1, 'px', false );
	royalSlider( 'logo', 'bd_size_bt', 0, 30, 1, 'px', false );
	royalSlider( 'logo', 'bd_size_lt', 0, 30, 1, 'px', false );
	royalAdvancedBTN( 'logo', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'logo', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'logo', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'logo', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'logo', 'radius_label', '#customize-control-royal_logo-radius-wrap', true );

	// border radius slider
	royalSlider( 'logo', 'radius', 0, 200, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'logo', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'logo', 'shadow_label', '#customize-control-royal_logo-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'logo', 'shad_h', -50, 50, 1, 'px', false );
	royalSlider( 'logo', 'shad_v', -50, 50, 1, 'px', false );
	royalSlider( 'logo', 'shad_bl', 0, 50, 1, 'px', false );
	royalSlider( 'logo', 'shad_sp', -50, 50, 1, 'px', false );
	royalSlider( 'logo', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'logo', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'underline',
		'line_through'
	] );

	// font size slider
	royalSlider( 'logo', 'font_size', 10, 200, 1, 'px', false );

	// line height slider
	royalSlider( 'logo', 'line_height', 1, 200, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'logo', 'letter_space', -50, 50, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'logo', 'font_weight', 100, 900, 100, '', false );

	// text shadow controls wrap
	royalControlsWrap( 'logo', 'txt-shadow-wrap', [
		'txt_shad_h',
		'txt_shad_v',
		'txt_shad_bl',
		'txt_shad_col'
	] );

	// text shadow controls on/off
	royalCustomLabel( 'logo', 'txt_shadow_label', '#customize-control-royal_logo-txt-shadow-wrap', true );

	// text shadow sliders
	royalSlider( 'logo', 'txt_shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'logo', 'txt_shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'logo', 'txt_shad_bl', 0, 20, 1, 'px', false );


	var logoHelp = '\
		For Logo <strong>Type</strong> - "Image", height is automaticaly calculated to preserve original Aspect Ratio.\
		<br><br>If you want your Logo to support Retina Display, please upload image with 2x dimensions.\
		<br><br>Logo <strong>Type</strong> - "Text" is actually Site Title and please note:\
		<br>If you change Site Title from your Dashboard > Settings > General, it will be changed here too.\
		<br><br><strong>Margin</strong> is actually an outer space of block, which wraps Logo &amp; Tagline.\
	';

	// logo tabs -------------------------------
	royalTabs( 
		'logo',
		[
		 'type-select',
		 'align'
		], [
		 'width-wrap',
		 'padding-wrap'
		], [
		 'colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		], [
		 'fonts-wrap',
		 'txt_shadow_label',
		 'txt-shadow-wrap'
		],
		logoHelp
	);
	// label
	royalCustomLabel( 'logo','label', '#control_tabs_logo', true );



/*
***************************************************************
* #Tagline
***************************************************************
*/


/* ----------------- General Options ----------------- */

	// tagline controls wrap
	$('#customize-control-blogdescription').wrap('<div id="customize-control-royal_tagline-blogdescription"></div>');


/* ----------------- General Options ----------------- */

	// top margin slider
	royalSlider( 'tagline', 'margin_tp', 0, 100, 1,'px', false );


/* ----------------- Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'tagline', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'underline',
		'line_through'
	] );

	// font size slider
	royalSlider( 'tagline','font_size', 10, 100, 1, 'px', false );

	// line height slider
	royalSlider( 'tagline','line_height', 10, 100, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'tagline','letter_space', -20, 20, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'tagline','font_weight', 100, 900, 100, '', false );

	// text shadow controls wrap
	royalControlsWrap( 'tagline', 'txt-shadow-wrap', [
		'txt_shad_h',
		'txt_shad_v',
		'txt_shad_bl',
		'txt_shad_col'
	] );

	// text shadow controls on/off
	royalCustomLabel( 'tagline', 'txt_shadow_label', '#customize-control-royal_tagline-txt-shadow-wrap', true );

	// text shadow sliders
	royalSlider( 'tagline', 'txt_shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'tagline', 'txt_shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'tagline', 'txt_shad_bl', 0, 10, 1, 'px', false );


	// Tagline tabs -------------------------------
	royalTabs( 
		'tagline',
		[
		 'blogdescription',
		 'align'
		], [
		 'margin_tp',
		], [
		 'color',
		], [
		 'fonts-wrap',
		 'txt_shadow_label',
		 'txt-shadow-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'tagline', 'label', '#control_tabs_tagline', true );


	} // end logo if()

}); // end logo click()


/*
***************************************************************
* #Menu
***************************************************************
*/

// Run Menu Fold Tab Functions
	royalLightCheckbox('menu_fold', 'label');
	royalLightSelect('menu_fold', 'icon');
	royalLightSelect('menu_fold', 'align');
	royalLightSlider('menu_fold', 'width');
	royalLightSlider('menu_fold', 'height');
	royalLightSlider('menu_fold', 'margin_tp');
	royalLightColorPicker('menu_fold', 'color');
	royalLightColorPicker('menu_fold', 'txt_color');
	royalLightColorPicker('menu_fold', 'hover_color');
	royalLightColorPicker('menu_fold', 'hover_txt_color');
	royalLightCheckbox('menu_fold', 'radius_label');
	royalLightSlider('menu_fold', 'radius');
	royalLightCheckbox('menu_fold', 'shadow_label');
	royalLightSlider('menu_fold', 'shad_h');
	royalLightSlider('menu_fold', 'shad_v');
	royalLightSlider('menu_fold', 'shad_bl');
	royalLightSlider('menu_fold', 'shad_sp');
	royalLightColorPicker('menu_fold', 'shad_col');
	royalLightSlider('menu_fold', 'shad_col_tr');
	royalLightCheckbox('menu_fold', 'shad_in');
	royalLightSlider('menu_fold', 'txt_sz');

// Run Menu Fold Wrap Tab Functions
	royalLightCheckbox('menu_fold_wrap', 'label');
	royalLightSelect('menu_fold_wrap', 'pupup_fx');
	royalLightSelect('menu_fold_wrap', 'pupup_fx_trans');
	royalLightSelect('menu_fold_wrap', 'item_align');
	royalLightSlider('menu_fold_wrap', 'margin_gen');
	royalLightSlider('menu_fold_wrap', 'margin_tp');
	royalLightSlider('menu_fold_wrap', 'margin_rt');
	royalLightSlider('menu_fold_wrap', 'margin_bt');
	royalLightSlider('menu_fold_wrap', 'margin_lt');
	royalLightCheckbox('menu_fold_wrap', 'margin_ad');
	royalLightColorPicker('menu_fold_wrap', 'color');
	royalLightSlider('menu_fold_wrap', 'color_tr');
	royalLightCheckbox('menu_fold_wrap', 'shadow_label');
	royalLightSlider('menu_fold_wrap', 'shad_h');
	royalLightSlider('menu_fold_wrap', 'shad_v');
	royalLightSlider('menu_fold_wrap', 'shad_bl');
	royalLightSlider('menu_fold_wrap', 'shad_sp');
	royalLightColorPicker('menu_fold_wrap', 'shad_col');
	royalLightSlider('menu_fold_wrap', 'shad_col_tr');
	royalLightCheckbox('menu_fold_wrap', 'shad_in');


$('#accordion-section-menu').on('click', function() {

	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');

		$('#accordion-section-sidebar').trigger('click');

/* ----------------- Title Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'menu_title', 'padding_bt', 0, 50, 1,'px', false );

	// margin bottom slider
	royalSlider( 'menu_title', 'margin_bt', 0, 50, 1,'px', false );


/* ----------------- Title Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'menu_title', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'menu_title', 'border_label', '#customize-control-royal_menu_title-border-wrap', true );

	// border bottom size slider
	royalSlider( 'menu_title', 'bd_size_bt', 0, 20, 1, 'px', false );


/* ----------------- Title Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'menu_title', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'menu_title', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'menu_title', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'menu_title', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'menu_title', 'font_weight', 100, 900, 100, '', false );


	// Menu Title tabs -------------------------------
	royalTabs( 
		'menu_title', 
		[
		 'text',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'color',
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'menu_title', 'label', '#control_tabs_menu_title', true );



/* ----------------- Fold Icon Spacing Options ----------------- */

	// width slider
	royalSlider( 'menu_fold', 'width', 10, 100, 1,'px', false );
	royalSlider( 'menu_fold', 'height', 10, 100, 1,'px', false );
	royalSlider( 'menu_fold', 'margin_tp', 10, 100, 1,'px', false );


/* ----------------- Fold Icon Styling Options ----------------- */

	// static colors controls wrap
	royalControlsWrap( 'menu_fold', 'static-colors-wrap', [
		'color',
		'txt_color'
	] );

	// hover colors controls wrap
	royalControlsWrap( 'menu_fold', 'static-colors-wrap', [
		'hover_color',
		'hover_txt_color'
	] );

	// border radius controls wrap
	royalControlsWrap( 'menu_fold', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'menu_fold', 'radius_label', '#customize-control-royal_menu_fold-radius-wrap', true );

	// border radius slider
	royalSlider( 'menu_fold', 'radius', 0, 50, 1, '%', false );

	// shadow controls wrap
	royalControlsWrap( 'menu_fold', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'menu_fold', 'shadow_label', '#customize-control-royal_menu_fold-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'menu_fold', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'menu_fold', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'menu_fold', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'menu_fold', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'menu_fold', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Fold Icon Font Options ----------------- */

	// font size sliders
	royalSlider( 'menu_fold', 'txt_sz', 10, 50, 1, 'px', false );

	// Menu Fold Icon tabs -------------------------------
	royalTabs( 
		'menu_fold',
		[
		 'icon',
		 'align'
		], [
		 'width',
		 'height',
		 'margin_tp'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		], [
		 'txt_sz'
		],
		''
	);
	// label
	royalCustomLabel( 'menu_fold', 'label', '#control_tabs_menu_fold', true );



/* ----------------- Fold Wrap Spacing Options ----------------- */

	// margin controls wrap
	royalControlsWrap( 'menu_fold_wrap', 'margin-wrap', [
		'margin_gen',
		'margin_tp',
		'margin_rt',
		'margin_bt',
		'margin_lt',
		'margin_ad',
	] );

	// margin sliders
	royalSlider( 'menu_fold_wrap', 'margin_gen', 0, 150, 1, 'px', true );
	royalSlider( 'menu_fold_wrap', 'margin_tp', 0, 150, 1, 'px', false );
	royalSlider( 'menu_fold_wrap', 'margin_rt', 0, 150, 1, 'px', false );
	royalSlider( 'menu_fold_wrap', 'margin_bt', 0, 150, 1, 'px', false );
	royalSlider( 'menu_fold_wrap', 'margin_lt', 0, 150, 1, 'px', false );
	royalAdvancedBTN( 'menu_fold_wrap', 'margin_ad', false );


/* ----------------- Fold Wrap Styling Options ----------------- */

	// color transparency
	royalSlider( 'menu_fold_wrap', 'color_tr', 0, 1, 0.1, '', false );

	// shadow controls wrap
	royalControlsWrap( 'menu_fold_wrap', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'menu_fold_wrap', 'shadow_label', '#customize-control-royal_menu_fold_wrap-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'menu_fold_wrap', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'menu_fold_wrap', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'menu_fold_wrap', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'menu_fold_wrap', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'menu_fold_wrap', 'shad_col_tr', 0, 1, 0.1, '', false );


	// Menu Fold Wrap tabs -------------------------------
	royalTabs( 
		'menu_fold_wrap',
		[
		 'pupup_fx',
		 'pupup_fx_trans',
		 'item_align'
		], [
		 'margin-wrap'
		], [
		 'color',
		 'color_tr',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'menu_fold_wrap', 'label', '#control_tabs_menu_fold_wrap', false );



/* ----------------- Items Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'menu_items', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'menu_items', 'padding_gen', 0, 50, 1, 'px', true );
	royalSlider( 'menu_items', 'padding_tp', 0, 50, 1, 'px', false );
	royalSlider( 'menu_items', 'padding_rt', 0, 50, 1, 'px', false );
	royalSlider( 'menu_items', 'padding_bt', 0, 50, 1, 'px', false );
	royalSlider( 'menu_items', 'padding_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'menu_items', 'padding_ad', false );

	// margin controls wrap
	royalControlsWrap( 'menu_items', 'margin-wrap', [
		'margin_gen',
		'margin_tp',
		'margin_rt',
		'margin_bt',
		'margin_lt',
		'margin_ad',
	] );

	// margin sliders
	royalSlider( 'menu_items', 'margin_gen', 0, 100, 1, 'px', true );
	royalSlider( 'menu_items', 'margin_tp', 0, 100, 1, 'px', false );
	royalSlider( 'menu_items', 'margin_rt', 0, 100, 1, 'px', false );
	royalSlider( 'menu_items', 'margin_bt', 0, 100, 1, 'px', false );
	royalSlider( 'menu_items', 'margin_lt', 0, 100, 1, 'px', false );
	royalAdvancedBTN( 'menu_items', 'margin_ad', false );


/* ----------------- Items Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'menu_items', 'static-colors-wrap', [
		'bg_col',
		'sub_bg_col',
		'bg_col_tr',
		'txt_col',
		'mob_txt_col'
	] );

	// transparency sliders
	royalSlider( 'menu_items', 'bg_col_tr', 0, 1, 0.1, '', false );

	royalControlsWrap( 'menu_items', 'hover-colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr',
		'txt_hcol',
		'mob_txt_hcol',
		'bd_hcol'
	] );

	// hover transparency sliders
	royalSlider( 'menu_items', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// active items highlight on/off
	royalCustomLabel( 'menu_items', 'active_highlight', '', true );

	// border controls wrap
	royalControlsWrap( 'menu_items', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'menu_items', 'border_label', '#customize-control-royal_menu_items-border-wrap', true );

	// border size sliders
	royalSlider( 'menu_items', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'menu_items', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'menu_items', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'menu_items', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'menu_items', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'menu_items', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'menu_items', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'menu_items', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'menu_items', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'menu_items', 'radius_label', '#customize-control-royal_menu_items-radius-wrap', true );

	// border radius slider
	royalSlider( 'menu_items', 'radius', 0, 20, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'menu_items', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'menu_items', 'shadow_label', '#customize-control-royal_menu_items-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'menu_items', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'menu_items', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'menu_items', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'menu_items', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'menu_items', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Items Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'menu_items', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase'
	] );

	// font size slider
	royalSlider( 'menu_items', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'menu_items', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'menu_items', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'menu_items', 'font_weight', 100, 900, 100, '', false );

	var menuItemsHelp = '\
		You can see difference between <strong>Item Style</strong> - "Full Width" and "Button" when items <strong>Color</strong> differs from background and <strong>Transparency</strong> isn\'t set to 0.\
		<br><br><strong>Highlight Active Item</strong> uses <strong>Hover Colors</strong> to highlight current menu item.\
	';

	// Menu Items tabs -------------------------------
	royalTabs( 
		'menu_items',
		[
		 'width',
		 'sub',
		 'align',
		 'top_align',
		 'list_style'
		], [
		 'padding-wrap',
		 'margin-wrap'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'active_highlight',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		], [
		 'fonts-wrap'
		],
		menuItemsHelp
	);
	// label
	royalCustomLabel( 'menu_items', 'label', '#control_tabs_menu_items', true );

	// show/hide menu fold wrap controls
	var menuFoldLabel = $('#customize-control-royal_menu_fold-label').find('input'),
		menuFoldWrapTabs = $('#control_tabs_menu_fold_wrap');

	if ( menuFoldLabel.is(':checked') && $('#customize-control-royal_sidebar-general_position select').val() === 'top' ) {
		menuFoldWrapTabs.slideDown();
		$('li[aria-controls="rf_general_menu_items"]').addClass('hide-customizer-control');
		$('li[aria-controls="rf_general_menu_items"]').next().find('a').trigger('click');

	} else {
		menuFoldWrapTabs.slideUp();
		$('li[aria-controls="rf_general_menu_items"]').removeClass('hide-customizer-control');
		$('li[aria-controls="rf_general_menu_items"]').find('a').trigger('click');
	}

	menuFoldLabel.change(function(){
		if ( $(this).is(':checked') ) {
			menuFoldWrapTabs.slideDown();
			$('li[aria-controls="rf_general_menu_items"]').addClass('hide-customizer-control');
			$('li[aria-controls="rf_general_menu_items"]').next().find('a').trigger('click');
		} else {
			menuFoldWrapTabs.slideUp();
			$('li[aria-controls="rf_general_menu_items"]').removeClass('hide-customizer-control');
			$('li[aria-controls="rf_general_menu_items"]').find('a').trigger('click');
		}
	});



/* ----------------- Sub Items Spacing Options ----------------- */

	// width controls wrap
	royalControlsWrap( 'menu_sub', 'width-wrap', [
		'width'
	] );

	// width slider
	royalSlider( 'menu_sub', 'width', 100, 300, 1,'px', false );

	// padding controls wrap
	royalControlsWrap( 'menu_sub', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'menu_sub', 'padding_gen', 0, 50, 1, 'px', true );
	royalSlider( 'menu_sub', 'padding_tp', 0, 50, 1, 'px', false );
	royalSlider( 'menu_sub', 'padding_rt', 0, 50, 1, 'px', false );
	royalSlider( 'menu_sub', 'padding_bt', 0, 50, 1, 'px', false );
	royalSlider( 'menu_sub', 'padding_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'menu_sub', 'padding_ad', false );

	// top space controls wrap
	royalControlsWrap( 'menu_sub', 'top-space-wrap', [
		'top_space'
	] );

	// top space sliders
	royalSlider( 'menu_sub', 'top_space', 0, 100, 1, 'px', false );


/* ----------------- Sub Items Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'menu_sub', 'static-colors-wrap', [
		'bg_col',
		'txt_col'
	] );

	royalControlsWrap( 'menu_sub', 'hover-colors-wrap', [
		'bg_hcol',
		'txt_hcol'
	] );

	// border bottom controls wrap
	royalControlsWrap( 'menu_sub', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'menu_sub', 'border_label', '#customize-control-royal_menu_sub-border-wrap', true );

	// border bottom size slider
	royalSlider( 'menu_sub', 'bd_size_bt', 0, 5, 1, 'px', false );

	// border top controls wrap
	royalControlsWrap( 'menu_sub', 'wrapper-border-wrap', [
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp'
	] );

	// border top controls on/off
	royalCustomLabel( 'menu_sub', 'wrap_border_label', '#customize-control-royal_menu_sub-wrapper-border-wrap', true );

	// border top size slider
	royalSlider( 'menu_sub', 'bd_size_tp', 0, 5, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'menu_sub', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr'
	] );

	// shadow controls on/off
	royalCustomLabel( 'menu_sub', 'shadow_label', '#customize-control-royal_menu_sub-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'menu_sub', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'menu_sub', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'menu_sub', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'menu_sub', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'menu_sub', 'shad_col_tr', 0, 1, 0.1, '', false );

	var subMenuItemsHelp = '\
		This options will appear if <a href="#accordion-section-sidebar">Section Sidebar</a> > <strong>General Position</strong> is set to "Top".\
		<br><br>Top Sidebar supports multi level sub menus.\
		<br><br><strong>Wrapper Border Top</strong> and <strong>Wrapper Shadow</strong> will allpy on block, which wrapps all Sub Menu Items.\
	';

	// Sub Menu Items tabs -------------------------------
	royalTabs( 
		'menu_sub',
		'', [
		 'width-wrap',
		 'padding-wrap',
		 'top-space-wrap'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'wrap_border_label',
		 'wrapper-border-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		subMenuItemsHelp
	);
	// label
	royalCustomLabel( 'menu_sub', 'label', '', false );



/* ----------------- Mobile Icon Styling Options ----------------- */

	// transparency slider
	royalSlider( 'menu_mobile', 'bg_color_tr', 0, 1, 0.1, '', false );


/* ----------------- Mobile Icon Font Options ----------------- */
	
	// icon size sliders
	royalSlider( 'menu_mobile', 'icon_size', 10, 50, 1, 'px', false );
	royalSlider( 'menu_mobile', 'line_height', 10, 100, 1, 'px', false );

	var mobileMenuIconHelp = '\
		This Icon appears when screen size is less than <strong>950px.</strong>\
		<br><br>But in customization mode you can resize your browser window to <strong>1100px or less</strong>, to see changes in real time.\
	';

	// Mobile Menu Icon tabs -------------------------------
	royalTabs( 
		'menu_mobile',
		['icon'],
		'',
		[
		 'bg_color',
		 'bg_color_tr',
		 'text_color'
		],
		[
		 'icon_size',
		 'line_height'
		],
		mobileMenuIconHelp
	);
	// label
	royalCustomLabel( 'menu_mobile', 'label', '', false );



/*
***************************************************************
* #Filters
***************************************************************
*/


/* ----------------- Title Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'filters_title', 'padding_bt', 0, 50, 1,'px', false );

	// margin bottom slider
	royalSlider( 'filters_title', 'margin_bt', 0, 50, 1,'px', false );


/* ----------------- Title Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'filters_title', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'filters_title', 'border_label', '#customize-control-royal_filters_title-border-wrap', true );

	// border bottom size slider
	royalSlider( 'filters_title', 'bd_size_bt', 0, 20, 1, 'px', false );


/* ----------------- Title Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'filters_title', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase'
	] );

	// font size slider
	royalSlider( 'filters_title', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'filters_title', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'filters_title', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'filters_title', 'font_weight', 100, 900, 100, '', false );


	// Menu Title tabs -------------------------------
	royalTabs( 
		'filters_title',
		[
		 'blog_text',
		 'folio_text',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'color',
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'filters_title', 'label', '#control_tabs_filters_title', true );



/* ----------------- Items General Options ----------------- */

	// icon select controls wrap
	royalControlsWrap( 'filter_items', 'icon-select-wrap', [
		 'icon',
		 'icon_side'
	] );

	// deeplinking
	royalControlsWrap( 'filter_items', 'deeplinking-wrap', [
		'portfolio_url'
	] );

	// isotope filters on/off
	royalCustomLabel( 'filter_items', 'deeplinking', '#customize-control-royal_filter_items-deeplinking-wrap', true );

	// all text  controls wrap
	royalControlsWrap( 'filter_items', 'all-text-wrap', [
		'blog_all_text',
		'portfolio_all_text'
	] );

	// isotope filters on/off
	royalCustomLabel( 'filter_items', 'isotope', '#customize-control-royal_filter_items-all-text-wrap', true );


/* ----------------- Items Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'filter_items', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'filter_items', 'padding_gen', 0, 50, 1, 'px', true );
	royalSlider( 'filter_items', 'padding_tp', 0, 50, 1, 'px', false );
	royalSlider( 'filter_items', 'padding_rt', 0, 50, 1, 'px', false );
	royalSlider( 'filter_items', 'padding_bt', 0, 50, 1, 'px', false );
	royalSlider( 'filter_items', 'padding_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'filter_items', 'padding_ad', false );

	// margin controls wrap
	royalControlsWrap( 'filter_items', 'margin-wrap', [
		'margin_gen',
		'margin_tp',
		'margin_rt',
		'margin_bt',
		'margin_lt',
		'margin_ad',
	] );

	// margin sliders
	royalSlider( 'filter_items', 'margin_gen', 0, 50, 1, 'px', true );
	royalSlider( 'filter_items', 'margin_tp', 0, 50, 1, 'px', false );
	royalSlider( 'filter_items', 'margin_rt', 0, 50, 1, 'px', false );
	royalSlider( 'filter_items', 'margin_bt', 0, 50, 1, 'px', false );
	royalSlider( 'filter_items', 'margin_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'filter_items', 'margin_ad', false );


/* ----------------- Items Styling Options ----------------- */

	// wrapper color controls wrap
	royalControlsWrap( 'filter_items', 'wrapper-colors-wrap', [
		'wrapper_bg_col',
		'wrapper_bg_col_tr'
	] );

	// transparency sliders
	royalSlider( 'filter_items', 'wrapper_bg_col_tr', 0, 1, 0.1, '', false );

	// static color controls wrap
	royalControlsWrap( 'filter_items', 'static-colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col'
	] );

	// transparency sliders
	royalSlider( 'filter_items', 'bg_col_tr', 0, 1, 0.1, '', false );

	royalControlsWrap( 'filter_items', 'hover-colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr',
		'txt_hcol',
		'bd_hcol'
	] );

	// transparency sliders
	royalSlider( 'filter_items', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// active items highlight on/off
	royalCustomLabel( 'filter_items', 'active_highlight', '', true );

	// border controls wrap
	royalControlsWrap( 'filter_items', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'filter_items', 'border_label', '#customize-control-royal_filter_items-border-wrap', true );

	// border size sliders
	royalSlider( 'filter_items', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'filter_items', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'filter_items', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'filter_items', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'filter_items', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'filter_items', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'filter_items', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'filter_items', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'filter_items', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'filter_items', 'radius_label', '#customize-control-royal_filter_items-radius-wrap', true );

	// border radius slider
	royalSlider( 'filter_items', 'radius', 0, 20, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'filter_items', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'filter_items', 'shadow_label', '#customize-control-royal_filter_items-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'filter_items', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'filter_items', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'filter_items', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'filter_items', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'filter_items', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Items Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'filter_items', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through',
		'sup_count'
	] );

	// font size slider
	royalSlider( 'filter_items', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'filter_items', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'filter_items', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'filter_items', 'font_weight', 100, 900, 100, '', false );


	var filterItemsHelp = '\
		Filters appear depending on page you are browsing. For example: If you are browsing <strong>Portfolio</strong> page - <strong>Portfolio</strong> Filters will be displayed.\
		<br><br>You can see difference between <strong>Item Style</strong> - "Full Width" and "Button" when items <strong>Color</strong> differs from background and <strong>Transparency</strong> isn\'t set to 0.\
		<br><br>If you uncheck <strong>Use Isotope Filters</strong>, they will link to category pages.\
		<br><br><strong>Highlight Active Item</strong> uses <strong>Hover Colors</strong> to highlight current filter item.\
	';

	// filters Items tabs -------------------------------
	royalTabs( 
		'filter_items',
		[
		 'deeplinking',
		 'deeplinking-wrap',
		 'isotope',
		 'width',
		 'align',
		 'all-text-wrap',
		 'icon-select-wrap'
		], [
		 'padding-wrap',
		 'margin-wrap'
		], [
		 'wrapper_colors_label',
		 'wrapper-colors-wrap',
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'active_highlight',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		], [
		 'fonts-wrap'
		],
		filterItemsHelp
	);
	// label
	royalCustomLabel( 'filter_items', 'label', '#control_tabs_filter_items', true );


	} // end menu if()

}); // end menu click()



/*
***************************************************************
* #Blog Page
***************************************************************
*/

$('#accordion-section-blog_page').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- Page General Options ----------------- */

    // layout controls wrap
    royalControlsWrap( 'bPage_general', 'layout-fitRows', [
        'aspect_x',
        'aspect_y'
    ] );

    // layout mode select
    royalSelect( 'bPage_general', 'layout', 'layout-select', ['layout-fitRows'] );


/* ----------------- Page Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'bPage_general', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'bPage_general', 'padding_gen', 0, 100, 1, 'px', true );
	royalSlider( 'bPage_general', 'padding_tp', 0, 100, 1, 'px', false );
	royalSlider( 'bPage_general', 'padding_rt', 0, 100, 1, 'px', false );
	royalSlider( 'bPage_general', 'padding_bt', 0, 100, 1, 'px', false );
	royalSlider( 'bPage_general', 'padding_lt', 0, 100, 1, 'px', false );
	royalAdvancedBTN( 'bPage_general', 'padding_ad', false );

	// gutter controls wrap
	royalControlsWrap( 'bPage_general', 'gutter-wrap', [
		'gutter_horz',
		'gutter_vert',
	] );

	royalSlider( 'bPage_general', 'gutter_horz', 0, 100, 1, 'px', false );
	royalSlider( 'bPage_general', 'gutter_vert', 0, 100, 1, 'px', false );


/* ----------------- Page Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'bPage_general', 'colors-wrap', [
		'bg_col',
		'bg_col_tr',
	] );

	// transparency slider
	royalSlider( 'bPage_general', 'bg_col_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 
		'bPage_general', 'border-wrap',
		[
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'bPage_general', 'border_label', '#customize-control-royal_bPage_general-border-wrap', true );

	// border size sliders
	royalSlider( 'bPage_general', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'bPage_general', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'bPage_general', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'bPage_general', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'bPage_general', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'bPage_general', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'bPage_general', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'bPage_general', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'bPage_general', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'bPage_general', 'radius_label', '#customize-control-royal_bPage_general-radius-wrap', true );

	// border radius slider
	royalSlider( 'bPage_general', 'radius', 0, 50, 1,'px', false );

	// shadow controls wrap
	royalControlsWrap( 'bPage_general', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'bPage_general', 'shadow_label', '#customize-control-royal_bPage_general-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'bPage_general', 'shad_h', -50, 50, 1, 'px', false );
	royalSlider( 'bPage_general', 'shad_v', -50, 50, 1, 'px', false );
	royalSlider( 'bPage_general', 'shad_bl', 0, 50, 1, 'px', false );
	royalSlider( 'bPage_general', 'shad_sp', -50, 50, 1, 'px', false );
	royalSlider( 'bPage_general', 'shad_col_tr', 0, 1, 0.1, '', false );

	var blogPageGeneralHelp = '\
		This options will apply on <strong>Blog Posts container</strong>\
		<br><br>After you change <strong>Aspect Ratio X or Y</strong> you should save customizer, then go to your Dashboard > Tools > <strong>Regenerate Thumbnails</strong>\
	';

	// blog page tabs -------------------------------
	royalTabs(
		'bPage_general',
		[ 
		 'layout-select',
		 'columns_rate',
		 'grid_animated'
		],[
		 'padding-wrap',
		 'gutter-wrap'
		],
		[
		 'colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		blogPageGeneralHelp
	);
	// label
	royalCustomLabel( 'bPage_general', 'label', '', false );



/* ----------------- Post Spacing Options ----------------- */

	// media padding controls wrap
	royalControlsWrap( 'bPage_post', 'media-padding-wrap', [
		'media_padding_gen',
		'media_padding_tp',
		'media_padding_rt',
		'media_padding_bt',
		'media_padding_lt',
		'media_padding_ad',
	] );

	// padding sliders
	royalSlider( 'bPage_post', 'media_padding_gen', 0, 50, 1, 'px', true );
	royalSlider( 'bPage_post', 'media_padding_tp', 0, 50, 1, 'px', false );
	royalSlider( 'bPage_post', 'media_padding_rt', 0, 50, 1, 'px', false );
	royalSlider( 'bPage_post', 'media_padding_bt', 0, 50, 1, 'px', false );
	royalSlider( 'bPage_post', 'media_padding_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'bPage_post', 'media_padding_ad', false );

	// text padding controls wrap
	royalControlsWrap( 'bPage_post', 'text-padding-wrap', [
		'text_padding_gen',
		'text_padding_tp',
		'text_padding_rt',
		'text_padding_bt',
		'text_padding_lt',
		'text_padding_ad',
	] );

	// padding sliders
	royalSlider( 'bPage_post', 'text_padding_gen', 0, 50, 1, 'px', true );
	royalSlider( 'bPage_post', 'text_padding_tp', 0, 50, 1, 'px', false );
	royalSlider( 'bPage_post', 'text_padding_rt', 0, 50, 1, 'px', false );
	royalSlider( 'bPage_post', 'text_padding_bt', 0, 50, 1, 'px', false );
	royalSlider( 'bPage_post', 'text_padding_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'bPage_post', 'text_padding_ad', false );


/* ----------------- Post Styling Options ----------------- */

	// even color controls wrap
	royalControlsWrap( 'bPage_post', 'even-color-wrap', [
		'even_bg_col'
	] );

	royalCustomLabel( 'bPage_post', 'highlight_even', '#customize-control-royal_bPage_post-even-color-wrap', true );

	// color controls wrap
	royalControlsWrap( 'bPage_post', 'bg-colors-wrap', [
		'bg_col',
		'highlight_even',
		'even-color-wrap',
		'bg_col_tr',
	] );

	// transparency slider
	royalSlider( 'bPage_post', 'bg_col_tr', 0, 1, 0.1, '', false );

	// color controls wrap
	royalControlsWrap( 'bPage_post', 'txt-colors-wrap', [
		'text_color',
		'meta_color',
		'link_color',
		'link_hcolor',
	] );

	// border controls wrap
	royalControlsWrap( 
		'bPage_post', 'border-wrap',
		[
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'bPage_post', 'border_label', '#customize-control-royal_bPage_post-border-wrap', true );

	// border size sliders
	royalSlider( 'bPage_post', 'bd_size_gen', 0, 5, 1, 'px', true );
	royalSlider( 'bPage_post', 'bd_size_tp', 0, 5, 1, 'px', false );
	royalSlider( 'bPage_post', 'bd_size_rt', 0, 5, 1, 'px', false );
	royalSlider( 'bPage_post', 'bd_size_bt', 0, 5, 1, 'px', false );
	royalSlider( 'bPage_post', 'bd_size_lt', 0, 5, 1, 'px', false );
	royalAdvancedBTN( 'bPage_post', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'bPage_post', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'bPage_post', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'bPage_post', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'bPage_post', 'radius_label', '#customize-control-royal_bPage_post-radius-wrap', true );

	// border radius slider
	royalSlider( 'bPage_post', 'radius', 0, 30, 1,'px', false );

	// shadow controls wrap
	royalControlsWrap( 'bPage_post', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'bPage_post', 'shadow_label', '#customize-control-royal_bPage_post-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'bPage_post', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'bPage_post', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'bPage_post', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'bPage_post', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'bPage_post', 'shad_col_tr', 0, 1, 0.1, '', false );

	var blogPostHelp = '\
		<strong>Color and Font Family</strong> doesn\'t apply on <strong>Title</strong>, it has it\'s own.\
	';

	// blog post tabs -------------------------------
	royalTabs(
		'bPage_post',
		'',
		[
		 'media-padding-wrap',
		 'text-padding-wrap'
		],
		[
		 'bg-colors-wrap',
		 'txt-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		[
		 'font_family'
		],
		blogPostHelp
	);
	// label
	royalCustomLabel( 'bPage_post', 'label', '', false );



/* ----------------- Title Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'bPost_title', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'bPost_title', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Title Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'bPost_title', 'colors-wrap', [
		'color',
		'hcolor'
	] );

	// border bottom controls wrap
	royalControlsWrap( 'bPost_title', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'bPost_title', 'border_label', '#customize-control-royal_bPost_title-border-wrap', true );

	// border bottom size slider
	royalSlider( 'bPost_title', 'bd_size_bt', 0, 10, 1, 'px', false );


/* ----------------- Title Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'bPost_title', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'bPost_title', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'bPost_title', 'line_height', 10, 80, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'bPost_title', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'bPost_title', 'font_weight', 100, 900, 100, '', false );


	// Blog Post Title tabs -------------------------------
	royalTabs( 
		'bPost_title', 
		[
		 'position',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'colors-wrap',
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'bPost_title', 'label', '#control_tabs_bPost_title', true );



/* ----------------- Category Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'bPost_cats', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'bPost_cats', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Category Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'bPost_cats', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'bPost_cats', 'border_label', '#customize-control-royal_bPost_cats-border-wrap', true );

	// border bottom size slider
	royalSlider( 'bPost_cats', 'bd_size_bt', 0, 10, 1, 'px', false );


/* ----------------- Category Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'bPost_cats', 'fonts-wrap', [
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'bPost_cats', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'bPost_cats', 'line_height', 10, 80, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'bPost_cats', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'bPost_cats', 'font_weight', 100, 900, 100, '', false );


	// Blog Post Category tabs -------------------------------
	royalTabs( 
		'bPost_cats', 
		[
		 'before_cats',
		 'separator',
		 'position',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'bPost_cats', 'label', '#control_tabs_bPost_cats', true );



/* ----------------- Meta General Options ----------------- */


	// date show/hide
	royalCustomLabel( 'bPost_meta', 'date', '', true );

	// before author controls wrap
	royalControlsWrap( 'bPost_meta', 'before-author-wrap', [
		'before_author'
	] );

	// author show/hide
	royalCustomLabel( 'bPost_meta', 'author', '#customize-control-royal_bPost_meta-before-author-wrap', true );

	// separator show/hide
	royalCustomLabel( 'bPost_meta', 'separator', '', true );


/* ----------------- Meta Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'bPost_meta', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'bPost_meta', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Meta Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'bPost_meta', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'bPost_meta', 'border_label', '#customize-control-royal_bPost_meta-border-wrap', true );

	// border bottom size slider
	royalSlider( 'bPost_meta', 'bd_size_bt', 0, 10, 1, 'px', false );


/* ----------------- Meta Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'bPost_meta', 'fonts-wrap', [
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'bPost_meta', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'bPost_meta', 'line_height', 10, 80, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'bPost_meta', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'bPost_meta', 'font_weight', 100, 900, 100, '', false );


	// Blog Post Meta tabs -------------------------------
	royalTabs( 
		'bPost_meta', 
		[
		 'date',
		 'author',
		 'before-author-wrap',
		 'separator',
		 'position',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'bPost_meta', 'label', '#control_tabs_bPost_meta', true );



/* ----------------- Description General Options ----------------- */

    // excerpt controls wrap
    royalControlsWrap( 'bPost_desc', 'excerpt-length', [
        'excerpt_length'
    ] );

	// add submit button
	royalSubmitButton( 'bPost_desc-excerpt_length' );

    // layout mode select
    royalSelect( 'bPost_desc', 'display_as', 'content-type-select', ['excerpt-length'] );


/* ----------------- Description Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'bPost_desc', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'bPost_desc', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Description Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'bPost_desc', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'bPost_desc', 'border_label', '#customize-control-royal_bPost_desc-border-wrap', true );

	// border bottom size slider
	royalSlider( 'bPost_desc', 'bd_size_bt', 0, 10, 1, 'px', false );


/* ----------------- Description Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'bPost_desc', 'fonts-wrap', [
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'bPost_desc', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'bPost_desc', 'line_height', 10, 80, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'bPost_desc', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'bPost_desc', 'font_weight', 100, 900, 100, '', false );


	var postDescriptionHelp = '\
		If you set <strong>Display As</strong> to "Post Content" the whole content will be displayed and it will be broken into two parts at your <strong><-- more --></strong> tag location.\
	';

	// Blog Post Description tabs -------------------------------
	royalTabs(
		'bPost_desc', 
		[
		 'content-type-select',
		 'position',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		postDescriptionHelp
	);
	// label
	royalCustomLabel( 'bPost_desc', 'label', '#control_tabs_bPost_desc', true );



/* ----------------- Likes, Comments & Sharing General Options ----------------- */

	// likes icon controls wrap
	royalControlsWrap( 'bPost_likes', 'likes-icon-wrap', [
		'likes_icon'
	] );

	// likes show/hide
	royalCustomLabel( 'bPost_likes', 'likes_label', '#customize-control-royal_bPost_likes-likes-icon-wrap', true );

	// comments icon controls wrap
	royalControlsWrap( 'bPost_likes', 'comments-icon-wrap', [
		'comments_icon'
	] );

	// comments show/hide
	royalCustomLabel( 'bPost_likes', 'comments_label', '#customize-control-royal_bPost_likes-comments-icon-wrap', true );

	// sharing controls wrap
	royalControlsWrap( 'bPost_likes', 'sharing-icon-wrap', [
		'share_face',
		'share_twit',
		'share_gplus',
		'share_linkin',
		'share_pint',
		'share_tumblr',
		'share_reddit',
		'open_on'
	] );

	// sharing show/hide
	royalCustomLabel( 'bPost_likes', 'sharing_label', '#customize-control-royal_bPost_likes-sharing-icon-wrap,customize-control-royal_bPost_likes-open_on', true );


/* ----------------- Likes, Comments & Sharing Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'bPost_likes', 'fonts-wrap', [
		'font_size',
		'line_height',
		'letter_space'
	] );

	// font size slider
	royalSlider( 'bPost_likes', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'bPost_likes', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'bPost_likes', 'letter_space', 0, 10, 0.1, 'px', false );

	var likesCommentsShareHelp = '\
		Likes, Comments & Sharing <strong>Align</strong> won\'t work if they are located in the same block with <strong>Read More</strong> and Read More > <strong>Display</strong> is set to "Inline"\
	';

	// Blog Post Likes, Comments & Share tabs -------------------------------
	royalTabs(
		'bPost_likes', 
		[
		 'likes_label',
		 'likes-icon-wrap',
		 'comments_label',
		 'comments-icon-wrap',
		 'sharing_label',
		 'sharing-icon-wrap',
		 'icon_separator',
		 'position',
		 'align'
		],
		'', 
		'', [
		 'fonts-wrap'
		],
		likesCommentsShareHelp
	);
	// label
	royalCustomLabel( 'bPost_likes', 'label', '#control_tabs_bPost_likes', true );



/* ----------------- Read More General Options ----------------- */

    // stype controls wrap
    royalControlsWrap( 'bPost_more', 'read-more-separate', [
        'separate',
        'align'
    ] );

    // style select
    royalSelect( 'bPost_more', 'display', 'style-select', ['read-more-separate'] );


/* ----------------- Read More Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'bPost_more', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'bPost_more', 'padding_gen', 0, 25, 1, 'px', true );
	royalSlider( 'bPost_more', 'padding_tp', 0, 25, 1, 'px', false );
	royalSlider( 'bPost_more', 'padding_rt', 0, 25, 1, 'px', false );
	royalSlider( 'bPost_more', 'padding_bt', 0, 25, 1, 'px', false );
	royalSlider( 'bPost_more', 'padding_lt', 0, 25, 1, 'px', false );
	royalAdvancedBTN( 'bPost_more', 'padding_ad', false );


/* ----------------- Read More Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'bPost_more', 'static-colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col'
	] );

	// transparency sliders
	royalSlider( 'bPost_more', 'bg_col_tr', 0, 1, 0.1, '', false );

	royalControlsWrap( 'bPost_more', 'hover-colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr',
		'txt_hcol',
		'bd_hcol'
	] );

	// transparency sliders
	royalSlider( 'bPost_more', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 'bPost_more', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'bPost_more', 'border_label', '#customize-control-royal_bPost_more-border-wrap', true );

	// border size sliders
	royalSlider( 'bPost_more', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'bPost_more', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'bPost_more', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'bPost_more', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'bPost_more', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'bPost_more', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'bPost_more', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'bPost_more', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'bPost_more', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'bPost_more', 'radius_label', '#customize-control-royal_bPost_more-radius-wrap', true );

	// border radius slider
	royalSlider( 'bPost_more', 'radius', 0, 20, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'bPost_more', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'bPost_more', 'shadow_label', '#customize-control-royal_bPost_more-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'bPost_more', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'bPost_more', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'bPost_more', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'bPost_more', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'bPost_more', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Read More Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'bPost_more', 'fonts-wrap', [
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'underline'
	] );

	// font size slider
	royalSlider( 'bPost_more', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'bPost_more', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'bPost_more', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'bPost_more', 'font_weight', 100, 900, 100, '', false );


	var blogReadMoreHelp = '\
		Read More functionality is automated and it will be placed at the end of each post <strong>automaticly</strong>, but as mentioned above <-- more --> tag previously breaks post content into two parts and <strong>Read More</strong> links to a Single Post page.\
	';

	// Read More tabs -------------------------------
	royalTabs( 
		'bPost_more',
		[
		 'style-select',
		 'position',
		 'text',
		 'icon'
		], [
		 'padding-wrap'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		], [
		 'fonts-wrap'
		],
		blogReadMoreHelp
	);
	// label
	royalCustomLabel( 'bPost_more', 'label', '#control_tabs_bPost_more', true );



/* ----------------- Image Overlay Styling Options ----------------- */

	// transparency slider
	royalSlider( 'bPost_overlay', 'bg_hcol_tr', 0, 1, 0.1, '', false );


/* ----------------- Image Overlay Font Options ----------------- */

	// icon size slider
	royalSlider( 'bPost_overlay', 'icon_size', 10, 50, 1, 'px', false );

	// Image Overlay tabs -------------------------------
	royalTabs( 
		'bPost_overlay',
		[
		 'click',
		 'overlay_trans',
		 'icon'
		],
		'',
		[
		 'bg_hcol',
		 'bg_hcol_tr',
		 'txt_hcol'
		], [
		 'icon_size'
		],
		''
	);
	// label
	royalCustomLabel( 'bPost_overlay', 'label', '#control_tabs_bPost_overlay', true );



/* ----------------- Post Formats Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'bPost_formats', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'bPost_formats', 'padding_gen', 0, 100, 1, '%', true );
	royalSlider( 'bPost_formats', 'padding_tp', 0, 100, 1, '%', false );
	royalSlider( 'bPost_formats', 'padding_rt', 0, 100, 1, '%', false );
	royalSlider( 'bPost_formats', 'padding_bt', 0, 100, 1, '%', false );
	royalSlider( 'bPost_formats', 'padding_lt', 0, 100, 1, '%', false );
	royalAdvancedBTN( 'bPost_formats', 'padding_ad', false );


/* ----------------- Post Formats Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'bPost_formats', 'colors-wrap',
		[
		 'bg_col',
		 'bg_col_tr',
		 'txt_col'
		] );

	// transparency slider
	royalSlider( 'bPost_formats', 'bg_col_tr', 0, 1, 0.1, '', false );

	// border radius controls wrap
	royalControlsWrap( 'bPost_formats', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'bPost_formats', 'radius_label', '#customize-control-royal_bPost_formats-radius-wrap', true );

	// border radius slider
	royalSlider( 'bPost_formats', 'radius', 0, 30, 1, 'px', false );


/* ----------------- Post Formats Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'bPost_formats', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'underline'
	] );

	// font size slider
	royalSlider( 'bPost_formats', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'bPost_formats', 'line_height', 10, 100, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'bPost_formats', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'bPost_formats', 'font_weight', 100, 900, 100, '', false );

	var blogPostFormatsHelp = '\
		This options will apply on link, link description, quote and quote author text blocks.\
	';

	// Post Formats tabs -------------------------------
	royalTabs( 
		'bPost_formats',
		'',
		[
		 'padding-wrap'
		],
		[
		 'colors-wrap',
		 'radius_label',
		 'radius-wrap'
		], [
		 'fonts-wrap'
		],
		blogPostFormatsHelp
	);
	// label
	royalCustomLabel( 'bPost_formats', 'label', '', false );


	} // end blog page if()

}); // end blog page click()



/*
***************************************************************
* #Blog Single
***************************************************************
*/

$('#accordion-section-blog_single').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- Header General Options ----------------- */

	// Header tabs -------------------------------
	royalTabs( 
		'bSingle_header',
		[
		 'position',
		 'align',
		 'display_date',
		 'display_cats',
		 'display_comments',
		 'display_author'
		],
		'',
		'',
		'',
		''
	);
	// label
	royalCustomLabel( 'bSingle_header', 'label', '', false );



/* ----------------- Navigation Spacing Options ----------------- */

	// widdth & height controls wrap
	royalControlsWrap( 'bSingle_nav', 'width-height-wrap', [
		'width',
		'height'
	] );

	// width slider
	royalSlider( 'bSingle_nav', 'width', 25, 200, 1, 'px', false );

	// height slider
	royalSlider( 'bSingle_nav', 'height', 25, 100, 1, 'px', false );

	// widdth & height controls wrap
	royalControlsWrap( 'bSingle_nav', 'icon-space-wrap', [
		'space_between',
		'margin_tp'
	] );

	// top margin slider
	royalSlider( 'bSingle_nav', 'margin_tp', 0, 100, 1, 'px', false );

	// horizontal gutter slider
	royalSlider( 'bSingle_nav', 'space_between', 0, 300, 1, 'px', false );


/* ----------------- Navigation Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'bSingle_nav', 'static-colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col'
	] );

	royalControlsWrap( 'bSingle_nav', 'hover-colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr',
		'txt_hcol',
		'bd_hcol'
	] );

	// transparency slider
	royalSlider( 'bSingle_nav', 'bg_col_tr', 0, 1, 0.1, '', false );

	// hover transparency slider
	royalSlider( 'bSingle_nav', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 'bSingle_nav', 'border-wrap', [
		'border_size',
		'border_style',
		'border_color'
	] );

	// border controls on/off
	royalCustomLabel( 'bSingle_nav', 'border_label', '#customize-control-royal_bSingle_nav-border-wrap', true );

	// border size sliders
	royalSlider( 'bSingle_nav', 'border_size', 0, 5, 1, 'px', true );

	// border radius controls wrap
	royalControlsWrap( 'bSingle_nav', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'bSingle_nav', 'radius_label', '#customize-control-royal_bSingle_nav-radius-wrap', true );

	// border radius slider
	royalSlider( 'bSingle_nav', 'radius', 0, 50, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'bSingle_nav', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'bSingle_nav', 'shadow_label', '#customize-control-royal_bSingle_nav-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'bSingle_nav', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'bSingle_nav', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'bSingle_nav', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'bSingle_nav', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'bSingle_nav', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Navigation Font Options ----------------- */

	// font size sliders
	royalSlider( 'bSingle_nav', 'font_size', 10, 50, 1, 'px', false );


	// Blog Single Navigation tabs -------------------------------
	royalTabs(
		'bSingle_nav', 
		[
		 'position',
		 'prev_nxt_icon',
		 'prev_text',
		 'next_text'
		],
		[
		 'width-height-wrap',
		 'icon-space-wrap'
		], 
		[
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'shadow_label',
		 'shadow-wrap',
		 'radius_label',
		 'radius-wrap',
		 'wrap_border_label',
		 'wrapper-border-wrap'
		], [
		 'font_size'
		],
		''
	);
	// label
	royalCustomLabel( 'bSingle_nav', 'label', '#control_tabs_bSingle_nav', true );



/* ----------------- Sharing General Options ----------------- */

	// sharing controls wrap
	royalControlsWrap( 'bSingle_share', 'sharing-icon-wrap', [
		'label_text',
		'share_face',
		'share_twit',
		'share_gplus',
		'share_linkin',
		'share_pint',
		'share_tumblr',
		'share_reddit'
	] );

	// sharing show/hide
	royalCustomLabel( 'bSingle_share', 'sharing_label', '#customize-control-royal_bSingle_share-sharing-icon-wrap', true );


/* ----------------- Sharing Spacing Options ----------------- */

	// margin top slider
	royalSlider( 'bSingle_share', 'margin_tp', 0, 50, 1, 'px', false );

	// padding top slider
	royalSlider( 'bSingle_share', 'padding_tp', 0, 50, 1, 'px', false );


/* ----------------- Sharing Styling Options ----------------- */

	// border top controls wrap
	royalControlsWrap( 'bSingle_share', 'border-wrap', [
		'bd_size_tp',
		'bd_style_tp'
	] );

	// border top controls on/off
	royalCustomLabel( 'bSingle_share', 'border_label', '#customize-control-royal_bSingle_share-border-wrap', true );

	// border top size slider
	royalSlider( 'bSingle_share', 'bd_size_tp', 0, 10, 1, 'px', false );


	// Sharing tabs -------------------------------
	royalTabs( 
		'bSingle_share',
		[
		 'sharing_label',
		 'sharing-icon-wrap',
		 'align'
		],
		[
		 'margin_tp',
		 'padding_tp'
		],
		[
		 'border_label',
		 'border-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'bSingle_share', 'label', '#control_tabs_bSingle_share', true );


	} // end blog single if()

}); // end blog single click()



/*
***************************************************************
* #Portfolio Page
***************************************************************
*/

$('#accordion-section-folio_page').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- Page General Options ----------------- */

    // layout controls wrap
    royalControlsWrap( 'pPage_general', 'layout-fitRows', [
        'aspect_x',
        'aspect_y'
    ] );

    // layout mode select
    royalSelect( 'pPage_general', 'layout', 'layout-select', ['layout-fitRows'] );

    // layout controls wrap
    royalControlsWrap( 'pPage_general', 'per-page-wrap', [
        'posts_per_page'
    ] );

	// add submit button
	royalSubmitButton( 'pPage_general-posts_per_page' );


/* ----------------- Page Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'pPage_general', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'pPage_general', 'padding_gen', 0, 100, 1, 'px', true );
	royalSlider( 'pPage_general', 'padding_tp', 0, 100, 1, 'px', false );
	royalSlider( 'pPage_general', 'padding_rt', 0, 100, 1, 'px', false );
	royalSlider( 'pPage_general', 'padding_bt', 0, 100, 1, 'px', false );
	royalSlider( 'pPage_general', 'padding_lt', 0, 100, 1, 'px', false );
	royalAdvancedBTN( 'pPage_general', 'padding_ad', false );

	// gutter controls wrap
	royalControlsWrap( 'pPage_general', 'gutter-wrap', [
		'gutter_horz',
		'gutter_vert',
	] );

	royalSlider( 'pPage_general', 'gutter_horz', 0, 100, 1, 'px', false );
	royalSlider( 'pPage_general', 'gutter_vert', 0, 100, 1, 'px', false );


/* ----------------- Page Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'pPage_general', 'colors-wrap', [
		'bg_col',
		'bg_col_tr',
	] );

	// transparency slider
	royalSlider( 'pPage_general', 'bg_col_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 
		'pPage_general', 'border-wrap',
		[
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'pPage_general', 'border_label', '#customize-control-royal_pPage_general-border-wrap', true );

	// border size sliders
	royalSlider( 'pPage_general', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'pPage_general', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'pPage_general', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'pPage_general', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'pPage_general', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'pPage_general', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'pPage_general', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'pPage_general', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'pPage_general', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'pPage_general', 'radius_label', '#customize-control-royal_pPage_general-radius-wrap', true );

	// border radius slider
	royalSlider( 'pPage_general', 'radius', 0, 50, 1,'px', false );

	// shadow controls wrap
	royalControlsWrap( 'pPage_general', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'pPage_general', 'shadow_label', '#customize-control-royal_pPage_general-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'pPage_general', 'shad_h', -50, 50, 1, 'px', false );
	royalSlider( 'pPage_general', 'shad_v', -50, 50, 1, 'px', false );
	royalSlider( 'pPage_general', 'shad_bl', 0, 50, 1, 'px', false );
	royalSlider( 'pPage_general', 'shad_sp', -50, 50, 1, 'px', false );
	royalSlider( 'pPage_general', 'shad_col_tr', 0, 1, 0.1, '', false );


	var folioPageGeneralHelp = '\
		This options will apply on <strong>Portfolio Posts container</strong>.\
		<br><br>After you change <strong>Aspect Ratio X or Y</strong> you should save customizer, then go to your Dashboard > Tools > <strong>Regenerate Thumbnails</strong>.\
	';

	// portfolio page tabs -------------------------------
	royalTabs(
		'pPage_general',
		[ 
		 'layout-select',
		 'per-page-wrap',
		 'columns_rate',
		 'grid_animated'
		],[
		 'padding-wrap',
		 'gutter-wrap'
		],
		[
		 'colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		folioPageGeneralHelp
	);
	// label
	royalCustomLabel( 'pPage_general', 'label', '', false );



/* ----------------- Post Spacing Options ----------------- */

	// media padding controls wrap
	royalControlsWrap( 'pPage_post', 'media-padding-wrap', [
		'media_padding_gen',
		'media_padding_tp',
		'media_padding_rt',
		'media_padding_bt',
		'media_padding_lt',
		'media_padding_ad',
	] );

	// padding sliders
	royalSlider( 'pPage_post', 'media_padding_gen', 0, 50, 1, 'px', true );
	royalSlider( 'pPage_post', 'media_padding_tp', 0, 50, 1, 'px', false );
	royalSlider( 'pPage_post', 'media_padding_rt', 0, 50, 1, 'px', false );
	royalSlider( 'pPage_post', 'media_padding_bt', 0, 50, 1, 'px', false );
	royalSlider( 'pPage_post', 'media_padding_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'pPage_post', 'media_padding_ad', false );

	// text padding controls wrap
	royalControlsWrap( 'pPage_post', 'text-padding-wrap', [
		'text_padding_gen',
		'text_padding_tp',
		'text_padding_rt',
		'text_padding_bt',
		'text_padding_lt',
		'text_padding_ad',
	] );

	// padding sliders
	royalSlider( 'pPage_post', 'text_padding_gen', 0, 50, 1, 'px', true );
	royalSlider( 'pPage_post', 'text_padding_tp', 0, 50, 1, 'px', false );
	royalSlider( 'pPage_post', 'text_padding_rt', 0, 50, 1, 'px', false );
	royalSlider( 'pPage_post', 'text_padding_bt', 0, 50, 1, 'px', false );
	royalSlider( 'pPage_post', 'text_padding_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'pPage_post', 'text_padding_ad', false );


/* ----------------- Post Styling Options ----------------- */

	// even color controls wrap
	royalControlsWrap( 'pPage_post', 'even-color-wrap', [
		'even_bg_col'
	] );

	royalCustomLabel( 'pPage_post', 'highlight_even', '#customize-control-royal_pPage_post-even-color-wrap', true );

	// color controls wrap
	royalControlsWrap( 'pPage_post', 'bg-colors-wrap', [
		'bg_col',
		'highlight_even',
		'even-color-wrap',
		'bg_col_tr',
	] );

	// transparency slider
	royalSlider( 'pPage_post', 'bg_col_tr', 0, 1, 0.1, '', false );

	// color controls wrap
	royalControlsWrap( 'pPage_post', 'txt-colors-wrap', [
		'text_color',
		'meta_color',
		'link_color',
		'link_hcolor',
	] );

	// border controls wrap
	royalControlsWrap( 
		'pPage_post', 'border-wrap',
		[
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'pPage_post', 'border_label', '#customize-control-royal_pPage_post-border-wrap', true );

	// border size sliders
	royalSlider( 'pPage_post', 'bd_size_gen', 0, 5, 1, 'px', true );
	royalSlider( 'pPage_post', 'bd_size_tp', 0, 5, 1, 'px', false );
	royalSlider( 'pPage_post', 'bd_size_rt', 0, 5, 1, 'px', false );
	royalSlider( 'pPage_post', 'bd_size_bt', 0, 5, 1, 'px', false );
	royalSlider( 'pPage_post', 'bd_size_lt', 0, 5, 1, 'px', false );
	royalAdvancedBTN( 'pPage_post', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'pPage_post', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'pPage_post', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'pPage_post', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'pPage_post', 'radius_label', '#customize-control-royal_pPage_post-radius-wrap', true );

	// border radius slider
	royalSlider( 'pPage_post', 'radius', 0, 30, 1,'px', false );

	// shadow controls wrap
	royalControlsWrap( 'pPage_post', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'pPage_post', 'shadow_label', '#customize-control-royal_pPage_post-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'pPage_post', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'pPage_post', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'pPage_post', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'pPage_post', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'pPage_post', 'shad_col_tr', 0, 1, 0.1, '', false );


	var folioPostHelp = '\
		<strong>Color and Font Family</strong> doesn\'t apply on <strong>Title</strong>, it has it\'s own.\
	';

	// portfolio post tabs -------------------------------
	royalTabs(
		'pPage_post',
		'',
		[
		 'media-padding-wrap',
		 'text-padding-wrap'
		],
		[
		 'bg-colors-wrap',
		 'txt-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		[
		 'font_family'
		],
		folioPostHelp
	);
	// label
	royalCustomLabel( 'pPage_post', 'label', '', false );




/* ----------------- Media General Options ----------------- */

	// hover fade controls wrap
	royalControlsWrap( 'pPost_media', 'hover-fade', [
		'hover_fade'
	] );

	// hover grow controls wrap
	royalControlsWrap( 'pPost_media', 'hover-grow', [
		'hover_grow'
	] );

	// hover slide controls wrap
	royalControlsWrap( 'pPost_media', 'hover-slide', [
		'hover_slide'
	] );

	// hover skew controls wrap
	royalControlsWrap( 'pPost_media', 'hover-skew', [
		'hover_skew'
	] );

	// hover skew full controls wrap
	royalControlsWrap( 'pPost_media', 'hover-sk-full', [
		'hover_skew_full'
	] );

	// hover skew full fade controls wrap
	royalControlsWrap( 'pPost_media', 'hover-skfull-fd', [
		'hover_skew_full_fade'
	] );

    // info hovers select
    royalSelect( 'pPost_media', 'info_hovers_select', 'info-hovers-select', [
    	'hover-fade',
    	'hover-grow',
    	'hover-slide',
    	'hover-skew',
    	'hover-sk-full',
    	'hover-skfull-fd'
    ] );


/* ----------------- Media Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'pPost_media', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'pPost_media', 'padding_gen', 0, 50, 1, 'px', true );
	royalSlider( 'pPost_media', 'padding_tp', 0, 50, 1, 'px', false );
	royalSlider( 'pPost_media', 'padding_rt', 0, 50, 1, 'px', false );
	royalSlider( 'pPost_media', 'padding_bt', 0, 50, 1, 'px', false );
	royalSlider( 'pPost_media', 'padding_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'pPost_media', 'padding_ad', false );

	// info hover padding controls wrap
	royalControlsWrap( 'pPost_media', 'info-padding-wrap', [
		'info_padding_gen',
		'info_padding_tp',
		'info_padding_rt',
		'info_padding_bt',
		'info_padding_lt',
		'info_padding_ad',
	] );

	// info hover padding sliders
	royalSlider( 'pPost_media', 'info_padding_gen', 0, 50, 0.1, '%', true );
	royalSlider( 'pPost_media', 'info_padding_tp', 0, 50, 0.1, '%', false );
	royalSlider( 'pPost_media', 'info_padding_rt', 0, 50, 0.1, '%', false );
	royalSlider( 'pPost_media', 'info_padding_bt', 0, 50, 0.1, '%', false );
	royalSlider( 'pPost_media', 'info_padding_lt', 0, 50, 0.1, '%', false );
	royalAdvancedBTN( 'pPost_media', 'info_padding_ad', false );


/* ----------------- Media Styling Options ----------------- */

	// background color controls wrap
	royalControlsWrap( 'pPost_media', 'bg-color-wrap', [ 'bg_color', 'bg_color_tr' ] );

	// background gradient controls wrap
	royalControlsWrap( 'pPost_media', 'bg-gradient-wrap', [
		'bg_grad_angle',
		'bg_grad_col_1',
		'bg_grad_col_1_tr',
		'bg_grad_col_1_ps',
		'bg_grad_col_2',
		'bg_grad_col_2_tr',
		'bg_grad_col_2_ps',
	] );

	// background image controls wrap
	royalControlsWrap( 'pPost_media', 'bg-image-wrap', [
		'bg_img',
		'bg_img_sz',
		'bg_img_att'
	] );

	// background color transparency slider
	royalSlider( 'pPost_media', 'bg_color_tr', 0, 1, 0.1, '', false );

	// background gradient sliders
	royalSlider( 'pPost_media', 'bg_grad_angle', 0, 360, 1,' deg', false );
	royalSlider( 'pPost_media', 'bg_grad_col_1_tr', 0, 1, 0.1, '', false );
	royalSlider( 'pPost_media', 'bg_grad_col_1_ps', 0, 100, 1, '%', false );
	royalSlider( 'pPost_media', 'bg_grad_col_2_tr', 0, 1, 0.1, '', false );
	royalSlider( 'pPost_media', 'bg_grad_col_2_ps', 0, 100, 1, '%', false );

	// background type select
	royalSelect( 'pPost_media', 'background', 'background-select', [ 'bg-color-wrap', 'bg-gradient-wrap', 'bg-image-wrap' ] );

	// border controls wrap
	royalControlsWrap( 
		'pPost_media', 'border-wrap',
		[
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'pPost_media', 'border_label', '#customize-control-royal_pPost_media-border-wrap', true );

	// border size sliders
	royalSlider( 'pPost_media', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'pPost_media', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'pPost_media', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'pPost_media', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'pPost_media', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'pPost_media', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'pPost_media', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'pPost_media', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'pPost_media', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'pPost_media', 'radius_label', '#customize-control-royal_pPost_media-radius-wrap', true );

	// border radius slider
	royalSlider( 'pPost_media', 'radius', 0, 50, 1, '%', false );

	// shadow controls wrap
	royalControlsWrap( 'pPost_media', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr'
	] );

	// shadow controls on/off
	royalCustomLabel( 'pPost_media', 'shadow_label', '#customize-control-royal_pPost_media-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'pPost_media', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'pPost_media', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'pPost_media', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'pPost_media', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'pPost_media', 'shad_col_tr', 0, 1, 0.1, '', false );


	var folioMediaHelp = '\
		<strong>Info Hovers</strong> will appear if at least one element is located in it.\
		<br>For Example: set Title <strong>Position</strong> to "Info Hover" and then rollover the post thumbnail to see changes.\
		<br><br>If <strong>Image Effects > Overlay</strong> is enabled, <strong>Info Hovers</strong> won\'t work properly.\
	';

	// portfolio post media block tabs -------------------------------
	royalTabs(
		'pPost_media',
		[
		 'info-hovers-select',
		 'hover_link',
		 'info_hover',
		 'info_hover_trans',
		 'center_content'
		],
		[
		 'padding-wrap',
		 'info-padding-wrap'
		],
		[
		 'background-select',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		folioMediaHelp
	);
	// label
	royalCustomLabel( 'pPost_media', 'label', '', false );




/* ----------------- Title Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'pPost_title', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'pPost_title', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Title Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'pPost_title', 'colors-wrap', [
		'color',
		'hcolor'
	] );

	// border bottom controls wrap
	royalControlsWrap( 'pPost_title', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'pPost_title', 'border_label', '#customize-control-royal_pPost_title-border-wrap', true );

	// border bottom size slider
	royalSlider( 'pPost_title', 'bd_size_bt', 0, 10, 1, 'px', false );


/* ----------------- Title Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'pPost_title', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'pPost_title', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'pPost_title', 'line_height', 10, 80, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'pPost_title', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'pPost_title', 'font_weight', 100, 900, 100, '', false );


	// Portfolio Post Title tabs -------------------------------
	royalTabs( 
		'pPost_title', 
		[
		 'position',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'colors-wrap',
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'pPost_title', 'label', '#control_tabs_pPost_title', true );



/* ----------------- Category Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'pPost_cats', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'pPost_cats', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Category Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'pPost_cats', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'pPost_cats', 'border_label', '#customize-control-royal_pPost_cats-border-wrap', true );

	// border bottom size slider
	royalSlider( 'pPost_cats', 'bd_size_bt', 0, 10, 1, 'px', false );


/* ----------------- Category Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'pPost_cats', 'fonts-wrap', [
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'pPost_cats', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'pPost_cats', 'line_height', 10, 80, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'pPost_cats', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'pPost_cats', 'font_weight', 100, 900, 100, '', false );


	// portfolio Post Category tabs -------------------------------
	royalTabs( 
		'pPost_cats', 
		[
		 'before_cats',
		 'separator',
		 'position',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'pPost_cats', 'label', '#control_tabs_pPost_cats', true );



/* ----------------- Meta General Options ----------------- */

	// date show/hide
	royalCustomLabel( 'pPost_meta', 'date', '', true );

	// before author controls wrap
	royalControlsWrap( 'pPost_meta', 'before-author-wrap', [
		'before_author'
	] );

	// author show/hide
	royalCustomLabel( 'pPost_meta', 'author', '#customize-control-royal_pPost_meta-before-author-wrap', true );

	// separator show/hide
	royalCustomLabel( 'pPost_meta', 'separator', '', true );


/* ----------------- Meta Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'pPost_meta', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'pPost_meta', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Meta Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'pPost_meta', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'pPost_meta', 'border_label', '#customize-control-royal_pPost_meta-border-wrap', true );

	// border bottom size slider
	royalSlider( 'pPost_meta', 'bd_size_bt', 0, 10, 1, 'px', false );


/* ----------------- Meta Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'pPost_meta', 'fonts-wrap', [
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'pPost_meta', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'pPost_meta', 'line_height', 10, 80, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'pPost_meta', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'pPost_meta', 'font_weight', 100, 900, 100, '', false );


	// Portfolio Post Meta tabs -------------------------------
	royalTabs( 
		'pPost_meta', 
		[
		 'date',
		 'author',
		 'before-author-wrap',
		 'separator',
		 'position',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'pPost_meta', 'label', '#control_tabs_pPost_meta', true );



/* ----------------- Description General Options ----------------- */

    // excerpt controls wrap
    royalControlsWrap( 'pPost_desc', 'excerpt-length', [
        'excerpt_length'
    ] );

	// add submit button
	royalSubmitButton( 'pPost_desc-excerpt_length' );

    // layout mode select
    royalSelect( 'pPost_desc', 'display_as', 'content-type-select', ['excerpt-length'] );


/* ----------------- Description Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'pPost_desc', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'pPost_desc', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Description Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'pPost_desc', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'pPost_desc', 'border_label', '#customize-control-royal_pPost_desc-border-wrap', true );

	// border bottom size slider
	royalSlider( 'pPost_desc', 'bd_size_bt', 0, 10, 1, 'px', false );


/* ----------------- Description Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'pPost_desc', 'fonts-wrap', [
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'pPost_desc', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'pPost_desc', 'line_height', 10, 80, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'pPost_desc', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'pPost_desc', 'font_weight', 100, 900, 100, '', false );


	var postDescriptionHelp = '\
		If you set <strong>Display As</strong> to "Post Content" the whole content will be displayed and it will be broken into two parts at your <strong><-- more --></strong> tag location.\
	';

	// Portfolio Post Description tabs -------------------------------
	royalTabs(
		'pPost_desc', 
		[
		 'content-type-select',
		 'position',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		postDescriptionHelp
	);
	// label
	royalCustomLabel( 'pPost_desc', 'label', '#control_tabs_pPost_desc', true );



/* ----------------- Likes, Comments & Sharing General Options ----------------- */

	// likes icon controls wrap
	royalControlsWrap( 'pPost_likes', 'likes-icon-wrap', [
		'likes_icon'
	] );

	// likes show/hide
	royalCustomLabel( 'pPost_likes', 'likes_label', '#customize-control-royal_pPost_likes-likes-icon-wrap', true );

	// comments icon controls wrap
	royalControlsWrap( 'pPost_likes', 'comments-icon-wrap', [
		'comments_icon'
	] );

	// comments show/hide
	royalCustomLabel( 'pPost_likes', 'comments_label', '#customize-control-royal_pPost_likes-comments-icon-wrap', true );

	// sharing controls wrap
	royalControlsWrap( 'pPost_likes', 'sharing-icon-wrap', [
		'share_face',
		'share_twit',
		'share_gplus',
		'share_linkin',
		'share_pint',
		'share_tumblr',
		'share_reddit',
		'open_on'
	] );

	// sharing show/hide
	royalCustomLabel( 'pPost_likes', 'sharing_label', '#customize-control-royal_pPost_likes-sharing-icon-wrap,customize-control-royal_pPost_likes-open_on', true );


/* ----------------- Likes, Comments & Sharing Spacing Options ----------------- */

	// background size sliders
	royalSlider( 'pPost_likes', 'bg_size', 20, 100, 1, 'px', false );


/* ----------------- Likes, Comments & Sharing Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'pPost_likes', 'fonts-wrap', [
		'font_size',
		'line_height',
		'letter_space'
	] );

	// font size slider
	royalSlider( 'pPost_likes', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'pPost_likes', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'pPost_likes', 'letter_space', 0, 10, 0.1, 'px', false );


	var likesCommentsShareHelp = '\
		Likes, Comments & Sharing <strong>Align</strong> won\'t work if they are located in the same block with <strong>Read More</strong> and Read More > <strong>Display</strong> is set to "Inline"\
	';

	// Portfolio Post Likes, Comments & Share tabs -------------------------------
	royalTabs(
		'pPost_likes',
		[
		 'likes_label',
		 'likes-icon-wrap',
		 'comments_label',
		 'comments-icon-wrap',
		 'sharing_label',
		 'sharing-icon-wrap',
		 'icon_separator',
		 'position',
		 'align'
		],[
		 'bg_size'
		], [
		 'bg_col',
		 'bg_hcol'
		],[
		 'fonts-wrap'
		],
		likesCommentsShareHelp
	);
	// label
	royalCustomLabel( 'pPost_likes', 'label', '#control_tabs_pPost_likes', true );



/* ----------------- More Info General Options ----------------- */

    // type controls wrap
    royalControlsWrap( 'pPost_more', 'more-info-separate', [
        'separate',
        'align'
    ] );

    // style select
    royalSelect( 'pPost_more', 'display', 'style-select', ['more-info-separate'] );

    // read more controls wrap
    royalControlsWrap( 'pPost_more', 'type-read-more', [
        'text'
    ] );

    // project link controls wrap
    royalControlsWrap( 'pPost_more', 'type-project-link', [
        'project_text'
    ] );

    // icon controls wrap
    royalControlsWrap( 'pPost_more', 'icon-more-info', [
        'icon'
    ] );

    // info type select
    royalSelect( 'pPost_more', 'info_type', 'info-type-select', [ 'type-read-more', 'type-project-link' ] );


/* ----------------- More Info Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'pPost_more', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'pPost_more', 'padding_gen', 0, 25, 1, 'px', true );
	royalSlider( 'pPost_more', 'padding_tp', 0, 25, 1, 'px', false );
	royalSlider( 'pPost_more', 'padding_rt', 0, 25, 1, 'px', false );
	royalSlider( 'pPost_more', 'padding_bt', 0, 25, 1, 'px', false );
	royalSlider( 'pPost_more', 'padding_lt', 0, 25, 1, 'px', false );
	royalAdvancedBTN( 'pPost_more', 'padding_ad', false );


/* ----------------- More Info Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'pPost_more', 'static-colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col'
	] );

	// transparency sliders
	royalSlider( 'pPost_more', 'bg_col_tr', 0, 1, 0.1, '', false );

	royalControlsWrap( 'pPost_more', 'hover-colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr',
		'txt_hcol',
		'bd_hcol'
	] );

	// transparency sliders
	royalSlider( 'pPost_more', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 'pPost_more', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'pPost_more', 'border_label', '#customize-control-royal_pPost_more-border-wrap', true );

	// border size sliders
	royalSlider( 'pPost_more', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'pPost_more', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'pPost_more', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'pPost_more', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'pPost_more', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'pPost_more', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'pPost_more', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'pPost_more', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'pPost_more', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'pPost_more', 'radius_label', '#customize-control-royal_pPost_more-radius-wrap', true );

	// border radius slider
	royalSlider( 'pPost_more', 'radius', 0, 50, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'pPost_more', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'pPost_more', 'shadow_label', '#customize-control-royal_pPost_more-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'pPost_more', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'pPost_more', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'pPost_more', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'pPost_more', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'pPost_more', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- More Info Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'pPost_more', 'fonts-wrap', [
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'underline'
	] );

	// font size slider
	royalSlider( 'pPost_more', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'pPost_more', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'pPost_more', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'pPost_more', 'font_weight', 100, 900, 100, '', false );


	var folioReadMoreHelp = '\
		Read More functionality is automated and it will be placed at the end of each post <strong>automaticly</strong>, but as mentioned above <-- more --> tag previously breaks post content into two parts and <strong>Read More</strong> links to a Single Post page.\
		<br><br><strong>Project Links</strong> won\'t be displayed if Dashboard > Portfolio Post > Portfolio Post Options > <strong>Project Link</strong> Field is empty.\
	';

	// More Info tabs -------------------------------
	royalTabs( 
		'pPost_more',
		[
		 'style-select',
		 'position',
		 'info-type-select',
		 'icon-more-info'
		], [
		 'padding-wrap'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		], [
		 'fonts-wrap'
		],
		folioReadMoreHelp
	);
	// label
	royalCustomLabel( 'pPost_more', 'label', '#control_tabs_pPost_more', true );



/* ----------------- Testimonial Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'pPost_test', 'padding_tp', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'pPost_test', 'margin_tp', 0, 50, 1, 'px', false );


/* ----------------- Testimonial Styling Options ----------------- */

	// border top controls wrap
	royalControlsWrap( 'pPost_test', 'border-wrap', [
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp'
	] );

	// border top controls on/off
	royalCustomLabel( 'pPost_test', 'border_label', '#customize-control-royal_pPost_test-border-wrap', true );

	// border top size slider
	royalSlider( 'pPost_test', 'bd_size_tp', 0, 5, 1, 'px', false );


/* ----------------- Testimonial Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'pPost_test', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'pPost_test', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'pPost_test', 'line_height', 10, 80, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'pPost_test', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'pPost_test', 'font_weight', 100, 900, 100, '', false );


	var folioTestimonialHelp = '\
		<strong>Testimonials</strong> won\'t be displayed if Dashboard > Portfolio Post > Portfolio Post Options > <strong>Testimonial Author and Testimonial Content</strong> Fields are empty.\
	';

	// Portfolio Post Testimonia tabs -------------------------------
	royalTabs(
		'pPost_test', 
		[
		 'position',
		 'align'
		], [
		 'padding_tp',
		 'margin_tp'
		], [
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		folioTestimonialHelp
	);
	// label
	royalCustomLabel( 'pPost_test', 'label', '#control_tabs_pPost_test', true );



/* ----------------- Decorational Triangle Spacing Options ----------------- */

	// width slider
	royalSlider( 'pPost_triangle', 'width', 5, 50, 1, 'px', false );

	// height slider
	royalSlider( 'pPost_triangle', 'height', 5, 50, 1, 'px', false );

	// horizontal position slider
	royalSlider( 'pPost_triangle', 'horz_position', 0, 95, 1, '%', false );


	// Portfolio Post Decorational Triangle tabs -------------------------------
	royalTabs(
		'pPost_triangle', 
		[
		 'vert_position'
		], [
		 'width',
		 'height',
		 'horz_position'
		],
		'',
		'',
		''
	);
	// label
	royalCustomLabel( 'pPost_triangle', 'label', '#control_tabs_pPost_triangle', true );



/* ----------------- Post Format Icons Spacing Options ----------------- */

	// width slider
	royalSlider( 'pPost_formats', 'width', 20, 100, 1,'px', false );

	// height slider
	royalSlider( 'pPost_formats', 'height', 20, 100, 1,'px', false );


/* ----------------- Post Format Icons Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'pPost_formats', 'colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col'
	] );

	// transparency slider
	royalSlider( 'pPost_formats', 'bg_col_tr', 0, 1, 0.1, '', false );

	// border radius controls wrap
	royalControlsWrap( 'pPost_formats', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'pPost_formats', 'radius_label', '#customize-control-royal_pPost_formats-radius-wrap', true );

	// border radius slider
	royalSlider( 'pPost_formats', 'radius', 0, 50, 1, '%', false );

	// shadow controls wrap
	royalControlsWrap( 'pPost_formats', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr'
	] );

	// shadow controls on/off
	royalCustomLabel( 'pPost_formats', 'shadow_label', '#customize-control-royal_pPost_formats-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'pPost_formats', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'pPost_formats', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'pPost_formats', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'pPost_formats', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'pPost_formats', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Post Format Icons Font Options ----------------- */

	// icon size slider
	royalSlider( 'pPost_formats', 'icon_size', 10, 50, 1, 'px', false );


	// Portfolio Post Format Icons tabs -------------------------------
	royalTabs(
		'pPost_formats', 
		[
		 'audio_icon',
		 'video_icon',
		 'gallery_icon',
		 'position'
		], [
		 'width',
		 'height'
		], [
		 'colors-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		[
		 'icon_size'
		],
		''
	);
	// label
	royalCustomLabel( 'pPost_formats', 'label', '#control_tabs_pPost_formats', true );



/* ----------------- Image Effects General Options ----------------- */

	// next/previous arrows controls wrap
	royalControlsWrap( 'pPost_effects', 'next-prev-lightbox', [
		'nxt_prev_image'
	] );

    // lightbox select
    royalSelect( 'pPost_effects', 'overlay_click', 'lightbox-select', ['next-prev-lightbox'] );

	// overlay controls wrap
	royalControlsWrap( 'pPost_effects', 'overlay-wrap', [
		'lightbox-select',
		'overlay_icon',
		'overlay_trans'
	] );

	// overlay on/off
	royalCustomLabel( 'pPost_effects', 'overlay_label', '#customize-control-royal_pPost_effects-overlay-wrap', true );

	// grayscale controls wrap
	royalControlsWrap( 'pPost_effects', 'grayscale-wrap', [
		'grayscale_trans'
	] );

	// grayscale on/off
	royalCustomLabel( 'pPost_effects', 'grayscale_label', '#customize-control-royal_pPost_effects-grayscale-wrap', true );

	// zoom controls wrap
	royalControlsWrap( 'pPost_effects', 'zoom-wrap', [
		'zoom_reverse',
		'rotate',
		'zoom_rate',
		'zoom_trans'
	] );

	// zoom on/off
	royalCustomLabel( 'pPost_effects', 'zoom_label', '#customize-control-royal_pPost_effects-zoom-wrap', true );


/* ----------------- Image Effects Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'pPost_effects', 'static-colors-wrap', [ 
		'color',
		'col_tr'
	] );

	// hover color controls wrap
	royalControlsWrap( 'pPost_effects', 'hover-colors-wrap', [ 
		'hcol',
		'hcol_tr',
		'txt_hcol'
	] );

	// transparency slider
	royalSlider( 'pPost_effects', 'col_tr', 0, 1, 0.1, '', false );

	// hover transparency slider
	royalSlider( 'pPost_effects', 'hcol_tr', 0, 1, 0.1, '', false );


/* ----------------- Image Effects Font Options ----------------- */

	// icon size slider
	royalSlider( 'pPost_effects', 'icon_size', 10, 50, 1, 'px', false );


	var folioImageEffectsHelp = '\
		If <strong>Image Effects > Overlay</strong> is enabled, <strong>Media > Info Hovers</strong> won\'t work properly.\
	';

	// Image Effects tabs -------------------------------
	royalTabs( 
		'pPost_effects',
		[
		 'overlay_label',
		 'overlay-wrap',
		 'grayscale_label',
		 'grayscale-wrap',
		 'zoom_label',
		 'zoom-wrap'
		],
		'',
		[
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap'
		], [
		 'icon_size'
		],
		folioImageEffectsHelp
	);
	// label
	royalCustomLabel( 'pPost_effects', 'label', '', false );


	} // end portfolio page if()

}); // end portfolio page click()



/*
***************************************************************
* #Portfolio Single
***************************************************************
*/

$('#accordion-section-portfolio_single').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- Header General Options ----------------- */

	// Header tabs -------------------------------
	royalTabs( 
		'pSingle_header',
		[
		 'position',
		 'align',
		 'display_date',
		 'display_cats',
		 'display_comments',
		 'display_author'
		],
		'',
		'',
		'',
		''
	);
	// label
	royalCustomLabel( 'pSingle_header', 'label', '', false );



/* ----------------- Navigation Spacing Options ----------------- */

	// widdth & height controls wrap
	royalControlsWrap( 'pSingle_nav', 'width-height-wrap', [
		'width',
		'height'
	] );

	// width slider
	royalSlider( 'pSingle_nav', 'width', 25, 200, 1, 'px', false );

	// height slider
	royalSlider( 'pSingle_nav', 'height', 25, 200, 1, 'px', false );

	// widdth & height controls wrap
	royalControlsWrap( 'pSingle_nav', 'icon-space-wrap', [
		'space_between',
		'margin_tp'
	] );

	// top margin slider
	royalSlider( 'pSingle_nav', 'margin_tp', 0, 100, 1, 'px', false );

	// horizontal gutter slider
	royalSlider( 'pSingle_nav', 'space_between', 0, 300, 1, 'px', false );


/* ----------------- Navigation Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'pSingle_nav', 'static-colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col'
	] );

	royalControlsWrap( 'pSingle_nav', 'hover-colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr',
		'txt_hcol',
		'bd_hcol'
	] );

	// transparency slider
	royalSlider( 'pSingle_nav', 'bg_col_tr', 0, 1, 0.1, '', false );

	// hover transparency slider
	royalSlider( 'pSingle_nav', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 'pSingle_nav', 'border-wrap', [
		'border_size',
		'border_style',
		'border_color'
	] );

	// border controls on/off
	royalCustomLabel( 'pSingle_nav', 'border_label', '#customize-control-royal_pSingle_nav-border-wrap', true );

	// border size sliders
	royalSlider( 'pSingle_nav', 'border_size', 0, 5, 1, 'px', true );

	// border radius controls wrap
	royalControlsWrap( 'pSingle_nav', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'pSingle_nav', 'radius_label', '#customize-control-royal_pSingle_nav-radius-wrap', true );

	// border radius slider
	royalSlider( 'pSingle_nav', 'radius', 0, 50, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'pSingle_nav', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'pSingle_nav', 'shadow_label', '#customize-control-royal_pSingle_nav-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'pSingle_nav', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'pSingle_nav', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'pSingle_nav', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'pSingle_nav', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'pSingle_nav', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Navigation Font Options ----------------- */

	// font size sliders
	royalSlider( 'pSingle_nav', 'font_size', 10, 50, 1, 'px', false );


	// Blog Single Navigation tabs -------------------------------
	royalTabs(
		'pSingle_nav', 
		[
		 'position',
		 'prev_nxt_icon',
		 'prev_text',
		 'next_text',
		 'back_link'
		],
		[
		 'width-height-wrap',
		 'icon-space-wrap'
		], 
		[
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'shadow_label',
		 'shadow-wrap',
		 'radius_label',
		 'radius-wrap',
		 'wrap_border_label',
		 'wrapper-border-wrap'
		], [
		 'font_size'
		],
		''
	);
	// label
	royalCustomLabel( 'pSingle_nav', 'label', '#control_tabs_pSingle_nav', true );



/* ----------------- Sharing General Options ----------------- */

	// sharing controls wrap
	royalControlsWrap( 'pSingle_share', 'sharing-icon-wrap', [
		'label_text',
		'share_face',
		'share_twit',
		'share_gplus',
		'share_linkin',
		'share_pint',
		'share_tumblr',
		'share_reddit'
	] );

	// sharing show/hide
	royalCustomLabel( 'pSingle_share', 'sharing_label', '#customize-control-royal_pSingle_share-sharing-icon-wrap', true );


/* ----------------- Sharing Spacing Options ----------------- */

	// margin top slider
	royalSlider( 'pSingle_share', 'margin_tp', 0, 50, 1, 'px', false );

	// padding top slider
	royalSlider( 'pSingle_share', 'padding_tp', 0, 50, 1, 'px', false );


/* ----------------- Sharing Styling Options ----------------- */

	// border top controls wrap
	royalControlsWrap( 'pSingle_share', 'border-wrap', [
		'bd_size_tp',
		'bd_style_tp'
	] );

	// border top controls on/off
	royalCustomLabel( 'pSingle_share', 'border_label', '#customize-control-royal_pSingle_share-border-wrap', true );

	// border top size slider
	royalSlider( 'pSingle_share', 'bd_size_tp', 0, 10, 1, 'px', false );


	// Sharing tabs -------------------------------
	royalTabs( 
		'pSingle_share',
		[
		 'position',
		 'sharing_label',
		 'sharing-icon-wrap',
		 'align'
		],
		[
		 'margin_tp',
		 'padding_tp'
		],
		[
		 'border_label',
		 'border-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'pSingle_share', 'label', '#control_tabs_pSingle_share', true );



/* ----------------- Project Info General Options ----------------- */

	// equal height controls wrap
	royalControlsWrap( 'pSingle_project', 'position-right-below_vert', [
		'equal_height'
	] );

	// position select
	royalSelect( 'pSingle_project', 'position', 'position-select', ['position-right-below_vert'] );

	// details controls wrap
	royalControlsWrap( 'pSingle_project', 'details-wrap', [
		'list_icons',
		'link_text'
	] );


/* ----------------- Project Info Spacing Options ----------------- */

	// width slider
	royalSlider( 'pSingle_project', 'width', 200, 400, 1,'px', false );

	// margin left slider
	royalSlider( 'pSingle_project', 'margin_lt', 0, 100, 1, 'px', false );

	// details list gutter slider
	royalSlider( 'pSingle_project', 'gutter_vert', 0, 50, 1, 'px', false );


/* ----------------- Project Info Styling Options ----------------- */

	// border controls wrap
	royalControlsWrap( 'pSingle_project', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'pSingle_project', 'border_label', '#customize-control-royal_pSingle_project-border-wrap', true );

	// border size sliders
	royalSlider( 'pSingle_project', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'pSingle_project', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'pSingle_project', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'pSingle_project', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'pSingle_project', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'pSingle_project', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'pSingle_project', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'pSingle_project', 'bd_col_gen' );

	// list border controls wrap
	royalControlsWrap( 'pSingle_project', 'list-border-wrap', [
		'list_bd_size',
		'list_bd_style'
	] );

	// list border controls on/off
	royalCustomLabel( 'pSingle_project', 'list_border_label', '#customize-control-royal_pSingle_project-list-border-wrap', true );

	// list border size slider
	royalSlider( 'pSingle_project', 'list_bd_size', 0, 10, 1, 'px', false );


	// Portfolio Single Project Info tabs -------------------------------
	royalTabs(
		'pSingle_project', 
		[
		 'position-select',
		 'align',
		 'details-wrap'
		],
		[
		 'width',
		 'margin_lt',
		 'gutter_vert'
		], 
		[
		 'border_label',
		 'border-wrap',
		 'list_border_label',
		 'list-border-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'pSingle_project', 'label', '#control_tabs_pSingle_project', true );


	} // end portfolio single if()

}); // end portfolio single click()



/*
***************************************************************
* #Gallery
***************************************************************
*/

$('#accordion-section-gallery').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- General Options ----------------- */

	// gallery general tabs tabs -------------------------------
	royalTabs(
		'gallery', 
		[
		 'effect',
		 'transition',
		 'delay'
		],
		'', 
		'',
		'',
		''
	);
	// label
	royalCustomLabel( 'gallery', 'label', '', false );



/* ----------------- Slideshow Caption Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'slideshow_caption', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad'
	] );

	// padding sliders
	royalSlider( 'slideshow_caption', 'padding_gen', 0, 30, 1, 'px', true );
	royalSlider( 'slideshow_caption', 'padding_tp', 0, 30, 1, 'px', false );
	royalSlider( 'slideshow_caption', 'padding_rt', 0, 30, 1, 'px', false );
	royalSlider( 'slideshow_caption', 'padding_bt', 0, 30, 1, 'px', false );
	royalSlider( 'slideshow_caption', 'padding_lt', 0, 30, 1, 'px', false );
	royalAdvancedBTN( 'slideshow_caption', 'padding_ad', false );


/* ----------------- Slideshow Caption Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'slideshow_caption', 'color-wrap', [
		 'bg_color',
		 'bg_color_tr',
		 'text_color'
	] );

	// transparency sliders
	royalSlider( 'slideshow_caption', 'bg_color_tr', 0, 1, 0.1, 'px', false );

	// Slideshow Caption tabs -------------------------------
	royalTabs(
		'slideshow_caption', 
		[
		 'width',
		 'align',
		 'position'
		],
		[
		 'padding-wrap'
		], 
		[
		 'color-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'slideshow_caption', 'label', '#control_tabs_slideshow_caption', true );


/* ----------------- Stacked Caption Spacing Options ----------------- */

	royalSlider( 'stacked_caption', 'gutter', 0, 100, 1, 'px', false );

	// Stacked Caption tabs -------------------------------
	royalTabs(
		'stacked_caption', 
		[
		 'align',
		 'position'
		],
		[
		 'gutter'
		], 
		'',
		'',
		''
	);
	// label
	royalCustomLabel( 'stacked_caption', 'label', '#control_tabs_stacked_caption', true );




/* ----------------- Navigation Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'gallery_nav', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad'
	] );

	// padding sliders
	royalSlider( 'gallery_nav', 'padding_gen', 0, 30, 1, 'px', true );
	royalSlider( 'gallery_nav', 'padding_tp', 0, 30, 1, 'px', false );
	royalSlider( 'gallery_nav', 'padding_rt', 0, 30, 1, 'px', false );
	royalSlider( 'gallery_nav', 'padding_bt', 0, 30, 1, 'px', false );
	royalSlider( 'gallery_nav', 'padding_lt', 0, 30, 1, 'px', false );
	royalAdvancedBTN( 'gallery_nav', 'padding_ad', false );

	// width & height controls wrap
	royalControlsWrap( 'gallery_nav', 'width-height-wrap', [
		'width',
		'height'
	] );

	// width & height sliders
	royalSlider( 'gallery_nav', 'width', 5, 50, 1, 'px', false );
	royalSlider( 'gallery_nav', 'height', 5, 50, 1, 'px', false );

	// gutter controls wrap
	royalControlsWrap( 'gallery_nav', 'gutter-wrap', [
		'gutter'
	] );

	// gutter sliders
	royalSlider( 'gallery_nav', 'gutter', 0, 20, 1, 'px', false );


/* ----------------- Navigation Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'gallery_nav', 'color-wrap', [
		 'bg_color',
		 'bg_color_tr',
		 'color',
		 'hover_color'
	] );

	// transparency sliders
	royalSlider( 'gallery_nav', 'bg_color_tr', 0, 1, 0.1, 'px', false );

	// border radius controls wrap
	royalControlsWrap( 'gallery_nav', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'gallery_nav', 'radius_label', '#customize-control-royal_gallery_nav-radius-wrap', true );

	// border radius slider
	royalSlider( 'gallery_nav', 'radius', 0, 50, 1, '%', false );


	// Gallery Navigation tabs -------------------------------
	royalTabs(
		'gallery_nav', 
		[
		 'align',
		 'position'
		],
		[
		 'padding-wrap',
		 'width-height-wrap',
		 'gutter-wrap'
		], 
		[
		 'color-wrap',
		 'radius_label',
		 'radius-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'gallery_nav', 'label', '#control_tabs_gallery_nav', true );



/* ----------------- Arrows Spacing Options ----------------- */

	// width & height controls wrap
	royalControlsWrap( 'gallery_arrows', 'width-height-wrap', [
		'width',
		'height'
	] );

	// width & height sliders
	royalSlider( 'gallery_arrows', 'width', 10, 100, 1, 'px', false );
	royalSlider( 'gallery_arrows', 'height', 10, 100, 1, 'px', false );


/* ----------------- Arrows Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'gallery_arrows', 'color-wrap', [
		 'color',
		 'color_tr',
		 'icon_color'
	] );

	// transparency sliders
	royalSlider( 'gallery_arrows', 'color_tr', 0, 1, 0.1, 'px', false );


/* ----------------- Arrows Font Options ----------------- */

	// icon size sliders
	royalSlider( 'gallery_arrows', 'icon_size', 10, 30, 1, 'px', false );


	// Gallery Arrows tabs -------------------------------
	royalTabs(
		'gallery_arrows', 
		[
		 'default',
		 'prev_nxt_icon'
		],
		[
		 'width-height-wrap'
		], 
		[
		 'color-wrap'
		],
		[
		 'icon_size'
		],
		''
	);
	// label
	royalCustomLabel( 'gallery_arrows', 'label', '#control_tabs_gallery_arrows', true );



/* ----------------- Default Shortcode Spacing Options ----------------- */

	// gutter sliders
	royalSlider( 'gallery_default', 'gutter_horz', 0, 50, 1, 'px', false );
	royalSlider( 'gallery_default', 'gutter_vert', 0, 50, 1, 'px', false );


/* ----------------- Default Shortcode Styling Options ----------------- */

	// shadow controls wrap
	royalControlsWrap( 'gallery_default', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'gallery_default', 'shadow_label', '#customize-control-royal_gallery_default-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'gallery_default', 'shad_h', -5, 5, 1, 'px', false );
	royalSlider( 'gallery_default', 'shad_v', -5, 5, 1, 'px', false );
	royalSlider( 'gallery_default', 'shad_bl', 0, 5, 1, 'px', false );
	royalSlider( 'gallery_default', 'shad_sp', -5, 5, 1, 'px', false );
	royalSlider( 'gallery_default', 'shad_col_tr', 0, 1, 0.1, '', false );


	var defaultGalleryHelp = '\
		This options will apply on wordpress\' native gallery. Which is created from Dashboard > Single Post > Add Media > Create Gallery.\
	';

	// Default Shortcode tabs -------------------------------
	royalTabs( 
		'gallery_default',
		[
		 'captions'
		],
		[
		 'gutter_horz',
		 'gutter_vert'
		],
		[
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		defaultGalleryHelp
	);
	// label
	royalCustomLabel( 'gallery_default', 'label', '', false );



/* ----------------- Lightbox Overlay Styling Options ----------------- */

	// transparency slider
	royalSlider( 'gallery_lightbox', 'bg_hcol_tr', 0, 1, 0.1, '', false );


/* ----------------- Lightbox Overlay Font Options ----------------- */

	// icon size slider
	royalSlider( 'gallery_lightbox', 'icon_size', 10, 50, 1, 'px', false );


	var lightboxHelp = '\
		This options will apply on Gallery Slideshow, Stacked Gallery, WP Native Gallery and Single Post featured images.\
	';

	// Lightbox Overlay tabs -------------------------------
	royalTabs( 
		'gallery_lightbox',
		[
		 'icon'
		],
		'',
		[
		 'bg_hcol',
		 'bg_hcol_tr',
		 'txt_hcol'
		], [
		 'icon_size'
		],
		lightboxHelp
	);
	// label
	royalCustomLabel( 'gallery_lightbox', 'label', '#control_tabs_gallery_lightbox', true );


	} // end gallery if()

}); // end gallery click()




/*
***************************************************************
* #Similar Posts
***************************************************************
*/

$('#accordion-section-similar_posts').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- General Options ----------------- */

	// blog showtype controls wrap
	royalControlsWrap( 'similars_general', 'blog-showtype-wrap', [
		'blog_showtype'
	] );

	// blog similars label
	royalCustomLabel( 'similars_general', 'blog_label', '#customize-control-royal_similars_general-blog-showtype-wrap', true );

	// portfolio showtype controls wrap
	royalControlsWrap( 'similars_general', 'portfolio-showtype-wrap', [
		'portfolio_showtype'
	] );

	// portfolio similars label
	royalCustomLabel( 'similars_general', 'portfolio_label', '#customize-control-royal_similars_general-portfolio-showtype-wrap', true );

	// column controls wrap
	royalControlsWrap( 'similars_general', 'columns-wrap', [
		'posts_number',
		'columns_rate'
	] );

	// add submit button
	royalSubmitButton( 'similars_general-posts_number' );

	// carousel parameters controls wrap
	royalControlsWrap( 'similars_general', 'parameters-wrap', [
		'auto_scroll',
		'auto_scroll_delay',
		'scroll_trans'
	] );


/* ----------------- Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'similars_general', 'padding-wrap', [
		'padding'
	] );

	// padding sliders
	royalSlider( 'similars_general', 'padding', 0, 100, 1, 'px', false );

	// image gutter controls wrap
	royalControlsWrap( 'similars_general', 'image-gutter-wrap', [
		'image_gutter'
	] );

	// image gutter slider
	royalSlider( 'similars_general', 'image_gutter', 0, 50, 1, 'px', false );


/* ----------------- Styling Options ----------------- */

	// border controls wrap
	royalControlsWrap( 'similars_general', 'border-wrap', [
		'border_size',
		'border_style',
		'border_color'
	] );

	// border controls on/off
	royalCustomLabel( 'similars_general', 'border_label', '#customize-control-royal_similars_general-border-wrap', true );

	// border size sliders
	royalSlider( 'similars_general', 'border_size', 0, 5, 1, 'px', true );

	// border radius controls wrap
	royalControlsWrap( 'similars_general', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'similars_general', 'radius_label', '#customize-control-royal_similars_general-radius-wrap', true );

	// border radius slider
	royalSlider( 'similars_general', 'radius', 0, 50, 1, '%', false );


	var similarPostsHelp = '\
		If "Related Posts" is set, The Posts will be displayed from <strong>The Current Post</strong> category.\
	';

	// Similar Posts tabs -------------------------------
	royalTabs(
		'similars_general', 
		[
		 'blog_label',
		 'blog-showtype-wrap',
		 'portfolio_label',
		 'portfolio-showtype-wrap',
		 'columns-wrap',
		 'carousel_label',
		 'parameters-wrap'
		],
		[
		 'padding-wrap',
		 'image-gutter-wrap'
		], 
		[
		 'radius_label',
		 'radius-wrap',
		 'border_label',
		 'border-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		similarPostsHelp
	);
	// label
	royalCustomLabel( 'similars_general', 'label', '', false );



/* ----------------- Title Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'similars_title', 'padding_bt', 0, 50, 1,'px', false );

	// margin bottom slider
	royalSlider( 'similars_title', 'margin_bt', 0, 50, 1,'px', false );


/* ----------------- Title Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'similars_title', 'border-wrap', [
		'bd_style_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'similars_title', 'border_label', '#customize-control-royal_similars_title-border-wrap', true );

	// border bottom size slider
	royalSlider( 'similars_title', 'bd_size_bt', 0, 20, 1, 'px', false );


	// Similars Title tabs -------------------------------
	royalTabs( 
		'similars_title', 
		[
		 'blog_text',
		 'portfolio_text',
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'border_label',
		 'border-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'similars_title', 'label', '', false );



/* ----------------- Arrows Spacing Options ----------------- */

	// width slider
	royalSlider( 'similars_arrows', 'width', 25, 100, 1, 'px', false );

	// height slider
	royalSlider( 'similars_arrows', 'height', 25, 100, 1, 'px', false );


/* ----------------- Arrows Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'similars_arrows', 'static-colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col'
	] );

	royalControlsWrap( 'similars_arrows', 'hover-colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr',
		'txt_hcol',
		'bd_hcol'
	] );

	// transparency slider
	royalSlider( 'similars_arrows', 'bg_col_tr', 0, 1, 0.1, '', false );

	// hover transparency slider
	royalSlider( 'similars_arrows', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 'similars_arrows', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen'
	] );

	// border controls on/off
	royalCustomLabel( 'similars_arrows', 'border_label', '#customize-control-royal_similars_arrows-border-wrap', true );

	// border size sliders
	royalSlider( 'similars_arrows', 'bd_size_gen', 0, 5, 1, 'px', false );

	// border radius controls wrap
	royalControlsWrap( 'similars_arrows', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'similars_arrows', 'radius_label', '#customize-control-royal_similars_arrows-radius-wrap', true );

	// border radius slider
	royalSlider( 'similars_arrows', 'radius', 0, 50, 1, '%', false );

	// shadow controls wrap
	royalControlsWrap( 'similars_arrows', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'similars_arrows', 'shadow_label', '#customize-control-royal_similars_arrows-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'similars_arrows', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'similars_arrows', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'similars_arrows', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'similars_arrows', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'similars_arrows', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Arrows Font Options ----------------- */

	// font size sliders
	royalSlider( 'similars_arrows', 'font_size', 10, 50, 1, 'px', false );


	// Similar Posts Arrows tabs -------------------------------
	royalTabs(
		'similars_arrows', 
		[
		 'prev_nxt_icon'
		],
		[
		 'width',
		 'height'
		], 
		[
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'shadow_label',
		 'shadow-wrap',
		 'radius_label',
		 'radius-wrap',
		 'wrap_border_label',
		 'wrapper-border-wrap'
		], [
		 'font_size'
		],
		''
	);
	// label
	royalCustomLabel( 'similars_arrows', 'label', '#control_tabs_similars_arrows', true );



/* ----------------- Image Overlay Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'similars_overlay', 'colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr'
	] );

	// color controls wrap
	royalControlsWrap( 'similars_overlay', 'text-colors-wrap', [
		'txt_bg_hcol',
		'txt_bg_hcol_tr',
		'txt_hcol'
	] );

	// hover transparency slider
	royalSlider( 'similars_overlay', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// hover text bg transparency slider
	royalSlider( 'similars_overlay', 'txt_bg_hcol_tr', 0, 1, 0.1, '', false );

	// reverse label
	royalCustomLabel( 'similars_overlay', 'reverse', '', true );

	// Similar Posts Overlay tabs -------------------------------
	royalTabs(
		'similars_overlay', 
		'',
		'', 
		[
		 'colors-wrap',
		 'text-colors-wrap',
		 'reverse'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'similars_overlay', 'label', '', false );


	} // end similar posts if()

}); // end similar posts click()



/*
***************************************************************
* #Comments
***************************************************************
*/

$('#accordion-section-comments').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- General Options ----------------- */

	// display on portfolio
	royalCustomLabel( 'comments_general', 'page_display', '', true );

	// display on portfolio
	royalCustomLabel( 'comments_general', 'blog_display', '', true );

	// display on blog
	royalCustomLabel( 'comments_general', 'portfolio_display', '', true );

	// texts controls wrap
	royalControlsWrap( 'comments_general', 'texts-wrap', [
		'moderation_text',
		'closed_text'
	] );


/* ----------------- Counter  Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'comments_general', 'border-wrap', [
		'bd_style_bt',
		'bd_size_bt'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'comments_general', 'border_label', '#customize-control-royal_comments_general-border-wrap', true );

	// border bottom size slider
	royalSlider( 'comments_general', 'bd_size_bt', 0, 20, 1, 'px', false );


/* ----------------- Spacing Options ----------------- */

	// max width controls wrap
	royalControlsWrap( 'comments_general', 'max-width-wrap', [
		'max_width'
	] );

	// max-width slider
	royalSlider( 'comments_general', 'max_width', 600, 2000, 10, 'px', false );

	// divider spacing controls wrap
	royalControlsWrap( 'comments_general', 'divider-wrap', [
		'padding_bt',
		'margin_bt'
	] );


	// padding bottom slider
	royalSlider( 'comments_general', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'comments_general', 'margin_bt', 0, 50, 1, 'px', false );


	// Comments tabs -------------------------------
	royalTabs(
		'comments_general', 
		[
		 'page_display',
		 'blog_display',
		 'portfolio_display',
		 'texts-wrap'
		],
		[
		 'max-width-wrap',
		 'divider-wrap'
		], 
		[
		 'border_label',
		 'border-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'comments_general', 'label', '', false );



/* ----------------- Counter Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'comments_counter', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'comments_counter', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Counter  Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'comments_counter', 'border-wrap', [
		'bd_style_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'comments_counter', 'border_label', '#customize-control-royal_comments_counter-border-wrap', true );

	// border bottom size slider
	royalSlider( 'comments_counter', 'bd_size_bt', 0, 5, 1, 'px', false );


	// Comments Counter tabs -------------------------------
	royalTabs(
		'comments_counter', 
		[
		 'singular_label',
		 'plural_label',
		 'align'
		],
		[
		 'padding_bt',
		 'margin_bt'
		], 
		[
		 'border_label',
		 'border-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'comments_counter', 'label', '', false );



/* ----------------- Author Image Spacing Options ----------------- */

	// margin right sliders
	royalSlider( 'comments_image', 'margin_rt', 0, 30, 1, 'px', false );


/* ----------------- Author Image Styling Options ----------------- */

	// border radius controls wrap
	royalControlsWrap( 'comments_image', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'comments_image', 'radius_label', '#customize-control-royal_comments_image-radius-wrap', true );

	// border radius slider
	royalSlider( 'comments_image', 'radius', 0, 50, 1, '%', false );

	// shadow controls wrap
	royalControlsWrap( 'comments_image', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr'
	] );

	// shadow controls on/off
	royalCustomLabel( 'comments_image', 'shadow_label', '#customize-control-royal_comments_image-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'comments_image', 'shad_h', -5, 5, 1, 'px', false );
	royalSlider( 'comments_image', 'shad_v', -5, 5, 1, 'px', false );
	royalSlider( 'comments_image', 'shad_bl', 0, 5, 1, 'px', false );
	royalSlider( 'comments_image', 'shad_sp', -5, 5, 1, 'px', false );
	royalSlider( 'comments_image', 'shad_col_tr', 0, 1, 0.1, '', false );


	// Author Image tabs -------------------------------
	royalTabs( 
		'comments_image',
		[
		 'avatar_size'
		],
		[
		 'margin_rt'
		], [
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'comments_image', 'label', '', false );



/* ----------------- Content Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'comments_content', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'comments_content', 'padding_gen', 0, 50, 1, 'px', true );
	royalSlider( 'comments_content', 'padding_tp', 0, 50, 1, 'px', false );
	royalSlider( 'comments_content', 'padding_rt', 0, 50, 1, 'px', false );
	royalSlider( 'comments_content', 'padding_bt', 0, 50, 1, 'px', false );
	royalSlider( 'comments_content', 'padding_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'comments_content', 'padding_ad', false );

	// gutter controls wrap
	royalControlsWrap( 'comments_content', 'gutter-wrap', [
		'gutter_vert'
	] );

	// vertical gutter sliders
	royalSlider( 'comments_content', 'gutter_vert', 0, 50, 1, 'px', false );


/* ----------------- Content Styling Options ----------------- */

	// background color controls wrap
	royalControlsWrap( 'comments_content', 'colors-wrap', [
		'bg_color',
		'author_bg_color'
	] );

	// border controls wrap
	royalControlsWrap( 'comments_content', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'comments_content', 'border_label', '#customize-control-royal_comments_content-border-wrap', true );

	// border size sliders
	royalSlider( 'comments_content', 'bd_size_gen', 0, 5, 1, 'px', true );
	royalSlider( 'comments_content', 'bd_size_tp', 0, 5, 1, 'px', false );
	royalSlider( 'comments_content', 'bd_size_rt', 0, 5, 1, 'px', false );
	royalSlider( 'comments_content', 'bd_size_bt', 0, 5, 1, 'px', false );
	royalSlider( 'comments_content', 'bd_size_lt', 0, 5, 1, 'px', false );
	royalAdvancedBTN( 'comments_content', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'comments_content', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'comments_content', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'comments_content', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'comments_content', 'radius_label', '#customize-control-royal_comments_content-radius-wrap', true );

	// border radius slider
	royalSlider( 'comments_content', 'radius', 0, 30, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'comments_content', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'comments_content', 'shadow_label', '#customize-control-royal_comments_content-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'comments_content', 'shad_h', -5, 5, 1, 'px', false );
	royalSlider( 'comments_content', 'shad_v', -5, 5, 1, 'px', false );
	royalSlider( 'comments_content', 'shad_bl', 0, 5, 1, 'px', false );
	royalSlider( 'comments_content', 'shad_sp', -5, 5, 1, 'px', false );
	royalSlider( 'comments_content', 'shad_col_tr', 0, 1, 0.1, '', false );


	// Comments Content tabs -------------------------------
	royalTabs( 
		'comments_content',
		'',
		[
		 'padding-wrap',
		 'gutter-wrap'
		], [
		 'colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'comments_content', 'label', '', false );



/* ----------------- Reply Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'comments_reply', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'comments_reply', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Reply  Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'comments_reply', 'border-wrap', [
		'bd_style_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'comments_reply', 'border_label', '#customize-control-royal_comments_reply-border-wrap', true );

	// border bottom size slider
	royalSlider( 'comments_reply', 'bd_size_bt', 0, 20, 1, 'px', false );


	// Comments Reply tabs -------------------------------
	royalTabs(
		'comments_reply', 
		'',
		[
		 'padding_bt',
		 'margin_bt'
		], 
		[
		 'border_label',
		 'border-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'comments_reply', 'label', '', false );


	} // end comments if()

}); // end comments click()



/*
***************************************************************
* #Inputs
***************************************************************
*/

$('#accordion-section-inputs').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- General Options ----------------- */

    // layout controls wrap
    royalControlsWrap( 'inputs_general', 'layout-half', [
        'align'
    ] );

    // layout mode select
    royalSelect( 'inputs_general', 'layout', 'layout-select', ['layout-half'] );


/* ----------------- Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'inputs_general', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'inputs_general', 'padding_gen', 0, 30, 1, 'px', true );
	royalSlider( 'inputs_general', 'padding_tp', 0, 30, 1, 'px', false );
	royalSlider( 'inputs_general', 'padding_rt', 0, 30, 1, 'px', false );
	royalSlider( 'inputs_general', 'padding_bt', 0, 30, 1, 'px', false );
	royalSlider( 'inputs_general', 'padding_lt', 0, 30, 1, 'px', false );
	royalAdvancedBTN( 'inputs_general', 'padding_ad', false );

	// gutter sliders
	royalSlider( 'inputs_general', 'gutter', 0, 50, 1, 'px', false );


/* ----------------- Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'inputs_general', 'static-colors-wrap', [
		'bg_col',
		'txt_col',
		'error_col'
	] );

	royalControlsWrap( 'inputs_general', 'focus-colors-wrap', [
		'bg_fcol',
		'txt_fcol',
		'bd_fcol'
	] );

	// border controls wrap
	royalControlsWrap( 'inputs_general', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'inputs_general', 'border_label', '#customize-control-royal_inputs_general-border-wrap', true );

	// border size sliders
	royalSlider( 'inputs_general', 'bd_size_gen', 0, 5, 1, 'px', true );
	royalSlider( 'inputs_general', 'bd_size_tp', 0, 5, 1, 'px', false );
	royalSlider( 'inputs_general', 'bd_size_rt', 0, 5, 1, 'px', false );
	royalSlider( 'inputs_general', 'bd_size_bt', 0, 5, 1, 'px', false );
	royalSlider( 'inputs_general', 'bd_size_lt', 0, 5, 1, 'px', false );
	royalAdvancedBTN( 'inputs_general', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'inputs_general', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'inputs_general', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'inputs_general', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'inputs_general', 'radius_label', '#customize-control-royal_inputs_general-radius-wrap', true );

	// border radius slider
	royalSlider( 'inputs_general', 'radius', 0, 20, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'inputs_general', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'inputs_general', 'shadow_label', '#customize-control-royal_inputs_general-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'inputs_general', 'shad_h', -5, 5, 1, 'px', false );
	royalSlider( 'inputs_general', 'shad_v', -5, 5, 1, 'px', false );
	royalSlider( 'inputs_general', 'shad_bl', 0, 5, 1, 'px', false );
	royalSlider( 'inputs_general', 'shad_sp', -5, 5, 1, 'px', false );
	royalSlider( 'inputs_general', 'shad_col_tr', 0, 1, 0.1, '', false );

	// Inputs General tabs -------------------------------
	royalTabs( 
		'inputs_general', 
		[
		 'layout-select'
		], [
		 'padding-wrap',
		 'gutter'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'focus_colors_label',
		 'focus-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'inputs_general', 'label', '', false );



/* ----------------- Submit Button Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'inputs_submit', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'inputs_submit', 'padding_gen', 0, 25, 1, 'px', true );
	royalSlider( 'inputs_submit', 'padding_tp', 0, 25, 1, 'px', false );
	royalSlider( 'inputs_submit', 'padding_rt', 0, 25, 1, 'px', false );
	royalSlider( 'inputs_submit', 'padding_bt', 0, 25, 1, 'px', false );
	royalSlider( 'inputs_submit', 'padding_lt', 0, 25, 1, 'px', false );
	royalAdvancedBTN( 'inputs_submit', 'padding_ad', false );


/* ----------------- Submit Button Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'inputs_submit', 'static-colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col'
	] );

	// transparency sliders
	royalSlider( 'inputs_submit', 'bg_col_tr', 0, 1, 0.1, '', false );

	royalControlsWrap( 'inputs_submit', 'hover-colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr',
		'txt_hcol',
		'bd_hcol'
	] );

	// transparency sliders
	royalSlider( 'inputs_submit', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 'inputs_submit', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'inputs_submit', 'border_label', '#customize-control-royal_inputs_submit-border-wrap', true );

	// border size sliders
	royalSlider( 'inputs_submit', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'inputs_submit', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'inputs_submit', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'inputs_submit', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'inputs_submit', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'inputs_submit', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'inputs_submit', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'inputs_submit', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'inputs_submit', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'inputs_submit', 'radius_label', '#customize-control-royal_inputs_submit-radius-wrap', true );

	// border radius slider
	royalSlider( 'inputs_submit', 'radius', 0, 50, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'inputs_submit', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'inputs_submit', 'shadow_label', '#customize-control-royal_inputs_submit-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'inputs_submit', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'inputs_submit', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'inputs_submit', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'inputs_submit', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'inputs_submit', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Submit Button Font Options ----------------- */

	// Submit Button tabs -------------------------------
	royalTabs( 
		'inputs_submit',
		[
		 'style',
		 'align'
		], [
		 'padding-wrap'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'inputs_submit', 'label', '', false );



/* ----------------- Search Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'inputs_search', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'inputs_search', 'padding_gen', 0, 50, 1, 'px', true );
	royalSlider( 'inputs_search', 'padding_tp', 0, 50, 1, 'px', false );
	royalSlider( 'inputs_search', 'padding_rt', 0, 50, 1, 'px', false );
	royalSlider( 'inputs_search', 'padding_bt', 0, 50, 1, 'px', false );
	royalSlider( 'inputs_search', 'padding_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'inputs_search', 'padding_ad', false );

	// margin controls wrap
	royalControlsWrap( 'inputs_search', 'margin-wrap', [
		'margin_gen',
		'margin_tp',
		'margin_rt',
		'margin_bt',
		'margin_lt',
		'margin_ad',
	] );

	// margin sliders
	royalSlider( 'inputs_search', 'margin_gen', 0, 50, 1, 'px', true );
	royalSlider( 'inputs_search', 'margin_tp', 0, 50, 1, 'px', false );
	royalSlider( 'inputs_search', 'margin_rt', 0, 50, 1, 'px', false );
	royalSlider( 'inputs_search', 'margin_bt', 0, 50, 1, 'px', false );
	royalSlider( 'inputs_search', 'margin_lt', 0, 50, 1, 'px', false );
	royalAdvancedBTN( 'inputs_search', 'margin_ad', false );


/* ----------------- Search Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'inputs_search', 'static-colors-wrap', [
		'bg_col',
		'txt_col'
	] );

	royalControlsWrap( 'inputs_search', 'focus-colors-wrap', [
		'bg_fcol',
		'txt_fcol',
		'bd_fcol'
	] );

	// border controls wrap
	royalControlsWrap( 'inputs_search', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'inputs_search', 'border_label', '#customize-control-royal_inputs_search-border-wrap', true );

	// border size sliders
	royalSlider( 'inputs_search', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'inputs_search', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'inputs_search', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'inputs_search', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'inputs_search', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'inputs_search', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'inputs_search', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'inputs_search', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'inputs_search', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'inputs_search', 'radius_label', '#customize-control-royal_inputs_search-radius-wrap', true );

	// border radius slider
	royalSlider( 'inputs_search', 'radius', 0, 20, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'inputs_search', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'inputs_search', 'shadow_label', '#customize-control-royal_inputs_search-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'inputs_search', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'inputs_search', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'inputs_search', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'inputs_search', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'inputs_search', 'shad_col_tr', 0, 1, 0.1, '', false );

	// Search Widget Content tabs -------------------------------
	royalTabs( 
		'inputs_search', 
		[
		 'show_top_nav',
		 'icon'
		], [
		 'padding-wrap',
		 'margin-wrap'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'focus_colors_label',
		 'focus-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'inputs_search', 'label', '#control_tabs_inputs_search', false );


	} // end inputs if()

}); // end inputs click()

	


/*
***************************************************************
* #Pagination
***************************************************************
*/

$('#accordion-section-pagination').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- Wrapper Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'pagination', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'pagination', 'padding_gen', 0, 100, 1, 'px', true );
	royalSlider( 'pagination', 'padding_tp', 0, 100, 1, 'px', false );
	royalSlider( 'pagination', 'padding_rt', 0, 100, 1, 'px', false );
	royalSlider( 'pagination', 'padding_bt', 0, 100, 1, 'px', false );
	royalSlider( 'pagination', 'padding_lt', 0, 100, 1, 'px', false );
	royalAdvancedBTN( 'pagination', 'padding_ad', false );


/* ----------------- Wrapper Styling Options ----------------- */

	// background color controls wrap
	royalControlsWrap( 'pagination', 'bg-color-wrap', [ 'bg_color', 'bg_color_tr' ] );

	// background color transparency slider
	royalSlider( 'pagination', 'bg_color_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 
		'pagination', 'border-wrap',
		[
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'pagination', 'border_label', '#customize-control-royal_pagination-border-wrap', true );

	// border size sliders
	royalSlider( 'pagination', 'bd_size_gen', 0, 30, 1, 'px', true );
	royalSlider( 'pagination', 'bd_size_tp', 0, 30, 1, 'px', false );
	royalSlider( 'pagination', 'bd_size_rt', 0, 30, 1, 'px', false );
	royalSlider( 'pagination', 'bd_size_bt', 0, 30, 1, 'px', false );
	royalSlider( 'pagination', 'bd_size_lt', 0, 30, 1, 'px', false );
	royalAdvancedBTN( 'pagination', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'pagination', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'pagination', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'pagination', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'pagination', 'radius_label', '#customize-control-royal_pagination-radius-wrap', true );

	// border radius slider
	royalSlider( 'pagination', 'radius', 0, 50, 1,'px', false );

	// shadow controls wrap
	royalControlsWrap( 'pagination', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'pagination', 'shadow_label', '#customize-control-royal_pagination-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'pagination', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'pagination', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'pagination', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'pagination', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'pagination', 'shad_col_tr', 0, 1, 0.1, '', false );



	// Wrapper General tabs -------------------------------
	royalTabs(
		'pagination',
		'',
		[
		 'padding-wrap',
		 'gutter-wrap'
		],
		[
		 'bg-color-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'pagination', 'label', '', false );



/* ----------------- Navigation General Options ----------------- */

    // previous & next controls wrap
    royalControlsWrap( 'pagination_nav', 'prev-nxt-wrap', [
        'prev_text',
        'nxt_text',
        'prev_nxt_icon'
    ] );

	// previous & next label
	royalCustomLabel( 'pagination_nav', 'prev_nxt_label', '#customize-control-royal_pagination_nav-prev-nxt-wrap', true );

    // first & last controls wrap
    royalControlsWrap( 'pagination_nav', 'first-last-wrap', [
        'first_text',
        'last_text',
        'first_last_icon'
    ] );

	// first & last label
	royalCustomLabel( 'pagination_nav', 'first_last_label', '#customize-control-royal_pagination_nav-first-last-wrap', true );

	// numbered controls wrap
    royalControlsWrap( 'pagination_nav', 'numbers-type-wrap', [
		'prev_nxt_label',
		'prev-nxt-wrap',
		'first_last_label',
		'first-last-wrap'
    ] );

	// load more controls wrap
    royalControlsWrap( 'pagination_nav', 'twitter-style-wrap', [
		'more_text',
		'loading_icon'
    ] );

	// posts loading type select
	royalSelect( 'pagination_nav', 'load_posts', 'posts-loading-select', [
		'twitter-style-wrap'
	] );

	// infinite controls wrap
    royalControlsWrap( 'pagination_nav', 'infinite-type-wrap', [
		'posts-loading-select'
    ] );

	// default controls wrap
    royalControlsWrap( 'pagination_nav', 'default-type-wrap', [
    	'prev_page_text',
		'next_page_text',
		'prev_next_page_icon'
    ] );


	// type select
	royalSelect( 'pagination_nav', 'type', 'type-select', [
		'numbers-type-wrap',
		'infinite-type-wrap',
		'default-type-wrap'
	] );


/* ----------------- Navigation Spacing Options ----------------- */

	// padding slider
	royalSlider( 'pagination_nav', 'padding_all', 5, 30, 1, 'px', false );
	// horizontal gutter slider
	royalSlider( 'pagination_nav', 'horz_gutter', 0, 30, 1, 'px', false );


/* ----------------- Navigation Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'pagination_nav', 'static-colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col'
	] );

	// transparency sliders
	royalSlider( 'pagination_nav', 'bg_col_tr', 0, 1, 0.1, '', false );

	royalControlsWrap( 'pagination_nav', 'hover-colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr',
		'txt_hcol',
		'bd_hcol'
	] );

	// transparency sliders
	royalSlider( 'pagination_nav', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 'pagination_nav', 'border-wrap', [
		'border_size',
		'border_style',
		'border_color'
	] );

	// border controls on/off
	royalCustomLabel( 'pagination_nav', 'border_label', '#customize-control-royal_pagination_nav-border-wrap', true );

	// border size sliders
	royalSlider( 'pagination_nav', 'border_size', 0, 5, 1, 'px', true );

	// border radius controls wrap
	royalControlsWrap( 'pagination_nav', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'pagination_nav', 'radius_label', '#customize-control-royal_pagination_nav-radius-wrap', true );

	// border radius slider
	royalSlider( 'pagination_nav', 'radius', 0, 100, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'pagination_nav', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'pagination_nav', 'shadow_label', '#customize-control-royal_pagination_nav-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'pagination_nav', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'pagination_nav', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'pagination_nav', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'pagination_nav', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'pagination_nav', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Navigation Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'pagination_nav', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'underline'
	] );

	// font size slider
	royalSlider( 'pagination_nav', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'pagination_nav', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'pagination_nav', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'pagination_nav', 'font_weight', 100, 900, 100, '', false );


	var paginationNavHelp = '\
		If <strong>Load Posts</strong> is set to: <br>"Automatic" / "Manual", styling changes will not apply on <strong>dynamicaly loaded</strong> posts in the Theme Customizer.\
	';

	// Navigation tabs -------------------------------
	royalTabs( 
		'pagination_nav',
		[
		 'type-select',
		 'align',
		], [
		 'padding_all',
		 'horz_gutter'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		], [
		 'fonts-wrap'
		],
		paginationNavHelp
	);
	// label
	royalCustomLabel( 'pagination_nav', 'label', '', false );


	} // end pagination if()

}); // end pagination click()



/*
***************************************************************
* #Contact Page
***************************************************************
*/

$('#accordion-section-contact_page').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');

/* ----------------- Spacing Options ----------------- */

	// gutter controls wrap
	royalControlsWrap( 'cPage_general', 'gutter-wrap', [
		'gutter',
	] );

	// list gutter controls wrap
	royalControlsWrap( 'cPage_general', 'list-gutter-wrap', [
		'list_gutter',
	] );

	// gutter slider
	royalSlider( 'cPage_general', 'gutter', 0, 100, 1, 'px', false );

	// list gutter slider
	royalSlider( 'cPage_general', 'list_gutter', 0, 30, 1, 'px', false );


/* ----------------- Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'cPage_general', 'border-wrap', [
		'bd_style_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'cPage_general', 'border_label', '#customize-control-royal_cPage_general-border-wrap', true );

	// border bottom size slider
	royalSlider( 'cPage_general', 'bd_size_bt', 0, 5, 1, 'px', false );


	// Contact Page General tabs -------------------------------
	royalTabs( 
		'cPage_general', 
		[
		 'layout',
		 'list_align',
		 'reciever_email'
		], [
		 'gutter-wrap',
		 'list-gutter-wrap'
		], [
		 'border_label',
		 'border-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'cPage_general', 'label', '', false );



/* ----------------- Title Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'cPage_title', 'padding_bt', 0, 50, 1, 'px', false );

	// margin bottom slider
	royalSlider( 'cPage_title', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Title Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'cPage_title', 'border-wrap', [
		'bd_style_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'cPage_title', 'border_label', '#customize-control-royal_cPage_title-border-wrap', true );

	// border bottom size slider
	royalSlider( 'cPage_title', 'bd_size_bt', 0, 5, 1, 'px', false );


	// Contact Title tabs -------------------------------
	royalTabs(
		'cPage_title', 
		[
		 'align'
		],
		[
		 'padding_bt',
		 'margin_bt'
		], 
		[
		 'border_label',
		 'border-wrap'
		],
		'',
		''
	);
	// label
	royalCustomLabel( 'cPage_title', 'label', '', false );



/* ----------------- Google Map General Options ----------------- */

	// location controls wrap
	royalControlsWrap( 'cPage_map', 'location-wrap', [
		'location'
	] );

	// add submit button
	royalSubmitButton( 'cPage_map-location' );

	// tooltip controls wrap
	royalControlsWrap( 'cPage_map', 'tooltip-wrap', [
		'tooltip_label'
	] );

	// add submit button
	royalSubmitButton( 'cPage_map-tooltip_label' );


/* ----------------- Google Map Spacing Options ----------------- */

	// height slider
	royalSlider( 'cPage_map', 'height', 200, 800, 10, 'px', false );

	// Google Map tabs -------------------------------
	royalTabs(
		'cPage_map',
		[
		 'position',
		 'location-wrap',
		 'tooltip-wrap',
		 'type',
		 'zoom',
		 'mousewheel',
		 'nav',
		 'type_control'
		],
		[
		 'height'
		], 
		'',
		'',
		''
	);
	// label
	royalCustomLabel( 'cPage_map', 'label', '#control_tabs_cPage_map', true );


	} // end contact page if()

}); // end contact page click()




/*
***************************************************************
* #Copyright & Socials
***************************************************************
*/

$('#accordion-section-copy_and_socials').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- General Options ----------------- */

	// equal height controls wrap
	royalControlsWrap( 'copy_soc_general', 'position-static', [
		'arrange'
	] );

	// fold button icon controls wrap
	royalControlsWrap( 'copy_soc_general', 'fold-btn-icon-wrap', [
		'fold_btn_icon'
	] );

	royalCustomLabel( 'copy_soc_general', 'fold_btn_label', '#customize-control-royal_copy_soc_general-fold-btn-icon-wrap', true );

	// fold button controls wrap
	royalControlsWrap( 'copy_soc_general', 'position-fixed', [
		'fold_btn_label',
		'fold-btn-icon-wrap'
	] );

	// position select
	royalSelect( 'copy_soc_general', 'position', 'position-select', [
		'position-static',
		'position-fixed'
	] );


/* ----------------- Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'copy_soc_general', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'copy_soc_general', 'padding_gen', 0, 150, 1, 'px', true );
	royalSlider( 'copy_soc_general', 'padding_tp', 0, 150, 1, 'px', false );
	royalSlider( 'copy_soc_general', 'padding_rt', 0, 150, 1, 'px', false );
	royalSlider( 'copy_soc_general', 'padding_bt', 0, 150, 1, 'px', false );
	royalSlider( 'copy_soc_general', 'padding_lt', 0, 150, 1, 'px', false );
	royalAdvancedBTN( 'copy_soc_general', 'padding_ad', false );


/* ----------------- Styling Options ----------------- */

	// wrapper block color controls wrap
	royalControlsWrap( 'copy_soc_general', 'colors-wrap', [ 
		'color',
		'col_tr'
	] );

	// fold button color controls wrap
	royalControlsWrap( 'copy_soc_general', 'fold-btn-colors-wrap', [ 
		'fold_btn_color',
		'fold_btn_icon_color'
	] );

	// transparency slider
	royalSlider( 'copy_soc_general', 'col_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 'copy_soc_general', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'copy_soc_general', 'border_label', '#customize-control-royal_copy_soc_general-border-wrap', true );

	// border size sliders
	royalSlider( 'copy_soc_general', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'copy_soc_general', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'copy_soc_general', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'copy_soc_general', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'copy_soc_general', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'copy_soc_general', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'copy_soc_general', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'copy_soc_general', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'copy_soc_general', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'copy_soc_general', 'radius_label', '#customize-control-royal_copy_soc_general-radius-wrap', true );

	// border radius slider
	royalSlider( 'copy_soc_general', 'radius', 0, 50, 1, '%', false );

	// shadow controls wrap
	royalControlsWrap( 'copy_soc_general', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'copy_soc_general', 'shadow_label', '#customize-control-royal_copy_soc_general-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'copy_soc_general', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'copy_soc_general', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'copy_soc_general', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'copy_soc_general', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'copy_soc_general', 'shad_col_tr', 0, 1, 0.1, '', false );


	var copyAndSocHelp = '\
		This options will apply on Social Icons and Copyright Text Wrapper block.\
		<br><br>If <strong>Attachment</strong> is set to "Fixed" Wrapper Block will stick to left-bottom corner of the Page.\
		<br><br><strong>Fold Button</strong> will be displayed only if <strong>Attachment</strong> is set to "Fixed" and <a href="#accordion-section-sidebar">Section Sidebar</a> > <strong>General Position</strong> is set to "Top".\
	';

	// Copyright And Socials general tabs -------------------------------
	royalTabs( 
		'copy_soc_general',
		[
		 'position-select'
		], [ 
		 'padding-wrap'
		], [
		 'wrapper_colors_label',
		 'colors-wrap',
		 'fold_btn_colors_label',
		 'fold-btn-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		copyAndSocHelp
	);
	// label
	royalCustomLabel( 'copy_soc_general', 'label', '#control_tabs_copy_soc_general', true );



/* ----------------- Socials General Options ----------------- */

	// social icon wrap 1
	royalControlsWrap( 'socials', 'social-wrap-1', [
		'url_1',
		'icon_1'
	] );

	// social icon wrap 2
	royalControlsWrap( 'socials', 'social-wrap-2', [
		'url_2',
		'icon_2'
	] );

	// social icon wrap 3
	royalControlsWrap( 'socials', 'social-wrap-3', [
		'url_3',
		'icon_3'
	] );

	// social icon wrap 4
	royalControlsWrap( 'socials', 'social-wrap-4', [
		'url_4',
		'icon_4'
	] );

	// social icon wrap 5
	royalControlsWrap( 'socials', 'social-wrap-5', [
		'url_5',
		'icon_5'
	] );

	// social icon wrap 6
	royalControlsWrap( 'socials', 'social-wrap-6', [
		'url_6',
		'icon_6'
	] );

	// social icon wrap 7
	royalControlsWrap( 'socials', 'social-wrap-7', [
		'url_7',
		'icon_7'
	] );

	// social icon wrap 8
	royalControlsWrap( 'socials', 'social-wrap-8', [
		'url_8',
		'icon_8'
	] );

	// social icon wrap 9
	royalControlsWrap( 'socials', 'social-wrap-9', [
		'url_9',
		'icon_9'
	] );

	// social icon wrap 10
	royalControlsWrap( 'socials', 'social-wrap-10', [
		'url_10',
		'icon_10'
	] );


/* ----------------- Socials Spacing Options ----------------- */
	
	// width & height wrap
	royalControlsWrap( 'socials', 'width-height-wrap', [
		'width',
		'height'
	] );

	// width slider
	royalSlider( 'socials', 'width', 25, 100, 1, 'px', false );

	// height slider
	royalSlider( 'socials', 'height', 25, 100, 1, 'px', false );

	// gutter wrap
	royalControlsWrap( 'socials', 'gutter-wrap', [
		'gutter_horz',
		'gutter_vert'
	] );


	// horizontal gutter slider
	royalSlider( 'socials', 'gutter_horz', 0, 50, 1, 'px', false );

	// vertical gutter slider
	royalSlider( 'socials', 'gutter_vert', 0, 50, 1, 'px', false );

	// padding-margin wrap
	royalControlsWrap( 'socials', 'padding-margin-wrap', [
		'padding_bt',
		'margin_bt'
	] );

	// wrapper padding bottom slider
	royalSlider( 'socials', 'padding_bt', 0, 50, 1, 'px', false );

	// wrapper margin bottom slider
	royalSlider( 'socials', 'margin_bt', 0, 50, 1, 'px', false );


/* ----------------- Socials Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'socials', 'static-colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col'
	] );

	royalControlsWrap( 'socials', 'hover-colors-wrap', [
		'bg_hcol',
		'bg_hcol_tr',
		'txt_hcol',
		'bd_hcol'
	] );

	// transparency slider
	royalSlider( 'socials', 'bg_col_tr', 0, 1, 0.1, '', false );

	// hover transparency slider
	royalSlider( 'socials', 'bg_hcol_tr', 0, 1, 0.1, '', false );

	// border controls wrap
	royalControlsWrap( 'socials', 'border-wrap', [
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'socials', 'border_label', '#customize-control-royal_socials-border-wrap', true );

	// border size sliders
	royalSlider( 'socials', 'bd_size_gen', 0, 10, 1, 'px', true );
	royalSlider( 'socials', 'bd_size_tp', 0, 10, 1, 'px', false );
	royalSlider( 'socials', 'bd_size_rt', 0, 10, 1, 'px', false );
	royalSlider( 'socials', 'bd_size_bt', 0, 10, 1, 'px', false );
	royalSlider( 'socials', 'bd_size_lt', 0, 10, 1, 'px', false );
	royalAdvancedBTN( 'socials', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'socials', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'socials', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'socials', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'socials', 'radius_label', '#customize-control-royal_socials-radius-wrap', true );

	// border radius slider
	royalSlider( 'socials', 'radius', 0, 50, 1, '%', false );

	// shadow controls wrap
	royalControlsWrap( 'socials', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'socials', 'shadow_label', '#customize-control-royal_socials-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'socials', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'socials', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'socials', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'socials', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'socials', 'shad_col_tr', 0, 1, 0.1, '', false );

	// border bottom controls wrap
	royalControlsWrap( 'socials', 'wrapper-border-wrap', [
		'wrap_bd_style_bt',
		'wrap_bd_col_bt',
		'wrap_bd_size_bt',
		'wrap_bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'socials', 'wrap_border_label', '#customize-control-royal_socials-wrapper-border-wrap', true );

	// border bottom size slider
	royalSlider( 'socials', 'wrap_bd_size_bt', 0, 20, 1, 'px', false );


/* ----------------- Socials Font Options ----------------- */

	// text shadow controls wrap
	royalControlsWrap( 'socials', 'txt-shadow-wrap', [
		'txt_shad_h',
		'txt_shad_v',
		'txt_shad_bl',
		'txt_shad_col'
	] );

	// font size sliders
	royalSlider( 'socials', 'font_size', 10, 50, 1, 'px', false );

	// text shadow controls on/off
	royalCustomLabel( 'socials', 'txt_shadow_label', '#customize-control-royal_socials-txt-shadow-wrap', true );

	// text shadow sliders
	royalSlider( 'socials', 'txt_shad_h', -5, 5, 1, 'px', false );
	royalSlider( 'socials', 'txt_shad_v', -5, 5, 1, 'px', false );
	royalSlider( 'socials', 'txt_shad_bl', 0, 10, 1, 'px', false );


	// social icon tabs -------------------------------
	royalTabs( 
		'socials',
		[
		 'social-wrap-1',
		 'social-wrap-2',
		 'social-wrap-3',
		 'social-wrap-4',
		 'social-wrap-5',
		 'social-wrap-6',
		 'social-wrap-7',
		 'social-wrap-8',
		 'social-wrap-9',
		 'social-wrap-10',
		 'align'
		], [ 
		 'width-height-wrap',
		 'gutter-wrap',
		 'padding-margin-wrap'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'border_label',
		 'border-wrap',
		 'shadow_label',
		 'shadow-wrap',
		 'radius_label',
		 'radius-wrap',
		 'wrap_border_label',
		 'wrapper-border-wrap'
		],
		[
		 'font_size',
		 'txt_shadow_label',
		 'txt-shadow-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'socials', 'label', '#control_tabs_socials', true );



/* ----------------- Copyright Font Options ----------------- */

	// add submit button
	royalSubmitButton( 'copyright-text' );


/* ----------------- Copyright Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'copyright', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'underline'
	] );

	// font size slider
	royalSlider( 'copyright', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'copyright', 'line_height', 10, 100, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'copyright', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'copyright', 'font_weight', 100, 900, 100, '', false );


	// Portfolio Header Sub Title tabs -------------------------------
	royalTabs( 
		'copyright', 
		[
		 'text',
		 'align'
		], 
		'',
		[
		 'txt_col',
		 'link_col',
		 'link_hcol'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'copyright', 'label', '#control_tabs_copyright', true );



/* ----------------- Back Button Spacing Options ----------------- */

	// width & height controls wrap
	royalControlsWrap( 'back_btn', 'width-height-wrap', [ 
		'width',
		'height'
	] );

	// width & height sliders
	royalSlider( 'back_btn', 'width', 25, 100, 1, 'px', false );
	royalSlider( 'back_btn', 'height', 25, 100, 1, 'px', false );

	// position controls wrap
	royalControlsWrap( 'back_btn', 'position-wrap', [ 
		'pos_rt',
		'pos_bt'
	] );

	// position sliders
	royalSlider( 'back_btn', 'pos_rt', 0, 100, 1, 'px', false );
	royalSlider( 'back_btn', 'pos_bt', 0, 200, 1, 'px', false );


/* ----------------- Back Button Styling Options ----------------- */

	// static color controls wrap
	royalControlsWrap( 'back_btn', 'static-colors-wrap', [ 
		'color',
		'col_tr',
		'txt_col'
	] );

	// hover color controls wrap
	royalControlsWrap( 'back_btn', 'hover-colors-wrap', [ 
		'hcol',
		'hcol_tr',
		'txt_hcol'
	] );

	// transparency slider
	royalSlider( 'back_btn', 'col_tr', 0, 1, 0.1, '', false );

	// hover transparency slider
	royalSlider( 'back_btn', 'hcol_tr', 0, 1, 0.1, '', false );

	// border radius controls wrap
	royalControlsWrap( 'back_btn', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'back_btn', 'radius_label', '#customize-control-royal_back_btn-radius-wrap', true );

	// border radius slider
	royalSlider( 'back_btn', 'radius', 0, 50, 1, '%', false );

	// shadow controls wrap
	royalControlsWrap( 'back_btn', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'back_btn', 'shadow_label', '#customize-control-royal_back_btn-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'back_btn', 'shad_h', -10, 10, 1, 'px', false );
	royalSlider( 'back_btn', 'shad_v', -10, 10, 1, 'px', false );
	royalSlider( 'back_btn', 'shad_bl', 0, 10, 1, 'px', false );
	royalSlider( 'back_btn', 'shad_sp', -10, 10, 1, 'px', false );
	royalSlider( 'back_btn', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Back Button Font Options ----------------- */

	// text size slider
	royalSlider( 'back_btn', 'txt_sz', 10, 50, 1, 'px', false );


	// back to top button tabs -------------------------------
	royalTabs( 
		'back_btn',
		[
		 'icon',
		 'show_trans',
		 'scroll_trans'
		], [ 
		 'width-height-wrap',
		 'position-wrap'
		], [
		 'static_colors_label',
		 'static-colors-wrap',
		 'hover_colors_label',
		 'hover-colors-wrap',
		 'shadow_label',
		 'shadow-wrap',
		 'radius_label',
		 'radius-wrap'
		],
		[
		 'txt_sz'
		],
		''
	);
	// label
	royalCustomLabel( 'back_btn', 'label', '#control_tabs_back_btn', true );


	} // end copyright & socials if()

}); // end copyright & socials click()



/*
***************************************************************
* #Typography
***************************************************************
*/

$('#accordion-section-typography').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- General Options ----------------- */

	// font family subset controls wrap
	royalControlsWrap( 'typography', 'subsets-wrap', [
		'latin_subset',
		'cyrillic_subset',
		'greek_subset',
		'vietnamese_subset',
	] );

	// font family subsets label
	royalCustomLabel( 'typography', 'subsets_label', '#customize-control-royal_typography-subsets-wrap', true );

	var globalHeadings = [
		'#menu_title_font_family',
		'#filters_title_font_family',
		'#bPost_title_font_family',
		'#pPost_title_font_family',
		'#typography_h1_font_family',
		'#typography_h2_font_family',
		'#typography_h3_font_family',
		'#typography_h4_font_family',
		'#typography_h5_font_family',
		'#typography_h6_font_family',
		'#sWidgets_title_font_family',
		'#fWidgets_title_font_family'
	];
	globalHeadings = globalHeadings.join(',');

	$('#typography_heading_family').change(function() {
		$( globalHeadings ).val( $(this).val() ).trigger('change');
	});

	var globalBodyText = [
		'#menu_items_font_family',
		'#filter_items_font_family',
		'#bPage_post_font_family',
		'#bPost_formats_font_family',
		'#pPage_post_font_family',
		'#pPost_test_font_family',
		'#pagination_nav_font_family',
		'#copyright_font_family',
		'#typography_p_font_family',
		'#sWidgets_content_font_family',
		'#fWidgets_content_font_family'
	];
	globalBodyText = globalBodyText.join(',');

	$('#typography_body_text_family').change(function() {
		$( globalBodyText ).val( $(this).val() ).trigger('change');
	});


/* ----------------- Spacing Options ----------------- */

	// inner content text margins slider
	royalSlider( 'typography', 'text_margins', 0, 50, 1, 'px', false );

	var typographyHelp = '\
		This options will apply on <strong>Inner Content</strong>, which includes: .\
		<br>Blog & Portfolio single page headers, single post content, comments,\
		<br>Portfolio single project info,\
		<br>Contact page info, Default page templates and etc.\
		<br><br>But <strong>Heading Family and Body Text Family</strong> are global options and they will apply on whole web-site.\
		<br><br><strong>Note!</strong> After you change <strong>Heading Family or Body Text Family</strong> they will force all other Font Select Inputs in Theme Customizer to change values accordingly.\
	';

	// Typography General tabs -------------------------------
	royalTabs( 
		'typography',
		[
		 'subsets_label',
		 'subsets-wrap',
		 'heading_family',
		 'body_text_family'
		], [ 
		 'text_margins'
		],
		'',
		'',
		typographyHelp
	);
	// label
	royalCustomLabel( 'typography', 'label', '', false );



/* ----------------- Paragraph Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'typography_p', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'typography_p', 'font_size', 10, 100, 1, 'px', false );

	// line height slider
	royalSlider( 'typography_p', 'line_height', 10, 100, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'typography_p', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'typography_p', 'font_weight', 100, 900, 100, '', false );


	// Paragraph	 tabs -------------------------------
	royalTabs( 
		'typography_p',
		'',
		'',
		'', [
		 'fonts-wrap',
		 'txt_shadow_label',
		 'txt-shadow-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'typography_p','label', '', false );


/* ----------------- H1 Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'typography_h1', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'typography_h1', 'font_size', 10, 100, 1, 'px', false );

	// line height slider
	royalSlider( 'typography_h1', 'line_height', 10, 100, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'typography_h1', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'typography_h1', 'font_weight', 100, 900, 100, '', false );


	// H1 tabs -------------------------------
	royalTabs( 
		'typography_h1',
		'',
		'',
		'', [
		 'fonts-wrap',
		 'txt_shadow_label',
		 'txt-shadow-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'typography_h1','label', '', false );


/* ----------------- H2 Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'typography_h2', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'typography_h2', 'font_size', 10, 100, 1, 'px', false );

	// line height slider
	royalSlider( 'typography_h2', 'line_height', 10, 100, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'typography_h2', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'typography_h2', 'font_weight', 100, 900, 100, '', false );


	// H2 tabs -------------------------------
	royalTabs( 
		'typography_h2',
		'',
		'',
		'', [
		 'fonts-wrap',
		 'txt_shadow_label',
		 'txt-shadow-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'typography_h2','label', '', false );


/* ----------------- H3 Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'typography_h3', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'typography_h3', 'font_size', 10, 100, 1, 'px', false );

	// line height slider
	royalSlider( 'typography_h3', 'line_height', 10, 100, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'typography_h3', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'typography_h3', 'font_weight', 100, 900, 100, '', false );


	// H3 tabs -------------------------------
	royalTabs( 
		'typography_h3',
		'',
		'',
		'', [
		 'fonts-wrap',
		 'txt_shadow_label',
		 'txt-shadow-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'typography_h3','label', '', false );


/* ----------------- H4 Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'typography_h4', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'typography_h4', 'font_size', 10, 100, 1, 'px', false );

	// line height slider
	royalSlider( 'typography_h4', 'line_height', 10, 100, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'typography_h4', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'typography_h4', 'font_weight', 100, 900, 100, '', false );


	// H4 tabs -------------------------------
	royalTabs( 
		'typography_h4',
		'',
		'',
		'', [
		 'fonts-wrap',
		 'txt_shadow_label',
		 'txt-shadow-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'typography_h4','label', '', false );


/* ----------------- H5 Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'typography_h5', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'typography_h5', 'font_size', 10, 100, 1, 'px', false );

	// line height slider
	royalSlider( 'typography_h5', 'line_height', 10, 100, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'typography_h5', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'typography_h5', 'font_weight', 100, 900, 100, '', false );


	// H5 tabs -------------------------------
	royalTabs( 
		'typography_h5',
		'',
		'',
		'', [
		 'fonts-wrap',
		 'txt_shadow_label',
		 'txt-shadow-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'typography_h5','label', '', false );


/* ----------------- H6 Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'typography_h6', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'typography_h6', 'font_size', 10, 100, 1, 'px', false );

	// line height slider
	royalSlider( 'typography_h6', 'line_height', 10, 100, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'typography_h6', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'typography_h6', 'font_weight', 100, 900, 100, '', false );


	// H6 tabs -------------------------------
	royalTabs( 
		'typography_h6',
		'',
		'',
		'', [
		 'fonts-wrap',
		 'txt_shadow_label',
		 'txt-shadow-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'typography_h6','label', '', false );


	} // end typography if()

}); // end typography click()




/*
***************************************************************
* #Custom CSS
***************************************************************
*/

	// custom css field
	function royalCustomCSS( db, id ) {

		// define variables
		var idObj 	 = $( '#'+ prfx( db, id ) ),
			textarea = idObj.find('textarea');
		
		// wrap
		textarea.attr( 'rows', '10' );
		textarea.wrapAll('<div class="rf-custom-css"></div>');

		var textareaWrap = $('.rf-custom-css');
		textareaWrap.append('<i class="fa fa-arrows-alt" title="Full Screen"></i>');

		// full screen
		textareaWrap.find('.fa').on('click', function() {
			textareaWrap.hide().fadeIn('xslow').toggleClass('rf-full-screen');
			if ( $('.wp-full-overlay').hasClass('collapsed') ) {
				textareaWrap.removeClass('rf-custom-css-100');
			}
		});

		$('#customize-footer-actions').on('click', function() {
			if ( textareaWrap.hasClass('rf-full-screen') ) {
				textareaWrap.toggleClass('rf-custom-css-100');
			}
		});


		// custom css field styling live update
		// text color
		wp.customize( 'royal_custom_css[text_color]', function( value ) {
			value.bind( function( nValue ) {
				textarea.css( 'color', nValue );
			} );
		} );

		// background color
		wp.customize( 'royal_custom_css[bg_color]', function( value ) {
			value.bind( function( nValue ) {
				var opa = $( '#'+ prfx( 'custom_css', 'bg_color_tr' ) ).find('input').val();
				textarea.css( 'background-color', royalHex2Rgba( nValue, opa ) );
			} );
		} );

		// background color transparency
		wp.customize( 'royal_custom_css[bg_color_tr]', function( value ) {
			value.bind( function( nValue ) {
				var hex = $( '#'+ prfx( 'custom_css', 'bg_color' ) ).find('.color-picker-hex').val();
				textarea.css( 'background-color', royalHex2Rgba( hex, nValue ) );
			} );
		} );

		// font size
		wp.customize( 'royal_custom_css[font_size]', function( value ) {
			value.bind( function( nValue ) {
				textarea.css( 'font-size', nValue +'px' );
			} );
		} );
		
	} // end royalCustomCSS()

$('#accordion-section-custom_css').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');

		// custom css init
		royalCustomCSS( 'custom_css', 'textarea' );

		// add submit button
		royalSubmitButton( 'custom_css-textarea' );

		// wrap controls
		royalControlsWrap( 'custom_css', 'textarea-controls-wrap', [ 'text_color', 'bg_color', 'bg_color_tr', 'font_size' ] );

		// transparency slider
		royalSlider( 'custom_css', 'bg_color_tr', 0, 1, 0.1, '', false );

		// text size slider
		royalSlider( 'custom_css', 'font_size', 10, 30, 1, 'px', false );
   

	} // end styles if()

}); // end styles click()





/*
***************************************************************
* #Custom JS/GA
***************************************************************
*/

	// add submit button
	royalSubmitButton( 'custom_js-textarea' );



/*
***************************************************************
* #Sidebar Widgets
***************************************************************
*/

$('#accordion-panel-widgets').bind('click', function(){
	setTimeout(function(){

		$('#accordion-section-sidebar_widgets').css('display','block');
		$('#accordion-section-footer_widgets').css('display','block');

		if ( $('#customize-control-royal_sidebar-general_position select').val() === 'top' ) {
			$('#accordion-section-sidebar_widgets').css('display','none');
		}

	}, 1000);
});




$('#accordion-section-sidebar_widgets > h3').prepend('<i class="fa fa-paint-brush"></i>');

$('#accordion-section-sidebar_widgets').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- Title Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'sWidgets_title', 'padding_bt', 0, 50, 1,'px', false );

	// margin bottom slider
	royalSlider( 'sWidgets_title', 'margin_bt', 0, 50, 1,'px', false );


/* ----------------- Title Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'sWidgets_title', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'sWidgets_title', 'border_label', '#customize-control-royal_sWidgets_title-border-wrap', true );

	// border bottom size slider
	royalSlider( 'sWidgets_title', 'bd_size_bt', 0, 20, 1, 'px', false );


/* ----------------- Title Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'sWidgets_title', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'sWidgets_title', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'sWidgets_title', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'sWidgets_title', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'sWidgets_title', 'font_weight', 100, 900, 100, '', false );


	// Sidebar Widgets tabs -------------------------------
	royalTabs( 
		'sWidgets_title', 
		[
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'color',
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'sWidgets_title', 'label', '#control_tabs_sWidgets_title', true );



/* ----------------- Content Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'sWidgets_content', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'sWidgets_content', 'padding_gen', 0, 25, 1, 'px', true );
	royalSlider( 'sWidgets_content', 'padding_tp', 0, 25, 1, 'px', false );
	royalSlider( 'sWidgets_content', 'padding_rt', 0, 25, 1, 'px', false );
	royalSlider( 'sWidgets_content', 'padding_bt', 0, 25, 1, 'px', false );
	royalSlider( 'sWidgets_content', 'padding_lt', 0, 25, 1, 'px', false );
	royalAdvancedBTN( 'sWidgets_content', 'padding_ad', false );


/* ----------------- Content Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'sWidgets_content', 'colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col',
		'link_col',
		'link_hcol'
	] );

	// background color transparency slider
	royalSlider( 'sWidgets_content', 'bg_col_tr', 0, 1, 0.1, '', false );

	// border radius controls wrap
	royalControlsWrap( 'sWidgets_content', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'sWidgets_content', 'radius_label', '#customize-control-royal_sWidgets_content-radius-wrap', true );

	// border radius slider
	royalSlider( 'sWidgets_content', 'radius', 0, 20, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'sWidgets_content', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'sWidgets_content', 'shadow_label', '#customize-control-royal_sWidgets_content-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'sWidgets_content', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'sWidgets_content', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'sWidgets_content', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'sWidgets_content', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'sWidgets_content', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Content Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'sWidgets_content', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'uppercase',
		'underline'
	] );

	// font size slider
	royalSlider( 'sWidgets_content', 'font_size', 10, 30, 1, 'px', false );

	// line height slider
	royalSlider( 'sWidgets_content', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'sWidgets_content', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'sWidgets_content', 'font_weight', 100, 900, 100, '', false );

	// Sidebar Widgets Content tabs -------------------------------
	royalTabs( 
		'sWidgets_content', 
		[
		 'align'
		], [
		 'padding-wrap'
		], [
		 'colors-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'sWidgets_content', 'label', '#control_tabs_sWidgets_content', true );


	} // end sidebar widgets if()

}); // end sidebar widgets click()



/*
***************************************************************
* #Top & Footer Widgets
***************************************************************
*/

$('#accordion-section-footer_widgets > h3').prepend('<i class="fa fa-paint-brush"></i>');

$('#accordion-section-footer_widgets').on('click', function() {
	
	if ( ! $(this).hasClass('royal-render') ) {
		$(this).addClass('royal-render');


/* ----------------- General Options ----------------- */

	// include controls wrap
	royalControlsWrap( 'fWidgets_general', 'includes-wrap', [
		'inc_blog',
		'inc_blog_single',
		'inc_portfolio',
		'inc_portfolio_single',
		'inc_contact',
		'inc_default',
	] );


/* ----------------- Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'fWidgets_general', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'fWidgets_general', 'padding_gen', 0, 100, 1, 'px', true );
	royalSlider( 'fWidgets_general', 'padding_tp', 0, 100, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'padding_rt', 0, 100, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'padding_bt', 0, 100, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'padding_lt', 0, 100, 1, 'px', false );
	royalAdvancedBTN( 'fWidgets_general', 'padding_ad', false );

	// gutter controls wrap
	royalControlsWrap( 'fWidgets_general', 'gutter-wrap', [
		'gutter_horz',
		'gutter_vert'
	] );

	royalSlider( 'fWidgets_general', 'gutter_horz', 0, 100, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'gutter_vert', 0, 100, 1, 'px', false );


/* ----------------- Styling Options ----------------- */

	// background color controls wrap
	royalControlsWrap( 'fWidgets_general', 'bg-color-wrap', [ 'bg_color', 'bg_color_tr' ] );

	// background gradient controls wrap
	royalControlsWrap( 'fWidgets_general', 'bg-gradient-wrap', [
		'bg_grad_angle',
		'bg_grad_col_1',
		'bg_grad_col_1_tr',
		'bg_grad_col_1_ps',
		'bg_grad_col_2',
		'bg_grad_col_2_tr',
		'bg_grad_col_2_ps',
	] );

	// background image controls wrap
	royalControlsWrap( 'fWidgets_general', 'bg-image-wrap', [
		'bg_img',
		'bg_img_sz',
		'bg_img_att'
	] );

	// background color transparency slider
	royalSlider( 'fWidgets_general', 'bg_color_tr', 0, 1, 0.1, '', false );

	// background gradient sliders
	royalSlider( 'fWidgets_general', 'bg_grad_angle', 0, 360, 1,' deg', false );
	royalSlider( 'fWidgets_general', 'bg_grad_col_1_tr', 0, 1, 0.1, '', false );
	royalSlider( 'fWidgets_general', 'bg_grad_col_1_ps', 0, 100, 1, '%', false );
	royalSlider( 'fWidgets_general', 'bg_grad_col_2_tr', 0, 1, 0.1, '', false );
	royalSlider( 'fWidgets_general', 'bg_grad_col_2_ps', 0, 100, 1, '%', false );

	// background type select
	royalSelect( 'fWidgets_general', 'background', 'background-select', [ 'bg-color-wrap', 'bg-gradient-wrap', 'bg-image-wrap' ] );

	// border controls wrap
	royalControlsWrap( 
		'fWidgets_general', 'border-wrap',
		[
		'bd_size_gen',
		'bd_style_gen',
		'bd_col_gen',
		'bd_style_tp',
		'bd_col_tp',
		'bd_size_tp',
		'bd_style_rt',
		'bd_col_rt',
		'bd_size_rt',
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_style_lt',
		'bd_col_lt',
		'bd_size_lt',
		'bd_ad'
	] );

	// border controls on/off
	royalCustomLabel( 'fWidgets_general', 'border_label', '#customize-control-royal_fWidgets_general-border-wrap', true );

	// border size sliders
	royalSlider( 'fWidgets_general', 'bd_size_gen', 0, 30, 1, 'px', true );
	royalSlider( 'fWidgets_general', 'bd_size_tp', 0, 30, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'bd_size_rt', 0, 30, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'bd_size_bt', 0, 30, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'bd_size_lt', 0, 30, 1, 'px', false );
	royalAdvancedBTN( 'fWidgets_general', 'bd_ad', true );

	// border type select general
	royalBorderStyleGeneral( 'fWidgets_general', 'bd_style_gen' );

	// border colorpicker general
	royalBorderColorGeneral( 'fWidgets_general', 'bd_col_gen' );

	// border radius controls wrap
	royalControlsWrap( 'fWidgets_general', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'fWidgets_general', 'radius_label', '#customize-control-royal_fWidgets_general-radius-wrap', true );

	// border radius slider
	royalSlider( 'fWidgets_general', 'radius', 0, 50, 1,'px', false );

	// shadow controls wrap
	royalControlsWrap( 'fWidgets_general', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'fWidgets_general', 'shadow_label', '#customize-control-royal_fWidgets_general-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'fWidgets_general', 'shad_h', -50, 50, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'shad_v', -50, 50, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'shad_bl', 0, 50, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'shad_sp', -50, 50, 1, 'px', false );
	royalSlider( 'fWidgets_general', 'shad_col_tr', 0, 1, 0.1, '', false );


	var topAndFooterWidgetsHelp = '\
		Top Widgets will appear when <a href="#accordion-section-sidebar">Section Sidebar</a> > <strong>General Position</strong> is set to "Top" and it has at least one widget in it.\
		<br><br><strong>Toggle Icon</strong> Show/hides Top Widgets.\
	';

	// footer general tabs -------------------------------
	royalTabs(
		'fWidgets_general',
		[
		 'inc_label',
		 'includes-wrap',
		 'columns',
		 'icon'
		],
		[
		 'padding-wrap',
		 'gutter-wrap'
		],
		[
		 'background-select',
		 'border_label',
		 'border-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		],
		'',
		topAndFooterWidgetsHelp
	);
	// label
	royalCustomLabel( 'fWidgets_general', 'label', '', false );



/* ----------------- Title Spacing Options ----------------- */

	// padding bottom slider
	royalSlider( 'fWidgets_title', 'padding_bt', 0, 50, 1,'px', false );

	// margin bottom slider
	royalSlider( 'fWidgets_title', 'margin_bt', 0, 50, 1,'px', false );


/* ----------------- Title Styling Options ----------------- */

	// border bottom controls wrap
	royalControlsWrap( 'fWidgets_title', 'border-wrap', [
		'bd_style_bt',
		'bd_col_bt',
		'bd_size_bt',
		'bd_full_width'
	] );

	// border bottom controls on/off
	royalCustomLabel( 'fWidgets_title', 'border_label', '#customize-control-royal_fWidgets_title-border-wrap', true );

	// border bottom size slider
	royalSlider( 'fWidgets_title', 'bd_size_bt', 0, 20, 1, 'px', false );


/* ----------------- Title Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'fWidgets_title', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'italic',
		'uppercase',
		'line_through'
	] );

	// font size slider
	royalSlider( 'fWidgets_title', 'font_size', 10, 50, 1, 'px', false );

	// line height slider
	royalSlider( 'fWidgets_title', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'fWidgets_title', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'fWidgets_title', 'font_weight', 100, 900, 100, '', false );


	// Sidebar Widgets tabs -------------------------------
	royalTabs(
		'fWidgets_title', 
		[
		 'align'
		], [
		 'padding_bt',
		 'margin_bt'
		], [
		 'color',
		 'border_label',
		 'border-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'fWidgets_title', 'label', '#control_tabs_fWidgets_title', true );



/* ----------------- Content Spacing Options ----------------- */

	// padding controls wrap
	royalControlsWrap( 'fWidgets_content', 'padding-wrap', [
		'padding_gen',
		'padding_tp',
		'padding_rt',
		'padding_bt',
		'padding_lt',
		'padding_ad',
	] );

	// padding sliders
	royalSlider( 'fWidgets_content', 'padding_gen', 0, 25, 1, 'px', true );
	royalSlider( 'fWidgets_content', 'padding_tp', 0, 25, 1, 'px', false );
	royalSlider( 'fWidgets_content', 'padding_rt', 0, 25, 1, 'px', false );
	royalSlider( 'fWidgets_content', 'padding_bt', 0, 25, 1, 'px', false );
	royalSlider( 'fWidgets_content', 'padding_lt', 0, 25, 1, 'px', false );
	royalAdvancedBTN( 'fWidgets_content', 'padding_ad', false );


/* ----------------- Content Styling Options ----------------- */

	// color controls wrap
	royalControlsWrap( 'fWidgets_content', 'colors-wrap', [
		'bg_col',
		'bg_col_tr',
		'txt_col',
		'link_col',
		'link_hcol'
	] );

	// background color transparency slider
	royalSlider( 'fWidgets_content', 'bg_col_tr', 0, 1, 0.1, '', false );

	// border radius controls wrap
	royalControlsWrap( 'fWidgets_content', 'radius-wrap', ['radius'] );

	// border radius controls on/off
	royalCustomLabel( 'fWidgets_content', 'radius_label', '#customize-control-royal_fWidgets_content-radius-wrap', true );

	// border radius slider
	royalSlider( 'fWidgets_content', 'radius', 0, 20, 1, 'px', false );

	// shadow controls wrap
	royalControlsWrap( 'fWidgets_content', 'shadow-wrap', [
		'shad_h',
		'shad_v',
		'shad_bl',
		'shad_sp',
		'shad_col',
		'shad_col_tr',
		'shad_in'
	] );

	// shadow controls on/off
	royalCustomLabel( 'fWidgets_content', 'shadow_label', '#customize-control-royal_fWidgets_content-shadow-wrap', true );

	// shadow sliders
	royalSlider( 'fWidgets_content', 'shad_h', -20, 20, 1, 'px', false );
	royalSlider( 'fWidgets_content', 'shad_v', -20, 20, 1, 'px', false );
	royalSlider( 'fWidgets_content', 'shad_bl', 0, 20, 1, 'px', false );
	royalSlider( 'fWidgets_content', 'shad_sp', -20, 20, 1, 'px', false );
	royalSlider( 'fWidgets_content', 'shad_col_tr', 0, 1, 0.1, '', false );


/* ----------------- Content Font Options ----------------- */

	// font options controls wrap
	royalControlsWrap( 'fWidgets_content', 'fonts-wrap', [
		'font_family',
		'font_size',
		'line_height',
		'letter_space',
		'font_weight',
		'uppercase',
		'underline'
	] );

	// font size slider
	royalSlider( 'fWidgets_content', 'font_size', 10, 30, 1, 'px', false );

	// line height slider
	royalSlider( 'fWidgets_content', 'line_height', 10, 50, 1, 'px', false );

	// letter spacing slider
	royalSlider( 'fWidgets_content', 'letter_space', -10, 10, 0.1, 'px', false );

	// font weight slider
	royalSlider( 'fWidgets_content', 'font_weight', 100, 900, 100, '', false );

	// Sidebar Widgets Content tabs -------------------------------
	royalTabs( 
		'fWidgets_content', 
		[
		 'align'
		], [
		 'padding-wrap'
		], [
		 'colors-wrap',
		 'radius_label',
		 'radius-wrap',
		 'shadow_label',
		 'shadow-wrap'
		], [
		 'fonts-wrap'
		],
		''
	);
	// label
	royalCustomLabel( 'fWidgets_content', 'label', '#control_tabs_fWidgets_content', true );


	} // end top & footer widgets if()

}); // end top & footer widgets click()



/*
***************************************************************
* Fake Refresh - For Loading Purposes
* Get all refreshable controls which have 'transport' => 'postMessage'
* Then when they are changed force hidden select to refresh the page
***************************************************************
*/

	// get custom value
	function royalGetValue(value) {
		return value.slice( value.indexOf('[') + 1, value.indexOf(']'));
	}

	$('#customize-control-royal_preloader-db_input').find('textarea').keyup(function(){
		setTimeout(function(){
			royalRefreshValue();
		}, 300);
	});

	royalLivePreview( 'body', 'onepage', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'body', 'smoothscroll', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'sidebar', 'general_position', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'sidebar_top', 'arrange', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'sidebar_top', 'scale_border_label', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'sidebar_top', 'scale_shadow_label', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'logo', 'label', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'logo', 'type', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'logo', 'image', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'logo', 'image_retina', function() {
		royalRefreshValue();
	});

	$('#customize-control-royal_menu_fold-label').find('input').change(function(){
		setTimeout(function(){
			royalRefreshValue();
		}, 300);
	});

	$('#customize-control-royal_menu_fold_wrap-item_align').find('select').change(function(){
		setTimeout(function(){
			royalRefreshValue();
		}, 300);
	});

	royalLivePreview( 'menu_items', 'sub', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'menu_items', 'list_style', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'filter_items', 'deeplinking', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'filter_items', 'isotope', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'filter_items', 'line_through', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'bPage_general', 'layout', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'bPage_general', 'grid_animated', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'bPost_desc', 'display_as', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'bPost_overlay', 'click', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'pPage_general', 'layout', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'pPage_general', 'grid_animated', function() {
		royalRefreshValue();
	});
	
	
	royalLivePreview( 'pPost_media', 'hover_link', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'pPost_media', 'center_content', function() {
		royalRefreshValue();
	});
	
	royalLivePreview( 'pPost_desc', 'display_as', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'pPost_more', 'info_type', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'pPost_effects', 'overlay_click', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'pPost_effects', 'nxt_prev_image', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'gallery', 'effect', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'gallery', 'transition', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'gallery', 'delay', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'similars_general', 'blog_label', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'similars_general', 'blog_showtype', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'similars_general', 'portfolio_label', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'similars_general', 'portfolio_showtype', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'similars_general', 'auto_scroll', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'comments_general', 'page_display', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'comments_general', 'blog_display', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'comments_general', 'portfolio_display', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'comments_image', 'avatar_size', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'comments_image', 'avatar_size', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'inputs_search', 'show_top_nav', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'pagination_nav', 'first_last_label', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'pagination_nav', 'type', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'pagination_nav', 'load_posts', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'cPage_map', 'mousewheel', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'back_btn', 'label', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'typography', 'subsets_label', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'typography', 'latin_subset', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'typography', 'cyrillic_subset', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'typography', 'greek_subset', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'typography', 'vietnamese_subset', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'sWidgets_content', 'label', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'fWidgets_general', 'inc_blog', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'fWidgets_general', 'inc_blog_single', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'fWidgets_general', 'inc_portfolio', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'fWidgets_general', 'inc_portfolio_single', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'fWidgets_general', 'inc_contact', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'fWidgets_general', 'inc_default', function() {
		royalRefreshValue();
	});

	royalLivePreview( 'fWidgets_content', 'label', function() {
		royalRefreshValue();
	});


// Hide Preloader when controls are loaded
$(window).on( 'load', function() {
	$('.royal-preloader, .royal-star5').fadeOut('x-slow');
	$('.wp-full-overlay.expanded').show();
});


}); // end of ready
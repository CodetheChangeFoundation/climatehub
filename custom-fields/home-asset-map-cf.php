<?php if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array(
	'key' => 'group_5bf60da30b7b2',
	'title' => 'Home Asset Map Banner',
	'fields' => array(
		array(
			'key' => 'field_5bf6213b6ac9f',
			'label' => 'Enable Asset Map Banner',
			'name' => 'enable_asset_map_banner',
			'type' => 'true_false',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'message' => '',
			'default_value' => 0,
			'ui' => 0,
			'ui_on_text' => '',
			'ui_off_text' => '',
		),
		array(
			'key' => 'field_5bf6208e21014',
			'label' => 'Asset Map Title',
			'name' => 'asset_map_title',
			'type' => 'text',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_5bf6213b6ac9f',
						'operator' => '==',
						'value' => '1',
					),
				),
			),
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => '',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'maxlength' => '',
		),
		array(
			'key' => 'field_5bf60f995c534',
			'label' => 'Asset Map Paragraph',
			'name' => 'asset_map_paragraph',
			'type' => 'wysiwyg',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_5bf6213b6ac9f',
						'operator' => '==',
						'value' => '1',
					),
				),
			),
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => '',
			'tabs' => 'all',
			'toolbar' => 'full',
			'media_upload' => 1,
			'delay' => 0,
		),
		array(
			'key' => 'field_5bf613e93e305',
			'label' => 'Asset Map Button Text',
			'name' => 'asset_map_button_text',
			'type' => 'text',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_5bf6213b6ac9f',
						'operator' => '==',
						'value' => '1',
					),
				),
			),
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => '',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'maxlength' => '',
		),
		array(
			'key' => 'field_5bf614433e306',
			'label' => 'Asset Map Button Link',
			'name' => 'asset_map_button_link',
			'type' => 'url',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_5bf6213b6ac9f',
						'operator' => '==',
						'value' => '1',
					),
				),
			),
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => '',
			'placeholder' => '',
		),
		array(
			'key' => 'field_5bf626ff4e6a0',
			'label' => 'Asset Map Image',
			'name' => 'asset_map_image',
			'type' => 'image',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_5bf6213b6ac9f',
						'operator' => '==',
						'value' => '1',
					),
				),
			),
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'return_format' => 'array',
			'preview_size' => 'thumbnail',
			'library' => 'all',
			'min_width' => '',
			'min_height' => '',
			'min_size' => '',
			'max_width' => '',
			'max_height' => '',
			'max_size' => '',
			'mime_types' => '',
		),
	),
	'location' => array(
		array(
			array(
				'param' => 'page',
				'operator' => '==',
				'value' => '34',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

endif; ?>

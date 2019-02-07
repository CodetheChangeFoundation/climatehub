<?php
if( function_exists('acf_add_local_field_group') ):

	acf_add_local_field_group(array(
		'key' => 'group_5c40e2e5e4703',
		'title' => 'Projects Carousel Project',
		'fields' => array(
			array(
				'key' => 'field_5c491d960f2a7',
				'label' => 'Project Carousel Enable',
				'name' => 'project_carousel_enable',
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
				'key' => 'field_5c40e2f171a28',
				'label' => 'Project Carousel Item Current',
				'name' => 'project_carousel_item_current',
				'type' => 'repeater',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'collapsed' => 'field_5c491d3d79f9c',
				'min' => 3,
				'max' => 0,
				'layout' => 'row',
				'button_label' => '',
				'sub_fields' => array(
					array(
						'key' => 'field_5c491d3d79f9c',
						'label' => 'Project Title',
						'name' => 'project_title',
						'type' => 'text',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => 'Project Title 1',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'maxlength' => '',
					),
					array(
						'key' => 'field_5c491d6d79f9d',
						'label' => 'Project Description',
						'name' => 'project_description',
						'type' => 'wysiwyg',
						'instructions' => 'optional',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'tabs' => 'all',
						'toolbar' => 'full',
						'media_upload' => 0,
						'delay' => 0,
					),
					array(
						'key' => 'field_5c491de6043a7',
						'label' => 'Project Link',
						'name' => 'project_link',
						'type' => 'link',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'return_format' => 'url',
					),
					array(
						'key' => 'field_5c491e0c043a8',
						'label' => 'Project Image',
						'name' => 'project_image',
						'type' => 'image',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
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
						'max_width' => 425,
						'max_height' => 215,
						'max_size' => '',
						'mime_types' => '',
					),
				),
			),
			array(
				'key' => 'field_5c526fdaa0bec',
				'label' => 'Project Carousel Item Past',
				'name' => 'project_carousel_item_past',
				'type' => 'repeater',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'collapsed' => 'field_5c491d3d79f9c',
				'min' => 3,
				'max' => 0,
				'layout' => 'row',
				'button_label' => '',
				'sub_fields' => array(
					array(
						'key' => 'field_5c526fdaa0bed',
						'label' => 'Project Title',
						'name' => 'project_title',
						'type' => 'text',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => 'Project Title 1',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'maxlength' => '',
					),
					array(
						'key' => 'field_5c526fdaa0bee',
						'label' => 'Project Description',
						'name' => 'project_description',
						'type' => 'wysiwyg',
						'instructions' => 'optional',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'tabs' => 'all',
						'toolbar' => 'full',
						'media_upload' => 0,
						'delay' => 0,
					),
					array(
						'key' => 'field_5c526fdaa0bef',
						'label' => 'Project Link',
						'name' => 'project_link',
						'type' => 'link',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'return_format' => '',
					),
					array(
						'key' => 'field_5c526fdaa0bf0',
						'label' => 'Project Image',
						'name' => 'project_image',
						'type' => 'image',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'return_format' => '',
						'preview_size' => 'thumbnail',
						'library' => '',
						'min_width' => '',
						'min_height' => '',
						'min_size' => '',
						'max_width' => 425,
						'max_height' => 215,
						'max_size' => '',
						'mime_types' => '',
					),
				),
			),
			array(
				'key' => 'field_5c526ffda0bf1',
				'label' => 'Project Carousel Item Featured',
				'name' => 'project_carousel_item_featured',
				'type' => 'repeater',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'collapsed' => 'field_5c491d3d79f9c',
				'min' => 3,
				'max' => 0,
				'layout' => 'row',
				'button_label' => '',
				'sub_fields' => array(
					array(
						'key' => 'field_5c526ffda0bf2',
						'label' => 'Project Title',
						'name' => 'project_title',
						'type' => 'text',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => 'Project Title 1',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'maxlength' => '',
					),
					array(
						'key' => 'field_5c526ffda0bf3',
						'label' => 'Project Description',
						'name' => 'project_description',
						'type' => 'wysiwyg',
						'instructions' => 'optional',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'tabs' => 'all',
						'toolbar' => 'full',
						'media_upload' => 0,
						'delay' => 0,
					),
					array(
						'key' => 'field_5c526ffda0bf4',
						'label' => 'Project Link',
						'name' => 'project_link',
						'type' => 'link',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'return_format' => '',
					),
					array(
						'key' => 'field_5c526ffda0bf5',
						'label' => 'Project Image',
						'name' => 'project_image',
						'type' => 'image',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'return_format' => '',
						'preview_size' => 'thumbnail',
						'library' => '',
						'min_width' => '',
						'min_height' => '',
						'min_size' => '',
						'max_width' => 425,
						'max_height' => 215,
						'max_size' => '',
						'mime_types' => '',
					),
				),
			),
			array(
				'key' => 'field_5c526fffa0bf6',
				'label' => 'Project Carousel Item Upcoming',
				'name' => 'project_carousel_item_upcoming',
				'type' => 'repeater',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'collapsed' => 'field_5c491d3d79f9c',
				'min' => 3,
				'max' => 0,
				'layout' => 'row',
				'button_label' => '',
				'sub_fields' => array(
					array(
						'key' => 'field_5c526fffa0bf7',
						'label' => 'Project Title',
						'name' => 'project_title',
						'type' => 'text',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => 'Project Title 1',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'maxlength' => '',
					),
					array(
						'key' => 'field_5c526fffa0bf8',
						'label' => 'Project Description',
						'name' => 'project_description',
						'type' => 'wysiwyg',
						'instructions' => 'optional',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'tabs' => 'all',
						'toolbar' => 'full',
						'media_upload' => 0,
						'delay' => 0,
					),
					array(
						'key' => 'field_5c526fffa0bf9',
						'label' => 'Project Link',
						'name' => 'project_link',
						'type' => 'link',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'return_format' => 'url',
					),
					array(
						'key' => 'field_5c526fffa0bfa',
						'label' => 'Project Image',
						'name' => 'project_image',
						'type' => 'image',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
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
						'max_width' => 425,
						'max_height' => 215,
						'max_size' => '',
						'mime_types' => '',
					),
				),
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'page_template',
					'operator' => '==',
					'value' => 'default',
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
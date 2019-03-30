<?php
if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array(
	'key' => 'group_5c3fd6d95c56a',
	'title' => 'Call to Action Box',
	'fields' => array(
		array(
			'key' => 'field_5c3fd6e9c09d8',
			'label' => 'Call to Action Title',
			'name' => 'call_to_action_title',
			'type' => 'text',
			'instructions' => 'Enter the title of the field.',
			'required' => 1,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => 'Call to Action',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'maxlength' => '',
		),
		array(
			'key' => 'field_5c3fd7a4c09da',
			'label' => 'Call to Action Summary',
			'name' => 'call_to_action_summary',
			'type' => 'wysiwyg',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => 0,
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
			'key' => 'field_5c3fe0952ed38',
			'label' => 'Call to Action Button Title',
			'name' => 'call_to_action_button_title',
			'type' => 'text',
			'instructions' => 'This will display on the button.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => 'Join Us',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'maxlength' => '',
		),
		array(
			'key' => 'field_5c3fe0a92ed39',
			'label' => 'Call to Action Button Link',
			'name' => 'call_to_action_button_link',
			'type' => 'url',
			'instructions' => 'This is the link the button will redirect the user to.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => 'https://www.facebook.com/UBCClimateHub/',
			'placeholder' => '',
		),
	),
	'location' => array(
		array(
			array(
				'param' => 'page',
				'operator' => '==',
				'value' => '158',
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

endif;
?>